import Icon from "./Icon";

const checks = {
  Inmuebles: ["Folio real a nombre del vendedor", "Certificado alodial del día (sin hipotecas)", "Plano aprobado y catastro", "IPBI pagado de las últimas 5 gestiones", "Firma del cónyuge si es bien ganancial", "Visita al lote y charla con vecinos"],
  Autos: ["RUAT original a nombre del vendedor", "Chasis y motor iguales al RUAT", "Sin deudas, multas ni prenda bancaria", "Revisión de un mecánico de confianza", "Minuta y transferencia el mismo día", "Nunca pagues por un auto sin papeles (chuto)"],
};

export default function Verify() {
  return (
    <section className="py-20">
      <div className="container-x">
        <p className="eyebrow">Compra segura</p>
        <h2 className="h2 mt-3 max-w-2xl">El sello &quot;papeles en regla&quot; y lo que revisamos por ti</h2>
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {Object.entries(checks).map(([k, list]) => (
            <div key={k} className="rounded-3xl bg-white p-6 shadow-card">
              <div className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-light text-brand"><Icon name="shield" /></span><h3 className="font-display text-2xl">{k}</h3></div>
              <ul className="mt-5 space-y-3">
                {list.map((c) => <li key={c} className="flex gap-3 text-sm text-ink-soft"><Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-brand" />{c}</li>)}
              </ul>
            </div>
          ))}
          <div id="anticretico" className="rounded-3xl bg-clay-light p-6">
            <div className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-xl bg-clay text-white"><Icon name="doc" /></span><h3 className="font-display text-2xl">¿Y el anticrético?</h3></div>
            <p className="mt-5 text-sm leading-relaxed text-ink-soft">
              Entregas un monto y vives en el inmueble; al terminar, te devuelven el dinero. Es una opción muy boliviana, pero tiene reglas:
            </p>
            <ul className="mt-4 space-y-2 text-sm text-ink-soft">
              <li>• Plazo máximo de <b>5 años</b> (Código Civil, art. 1435).</li>
              <li>• Solo te protege frente a terceros si lo <b>inscribes en Derechos Reales</b>.</li>
              <li>• Revisa antes que el inmueble no tenga <b>hipotecas</b>.</li>
              <li>• Acuerda por escrito la moneda de devolución.</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
