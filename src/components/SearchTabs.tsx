"use client";
import { useState } from "react";

const tabs: { id: string; label: string; fields: { label: string; options: string[] }[] }[] = [
  { id: "casa", label: "Casas", fields: [
    { label: "Ciudad", options: ["La Paz", "El Alto", "Santa Cruz", "Cochabamba"] },
    { label: "Dormitorios", options: ["1+", "2+", "3+", "4+"] },
    { label: "Hasta", options: ["USD 80.000", "USD 120.000", "USD 200.000", "Sin límite"] } ] },
  { id: "depto", label: "Deptos", fields: [
    { label: "Ciudad", options: ["La Paz", "El Alto", "Santa Cruz", "Cochabamba"] },
    { label: "Dormitorios", options: ["1+", "2+", "3+"] },
    { label: "Hasta", options: ["USD 60.000", "USD 100.000", "USD 150.000", "Sin límite"] } ] },
  { id: "terreno", label: "Terrenos", fields: [
    { label: "Ciudad", options: ["La Paz", "El Alto", "Santa Cruz", "Cochabamba"] },
    { label: "Superficie", options: ["200 m²+", "300 m²+", "500 m²+", "1.000 m²+"] },
    { label: "Papeles", options: ["Folio real", "Plano aprobado", "Ambos"] } ] },
  { id: "auto", label: "Autos", fields: [
    { label: "Tipo", options: ["Usado", "Nuevo (0 km)"] },
    { label: "Carrocería", options: ["SUV", "Sedán", "Camioneta", "Hatchback"] },
    { label: "Hasta", options: ["USD 10.000", "USD 20.000", "USD 35.000", "Sin límite"] } ] },
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
      <form className="grid border-2 border-ink bg-white sm:grid-cols-[1fr_1fr_1fr_140px]"
        onSubmit={(e) => { e.preventDefault(); document.getElementById("explorar")?.scrollIntoView(); }}>
        {tab.fields.map((f) => (
          <label key={f.label} className="flex flex-col border-b border-ink px-3 py-2 sm:border-b-0 sm:border-r">
            <span className="label-mono">{f.label}</span>
            <select className="mt-0.5 bg-transparent font-serif text-base font-semibold outline-none">
              {f.options.map((o) => <option key={o}>{o}</option>)}
            </select>
          </label>
        ))}
        <button className="btn-red py-3 text-2xl">Buscar</button>
      </form>
    </div>
  );
}
