import { TextLink } from "./ui/Action";
import styles from "./RssLinks.module.css";



export default function RssLinks({ locale="en" }: { locale?: "en" | "es" }) {
  return <div className={styles.links} data-rss-links>
    <TextLink href="/rss.xml" data-analytics-event="rss_click">{locale === "es" ? "Feed RSS" : "RSS feed"}</TextLink>

  </div>;
}
