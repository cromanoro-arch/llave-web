import SearchTabs from "./SearchTabs";
import Icon from "./Icon";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full bg-brand/10 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -bottom-40 -left-32 h-[420px] w-[420px] rounded-full bg-clay/10 blur-3xl" />
      <div className="container-x relative grid gap-10 py-14 lg:grid-cols-[1.15fr_.85fr] lg:py-20">
        <div>
          <p className="eyebrow">Casas · Departamentos · Terrenos · Autos</p>
          <h1 className="mt-4 font-display text-4xl leading-[1.05] text-ink sm:text-6xl">
            Compra con la <span className="italic text-brand">llave</span> en la mano y las dudas resueltas.
          </h1>
          <p className="mt-5 max-w-xl text-lg text-ink-soft">
            Inmuebles y vehículos en La Paz, El Alto, Santa Cruz y Cochabamba, con la información que de verdad importa:
            precio claro, papeles verificados, trámites explicados paso a paso y crédito calculado.
          </p>
          <div className="mt-8"><SearchTabs /></div>
          <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink-soft">
            {["Folio real y RUAT revisados", "Trámites explicados en simple", "Respuesta en minutos"].map((t) => (
              <li key={t} className="flex items-center gap-2"><Icon name="check" className="h-4 w-4 text-brand" />{t}</li>
            ))}
          </ul>
        </div>
        <div className="relative hidden lg:block">
          <div className="absolute inset-0 rotate-3 rounded-[2rem] bg-brand" />
          <div className="relative flex h-full flex-col justify-between gap-6 rounded-[2rem] bg-white p-8 shadow-card">
            <div>
              <p className="text-sm text-ink-mute">Lo que más preguntan quienes compran vivienda</p>
              <p className="mt-2 font-display text-5xl text-ink">31%</p>
              <p className="text-ink-soft">elige primero por <b>ubicación</b>, antes que por precio (25%).</p>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-2xl bg-brand-light p-4"><p className="font-display text-2xl text-brand">3%</p><p className="text-ink-soft">impuesto municipal de transferencia</p></div>
              <div className="rounded-2xl bg-clay-light p-4"><p className="font-display text-2xl text-clay">5,5%</p><p className="text-ink-soft">tasa mínima del crédito de vivienda social</p></div>
              <div className="rounded-2xl bg-sand p-4"><p className="font-display text-2xl text-ink">~20 días</p><p className="text-ink-soft">para el folio real a tu nombre</p></div>
              <div className="rounded-2xl bg-sand p-4"><p className="font-display text-2xl text-ink">~5%</p><p className="text-ink-soft">del valor en gastos de compra</p></div>
            </div>
            <p className="text-xs text-ink-mute">Fuentes: InfoCasas 2025, DS 1842, guías de compra en Bolivia. Ver detalle abajo.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
