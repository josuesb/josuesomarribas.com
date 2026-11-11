import SiteFooter from "../../components/SiteFooter";
import { ButtonLink } from "../../components/ui/Action";
import Image from "next/image";
import brokenSun from "../../public/assets/404/broken-sun.png";
import routeBlueprint from "../../public/assets/404/route-blueprint.png";
import "./not-found.css";

export default function NotFound() {
  return <main className="not-found-page">
    <section className="not-found-hero shell" aria-labelledby="not-found-title">
      <div className="not-found-code" aria-hidden="true">
        <span data-text="404">404</span>
        <small>PX<br/>REF</small>
      </div>
      <Image className="not-found-sun" src={brokenSun} alt="" aria-hidden="true" priority unoptimized />
      <div className="not-found-copy">
        <p className="not-found-label">FIELD NOTE · 404—EX</p>
        <h1 id="not-found-title">Signal lost.</h1>
        <p>This page didn&apos;t survive the experiment.</p>
        <div className="not-found-actions">
          <ButtonLink href="/">Back to home </ButtonLink>
          <ButtonLink variant="secondary" href="/blog">Explore writing </ButtonLink>
        </div>
      </div>
    </section>

    <section className="not-found-diagram shell" aria-label="The observed route stopped before reaching its expected destination">
      <Image src={routeBlueprint} alt="Expected route reaches its destination; observed route ends without a match" priority unoptimized />
      <p aria-hidden="true">Try another<br/>path. ↙</p>
    </section>

    <SiteFooter/>
  </main>;
}
