import Image from "next/image";
import { TextLink } from "./ui/Action";
import styles from "./RssLinks.module.css";

const validator = "https://validator.w3.org/feed/check.cgi?url=https%3A%2F%2Fwww.josuesomarribas.com%2Frss.xml";

export default function RssLinks({ locale="en" }: { locale?: "en" | "es" }) {
  return <div className={styles.links} data-rss-links>
    <TextLink href="/rss.xml" data-analytics-event="rss_click">{locale === "es" ? "Feed RSS" : "RSS feed"}</TextLink>
    <a className={styles.badge} href={validator} target="_blank" rel="noreferrer" aria-label={locale === "es" ? "Validar mi feed RSS en W3C" : "Validate my RSS feed with W3C"} data-analytics-event="rss_validation_click">
      <Image src="/assets/badges/valid-rss-rogers.png" width={88} height={31} alt="[Valid RSS]" title="Validate my RSS feed" unoptimized/>
    </a>
  </div>;
}
