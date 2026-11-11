import { ButtonLink } from "../../../components/ui/Action";
import type { Metadata } from "next";
import SiteFooter from "../../../components/SiteFooter";
import CopyEmailButton from "../../../components/CopyEmailButton";
import Image from "next/image";
import AboutHeroCollage3D from "../../../components/AboutHeroCollage3D";

export const metadata: Metadata = {
  title: "About — Josue Somarribas",
  alternates: { canonical: "/about", languages: { en: "/about", es: "/es/about", "x-default": "/about" } },
  description: "UX Engineer and CRO Developer connecting human behavior, interface craft and production code.",
};

const resumeHref = "/CV/JosueSomarribas_CV_CRO_EN_06_2026-04.pdf";
const editorialAsset = "/assets/about-editorial";

export default function AboutPage() {
  return <main className="about-page">
    <section className="about-hero">
      <div className="shell about-hero-grid">
        <div>
          <p className="about-label">ABOUT × THE PERSON BETWEEN THE PIXELS</p>
          <h1>Designer by instinct.<br />Engineer by practice.<br />Experimenter by <em>curiosity.</em></h1>
          <p className="about-lead">I&apos;m Josue Somarribas, a UX Engineer and CRO Developer connecting human behavior, interface craft and production code.</p>
          <div className="actions"><ButtonLink  href={resumeHref} download>Download résumé </ButtonLink><ButtonLink variant="secondary" href="mailto:josuesomarribasb@gmail.com">Start a conversation </ButtonLink></div>
          <p className="about-meta">8+ years across UX and web development · Based in Spain · Born in Costa Rica</p>
        </div>
        <AboutHeroCollage3D />
      </div>
    </section>

    <section className="about-work shell">
      <div className="about-work-copy"><small>01 / BETWEEN DISCIPLINES</small><h2>The work lives<br/>between disciplines.</h2><i/><p>Good products aren&apos;t born in one discipline. They emerge where design thinking, engineering rigor and behavioral insight overlap.</p><p>I move across those edges—translating ambiguity into experiments, shaping interfaces that respect people, and building the systems that make learning repeatable.</p><p>From Costa Rica to Barcelona, the same thread guides me: curiosity applied with craft.</p></div>
      <div className="about-work-art" role="img" aria-label="Research papers, prototype, measuring tape and a journey from Costa Rica to Barcelona"><Image className="about-work-papers" src={`${editorialAsset}/work-papers.png`} alt="" width={1672} height={941} unoptimized/><Image className="about-work-tools" src={`${editorialAsset}/work-tools.png`} alt="" width={1536} height={1024} unoptimized/></div>
    </section>

    <section className="about-thinking"><div className="shell"><header><small>02 / PROCESS</small><h2>How I think</h2></header><div className="about-thinking-grid"><article><b>01</b><h3>Find the real question.</h3><p>I start by getting curious about the right problem.</p></article><article><b>02</b><h3>Make the invisible testable.</h3><p>I design small, low-risk ways to see the signal.</p></article><article><b>03</b><h3>Ship the learning.</h3><p>I build, measure and ship what moves us forward.</p></article></div><Image className="about-thinking-art" src={`${editorialAsset}/how-i-think.png`} alt="Question sheet, measurement instrument and release note" width={2172} height={724} unoptimized/></div></section>

    <section className="about-field-notes"><div className="shell"><header><h2>Selected field notes</h2><span>EXCERPTS FROM MY DESIGN JOURNAL</span></header><Image src={`${editorialAsset}/field-notes.png`} alt="Four field notes about clarity, experimentation, craft and ethical measurement" width={2073} height={758} unoptimized/></div></section>

    <section className="about-career shell" id="route"><div className="about-career-intro"><small>03 / PATH</small><h2>A path shaped<br/>by making.</h2><i/><p>I didn&apos;t follow a straight line. I followed curiosity, and kept building.</p><a href={resumeHref} target="_blank" rel="noreferrer">View résumé </a></div><div className="about-career-story"><Image src={`${editorialAsset}/career-route.png`} alt="A winding career route from Costa Rica to Barcelona" width={1983} height={793} unoptimized/><div className="about-milestones"><span><b>2017</b>Design curiosity</span><span><b>2018</b>Product foundations</span><span><b>2019</b>First experiments</span><span><b>2021</b>UX Engineering</span><span><b>2022</b>Barcelona</span><span><b>2024+</b>Learning loop</span></div></div></section>

    <section className="about-outside"><div className="shell"><div><small>04 / BEYOND WORK</small><h2>Outside the<br/>interface.</h2><i/><p>Hospitality taught me empathy. Travel taught me perspective. Costa Rica raised my roots. Barcelona feeds my curiosity.</p><p>Good conversations and strong coffee keep me going.</p><a href="https://www.airbnb.es/rooms/1328530246047347477" target="_blank" rel="noreferrer">Read the guest reviews </a></div><Image src={`${editorialAsset}/outside-collage.png`} alt="Room key, coffee receipt, Barcelona map and Costa Rica postcard" width={1536} height={1024} unoptimized/></div></section>

    <section className="about-voices shell"><header><small>05 / COLLABORATION</small><h2>People I trust<br/>have said this better.</h2></header><blockquote>“Josue brings rare balance—curious like a researcher, precise like an engineer, and human like a designer.”<cite>Product Director · E-commerce scale-up</cite></blockquote><blockquote>“He asks great questions, notices the details and makes collaboration feel easy.”<cite>Engineering collaborator · B2B SaaS</cite></blockquote><a href="https://www.linkedin.com/in/josuesb/" target="_blank" rel="noreferrer">Read 14 recommendations<br/>on LinkedIn </a></section>

    <section className="about-curious"><div className="shell"><h2>Currently<br/><b>curious about</b></h2><p>Experiment validity 〰 Behavioral design 〰 Accessible interaction 〰 Browser quirks 〰 Typography 〰 Useful side projects</p></div></section>

    <section className="about-editorial-contact"><div className="shell"><div><h2>If the problem sits between disciplines,<br/>I&apos;m probably interested.</h2><p>Send me the messy version. No pitch deck required.</p></div><div className="actions"><ButtonLink  href="mailto:josuesomarribasb@gmail.com">Start a conversation </ButtonLink><CopyEmailButton /></div></div></section>
    <SiteFooter current="about" />
  </main>;
}
