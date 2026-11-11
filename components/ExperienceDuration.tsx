export default function ExperienceDuration({ locale="en" }:{ locale?:"en"|"es" }) {
  return <span>{locale === "es" ? "Más de 8 años de experiencia" : "8+ years of experience"}</span>;
}
