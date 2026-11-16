"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { checks, type Kind } from "@/data/verificaciones";

/* ---------- Ficha con las consultas oficiales ---------- */

function CopyDato({ value }: { value: string }) {
  const [ok, setOk] = useState(false);
  if (!value) return null;
  return (
    <button
      type="button"
      onClick={async () => {
        try { await navigator.clipboard.writeText(value); setOk(true); setTimeout(() => setOk(false), 1800); } catch { /* sin portapapeles */ }
      }}
      className="border-2 border-ink bg-white px-3 py-2 font-mono text-[11px] font-semibold uppercase hover:bg-yel"
    >
      {ok ? "✓ Copiado" : "Copiar"}
    </button>
  );
}

export function CheckSheet({ kind, dato = "" }: { kind: Kind; dato?: string }) {
  return (
    <ol className="border-2 border-ink bg-paper-card">
      {checks[kind].map((c, i) => (
        <li key={c.title} className="grid gap-3 border-t-2 border-ink p-4 first:border-t-0 sm:grid-cols-[52px_1fr_auto] sm:items-start">
          <span className="font-head text-4xl font-black leading-none text-red">{String(i + 1).padStart(2, "0")}</span>
          <div>
            <p className="label-mono">{c.org} · {c.mode}</p>
            <h4 className="mt-1 font-head text-2xl font-black uppercase leading-none">{c.title}</h4>
            <p className="mt-1.5 text-[15px] leading-snug text-ink-soft">{c.shows}</p>
            <p className="mt-2 font-mono text-[11px] font-semibold uppercase">Qué dato poner:</p>
            <ul className="font-mono text-[12.5px]">
              {c.needs.map((n) => <li key={n} className="flex gap-2 py-0.5"><span className="text-red">■</span>{n}</li>)}
            </ul>
            {c.tip && <p className="mt-2 inline-block bg-yel-tape px-2 py-1 font-mono text-[11px]">☞ {c.tip}</p>}
          </div>
          {c.url ? (
            <a href={c.url} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center whitespace-nowrap bg-ink px-4 py-2.5 font-head text-base font-black uppercase text-yel hover:bg-red hover:text-white sm:self-center">
              {c.mode.startsWith("En oficina") ? "Ver requisitos ↗" : dato ? "Abrir y pegar ↗" : "Consultar ↗"}
            </a>
          ) : (
            <span className="stamp self-center justify-self-start text-sm">En persona</span>
          )}
        </li>
      ))}
    </ol>
  );
}

const Aviso = () => (
  <p className="mt-4 border-l-4 border-red pl-3 font-mono text-[11px] leading-5 text-ink-mute">
    Estos enlaces abren las páginas oficiales del Estado en otra pestaña. La consulta la haces tú allí, con su código de
    verificación: La Llave no guarda ni ve lo que consultas. Los datos oficiales mandan sobre lo que diga cualquier aviso.
  </p>
);

/* ---------- Ventana para cada aviso ---------- */

type Target = { title: string; kind: Kind; dato?: string; datoLabel?: string };
const Ctx = createContext<(t: Target) => void>(() => {});

