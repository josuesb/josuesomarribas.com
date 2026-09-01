type Locale = "en" | "es";

const siteUrl = "https://www.josuesomarribas.com";

export default function SiteStructuredData({ locale }: { locale: Locale }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${siteUrl}/#person`,
        name: "Josue Somarribas",
        url: siteUrl,
        jobTitle: locale === "es" ? "Ingeniero UX y desarrollador CRO" : "UX Engineer & CRO Developer",
        sameAs: ["https://www.linkedin.com/in/josuesb/"],
        knowsLanguage: ["en", "es"],
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: "Josue Somarribas",
        inLanguage: locale,
        publisher: { "@id": `${siteUrl}/#person` },
      },
    ],
  };

  return <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}
  />;
}
