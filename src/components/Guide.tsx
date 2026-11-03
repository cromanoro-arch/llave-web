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
    <section id="guia" className="bg-brand py-20 text-white">
      <div className="container-x">
        <p className="eyebrow !text-clay-light">Guía de compra</p>
        <h2 className="mt-3 max-w-2xl font-display text-3xl sm:text-4xl">Seis pasos para que sea tuyo de verdad</h2>
        <div className="mt-8 inline-flex rounded-full bg-white/10 p-1">
          {(Object.keys(flows) as (keyof typeof flows)[]).map((key) => (
            <button key={key} onClick={() => setK(key)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${k === key ? "bg-white text-brand" : "text-white/80 hover:text-white"}`}>
              {flows[key].label}
            </button>
          ))}
        </div>
        <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {f.steps.map((s, i) => (
            <li key={s.t} className="rounded-3xl bg-white/[.07] p-6 ring-1 ring-white/10">
              <div className="flex items-center gap-3">
                <span className="font-display text-4xl text-clay-light">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="text-lg font-semibold">{s.t}</h3>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-white/75">{s.d}</p>
            </li>
          ))}
        </ol>
        <p className="mt-8 flex items-start gap-2 text-sm text-white/70"><Icon name="alert" className="mt-0.5 h-4 w-4 shrink-0" />No entregues ningún anticipo antes de verificar los documentos. Los costos de cierre suman cerca del 5% del valor.</p>
      </div>
    </section>
  );
}
