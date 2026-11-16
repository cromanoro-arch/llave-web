import { VisitButton } from "./VisitModal";
import Today from "./Today";
import { listings } from "@/data/listings";

const links = [
  ["Clasificados", "#explorar"],
  ["Lo que importa", "#datos"],
  ["Guía de compra", "#guia"],
  ["Verificar", "#verificar"],
  ["Ventajas", "#ventajas"],
  ["Crédito", "#credito"],
  ["Consultorio", "#faq"],
];

const edicion = String(Math.max(...listings.map((l) => l.id))).padStart(4, "0");

export default function Header() {
  return (
    <>
      <div className="container-x">
        <div className="flex flex-wrap justify-between gap-x-4 gap-y-1 border-b border-ink py-2.5 font-mono text-[11px] uppercase">
          <Today />
          <span className="hidden sm:inline">Edición N.º {edicion} · Dólar oficial Bs 6,96</span>
          <span>Precio: gratis</span>
        </div>
        <div className="mt-3 flex flex-col border-[3px] border-ink sm:flex-row">
          <a href="#" className="bg-red px-5 py-2 font-head text-6xl font-black uppercase italic leading-none tracking-tight text-white sm:text-8xl">
            La Llave
          </a>
          <div className="flex flex-1 flex-col justify-between gap-2 bg-paper-card px-4 py-3 sm:px-6">
            <span className="label-mono">Los clasificados de Bolivia · Casas · Terrenos · Autos</span>
            <p className="font-head text-2xl font-extrabold uppercase leading-tight sm:text-3xl">¡Casas, terrenos y autos con papeles en regla!</p>
            <span className="label-mono">Verificados antes de publicar · Desde 2026</span>
          </div>
        </div>
      </div>
      <header className="sticky top-0 z-40 mt-3 border-y-2 border-ink bg-paper/95 backdrop-blur">
        <div className="container-x flex h-12 items-center justify-between gap-4">
          <nav className="flex items-center gap-5 overflow-x-auto font-head text-lg font-extrabold uppercase">
            {links.map(([l, h]) => (
              <a key={h} href={h} className="shrink-0 hover:text-red">{l}</a>
            ))}
          </nav>
          <VisitButton className="btn-ink shrink-0">Agendar<span className="hidden sm:inline">&nbsp;visita</span>&nbsp;→</VisitButton>
        </div>
      </header>
    </>
  );
}
