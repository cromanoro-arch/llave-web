import { listings } from "@/data/listings";
import Icon from "./Icon";
import { waLink, WHATSAPP } from "@/config";

const TC = 6.96;
const toBs = (usd: string) => {
  const n = Number(usd.replace(/[^\d]/g, ""));
  return `Bs ${(n * TC).toLocaleString("es-BO", { maximumFractionDigits: 0 })}`;
};

export default function Listings() {
  return (
    <section id="explorar" className="py-20">
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Destacados</p>
            <h2 className="h2 mt-3">Precio claro, papeles verificados, respuesta rápida</h2>
          </div>
          <p className="max-w-sm text-sm text-ink-soft">Cada aviso muestra el precio en dólares y bolivianos, la fecha en que revisamos sus papeles y un botón para consultar al instante.</p>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {listings.map((l) => (
            <article key={l.id} className="group flex flex-col overflow-hidden rounded-3xl bg-white shadow-card transition hover:-translate-y-1">
              <div className={`relative grid h-44 place-items-center bg-gradient-to-br ${l.hue}`}>
                <Icon name={l.icon} className="h-16 w-16 text-ink/40" />
                <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold">{l.type}</span>
                <span className="absolute right-4 top-4 rounded-full bg-ink/70 px-2.5 py-1 text-xs text-white">{l.photos} fotos</span>
                {l.tag && <span className="absolute bottom-4 left-4 flex items-center gap-1 rounded-full bg-brand px-3 py-1 text-xs font-semibold text-white"><Icon name="shield" className="h-3.5 w-3.5" />{l.tag}</span>}
              </div>
              <div className="flex flex-1 flex-col p-5">
                <div className="flex items-baseline gap-2">
                  <p className="font-display text-2xl text-brand">{l.price}</p>
                  <p className="text-xs text-ink-mute">{toBs(l.price)} (TC oficial)</p>
                </div>
                <h3 className="mt-1 font-semibold">{l.title}</h3>
                <p className="mt-1 flex items-center gap-1 text-sm text-ink-mute"><Icon name="pin" className="h-4 w-4" />{l.city}</p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {l.specs.map((s) => <li key={s} className="rounded-lg bg-sand px-2.5 py-1 text-xs text-ink-soft">{s}</li>)}
                  {l.extra && <li className="rounded-lg bg-clay-light px-2.5 py-1 text-xs text-clay">{l.extra}</li>}
                </ul>
                {l.verified && <p className="mt-4 flex items-start gap-1.5 text-xs text-brand"><Icon name="check" className="h-4 w-4 shrink-0" />{l.verified}</p>}
                <div className="mt-auto grid grid-cols-2 gap-2 pt-5">
                  <a href={waLink(`Hola, me interesa: ${l.title} (${l.price})`)} className="flex items-center justify-center gap-1.5 rounded-xl bg-[#25D366] py-2.5 text-sm font-semibold text-ink hover:brightness-95"><Icon name="chat" className="h-4 w-4" />{WHATSAPP ? "WhatsApp" : "Consultar"}</a>
                  <a href="#contacto" className="rounded-xl border border-ink/15 py-2.5 text-center text-sm font-semibold text-ink hover:bg-sand">{l.type === "Auto" ? "Agendar prueba" : "Agendar visita"}</a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
