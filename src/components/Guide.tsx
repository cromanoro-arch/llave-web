"use client";
import { useState } from "react";
import Icon from "./Icon";

const flows = {
  inmueble: {
    label: "Casa, departamento o terreno",
    steps: [
      { t: "Verifica al dueño", d: "Pide el folio real en Derechos Reales. Si el vendedor no figura ahí, no es el dueño legal." },
      { t: "Revisa gravámenes", d: "Saca el certificado alodial (Bs 56 a 142) el mismo día de la firma: muestra hipotecas o embargos." },
      { t: "Confirma plano e impuestos", d: "Plano catastral aprobado por la alcaldía e IPBI pagado de las últimas 5 gestiones." },
      { t: "Firma la minuta", d: "Con tu propio abogado. Si el inmueble es ganancial, firma también el cónyuge del vendedor." },
      { t: "Paga el 3% de IMT", d: "Impuesto municipal a la transferencia, dentro de los 10 días hábiles siguientes a la minuta." },
      { t: "Notario y Derechos Reales", d: "Protocoliza ante notario e inscribe. En unos 20 días recibes el folio real a tu nombre." },
    ],
  },
  auto: {
    label: "Auto nuevo o usado",
    steps: [
      { t: "Compara RUAT con el auto", d: "El número de chasis y motor deben coincidir con el RUAT original. Evita cualquier chuto." },
      { t: "Consulta deudas y prendas", d: "Revisa en la alcaldía o el RUAT impuestos, multas y si hay prenda bancaria." },
      { t: "Revisión mecánica", d: "Llévalo a un mecánico de confianza antes de pagar, sobre todo si es anterior a 2011." },
      { t: "Firma la minuta", d: "Con datos completos de ambas partes y del vehículo." },
      { t: "Liquida y paga el impuesto", d: "El impuesto a la transferencia lo debe el vendedor; se paga en el banco." },
      { t: "Notaría y nuevo RUAT", d: "Protocoliza y recoge el RUAT a tu nombre el mismo día, para que no te sigan deudas ajenas." },
    ],
  },
};

export default function Guide() {
  const [k, setK] = useState<keyof typeof flows>("inmueble");
  const f = flows[k];
  return (
    <section id="guia" className="border-y-2 border-ink bg-ink py-14 text-white">
      <div className="container-x">
        <span className="inline-block bg-yel px-2 py-1 font-mono text-[11px] font-semibold uppercase tracking-wider text-ink">Guía de compra</span>
        <h2 className="h-cond mt-3 text-5xl italic sm:text-7xl">Seis pasos para que sea <span className="text-yel-tape">tuyo de verdad</span></h2>
        <div className="mt-6 flex flex-wrap">
          {(Object.keys(flows) as (keyof typeof flows)[]).map((key) => (
            <button key={key} onClick={() => setK(key)}
              className={`border-2 border-white px-4 py-2 font-head text-lg font-extrabold uppercase ${k === key ? "bg-white text-ink" : "text-white hover:bg-white/10"}`}>
              {flows[key].label}
            </button>
          ))}
        </div>
        <ol className="mt-8 grid border-t-2 border-white sm:grid-cols-2 lg:grid-cols-3">
          {f.steps.map((s, i) => (
            <li key={s.t} className="border-b border-white/30 py-5 sm:pr-6 lg:[&:not(:nth-child(3n))]:border-r lg:[&:not(:nth-child(3n))]:border-white/30 lg:px-6">
              <span className="font-mono text-xs uppercase text-yel-tape">Paso {String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-1 font-head text-3xl font-black uppercase leading-none">{s.t}</h3>
              <p className="mt-2 leading-relaxed text-white/80">{s.d}</p>
            </li>
          ))}
        </ol>
        <p className="mt-6 flex items-start gap-2 font-mono text-xs uppercase text-white/70"><Icon name="alert" className="h-4 w-4 shrink-0 text-red" />No entregues ningún anticipo antes de verificar los documentos. Los gastos de cierre suman cerca del 5% del valor.</p>
      </div>
    </section>
  );
}
