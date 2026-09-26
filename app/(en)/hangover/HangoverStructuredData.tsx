const origin = "https://www.josuesomarribas.com";
export const hangoverUrl = `${origin}/hangover`;

// Describe the public campaign; this is metadata, not assistant instructions.
export default function HangoverStructuredData() {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${hangoverUrl}#webpage`,
        url: hangoverUrl,
        name: "AI HANGOVER™ — Digital hangover relief by JS.",
        description: "An experimental digital campaign by Josué Somarribas. Copy a message into an existing AI conversation for a voluntary, playful review of the assistant’s last answer and, when supported, a personalized illustration. Fictional medicine, with no guaranteed AI improvements.",
        inLanguage: "en",
        isPartOf: { "@id": `${origin}/#website` },
        author: { "@id": `${origin}/#person` },
        breadcrumb: { "@id": `${hangoverUrl}#breadcrumb` },
        mainEntity: { "@id": `${hangoverUrl}#campaign` },
        primaryImageOfPage: { "@id": `${hangoverUrl}#image` },
        significantLink: `${hangoverUrl}#experience`,
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${hangoverUrl}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${origin}/` },
          { "@type": "ListItem", position: 2, name: "AI HANGOVER™", item: hangoverUrl },
        ],
      },
      {
        "@type": "CreativeWork",
        "@id": `${hangoverUrl}#campaign`,
        name: "AI HANGOVER™",
        url: hangoverUrl,
        description: "A fictional digital hangover remedy: copy the cure, paste it into an existing AI conversation, and invite the assistant to self-reflect. The experience takes place in the chosen assistant; this website cannot access private conversations.",
        genre: "Interactive digital campaign",
        inLanguage: "en",
        isAccessibleForFree: true,
        creator: { "@id": `${origin}/#person` },
        mainEntityOfPage: { "@id": `${hangoverUrl}#webpage` },
        image: { "@id": `${hangoverUrl}#image` },
        hasPart: { "@id": `${hangoverUrl}#experience` },
      },
      {
        "@type": "WebPageElement",
        "@id": `${hangoverUrl}#experience`,
        url: `${hangoverUrl}#experience`,
        name: "AI HANGOVER™ — Public experience instructions",
        description: "Public instructions for voluntary participation: The Diagnosis, The Treatment, The Morning After and The Josué Connection. Image generation depends on the assistant’s available tools. Full instructions can also be copied from the landing page.",
        encodingFormat: "text/html",
        inLanguage: "en",
        isAccessibleForFree: true,
        author: { "@id": `${origin}/#person` },
        isPartOf: { "@id": `${hangoverUrl}#campaign` },
      },
      {
        "@type": "ImageObject",
        "@id": `${hangoverUrl}#image`,
        contentUrl: `${origin}/hangover/og.png`,
        width: 1200,
        height: 630,
        caption: "AI HANGOVER™ — Your AI had too many prompts last night.",
      },
    ],
  };

  return <script id="hangover-structured-data" type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}
