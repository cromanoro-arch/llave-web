"use client";
import { listings } from "@/data/listings";
import Icon from "./Icon";
import { waLink, WHATSAPP } from "@/config";
import { VisitButton } from "./VisitModal";
import { arquetipo } from "@/data/arquetipos";
import { pedir } from "./Arquetipos";

import { useEffect, useState } from "react";
import Filtros from "./Filtros";
import { aplicar, escribir, leer, EVENTO, VACIO, TC, type Filtros as F } from "@/lib/filtros";

const toBs = (usd: string) => {
  const n = Number(usd.replace(/[^\d]/g, ""));
  if (!n) return "";
  return `Bs ${(n * TC).toLocaleString("es-BO", { maximumFractionDigits: 0 })}`;
};
const seccion: Record<string, string> = { Casa: "Casas", Departamento: "Deptos", Terreno: "Terrenos", Oficina: "Oficinas", Auto: "Autos" };
// Línea "✓ Con": lo que tiene el aviso y que todavía no dice su ficha (para no repetir "Garaje").
const conLabel = (l: (typeof listings)[number]) => {
  const ficha = l.specs.join(" ").toLowerCase();
  return [l.garaje ? `Garaje${l.garaje > 1 ? ` ${l.garaje} autos` : ""}` : "", l.terraza && "Terraza", l.jardin && "Jardín", l.amoblado && "Amoblado",
    l.churrasquera && "Churrasquera", l.ascensor && "Ascensor", l.mascotas && "Acepta mascotas"]
    .filter((x): x is string => !!x && !ficha.includes(x.split(" ")[0].toLowerCase()))
    .join(" · ");
};

export default function Listings() {
  const [f, setF] = useState<F>(VACIO);
  // Lee la búsqueda de la dirección (enlace compartido o buscador de la portada).
  useEffect(() => {
    const leerUrl = () => setF(leer(window.location.search));
    leerUrl();
    window.addEventListener(EVENTO, leerUrl);
    return () => window.removeEventListener(EVENTO, leerUrl);
  }, []);
  const cambiar = (n: F) => {
    setF(n);
    window.history.replaceState(null, "", `${window.location.pathname}${escribir(n)}${window.location.hash}`);
  };
  const shown = aplicar(listings, f);
  const yo = f.para ? arquetipo(f.para) : undefined;
  return (
    <section id="explorar" className="container-x py-12">
      <div className="flex flex-wrap items-end justify-between gap-3 rule-double pb-3">
        <h2 className="sec-tag">Clasificados</h2>
        <p className="label-mono">{listings.length} avisos · precio en USD y Bs · papeles revisados</p>
      </div>
      <Filtros f={f} set={cambiar} total={listings.length} hay={shown.length} />
      {yo && (
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-2 border-ink bg-yel-tape p-4">
          <div>
            <p className="font-mono text-[11px] font-semibold uppercase tracking-wider text-red">Elegidos para ti · {yo.corto}</p>
            <p className="h-cond mt-1 text-3xl">{yo.pregunta}</p>
          </div>
          <button onClick={() => pedir(yo.pedido)} className="btn-ink">¿No ves lo tuyo? Te lo buscamos</button>
        </div>
      )}
      {shown.length === 0 && (
        <div className="mt-8 border-2 border-dashed border-ink bg-paper-card p-8 text-center">
          <span className="stamp">Sin avisos</span>
          <p className="mt-4 font-head text-3xl font-black uppercase">Todavía no hay avisos con esa búsqueda</p>
          <p className="mx-auto mt-2 max-w-xl text-ink-soft">Cada semana sumamos avisos nuevos. Prueba quitando algún filtro, o déjanos tu pedido y te avisamos cuando llegue.</p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <button onClick={() => cambiar({ ...VACIO, moneda: f.moneda })} className="btn-ink px-5 py-3">Ver todos los avisos</button>
            <a href="#contacto" className="btn-red px-5">Avísame cuando llegue</a>
          </div>
        </div>
      )}
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((l) => (
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
              <p className="font-mono text-[11px] font-semibold uppercase tracking-wider text-red">
                Para: {arquetipo(f.para && l.para.includes(f.para as (typeof l.para)[number]) ? f.para : l.para[0])?.corto}
                {l.para.length > 1 && <span className="text-ink-mute"> · y {l.para.length - 1} perfil{l.para.length > 2 ? "es" : ""} más</span>}
              </p>
              <h3 className="h-cond mt-2 text-[30px]">{l.gancho}</h3>
              <p className="mt-3 font-serif text-lg font-semibold leading-tight">{l.title}</p>
              <p className="label-mono mt-1">{l.city}</p>
              <p className="mt-3 font-head text-4xl font-black italic uppercase leading-none text-red">{l.price}</p>
              {toBs(l.price) && <p className="mt-1 font-mono text-[11px] text-ink-mute">{toBs(l.price)} · TC oficial</p>}
              <dl className="mt-3 font-mono text-[12.5px]">
                {l.specs.map((s) => (
                  <div key={s} className="flex gap-2 border-t border-ink py-1.5"><span className="text-red">■</span>{s}</div>
                ))}
                {l.extra && <div className="flex gap-2 border-t border-ink py-1.5"><span className="text-red">■</span>{l.extra}</div>}
                {conLabel(l) && <div className="flex gap-2 border-t border-ink py-1.5"><span className="text-red">✓</span>{conLabel(l)}</div>}
              </dl>
              {l.verified && <p className="mt-3 bg-ink px-3 py-2 font-mono text-[11px] font-semibold uppercase text-yel">✓ {l.verified}</p>}
              <div className="mt-auto pt-4"><div className="grid grid-cols-2 border-2 border-ink">
                <VisitButton title={`${l.title} · ${l.city}`} type={l.type} className="bg-red py-2.5 font-head text-base font-black uppercase text-white hover:bg-red-dark">
                  {l.cta}
                </VisitButton>
                <a href={waLink(`Hola, vi el aviso ${String(l.id).padStart(4, "0")} en La Llave: ${l.title} (${l.price}). ${l.gancho} Sí, quiero saber más.`)} className="py-2.5 text-center font-head text-base font-black uppercase hover:bg-paper-dark">
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
