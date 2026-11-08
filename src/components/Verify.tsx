const checks = {
  Inmuebles: ["Folio real a nombre del vendedor", "Certificado alodial del día (sin hipotecas)", "Plano aprobado y catastro", "IPBI pagado de las últimas 5 gestiones", "Firma del cónyuge si es bien ganancial", "Visita al lote y charla con vecinos"],
  Autos: ["RUAT original a nombre del vendedor", "Chasis y motor iguales al RUAT", "Sin deudas, multas ni prenda bancaria", "Revisión de un mecánico de confianza", "Minuta y transferencia el mismo día", "Nunca pagues por un auto sin papeles (chuto)"],
};

export default function Verify() {
  return (
    <section className="container-x py-14">
      <div className="rule-double pb-3">
        <span className="kicker">Compra segura</span>
        <h2 className="h-cond mt-3 text-5xl sm:text-7xl">Lo que revisamos antes de publicar</h2>
      </div>
      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        {Object.entries(checks).map(([k, list]) => (
          <div key={k} className="relative border-2 border-ink bg-paper-card p-6">
            <span className="stamp absolute -top-4 right-4">Verificado</span>
            <h3 className="font-head text-3xl font-black uppercase">{k}</h3>
            <ul className="mt-4 font-mono text-[13px]">
              {list.map((c) => <li key={c} className="flex gap-3 border-t border-ink py-2"><span className="font-semibold text-red">[✓]</span>{c}</li>)}
            </ul>
          </div>
        ))}
        <div id="anticretico" className="border-[3px] border-ink bg-yel-tape p-6">
          <span className="kicker">Recuadro</span>
          <h3 className="mt-3 font-head text-3xl font-black uppercase">¿Y el anticrético?</h3>
          <p className="mt-3 leading-relaxed">Entregas un monto y vives en el inmueble; al terminar, te devuelven el dinero. Es muy boliviano, pero tiene reglas:</p>
          <ul className="mt-3 font-mono text-[13px]">
            <li className="border-t border-ink py-2">■ Plazo máximo de 5 años (Código Civil, art. 1435).</li>
            <li className="border-t border-ink py-2">■ Solo te protege si lo inscribes en Derechos Reales.</li>
            <li className="border-t border-ink py-2">■ Revisa antes que no haya hipotecas.</li>
            <li className="border-t border-ink py-2">■ Acuerda por escrito la moneda de devolución.</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
