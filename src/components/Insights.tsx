import { insights, terrenoRanking } from "@/data/insights";

export default function Insights() {
  return (
    <section id="datos" className="bg-white py-20">
      <div className="container-x">
        <p className="eyebrow">Lo que más importa</p>
        <h2 className="h2 mt-3 max-w-2xl">Lo que la gente revisa primero, y cómo te lo mostramos</h2>
        <p className="mt-4 max-w-2xl text-ink-soft">
          Cada aviso responde primero lo que más pesa en la decisión: dónde está, cuánto cuesta y si los papeles están en regla.
          Así comparas rápido y sin sorpresas.
        </p>
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {insights.map((ins) => (
            <article key={ins.id} className="flex flex-col rounded-3xl border border-ink/10 p-6">
              <h3 className="font-display text-2xl">{ins.title}</h3>
              <p className="text-sm text-ink-mute">{ins.subtitle}</p>
              <ul className="mt-6 space-y-3">
                {ins.factors.map((f) => (
                  <li key={f.label}>
                    <div className="flex justify-between text-sm"><span>{f.label}</span><span className="font-semibold tabular-nums">{f.pct}%</span></div>
                    <div className="mt-1 h-2.5 rounded-full bg-sand-deep">
                      <div className="h-full rounded-full bg-brand" style={{ width: `${f.pct}%` }} />
                    </div>
                  </li>
                ))}
              </ul>
              {ins.note && <p className="mt-5 text-sm text-ink-soft">{ins.note}</p>}
              <p className="mt-auto pt-5 text-xs text-ink-mute">Fuente: {ins.source}</p>
            </article>
          ))}
          <article className="flex flex-col rounded-3xl bg-ink p-6 text-white">
            <h3 className="font-display text-2xl">Terrenos</h3>
            <p className="text-sm text-white/60">Las preocupaciones que más se repiten</p>
            <ol className="mt-6 space-y-4">
              {terrenoRanking.map((r, i) => (
                <li key={r.label} className="flex gap-3">
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-clay text-sm font-semibold">{i + 1}</span>
                  <div><p className="text-sm font-medium">{r.label}</p><p className="text-xs text-white/60">{r.detail}</p></div>
                </li>
              ))}
            </ol>
            <p className="mt-auto pt-5 text-xs text-white/50">Orden por frecuencia en prensa y guías bolivianas (sin encuesta con %).</p>
          </article>
        </div>
      </div>
    </section>
  );
}
