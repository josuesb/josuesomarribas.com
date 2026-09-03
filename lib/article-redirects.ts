export const mergedArticleRedirects: Record<string, string> = {
  "the-geometry-behind-modern-ui-squircles-apple-and-todays-framer-update": "the-squircle-in-mobile-cro-superellipses-and-cognitive-friction",
  "designing-for-real-world-context": "designing-for-attention-degradation-ux-for-bags-sun-glare-and-3g",
  "ai-in-ux-design-faster-but-are-we-getting-lazier": "ai-assisted-ui-design-faster-yes-better-not-always",
  "digital-sous-chef-ai-design-judgment": "ai-assisted-ui-design-faster-yes-better-not-always",
  "how-i-applied-ux-design-principles-to-improve-my-airbnb-hosting-experience": "airbnb-as-a-product-what-hosting-taught-me-about-user-experience",
  "what-hotel-reception-taught-me-about-airbnb-hosting": "airbnb-as-a-product-what-hosting-taught-me-about-user-experience",
  "the-tiny-house-as-an-interface-how-space-signs-locks-and-light-guide-behavior": "airbnb-as-a-product-what-hosting-taught-me-about-user-experience",
  "the-host-is-part-designer-part-support-agent-part-detective": "airbnb-as-a-product-what-hosting-taught-me-about-user-experience",
  "what-happens-when-guests-don-t-use-things-the-way-you-expected": "airbnb-as-a-product-what-hosting-taught-me-about-user-experience",
  "good-service-is-clear-before-it-is-friendly": "trust-is-designed-before-the-guest-arrives",
  "why-hospitality-needs-boundaries-not-just-smiles": "trust-is-designed-before-the-guest-arrives",
  "the-problem-with-rules-guests-only-see-after-they-break-them": "trust-is-designed-before-the-guest-arrives",
  "your-guest-doesn-t-read-everything-design-for-that": "trust-is-designed-before-the-guest-arrives",
  "how-to-write-guest-messages-that-prevent-problems-before-they-happen": "trust-is-designed-before-the-guest-arrives",
  "handling-complaints-is-basically-user-research-with-higher-stakes": "reviews-are-not-just-feedback-they-are-public-ux-research",
  "damage-claims-bad-reviews-and-the-emotional-side-of-hosting": "reviews-are-not-just-feedback-they-are-public-ux-research",
  "user-research-building-products-people-actually-need": "how-to-do-user-research-for-travelers-the-complete-guide",
  "how-an-a-b-test-really-looks-when-you-don-t-have-enough-data": "statistical-significance-for-skeptics-when-flat-data-is-a-success-signal",
  "the-professional-maturity-of-reporting-an-inconclusive-test": "statistical-significance-for-skeptics-when-flat-data-is-a-success-signal",
  "micro-semiotics-forms-ambiguous-labels-checkout": "ux-is-semiotics-why-an-interface-is-a-system-of-signs",
  "ai-mentions-without-clicks": "the-roi-of-ai-search-mentions-calculating-the-value-of-zero-click-brand-awareness",
  "google-search-console-for-chatgpt": "geo-vs-seo-ai-search",
  "how-to-track-ai-visibility": "geo-vs-seo-ai-search",
  "llms-txt-json-ld-framer-setup": "structural-seo-json-ld-framer",
  "make-blog-posts-ai-readable": "geo-vs-seo-ai-search",
  "mutationobservers-vs-polling-a-performance-shootout-for-a-b-testing": "mutationobservers-without-panic-performance-guide",
  "seo-schema-in-framer": "structural-seo-json-ld-framer",
  "test-ab-how-it-works-first-experiment": "complete-guide-to-ab-testing-cro-experimentation",
  "elevenlabs-studio-for-developers-advanced-ssml-and-narration-hacks": "how-i-generate-natural-blog-audio-locally-for-free",
  "how-i-add-real-audio-to-my-blog-posts-using-chatgpt-elevenlabs-and-framer": "how-i-generate-natural-blog-audio-locally-for-free",
};

export function rewriteMergedArticleLinks(html: string) {
  return Object.entries(mergedArticleRedirects).reduce(
    (result, [source, destination]) => result.replaceAll(`/blog/${source}`, `/blog/${destination}`),
    html,
  );
}
