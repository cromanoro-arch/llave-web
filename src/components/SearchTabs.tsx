"use client";
import { useState } from "react";
import { CIUDADES, ZONAS } from "@/data/zonas";
import { buscar, VACIO, usd, type Filtros } from "@/lib/filtros";

// Buscador rápido de la portada: al tocar "Buscar" aplica los filtros en la lista de avisos.
type Campo = { key: string; label: string; options: [string, string][] };

// Zona: primero "Toda La Paz", luego sus barrios (agrupados por ciudad).
const lugar: Campo = { key: "lugar", label: "Zona", options: [["", "Todas las zonas"]] };
const ZonaOpciones = () => (
  <>
    <option value="">Todas las zonas</option>
    {CIUDADES.map((c) => (
      <optgroup key={c} label={c}>
        <option value={`${c}|`}>Toda {c}</option>
        {(ZONAS[c] ?? []).flatMap((g) => g.zonas).map((z) => <option key={z} value={`${c}|${z}`}>{z}</option>)}
      </optgroup>
    ))}
  </>
);
const hasta = (lista: number[]): Campo => ({ key: "max", label: "Hasta", options: [["0", "Sin límite"], ...lista.map((n) => [String(n), usd(n)] as [string, string])] });
const dorm: Campo = { key: "dorm", label: "Dormitorios", options: [["0", "Todos"], ["1", "1+"], ["2", "2+"], ["3", "3+"], ["4", "4+"]] };

const tabs: { id: string; tipo: string; label: string; fields: Campo[] }[] = [
  { id: "casa", tipo: "Casa", label: "Casas", fields: [lugar, dorm, hasta([80000, 120000, 200000, 300000])] },
  { id: "depto", tipo: "Departamento", label: "Deptos", fields: [lugar, dorm, hasta([60000, 100000, 150000, 250000])] },
  { id: "terreno", tipo: "Terreno", label: "Terrenos", fields: [lugar,
    { key: "m2", label: "Superficie", options: [["0", "Toda"], ["200", "200 m²+"], ["300", "300 m²+"], ["500", "500 m²+"], ["1000", "1.000 m²+"]] },
    hasta([30000, 60000, 100000, 200000])] },
  { id: "auto", tipo: "Auto", label: "Autos", fields: [
    { key: "marca", label: "Marca", options: [["", "Todas"], ...["Toyota", "Suzuki", "Nissan", "Hyundai", "Kia", "Renault", "Chevrolet", "Mitsubishi", "Volkswagen"].map((m) => [m, m] as [string, string])] },
    { key: "trans", label: "Caja", options: [["", "Cualquiera"], ["Automática", "Automática"], ["Mecánica", "Mecánica"]] },
    hasta([10000, 20000, 35000, 50000])] },
];

export default function SearchTabs() {
  const [active, setActive] = useState(tabs[0].id);
  const tab = tabs.find((t) => t.id === active)!;
  return (
    <div>
      <div role="tablist" className="flex">
        {tabs.map((t) => (
          <button key={t.id} role="tab" aria-selected={t.id === active} onClick={() => setActive(t.id)}
            className={`-mb-[2px] border-2 border-b-0 px-3 py-1.5 font-head text-lg font-extrabold uppercase sm:px-4 ${t.id === active ? "border-ink bg-white" : "border-transparent text-ink-mute hover:text-ink"}`}>
            {t.label}
          </button>
        ))}
      </div>
      <form key={tab.id} className="grid border-2 border-ink bg-white sm:grid-cols-[1fr_1fr_1fr_140px]"
        onSubmit={(e) => {
          e.preventDefault();
          const d = new FormData(e.currentTarget);
          const v = (k: string) => String(d.get(k) ?? "");
          const [ciudad = "", zona = ""] = v("lugar").split("|");
          const f: Filtros = { ...VACIO, tipo: tab.tipo, ciudad, zona, max: Number(v("max")) || 0, dorm: Number(v("dorm")) || 0,
            m2: Number(v("m2")) || 0, marca: v("marca"), trans: v("trans") };
          buscar(f);
        }}>
        {tab.fields.map((f) => (
          <label key={f.key} className="flex flex-col border-b border-ink px-3 py-2 sm:border-b-0 sm:border-r">
            <span className="label-mono">{f.label}</span>
            <select name={f.key} className="mt-0.5 bg-transparent font-serif text-base font-semibold outline-none">
              {f.key === "lugar" ? <ZonaOpciones /> : f.options.map(([value, label]) => <option key={value} value={value}>{label}</option>)}
            </select>
          </label>
        ))}
        <button className="btn-red py-3 text-2xl">Buscar</button>
      </form>
    </div>
  );
}