export function VerifyProvider({ children }: { children: React.ReactNode }) {
  const [t, setT] = useState<Target | null>(null);

  useEffect(() => {
    if (!t) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setT(null);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [t]);

  return (
    <Ctx.Provider value={setT}>
      {children}
      {t && (
        <div className="fixed inset-0 z-[60] flex items-end justify-center bg-ink/60 sm:items-center sm:p-4" onClick={() => setT(null)}>
          <div role="dialog" aria-modal="true" aria-labelledby="verify-title" onClick={(e) => e.stopPropagation()}
            className="max-h-[92vh] w-full max-w-2xl overflow-y-auto border-[3px] border-ink bg-paper p-5 shadow-[8px_8px_0_#111] sm:p-7">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="kicker">Verificar en fuentes oficiales</p>
                <h2 id="verify-title" className="h-cond mt-3 text-4xl">Deudas, impuestos y papeles</h2>
                <p className="mt-1 font-serif text-lg italic">{t.title}</p>
              </div>
              <button onClick={() => setT(null)} aria-label="Cerrar" className="grid h-9 w-9 shrink-0 place-items-center border-2 border-ink bg-white font-mono hover:bg-yel">✕</button>
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-2 bg-ink px-4 py-3 text-white">
              <span className="font-mono text-[11px] uppercase text-yel-tape">{t.datoLabel || (t.kind === "Auto" ? "Placa" : "N.º de inmueble")}:</span>
              {t.dato ? (
                <><span className="font-head text-2xl font-black tracking-wide">{t.dato}</span><CopyDato value={t.dato} /></>
              ) : (
                <span className="font-mono text-[12px]">pídelo al vendedor con el botón Consultar del aviso; te lo damos sin costo.</span>
              )}
            </div>
            <div className="mt-4"><CheckSheet kind={t.kind} dato={t.dato} /></div>
            <Aviso />
          </div>
        </div>
      )}
    </Ctx.Provider>
  );
}

export function VerifyButton({ target, className, children }: { target: Target; className?: string; children: React.ReactNode }) {
  const show = useContext(Ctx);
  return <button type="button" onClick={() => show(target)} className={className}>{children}</button>;
}

/* ---------- Sección de la portada ---------- */

export default function Verificador() {
  const [kind, setKind] = useState<Kind>("Auto");
  const [dato, setDato] = useState("");
  const isAuto = kind === "Auto";
  const clean = isAuto ? dato.replace(/[\s-]/g, "").toUpperCase() : dato.trim();

  return (
    <section id="verificar" className="container-x py-14">
      <div className="flex flex-wrap items-end justify-between gap-3 rule-double pb-3">
        <h2 className="sec-tag">Verificar deudas e impuestos</h2>
        <p className="label-mono">Fuentes oficiales del Estado · gratis · sin registrarte</p>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[.8fr_1.6fr]">
        <aside className="self-start border-[3px] border-ink bg-paper-card p-5 lg:sticky lg:top-16">
          <span className="kicker">Paso 1</span>
          <h3 className="mt-3 font-head text-3xl font-black uppercase leading-none">¿Qué quieres revisar?</h3>
          <div className="mt-4 grid grid-cols-2 border-2 border-ink" role="tablist">
            {(["Auto", "Inmueble"] as Kind[]).map((k) => (
              <button key={k} role="tab" aria-selected={kind === k} onClick={() => { setKind(k); setDato(""); }}
                className={`py-2.5 font-head text-lg font-black uppercase ${kind === k ? "bg-red text-white" : "bg-white hover:bg-paper-dark"}`}>
                {k === "Auto" ? "Auto / moto" : "Casa / terreno"}
              </button>
            ))}
          </div>

          <span className="kicker mt-6">Paso 2</span>
          <label className="mt-3 block label-mono">
            {isAuto ? "Placa del vehículo" : "N.º de inmueble o código catastral"}
            <div className="mt-1 flex gap-2">
              <input value={dato} onChange={(e) => setDato(e.target.value)} placeholder={isAuto ? "1234ABC" : "Está en la boleta de impuestos"}
                className="field font-mono uppercase" autoCapitalize="characters" />
              <CopyDato value={clean} />
            </div>
          </label>
          <p className="mt-2 font-mono text-[11px] leading-5 text-ink-mute">
            {isAuto
              ? "Escríbela sin espacios ni guiones. La copias y la pegas en cada página oficial."
              : "Pídele al vendedor la última boleta de pago del impuesto: ahí está el número y el municipio."}
          </p>

          <span className="kicker mt-6">Paso 3</span>
          <p className="mt-3 text-[15px] leading-snug">Abre cada consulta, pega el dato y escribe el código de verificación que te muestra el sitio oficial.</p>
          <div className="tape mt-5">★ Si algo no cuadra, no pagues ★</div>
        </aside>

        <div>
          <CheckSheet kind={kind} dato={clean} />
          <Aviso />
        </div>
      </div>
    </section>
  );
}
