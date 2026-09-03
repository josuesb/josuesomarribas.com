import {getCliClient} from "sanity/cli";
import {mergedArticleRedirects} from "../lib/article-redirects.ts";

const commit = process.env.SANITY_DRAFT_AUDIT_COMMIT === "1";
const client = getCliClient({apiVersion: "2026-09-01"}).withConfig({perspective: "raw"});

const recoverable = {
  "ab-testing-ai-features-what-changes": "Strong, current angle. Rewrite around evaluation quality, nondeterminism, safety metrics, and human review before publishing.",
  "bitely-responsive-recipe-app-design": "Potential portfolio case study. Recover only with problem, process, decisions, outcomes, and original visuals.",
  "building-a-travel-app-a-work-in-progress": "Potential process case study. Rebuild around concrete research decisions and what changed, not project chronology.",
  "design-tokens-ai-era-before-automation": "Strong systems-design topic. Update with concrete token governance examples and remove generic AI framing.",
  "experimentation-culture-without-manufacturing-winners": "Strong leadership angle. Recover with specific incentives, reporting rituals, and examples of how teams distort inconclusive results.",
  "moosic-smart-music-app-for-android": "Potential archive case study. Recover only if original artifacts support a credible retrospective.",
  "picasso-s-library-native-android-ios-design-concept": "Potential archive case study. Recover as a concise retrospective if original assets and decisions are available.",
  "user-research-no-budget-no-recruiter": "Useful professional topic. Rewrite with a practical recruitment plan, consent safeguards, and realistic limitations.",
  "utm-parameters-what-they-are-how-they-affect-seo-and-how-to-test-them-in-ga4": "Strong search intent and sufficient depth. Update GA4 details, canonical guidance, and examples before publishing.",
  "what-accessible-enough-really-means-in-2025": "Recoverable accessibility argument. Remove the year, verify WCAG references, and add specific acceptance criteria.",
};

const deletable = {
  "4-unique-design-systems-you-haven-t-seen-yet-to-boost-your-inspiration": "Thin listicle with weak differentiation and no durable portfolio value.",
  "alex-an-user-persona-based-on-user-research": "Thin persona artifact without enough evidence, method, or outcome to become a credible case study.",
  "us-government-pulls-fable-5-and-mythos-5-offline": "Time-sensitive news draft with claims that should not be retained without complete source verification.",
  "website-builders-and-which-one-i-think-is-best-for-you": "Outdated, thin comparison whose recommendations would require a full new research cycle.",
};

const drafts = await client.fetch(`*[_type == "article" && locale == "en" && _id in path("drafts.**")]{_id, title, "slug": slug.current}`);
const unclassified = drafts.filter(article => !mergedArticleRedirects[article.slug] && !recoverable[article.slug] && !deletable[article.slug]);
if (unclassified.length) throw new Error(`Unclassified English drafts:\n${unclassified.map(article => `- ${article.slug}: ${article.title}`).join("\n")}`);
const decisions = drafts.map(article => {
  const destination = mergedArticleRedirects[article.slug];
  if (destination) return {...article, disposition: "historical-merge", note: `Historical source consolidated into /blog/${destination}.`};
  if (recoverable[article.slug]) return {...article, disposition: "recoverable", note: recoverable[article.slug]};
  if (deletable[article.slug]) return {...article, disposition: "delete", note: deletable[article.slug]};
  throw new Error(`Unclassified English draft: ${article.slug}`);
});

const counts = Object.groupBy(decisions, item => item.disposition);
console.log(`Audited ${decisions.length} English drafts: ${counts["historical-merge"]?.length ?? 0} historical merges, ${counts.recoverable?.length ?? 0} recoverable ideas, ${counts.delete?.length ?? 0} deletable.`);
for (const disposition of ["historical-merge", "recoverable", "delete"]) {
  console.log(`\n${disposition.toUpperCase()}`);
  for (const item of decisions.filter(article => article.disposition === disposition).sort((a, b) => a.slug.localeCompare(b.slug))) console.log(`- ${item.slug}: ${item.note}`);
}

if (!commit) {
  console.log("\nDry run only. Set SANITY_DRAFT_AUDIT_COMMIT=1 to save the classifications in Sanity.");
  process.exit(0);
}

const transaction = client.transaction();
for (const article of decisions) transaction.patch(article._id, patch => patch.set({draftDisposition: article.disposition, draftDispositionNote: article.note}));
await transaction.commit({visibility: "sync"});
console.log(`Saved classifications for ${decisions.length} drafts in one transaction.`);
