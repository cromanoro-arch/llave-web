"use client";
import { useState } from "react";
import { CIUDADES, ZONAS } from "@/data/zonas";
import { EXTRAS, VACIO, TC, usd, bs, type Filtros as F } from "@/lib/filtros";

const SECCIONES = [
  ["", "Todo"], ["Casa", "Casas"], ["Departamento", "Deptos"], ["Terreno", "Terrenos"], ["Oficina", "Oficinas"], ["Auto", "Autos"],
] as const;
const PRECIOS_INMUEBLE = [20000, 40000, 60000, 80000, 100000, 150000, 200000, 300000, 500000];
const PRECIOS_AUTO = [5000, 10000, 15000, 20000, 30000, 40000, 60000];
const MARCAS = ["Toyota", "Suzuki", "Nissan", "Hyundai", "Kia", "Renault", "Chevrolet", "Mitsubishi", "Volkswagen", "Ford", "Honda", "Mazda", "Chery", "JAC"];
const ANIOS = [2024, 2022, 2020, 2018, 2015, 2010];
const KMS = [20000, 50000, 80000, 120000, 200000];
const SUPERFICIES = [50, 80, 120, 200, 300, 500, 1000];

const celda = "flex min-w-0 flex-col border-b border-ink px-3 py-2";
const sel = "mt-0.5 w-full min-w-0 bg-transparent font-serif text-base font-semibold outline-none";

function Campo({ label, value, onChange, children }: { label: string; value: string | number; onChange: (v: string) => void; children: React.ReactNode }) {
  return (
    <label className={celda}>
      <span className="label-mono">{label}</span>
      <select value={value} onChange={(e) => onChange(e.target.value)} className={sel}>{children}</select>
    </label>
  );
}

