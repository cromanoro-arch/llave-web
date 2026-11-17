"use client";
import { useMemo, useState } from "react";
import { listings } from "@/data/listings";
import { submitForm } from "@/lib/submit";

// Comparador "VS": el comprador elige un auto de La Llave o pega el enlace de cualquier aviso
// (Marketplace, grupos, otra página) y llena los datos que ve. La tabla compara solo con
// esos datos: no inventamos consumos ni opiniones. El "informe VS" completo (repuestos,
// reventa, opiniones de dueños reales) lo arma el equipo y lo manda por WhatsApp.

const DOLAR = 6.96;
const ANIO = new Date().getFullYear();
const fmt = (n: number) => n.toLocaleString("es-BO", { maximumFractionDigits: 0 });

type Auto = {
  origen: string; // id del aviso de La Llave o "enlace"
  enlace: string;
  nombre: string;
  anio: string;
  km: string;
  precio: string;
  moneda: "USD" | "Bs";
  combustible: string;
  transmision: string;
  traccion: string;
  papeles: string;
};

const vacio: Auto = { origen: "enlace", enlace: "", nombre: "", anio: "", km: "", precio: "", moneda: "USD", combustible: "", transmision: "", traccion: "", papeles: "" };

const autos = listings.filter((l) => l.type === "Auto");

function desdeAviso(id: string): Auto {
  const l = autos.find((a) => String(a.id) === id);
  if (!l) return { ...vacio };
  return {
    origen: id,
    enlace: "",
    nombre: l.title,
    anio: l.anio ? String(l.anio) : "",
    km: l.km !== undefined ? String(l.km) : "",
    precio: l.precioUsd ? String(l.precioUsd) : "",
    moneda: "USD",
    combustible: l.combustible ?? "",
    transmision: l.transmision ?? "",
    traccion: l.traccion ?? "",
    papeles: l.verified ? `Sí: ${l.verified}` : "",
  };
}

function num(s: string) {
  const n = Number(String(s).replace(/[^\d]/g, ""));
  return Number.isFinite(n) && n > 0 ? n : undefined;
}

function calc(a: Auto) {
  const precio = num(a.precio);
  const usd = precio === undefined ? undefined : a.moneda === "USD" ? precio : precio / DOLAR;
  const anio = num(a.anio);
  const km = num(a.km);
  const edad = anio ? Math.max(ANIO - anio, 0) : undefined;
  const kmAnio = km !== undefined && edad !== undefined ? km / Math.max(edad, 1) : undefined;
  return { usd, edad, km, kmAnio };
}

const cls = "field py-2 text-sm placeholder:text-ink-mute";

function Lado({ letra, a, set }: { letra: "A" | "B"; a: Auto; set: (a: Auto) => void }) {
  const up = (k: keyof Auto) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => set({ ...a, [k]: e.target.value });
  return (
    <div className="border-2 border-ink bg-paper-card p-5">
      <div className="flex items-center gap-3">
        <span className={`grid h-10 w-10 place-items-center font-head text-3xl font-black ${letra === "A" ? "bg-red text-white" : "bg-ink text-yel"}`}>{letra}</span>
        <select value={a.origen} onChange={(e) => set(e.target.value === "enlace" ? { ...vacio } : desdeAviso(e.target.value))} className={cls} aria-label={`Auto ${letra}`}>
          <option value="enlace">Pegar el enlace de otro aviso</option>
          {autos.map((l) => <option key={l.id} value={l.id}>La Llave: {l.title}</option>)}
        </select>
      </div>
      <div className="mt-4 grid gap-2">
        {a.origen === "enlace" && (
          <input value={a.enlace} onChange={up("enlace")} type="url" placeholder="Enlace del aviso (Marketplace, grupo, otra página)" className={cls} />
        )}
        <input value={a.nombre} onChange={up("nombre")} placeholder="Marca y modelo (ej.: Toyota Hilux)" className={cls} />
        <div className="grid grid-cols-2 gap-2">
          <input value={a.anio} onChange={up("anio")} inputMode="numeric" placeholder="Año" className={cls} />
          <input value={a.km} onChange={up("km")} inputMode="numeric" placeholder="Kilómetros" className={cls} />
        </div>
        <div className="grid grid-cols-[1fr_auto] gap-2">
          <input value={a.precio} onChange={up("precio")} inputMode="numeric" placeholder="Precio" className={cls} />
          <select value={a.moneda} onChange={up("moneda")} className={cls} aria-label="Moneda">
            <option>USD</option>
            <option>Bs</option>
          </select>
        </div>
        <div className="grid grid-cols-3 gap-2">
          <select value={a.combustible} onChange={up("combustible")} className={cls} aria-label="Combustible">
            <option value="">Combustible</option>
            {["Gasolina", "Diésel", "GNV", "Híbrido", "Eléctrico"].map((o) => <option key={o}>{o}</option>)}
          </select>
          <select value={a.transmision} onChange={up("transmision")} className={cls} aria-label="Caja">
            <option value="">Caja</option>
            {["Automática", "Mecánica"].map((o) => <option key={o}>{o}</option>)}
          </select>
          <select value={a.traccion} onChange={up("traccion")} className={cls} aria-label="Tracción">
            <option value="">Tracción</option>
            {["4x2", "4x4"].map((o) => <option key={o}>{o}</option>)}
          </select>
        </div>
      </div>
    </div>
  );
}

