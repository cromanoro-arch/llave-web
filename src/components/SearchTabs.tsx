"use client";
import { useState } from "react";
import Icon, { IconName } from "./Icon";

const tabs: { id: string; label: string; icon: IconName; fields: { label: string; options: string[] }[] }[] = [
  { id: "casa", label: "Casas", icon: "house", fields: [
    { label: "Ciudad", options: ["La Paz", "El Alto", "Santa Cruz", "Cochabamba"] },
    { label: "Dormitorios", options: ["1+", "2+", "3+", "4+"] },
    { label: "Precio máx.", options: ["USD 80.000", "USD 120.000", "USD 200.000", "Sin límite"] } ] },
  { id: "depto", label: "Departamentos", icon: "building", fields: [
    { label: "Ciudad", options: ["La Paz", "El Alto", "Santa Cruz", "Cochabamba"] },
    { label: "Dormitorios", options: ["1+", "2+", "3+"] },
    { label: "Precio máx.", options: ["USD 60.000", "USD 100.000", "USD 150.000", "Sin límite"] } ] },
  { id: "terreno", label: "Terrenos", icon: "land", fields: [
    { label: "Ciudad", options: ["La Paz", "El Alto", "Santa Cruz", "Cochabamba"] },
    { label: "Superficie", options: ["200 m²+", "300 m²+", "500 m²+", "1.000 m²+"] },
    { label: "Documentos", options: ["Folio real", "Plano aprobado", "Ambos"] } ] },
  { id: "auto", label: "Autos", icon: "car", fields: [
    { label: "Tipo", options: ["Usado", "Nuevo (0 km)"] },
    { label: "Carrocería", options: ["SUV", "Sedán", "Camioneta", "Hatchback"] },
    { label: "Precio máx.", options: ["USD 10.000", "USD 20.000", "USD 35.000", "Sin límite"] } ] },
];

export default function SearchTabs() {
  const [active, setActive] = useState(tabs[0].id);
  const tab = tabs.find((t) => t.id === active)!;
  return (
    <div className="rounded-2xl bg-white p-3 shadow-card sm:p-4">
      <div role="tablist" className="flex gap-1 overflow-x-auto">
        {tabs.map((t) => (
          <button key={t.id} role="tab" aria-selected={t.id === active} onClick={() => setActive(t.id)}
            className={`flex shrink-0 items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium transition ${t.id === active ? "bg-brand text-white" : "text-ink-soft hover:bg-sand"}`}>
            <Icon name={t.icon} className="h-4 w-4" />{t.label}
          </button>
        ))}
      </div>
      <form className="mt-3 grid gap-2 sm:grid-cols-4" onSubmit={(e) => { e.preventDefault(); document.getElementById("explorar")?.scrollIntoView(); }}>
        {tab.fields.map((f) => (
          <label key={f.label} className="flex flex-col rounded-xl border border-ink/10 px-3 py-2 text-xs text-ink-mute">
            {f.label}
            <select className="mt-0.5 bg-transparent text-sm font-medium text-ink outline-none">
              {f.options.map((o) => <option key={o}>{o}</option>)}
            </select>
          </label>
        ))}
        <button className="rounded-xl bg-clay px-4 py-3 text-sm font-semibold text-white hover:bg-clay/90">Buscar</button>
      </form>
    </div>
  );
}
