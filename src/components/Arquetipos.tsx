"use client";
import { ARQUETIPOS, type Arquetipo } from "@/data/arquetipos";
import { listings } from "@/data/listings";
import { buscar, VACIO } from "@/lib/filtros";
import { WHATSAPP, waLink } from "@/config";

// "No veo lo mío": abre WhatsApp, o lleva al formulario de contacto con el pedido ya escrito.
export function pedir(texto: string) {
  if (WHATSAPP) { window.open(waLink(texto), "_blank"); return; }
  const t = document.querySelector<HTMLTextAreaElement>("#contacto textarea[name=mensaje]");
  if (t) t.value = texto;
  document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth" });
  setTimeout(() => t?.focus({ preventScroll: true }), 600);
}

// Una de cada tres tarjetas va en negro y la del futbolista en amarillo, como portada de tabloide.
const estilo = (a: Arquetipo, i: number) =>
  a.id === "futbolista" ? "bg-yel-tape" : i % 3 === 2 ? "bg-ink text-white" : "bg-paper-card";

export default function Arquetipos() {
  return (
    <section id="para-ti" className="container-x py-12">
      <div className="flex flex-wrap items-end justify-between gap-3 rule-double pb-3">
        <div>
          <span className="kicker">Avisos con nombre y apellido</span>
          <h2 className="h-cond mt-3 text-5xl sm:text-7xl">¿Quién eres tú?</h2>
        </div>
        <p className="label-mono max-w-xs text-right">Elige tu caso y te mostramos solo lo que te sirve</p>
      </div>
      <div className="mt-8 grid border-l-2 border-t-2 border-ink sm:grid-cols-2 lg:grid-cols-4">
        {ARQUETIPOS.map((a, i) => {
          const n = listings.filter((l) => l.para.includes(a.id)).length;
          const negro = estilo(a, i).includes("bg-ink");
          return (
            <article key={a.id} className={`flex flex-col border-b-2 border-r-2 border-ink p-5 ${estilo(a, i)}`}>
              <p className={`font-mono text-[11px] font-semibold uppercase tracking-wider ${negro ? "text-yel" : "text-red"}`}>
                N° {String(i + 1).padStart(2, "0")} · {a.corto}
              </p>
              <h3 className="h-cond mt-3 text-[34px]">{a.pregunta}</h3>
              <p className={`mt-3 text-[15px] leading-snug ${negro ? "text-white/80" : "text-ink-soft"}`}>{a.promesa}</p>
              <div className="mt-auto pt-5">
                {n > 0 ? (
                  <button onClick={() => buscar({ ...VACIO, para: a.id })} className="btn-red w-full gap-2 text-base">
                    {a.cta} ({n})
                  </button>
                ) : (
                  <button onClick={() => pedir(a.pedido)} className="btn-red w-full text-base">Búscamelo</button>
                )}
                <button onClick={() => pedir(a.pedido)}
                  className={`mt-2 w-full font-mono text-[11px] uppercase underline underline-offset-2 ${negro ? "text-white/70 hover:text-white" : "text-ink-mute hover:text-ink"}`}>
                  ¿No ves lo tuyo? Te lo buscamos
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
