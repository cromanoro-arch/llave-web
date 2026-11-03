import Icon from "./Icon";

const links = [
  ["Explorar", "#explorar"],
  ["Qué preguntan", "#datos"],
  ["Guía de compra", "#guia"],
  ["Crédito", "#credito"],
  ["Preguntas frecuentes", "#faq"],
];

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-ink/5 bg-sand/85 backdrop-blur">
      <div className="container-x flex h-16 items-center justify-between gap-4">
        <a href="#" className="flex items-center gap-2 font-display text-xl text-ink">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand text-white"><Icon name="key" /></span>
          Llave
        </a>
        <nav className="hidden items-center gap-6 text-sm text-ink-soft md:flex">
          {links.map(([l, h]) => (
            <a key={h} href={h} className="hover:text-brand">{l}</a>
          ))}
        </nav>
        <a href="#contacto" className="rounded-full bg-clay px-4 py-2 text-sm font-semibold text-white shadow-card hover:bg-clay/90">Publicar o consultar</a>
      </div>
    </header>
  );
}
