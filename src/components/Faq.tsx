"use client";
import { useState } from "react";
import faq from "@/data/faq.json";

function Rich({ text }: { text: string }) {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\))/g);
  return (
    <>
      {parts.map((p, i) => {
        const m = p.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
        return m ? <a key={i} href={m[2]} target="_blank" rel="noopener noreferrer" className="text-brand underline decoration-brand/30 underline-offset-2 hover:decoration-brand">{m[1]}</a> : <span key={i}>{p}</span>;
      })}
    </>
  );
}

export default function Faq() {
  const [cat, setCat] = useState(faq[0].id);
  const current = faq.find((c) => c.id === cat)!;
  return (
    <section id="faq" className="bg-white py-20">
      <div className="container-x grid gap-10 lg:grid-cols-[.8fr_1.2fr]">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <p className="eyebrow">Preguntas frecuentes</p>
          <h2 className="h2 mt-3">Las 40 preguntas que más hacen los compradores</h2>
          <p className="mt-4 text-ink-soft">Ordenadas de la más a la menos consultada en cada categoría. Respuestas cortas, claras y con su fuente.</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {faq.map((c) => (
              <button key={c.id} onClick={() => setCat(c.id)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${cat === c.id ? "bg-ink text-white" : "bg-sand text-ink-soft hover:bg-sand-deep"}`}>
                {c.label}
              </button>
            ))}
          </div>
        </div>
        <div className="divide-y divide-ink/10 border-y border-ink/10">
          {current.items.map((it, i) => (
            <details key={cat + i} className="group py-5" open={i === 0}>
              <summary className="flex items-start gap-4">
                <span className="mt-0.5 w-6 shrink-0 font-display text-lg text-clay">{i + 1}</span>
                <span className="flex-1 text-base font-semibold text-ink sm:text-lg">{it.q}</span>
                <span className="chev mt-1 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-sand text-ink-soft transition">+</span>
              </summary>
              <p className="mt-3 pl-10 leading-relaxed text-ink-soft"><Rich text={it.a} /></p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