type Fila = { label: string; a: string; b: string; gana?: "A" | "B"; nota?: string };

export default function Comparador() {
  const [A, setA] = useState<Auto>(() => ((autos.find((l) => l.precioUsd) ?? autos[0]) ? desdeAviso(String((autos.find((l) => l.precioUsd) ?? autos[0]).id)) : { ...vacio }));
  const [B, setB] = useState<Auto>({ ...vacio });
  const [state, setState] = useState<"idle" | "sending" | "ok" | "error" | "off">("idle");

  const filas = useMemo<Fila[]>(() => {
    const a = calc(A);
    const b = calc(B);
    const menor = (x?: number, y?: number): "A" | "B" | undefined => (x === undefined || y === undefined || x === y ? undefined : x < y ? "A" : "B");
    const precio = (c: ReturnType<typeof calc>) => (c.usd === undefined ? "—" : `USD ${fmt(c.usd)} · Bs ${fmt(c.usd * DOLAR)}`);
    const t = (s: string) => s || "—";
    const dif = a.usd !== undefined && b.usd !== undefined && a.usd !== b.usd ? `El ${a.usd < b.usd ? "A" : "B"} cuesta USD ${fmt(Math.abs(a.usd - b.usd))} menos.` : undefined;
    return [
      { label: "Precio", a: precio(a), b: precio(b), gana: menor(a.usd, b.usd), nota: dif },
      { label: "Año", a: t(A.anio), b: t(B.anio), gana: menor(a.edad, b.edad) },
      { label: "Kilómetros", a: a.km !== undefined ? fmt(a.km) : "—", b: b.km !== undefined ? fmt(b.km) : "—", gana: menor(a.km, b.km) },
      { label: "Km por año de uso", a: a.kmAnio !== undefined ? fmt(a.kmAnio) : "—", b: b.kmAnio !== undefined ? fmt(b.kmAnio) : "—", gana: menor(a.kmAnio, b.kmAnio), nota: "Lo normal en ciudad es de 10.000 a 15.000 km por año. Mucho menos puede ser un auto cuidado o un tablero alterado: pide revisarlo." },
      { label: "Combustible", a: t(A.combustible), b: t(B.combustible) },
      { label: "Caja", a: t(A.transmision), b: t(B.transmision) },
      { label: "Tracción", a: t(A.traccion), b: t(B.traccion) },
      { label: "Papeles verificados por La Llave", a: A.papeles || "No (aviso externo)", b: B.papeles || "No (aviso externo)" },
    ];
  }, [A, B]);

  async function pedirInforme(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const f = new FormData(form);
    if (f.get("empresa")) return;
    const linea = (x: Auto) => [x.nombre, x.anio, x.km && `${x.km} km`, x.precio && `${x.moneda} ${x.precio}`, x.enlace || (x.origen !== "enlace" ? `aviso La Llave #${x.origen}` : "")].filter(Boolean).join(" · ");
    setState("sending");
    const r = await submitForm({
      kind: "consulta",
      nombre: String(f.get("nombre")),
      celular: String(f.get("celular")),
      motivo: "Comparador VS",
      mensaje: `A: ${linea(A)}\nB: ${linea(B)}`,
    });
    if (r === "ok") form.reset();
    setState(r === "ok" ? "ok" : r === "error" ? "error" : "off");
  }

  return (
    <section id="comparar" className="container-x py-14">
      <div className="rule-double pb-3">
        <span className="kicker">Comparador</span>
        <h2 className="h-cond mt-3 text-5xl sm:text-7xl">¿Este o ese? Ponlos frente a frente</h2>
      </div>
      <p className="mt-5 max-w-3xl text-lg leading-relaxed text-ink-soft">
        Elige un auto de La Llave o pega el enlace de cualquier aviso que estés mirando, aunque sea de Marketplace. Llena lo que dice el aviso y te mostramos en qué gana cada uno.
      </p>

      <div className="relative mt-8 grid gap-6 lg:grid-cols-2">
        <Lado letra="A" a={A} set={setA} />
        <span className="absolute left-1/2 top-1/2 z-10 hidden -translate-x-1/2 -translate-y-1/2 -rotate-6 border-[3px] border-ink bg-yel px-3 py-1 font-head text-4xl font-black italic lg:block">VS</span>
        <Lado letra="B" a={B} set={setB} />
      </div>

      <div className="mt-8 overflow-x-auto border-2 border-ink bg-paper-card">
        <table className="w-full border-collapse font-mono text-[12px] sm:text-[13px]">
          <thead>
            <tr className="bg-ink text-left text-paper">
              <th className="px-2 py-2 sm:px-4 font-semibold uppercase">Dato</th>
              <th className="px-2 py-2 sm:px-4 font-semibold uppercase">A · {A.nombre || "—"}</th>
              <th className="px-2 py-2 sm:px-4 font-semibold uppercase">B · {B.nombre || "—"}</th>
            </tr>
          </thead>
          <tbody>
            {filas.map((r) => (
              <tr key={r.label} className="border-t border-ink align-top">
                <td className="px-2 py-2 sm:px-4 text-ink-mute">
                  {r.label}
                  {r.nota && <span className="mt-1 block text-[11px] leading-snug">{r.nota}</span>}
                </td>
                <td className={`px-2 py-2 sm:px-4 ${r.gana === "A" ? "bg-yel font-semibold" : ""}`}>{r.a}{r.gana === "A" && " ✓"}</td>
                <td className={`px-2 py-2 sm:px-4 ${r.gana === "B" ? "bg-yel font-semibold" : ""}`}>{r.b}{r.gana === "B" && " ✓"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-2 label-mono">Precios en Bs al dólar oficial de Bs 6,96. Comparamos solo los datos que pusiste; no inventamos nada.</p>

      <div className="mt-8 grid gap-6 border-[3px] border-ink bg-yel-tape p-6 lg:grid-cols-[1.1fr_.9fr]">
        <div>
          <span className="kicker">Informe VS completo · gratis</span>
          <h3 className="mt-3 font-head text-3xl font-black uppercase">¿Quieres saber más que lo que dice el aviso?</h3>
          <ul className="mt-3 font-mono text-[13px]">
            <li className="border-t border-ink py-2">■ Cuánto cuestan y dónde se consiguen los repuestos en La Paz.</li>
            <li className="border-t border-ink py-2">■ Cuánto pierde cada uno al revenderlo.</li>
            <li className="border-t border-ink py-2">■ Qué dicen dueños reales de cada modelo (con nombre, nada inventado).</li>
            <li className="border-t border-ink py-2">■ Si quieres, la revisión en taller del que te guste.</li>
          </ul>
        </div>
        <form onSubmit={pedirInforme} className="grid content-start gap-3">
          <input name="empresa" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
          <input required name="nombre" placeholder="Tu nombre" className="field placeholder:text-ink-mute" />
          <input required name="celular" type="tel" inputMode="tel" placeholder="Celular / WhatsApp" className="field placeholder:text-ink-mute" />
          <button disabled={state === "sending"} className="btn-red py-3 text-2xl disabled:opacity-60">
            {state === "sending" ? "Enviando..." : "Quiero el informe VS"}
          </button>
          {state === "ok" && <p className="font-mono text-sm text-green-800">¡Listo! Te mandamos el informe por WhatsApp.</p>}
          {state === "off" && <p className="font-mono text-sm text-ink">El formulario se activa muy pronto. Inténtalo más tarde.</p>}
          {state === "error" && <p className="font-mono text-sm text-red">No se pudo enviar. Inténtalo de nuevo.</p>}
        </form>
      </div>
    </section>
  );
}
