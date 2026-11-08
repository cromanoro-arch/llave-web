import SearchTabs from "./SearchTabs";

const stats = [
  ["31%", "elige vivienda primero por ubicación"],
  ["3%", "impuesto municipal de transferencia"],
  ["5,5%", "tasa mínima del crédito de vivienda social"],
  ["20 días", "para tener el folio real a tu nombre"],
];

export default function Hero() {
  return (
    <section className="container-x">
      <div className="grid border-b-2 border-ink lg:grid-cols-[1.4fr_.6fr]">
        <div className="py-8 lg:border-r lg:border-ink lg:pr-8">
          <span className="kicker">Portada</span>
          <h1 className="h-cond mt-4 text-[64px] italic sm:text-[112px]">
            ¡Compra con <span className="inline-block bg-yel px-2 not-italic">papeles</span> en regla!
          </h1>
          <div className="tape mt-5">★ Cada aviso, verificado ★</div>
          <p className="mt-5 max-w-2xl text-xl italic leading-snug text-ink-soft sm:text-2xl">
            Cada aviso viene con su ficha técnica: precio en dólares y bolivianos, folio real o RUAT y la fecha en que lo revisamos.
          </p>
          <div className="mt-6"><SearchTabs /></div>
          <div className="mt-7 gap-7 text-[17px] leading-relaxed text-ink-soft sm:columns-2 [column-rule:1px_solid_#111]">
            <p className="text-justify first-letter:float-left first-letter:pr-2 first-letter:pt-1 first-letter:font-head first-letter:text-6xl first-letter:font-black first-letter:leading-[.8] first-letter:text-ink">
              Antes, los clasificados del domingo eran el lugar para encontrar casa o auto. Los traemos de vuelta, con lo que el
              periódico nunca pudo darte: documentos verificados, fotos reales y respuesta en minutos.
            </p>
            <p className="mt-4 text-justify sm:mt-0">
              Antes de pagar un anticipo, revisa el folio real en Derechos Reales y el certificado alodial del día. En autos, compara
              chasis y motor con el RUAT. Nosotros lo hacemos por ti y te lo mostramos en cada aviso.
            </p>
          </div>
        </div>
        <aside className="my-8 self-start bg-ink p-6 text-white lg:ml-8">
          <h2 className="font-head text-3xl font-black uppercase text-yel-tape">Datos del día</h2>
          <dl className="mt-2">
            {stats.map(([n, t]) => (
              <div key={n} className="flex items-baseline justify-between gap-4 border-b border-white/20 py-3">
                <dt className="whitespace-nowrap font-head text-5xl font-black">{n}</dt>
                <dd className="max-w-[150px] text-right font-mono text-[11px] uppercase text-white/70">{t}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-5 border border-white/30 p-3 font-mono text-xs leading-6">
            <b className="text-yel-tape">INDICADORES</b>
            <br />Gasolina ........ Bs 6,96/L
            <br />Diésel .......... Bs 9,80/L
            <br />Dólar oficial ... Bs 6,96
          </div>
        </aside>
      </div>
    </section>
  );
}
