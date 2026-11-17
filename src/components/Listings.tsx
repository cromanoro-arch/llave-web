import { listings as all } from "@/data/listings";
import Icon from "./Icon";
import { waLink, WHATSAPP } from "@/config";
import { VisitButton } from "./VisitModal";

const TC = 6.96;
// Muestra el precio en la otra moneda (Ley 453: USD y Bs).
const otherCurrency = (price: string) => {
  const n = Number(price.replace(/[^\d]/g, ""));
  if (!n) return "";
  const fmt = (x: number) => x.toLocaleString("es-BO", { maximumFractionDigits: 0 });
  return price.trim().startsWith("Bs") ? `≈ USD ${fmt(n / TC)}` : `Bs ${fmt(n * TC)}`;
};
// Los borradores solo se ven en las vistas previas de Vercel, no en el sitio publicado.
const listings = process.env.VERCEL_ENV === "production" ? all.filter((l) => !l.draft) : all;
const seccion: Record<string, string> = { Casa: "Casas", Departamento: "Deptos", Terreno: "Terrenos", Auto: "Autos" };

export default function Listings() {
  return (
    <section id="explorar" className="container-x py-12">
      <div className="flex flex-wrap items-end justify-between gap-3 rule-double pb-3">
        <h2 className="sec-tag">Clasificados</h2>
        <p className="label-mono">{listings.length} avisos · precio en USD y Bs · papeles revisados</p>
      </div>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {listings.map((l) => (
          <article key={l.id} className="relative flex flex-col border-2 border-ink bg-paper-card">
            <div className="halftone relative h-40 overflow-hidden border-b-2 border-ink">
              {l.images?.[0] && <img src={l.images[0]} alt={l.title} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />}
              <span className="absolute left-3 top-3 bg-ink px-2 py-1 font-mono text-[11px] font-semibold uppercase text-yel">
                {seccion[l.type]} · Aviso {String(l.id).padStart(4, "0")}
              </span>
              {!l.images?.length && <Icon name={l.icon} className="absolute inset-0 m-auto h-14 w-14 text-ink/50" />}
              {l.draft && <span className="absolute right-3 top-3 bg-red px-2 py-1 font-mono text-[11px] font-semibold uppercase text-white">Borrador · no publicado</span>}
              {l.photos > 0 && <span className="absolute bottom-3 left-3 bg-paper-card px-2 py-0.5 font-mono text-[11px]">{l.photos} fotos</span>}
            </div>
            {l.tag && <span className="stamp absolute right-3 top-[132px]">{l.tag}</span>}
            <div className="flex flex-1 flex-col p-5">
              <p className="font-head text-4xl font-black italic uppercase leading-none text-red">{l.price}</p>
              {otherCurrency(l.price) && <p className="mt-1 font-mono text-[11px] text-ink-mute">{otherCurrency(l.price)} · TC oficial</p>}
              <h3 className="mt-2 font-serif text-xl font-semibold leading-tight">{l.title}</h3>
              <p className="label-mono mt-1">{l.city}</p>
              <dl className="mt-3 font-mono text-[12.5px]">
                {l.specs.map((s) => (
                  <div key={s} className="flex gap-2 border-t border-ink py-1.5"><span className="text-red">■</span>{s}</div>
                ))}
                {l.extra && <div className="flex gap-2 border-t border-ink py-1.5"><span className="text-red">■</span>{l.extra}</div>}
              </dl>
              {l.images && l.images.length > 1 && (
                <div className="mt-3 flex gap-1.5">
                  {l.images.map((src, i) => (
                    <a key={src} href={src} target="_blank" rel="noopener" className="block h-12 flex-1 overflow-hidden border border-ink">
                      <img src={src} alt={`${l.title}, foto ${i + 1}`} loading="lazy" className="h-full w-full object-cover" />
                    </a>
                  ))}
                </div>
              )}
              {l.verified && <p className="mt-3 bg-ink px-3 py-2 font-mono text-[11px] font-semibold uppercase text-yel">✓ {l.verified}</p>}
              <div className="mt-auto pt-4"><div className="grid grid-cols-2 border-2 border-ink">
                <VisitButton title={`${l.title} · ${l.city}`} type={l.type} className="bg-red py-2.5 font-head text-base font-black uppercase text-white hover:bg-red-dark">
                  {l.type === "Auto" ? "Agendar prueba" : "Agendar visita"}
                </VisitButton>
                <a href={waLink(`Hola, me interesa: ${l.title} (${l.price})`)} className="py-2.5 text-center font-head text-base font-black uppercase hover:bg-paper-dark">
                  {WHATSAPP ? "WhatsApp" : "Consultar"}
                </a>
              </div></div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
