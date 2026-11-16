import { listings } from "@/data/listings";
import Icon from "./Icon";
import { waLink, WHATSAPP } from "@/config";
import { VisitButton } from "./VisitModal";
import { VerifyButton } from "./Verificador";

const TC = 6.96;
const toBs = (usd: string) => {
  const n = Number(usd.replace(/[^\d]/g, ""));
  if (!n) return "";
  return `Bs ${(n * TC).toLocaleString("es-BO", { maximumFractionDigits: 0 })}`;
};
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
            <div className="halftone relative h-40 border-b-2 border-ink">
              <span className="absolute left-3 top-3 bg-ink px-2 py-1 font-mono text-[11px] font-semibold uppercase text-yel">
                {seccion[l.type]} · Aviso {String(l.id).padStart(4, "0")}
              </span>
              <Icon name={l.icon} className="absolute inset-0 m-auto h-14 w-14 text-ink/50" />
              {l.photos > 0 && <span className="absolute bottom-3 left-3 bg-paper-card px-2 py-0.5 font-mono text-[11px]">{l.photos} fotos</span>}
            </div>
            {l.tag && <span className="stamp absolute right-3 top-[132px]">{l.tag}</span>}
            <div className="flex flex-1 flex-col p-5">
              <p className="font-head text-4xl font-black italic uppercase leading-none text-red">{l.price}</p>
              {toBs(l.price) && <p className="mt-1 font-mono text-[11px] text-ink-mute">{toBs(l.price)} · TC oficial</p>}
              <h3 className="mt-2 font-serif text-xl font-semibold leading-tight">{l.title}</h3>
              <p className="label-mono mt-1">{l.city}</p>
              <dl className="mt-3 font-mono text-[12.5px]">
                {l.specs.map((s) => (
                  <div key={s} className="flex gap-2 border-t border-ink py-1.5"><span className="text-red">■</span>{s}</div>
                ))}
                {l.extra && <div className="flex gap-2 border-t border-ink py-1.5"><span className="text-red">■</span>{l.extra}</div>}
              </dl>
              {l.verified && <p className="mt-3 bg-ink px-3 py-2 font-mono text-[11px] font-semibold uppercase text-yel">✓ {l.verified}</p>}
              <div className="mt-auto pt-4"><div className="grid grid-cols-2 border-2 border-ink">
                <VisitButton title={`${l.title} · ${l.city}`} type={l.type} className="bg-red py-2.5 font-head text-base font-black uppercase text-white hover:bg-red-dark">
                  {l.type === "Auto" ? "Agendar prueba" : "Agendar visita"}
                </VisitButton>
                <a href={waLink(`Hola, me interesa: ${l.title} (${l.price})`)} className="py-2.5 text-center font-head text-base font-black uppercase hover:bg-paper-dark">
                  {WHATSAPP ? "WhatsApp" : "Consultar"}
                </a>
                <VerifyButton
                  target={{ title: `${l.title} · ${l.city}`, kind: l.type === "Auto" ? "Auto" : "Inmueble", dato: l.type === "Auto" ? l.placa : l.inmueble }}
                  className="col-span-2 border-t-2 border-ink bg-yel py-2 font-head text-base font-black uppercase hover:bg-yel-tape">
                  ⚖ Verificar deudas e impuestos ↗
                </VerifyButton>
              </div></div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
