"use client";
import { useState } from "react";
import faq from "@/data/faq.json";

function Rich({ text }: { text: string }) {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\))/g);
  return (
    <>
      {parts.map((p, i) => {
        const m = p.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
        return m ? <a key={i} href={m[2]} target="_blank" rel="noopener noreferrer" className="font-mono text-[12px] text-red underline underline-offset-2">{m[1]}</a> : <span key={i}>{p}</span>;
      })}
    </>
  );
}

export default function Faq() {
  const [cat, setCat] = useState(faq[0].id);
  const current = faq.find((c) => c.id === cat)!;
  return (
    <section id="faq" className="container-x py-14">
      <div className="rule-double pb-3">
        <span className="kicker">Consultorio del lector</span>
        <h2 className="h-cond mt-3 text-5xl sm:text-7xl">Las 40 preguntas que más hacen</h2>
      </div>
      <div className="mt-6 flex flex-wrap">
        {faq.map((c) => (
          <button key={c.id} onClick={() => setCat(c.id)}
            className={`-ml-[2px] border-2 border-ink px-4 py-2 font-head text-lg font-extrabold uppercase first:ml-0 ${cat === c.id ? "bg-ink text-yel" : "bg-paper-card hover:bg-white"}`}>
            {c.label}
          </button>
        ))}
      </div>
      <div className="mt-6 gap-8 md:columns-2 [column-rule:1px_solid_#111]">
        {current.items.map((it, i) => (
          <details key={cat + i} className="mb-2 break-inside-avoid border-t-2 border-ink py-3" open={i < 2}>
            <summary className="flex items-start gap-3">
              <span className="font-head text-3xl font-black leading-none text-red">{i + 1}</span>
              <span className="flex-1 font-head text-xl font-extrabold uppercase leading-tight">{it.q}</span>
              <span className="chev mt-0.5 font-mono text-lg transition">+</span>
            </summary>
            <p className="mt-2 pl-9 leading-relaxed text-ink-soft"><Rich text={it.a} /></p>
          </details>
        ))}
      </div>
    </section>
  );
}