export default function Filtros({ f, set, total, hay }: { f: F; set: (f: F) => void; total: number; hay: number }) {
  const [abierto, setAbierto] = useState(false);
  const up = (p: Partial<F>) => set({ ...f, ...p });
  const esAuto = f.tipo === "Auto";
  const esTerreno = f.tipo === "Terreno";
  const precio = (n: number) => (f.moneda === "Bs" ? bs(n) : usd(n));
  const precios = esAuto ? PRECIOS_AUTO : PRECIOS_INMUEBLE;
  const zonas = f.ciudad ? ZONAS[f.ciudad as keyof typeof ZONAS] ?? [] : [...(ZONAS["La Paz"] ?? []), ...(ZONAS["El Alto"] ?? [])];
  const toggle = (e: (typeof EXTRAS)[number]["id"]) => up({ con: f.con.includes(e) ? f.con.filter((x) => x !== e) : [...f.con, e] });

  // Cambiar de sección borra los filtros que no aplican (ej. dormitorios al pasar a Autos).
  const cambiarTipo = (tipo: string) =>
    set(tipo === "Auto"
      ? { ...VACIO, tipo, ciudad: f.ciudad, moneda: f.moneda, orden: f.orden }
      : { ...f, tipo, marca: "", anio: 0, km: 0, trans: "", comb: "", x4: false, ...(tipo === "Terreno" ? { dorm: 0, banos: 0 } : {}),
          ...(f.tipo === "Auto" ? { min: 0, max: 0 } : {}) });

  const activos: [string, Partial<F>][] = [
    ...(f.zona ? [[f.zona, { zona: "" }] as [string, Partial<F>]] : f.ciudad ? [[f.ciudad, { ciudad: "" }] as [string, Partial<F>]] : []),
    ...(f.min ? [[`desde ${precio(f.min)}`, { min: 0 }] as [string, Partial<F>]] : []),
    ...(f.max ? [[`hasta ${precio(f.max)}`, { max: 0 }] as [string, Partial<F>]] : []),
    ...(f.dorm ? [[`${f.dorm}+ dorm.`, { dorm: 0 }] as [string, Partial<F>]] : []),
    ...(f.banos ? [[`${f.banos}+ baños`, { banos: 0 }] as [string, Partial<F>]] : []),
    ...(f.m2 ? [[`${f.m2}+ m²`, { m2: 0 }] as [string, Partial<F>]] : []),
    ...f.con.map((c) => [EXTRAS.find((e) => e.id === c)!.label, { con: f.con.filter((x) => x !== c) }] as [string, Partial<F>]),
    ...(f.marca ? [[f.marca, { marca: "" }] as [string, Partial<F>]] : []),
    ...(f.anio ? [[`desde ${f.anio}`, { anio: 0 }] as [string, Partial<F>]] : []),
    ...(f.km ? [[`hasta ${f.km.toLocaleString("es-BO")} km`, { km: 0 }] as [string, Partial<F>]] : []),
    ...(f.trans ? [[f.trans, { trans: "" }] as [string, Partial<F>]] : []),
    ...(f.comb ? [[f.comb, { comb: "" }] as [string, Partial<F>]] : []),
    ...(f.x4 ? [["4x4", { x4: false }] as [string, Partial<F>]] : []),
  ];

  return (
    <div className="mt-6">
      {/* Secciones del periódico */}
      <div role="tablist" aria-label="Sección" className="flex overflow-x-auto">
        {SECCIONES.map(([id, label]) => (
          <button key={id} role="tab" aria-selected={f.tipo === id} onClick={() => cambiarTipo(id)}
            className={`-mb-[2px] shrink-0 border-2 border-b-0 px-3 py-1.5 font-head text-lg font-extrabold uppercase sm:px-4 ${f.tipo === id ? "border-ink bg-red text-white" : "border-transparent text-ink-mute hover:text-ink"}`}>
            {label}
          </button>
        ))}
      </div>

      <div className="border-2 border-ink bg-white">
        <div className="flex items-center justify-between gap-3 bg-ink px-3 py-1.5 text-yel">
          <span className="font-mono text-[11px] font-semibold uppercase tracking-wider">Buscador de clasificados</span>
          <span className="font-mono text-[11px] uppercase">{hay} de {total} avisos</span>
        </div>

        {/* Fila principal: dónde y cuánto */}
        <div className="grid grid-cols-2 sm:grid-cols-[1fr_1.4fr_1fr_1fr_auto] [&>*]:border-r [&>*]:border-ink">
          <Campo label="Ciudad" value={f.ciudad} onChange={(v) => up({ ciudad: v, zona: "" })}>
            <option value="">Todas</option>
            {CIUDADES.map((c) => <option key={c}>{c}</option>)}
          </Campo>
          {esAuto ? (
            <Campo label="Marca" value={f.marca} onChange={(v) => up({ marca: v })}>
              <option value="">Todas</option>
              {MARCAS.map((m) => <option key={m}>{m}</option>)}
            </Campo>
          ) : (
            <Campo label="Zona o barrio" value={f.zona} onChange={(v) => up({ zona: v })}>
              <option value="">Todas las zonas</option>
              {zonas.map((g) => (
                <optgroup key={g.grupo} label={f.ciudad || g.grupo === "El Alto" ? g.grupo : `La Paz · ${g.grupo}`}>
                  {g.zonas.map((z) => <option key={z}>{z}</option>)}
                </optgroup>
              ))}
            </Campo>
          )}
          <Campo label={`Precio desde (${f.moneda})`} value={f.min} onChange={(v) => up({ min: Number(v) })}>
            <option value={0}>Sin mínimo</option>
            {precios.map((p) => <option key={p} value={p}>{precio(p)}</option>)}
          </Campo>
          <Campo label={`Precio hasta (${f.moneda})`} value={f.max} onChange={(v) => up({ max: Number(v) })}>
            <option value={0}>Sin límite</option>
            {precios.map((p) => <option key={p} value={p}>{precio(p)}</option>)}
          </Campo>
          <div className={`${celda} col-span-2 sm:col-span-1`}>
            <span className="label-mono">Moneda</span>
            <div className="mt-1 flex border-2 border-ink font-mono text-xs font-semibold">
              {(["USD", "Bs"] as const).map((m) => (
                <button key={m} type="button" aria-pressed={f.moneda === m} onClick={() => up({ moneda: m })}
                  className={`flex-1 px-3 py-0.5 ${f.moneda === m ? "bg-ink text-yel" : "hover:bg-paper-dark"}`}>{m}</button>
              ))}
            </div>
          </div>
        </div>

        <button type="button" onClick={() => setAbierto(!abierto)} aria-expanded={abierto}
          className="flex w-full items-center justify-between border-b border-ink px-3 py-2 font-mono text-xs font-semibold uppercase sm:hidden">
          Más filtros {esAuto ? "(año, km, caja)" : "(dormitorios, garaje, terraza…)"}
          <span className="text-red">{abierto ? "▲" : "▼"}</span>
        </button>

        <div className={`${abierto ? "block" : "hidden"} sm:block`}>
          {esAuto ? (
            <div className="grid grid-cols-2 sm:grid-cols-[1fr_1fr_1fr_1fr_auto] [&>*]:border-r [&>*]:border-ink">
              <Campo label="Año desde" value={f.anio} onChange={(v) => up({ anio: Number(v) })}>
                <option value={0}>Cualquiera</option>
                {ANIOS.map((a) => <option key={a} value={a}>{a}</option>)}
              </Campo>
              <Campo label="Kilometraje hasta" value={f.km} onChange={(v) => up({ km: Number(v) })}>
                <option value={0}>Cualquiera</option>
                {KMS.map((k) => <option key={k} value={k}>{k.toLocaleString("es-BO")} km</option>)}
              </Campo>
              <Campo label="Caja" value={f.trans} onChange={(v) => up({ trans: v })}>
                <option value="">Cualquiera</option>
                <option>Automática</option>
                <option>Mecánica</option>
              </Campo>
              <Campo label="Combustible" value={f.comb} onChange={(v) => up({ comb: v })}>
                <option value="">Cualquiera</option>
                {["Gasolina", "Diésel", "GNV", "Híbrido", "Eléctrico"].map((c) => <option key={c}>{c}</option>)}
              </Campo>
              <label className="col-span-2 flex cursor-pointer items-center gap-2 border-b border-ink px-3 py-2 sm:col-span-1">
                <input type="checkbox" checked={f.x4} onChange={(e) => up({ x4: e.target.checked })} className="h-4 w-4 accent-red" />
                <span className="font-head text-lg font-extrabold uppercase">4x4</span>
              </label>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-3 [&>*]:border-r [&>*]:border-ink">
                {!esTerreno && (
                  <Campo label="Dormitorios" value={f.dorm} onChange={(v) => up({ dorm: Number(v) })}>
                    <option value={0}>Todos</option>
                    {[1, 2, 3, 4, 5].map((n) => <option key={n} value={n}>{n}+</option>)}
                  </Campo>
                )}
                {!esTerreno && (
                  <Campo label="Baños" value={f.banos} onChange={(v) => up({ banos: Number(v) })}>
                    <option value={0}>Todos</option>
                    {[1, 2, 3, 4].map((n) => <option key={n} value={n}>{n}+</option>)}
                  </Campo>
                )}
                <Campo label="Superficie" value={f.m2} onChange={(v) => up({ m2: Number(v) })}>
                  <option value={0}>Toda</option>
                  {SUPERFICIES.map((n) => <option key={n} value={n}>{n.toLocaleString("es-BO")} m²+</option>)}
                </Campo>
              </div>
              {!esTerreno && (
                <fieldset className="flex flex-wrap items-center gap-2 border-b border-ink px-3 py-2.5">
                  <legend className="sr-only">Que tenga</legend>
                  <span className="label-mono mr-1">Que tenga:</span>
                  {EXTRAS.map((e) => {
                    const on = f.con.includes(e.id);
                    return (
                      <button key={e.id} type="button" aria-pressed={on} onClick={() => toggle(e.id)}
                        className={`border-2 border-ink px-2 py-1 font-mono text-[11px] font-semibold uppercase ${on ? "bg-ink text-yel" : "bg-paper-card hover:bg-yel-tape"}`}>
                        {on ? "✓ " : "□ "}{e.label}
                      </button>
                    );
                  })}
                </fieldset>
              )}
            </>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 px-3 py-2">
          <label className="flex items-center gap-2">
            <span className="label-mono">Ordenar</span>
            <select value={f.orden} onChange={(e) => up({ orden: e.target.value as F["orden"] })} className="bg-transparent font-serif text-sm font-semibold outline-none">
              <option value="">Más recientes</option>
              <option value="barato">Menor precio</option>
              <option value="caro">Mayor precio</option>
            </select>
          </label>
          {activos.length > 0 && (
            <button type="button" onClick={() => set({ ...VACIO, tipo: f.tipo, moneda: f.moneda })}
              className="ml-auto font-mono text-[11px] font-semibold uppercase text-red underline underline-offset-2">
              Limpiar filtros
            </button>
          )}
        </div>
      </div>

      {activos.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2" aria-label="Filtros activos">
          {activos.map(([t, quitar]) => (
            <button key={t} type="button" onClick={() => up(quitar)} title="Quitar filtro"
              className="tape !rotate-0 px-2 py-0.5 text-sm hover:bg-yel">
              {t} ✕
            </button>
          ))}
        </div>
      )}
      {f.moneda === "Bs" && <p className="mt-2 font-mono text-[11px] text-ink-mute">Precios en Bs al tipo de cambio oficial ({TC.toString().replace(".", ",")}).</p>}
    </div>
  );
}
