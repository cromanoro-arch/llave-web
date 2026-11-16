import SocialLinks from "./SocialLinks";

export default function Footer() {
  return (
    <footer className="container-x pb-24 pt-6">
      <SocialLinks className="mb-5" />
      <div className="border-t-4 border-double border-ink pt-4 font-mono text-[11px] uppercase leading-relaxed text-ink-mute sm:flex sm:justify-between sm:gap-8">
        <p>© {new Date().getFullYear()} La Llave · Los clasificados de Bolivia</p>
        <p className="mt-2 max-w-xl sm:mt-0">Información de trámites e impuestos referencial. Confirma montos y requisitos con Derechos Reales, tu alcaldía, el RUAT o tu banco antes de firmar.</p>
      </div>
    </footer>
  );
}
