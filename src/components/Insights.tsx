import { insights, terrenoRanking } from "@/data/insights";

export default function Insights() {
  return (
    <section id="datos" className="container-x py-12">
      <div className="rule-double pb-3">
        <span className="kicker">Informe especial</span>
        <h2 className="h-cond mt-3 text-5xl sm:text-7xl">Lo que más importa al comprar</h2>
      </div>
      <p className="mt-4 max-w-3xl text-lg italic text-ink-soft">
        Cada aviso responde primero lo que más pesa en la decisión: dónde está, cuánto cuesta y si los papeles están en regla.
      </p>
      <div className="mt-8 grid border-2 border-ink bg-paper-card lg:grid-cols-3">
        {insights.map((ins) => (
          <article key={ins.id} className="flex flex-col border-b-2 border-ink p-6 lg:border-b-0 lg:border-r-2">
            <h3 className="font-head text-3xl font-black uppercase">{ins.title}</h3>
            <p className="label-mono">{ins.subtitle}</p>
            <ul className="mt-5 space-y-3">
              {ins.factors.map((f) => (
                <li key={f.label}>
                  <div className="flex justify-between font-mono text-xs uppercase"><span>{f.label}</span><b>{f.pct}%</b></div>
                  <div className="mt-1 h-3 border border-ink bg-white">
                    <div className="h-full bg-ink" style={{ width: `${f.pct}%` }} />
                  </div>
                </li>
              ))}
            </ul>
            {ins.note && <p className="mt-4 text-sm italic text-ink-soft">{ins.note}</p>}
            <p className="mt-auto pt-4 font-mono text-[10px] uppercase text-ink-mute">Fuente: {ins.source}</p>
          </article>
        ))}
        <article className="flex flex-col p-6">
          <h3 className="font-head text-3xl font-black uppercase">Terrenos</h3>
          <p className="label-mono">Las dudas que más se repiten</p>
          <ol className="mt-5 space-y-3">
            {terrenoRanking.map((r, i) => (
              <li key={r.label} className="flex gap-3 border-t border-ink pt-2">
                <span className="font-head text-3xl font-black leading-none text-red">{i + 1}</span>
                <div><p className="font-semibold leading-tight">{r.label}</p><p className="text-sm italic text-ink-mute">{r.detail}</p></div>
              </li>
            ))}
          </ol>
        </article>
      </div>
    </section>
  );
}
