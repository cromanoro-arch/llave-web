import { ventajasAutos, ventajasTodos } from "@/data/ventajas";
import Icon from "./Icon";
import { VisitButton } from "./VisitModal";

export default function Ventajas() {
  return (
    <section id="ventajas" className="container-x py-14">
      <div className="flex flex-wrap items-end justify-between gap-3 rule-double pb-3">
        <h2 className="sec-tag">Ventajas de comprar con La Llave</h2>
        <p className="label-mono">Lo que no te da un aviso cualquiera</p>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        <div className="relative border-[3px] border-ink bg-paper-card">
          <div className="flex items-center justify-between gap-3 bg-red px-5 py-3 text-white">
            <h3 className="font-head text-3xl font-black uppercase italic leading-none">Si compras un auto</h3>
            <Icon name="car" className="h-9 w-9 shrink-0" />
          </div>
          <span className="stamp absolute -top-4 right-16 hidden bg-yel sm:inline-block">Exclusivo</span>
          <ul>
            {ventajasAutos.map((v, i) => (
              <li key={v.titulo} className="grid gap-2 border-t-2 border-ink p-5 first:border-t-0 sm:grid-cols-[64px_1fr]">
                <span className="font-head text-5xl font-black leading-none text-red">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <h4 className="font-head text-2xl font-black uppercase leading-none">{v.titulo}</h4>
                    {v.para && <span className="bg-ink px-2 py-0.5 font-mono text-[10px] font-semibold uppercase text-yel">{v.para}</span>}
                  </div>
                  <p className="mt-1.5 text-[16px] leading-snug text-ink-soft">{v.texto}</p>
                  {v.detalle && <p className="mt-1 font-mono text-[11px] uppercase text-ink-mute">■ {v.detalle}</p>}
                </div>
              </li>
            ))}
          </ul>
          <div className="border-t-2 border-ink p-4">
            <VisitButton type="Auto" title="Quiero los beneficios para mi auto" className="btn-red w-full py-3 text-xl">Agendar y pedir beneficios →</VisitButton>
          </div>
        </div>

        <aside className="self-start border-[3px] border-ink bg-yel-tape p-5">
          <span className="kicker">Para todos</span>
          <h3 className="mt-3 font-head text-3xl font-black uppercase leading-none">Casas, terrenos y autos</h3>
          <ul className="mt-4">
            {ventajasTodos.map((v) => (
              <li key={v.titulo} className="border-t-2 border-ink py-3">
                <p className="flex gap-2 font-head text-xl font-black uppercase leading-tight"><span className="text-red">✓</span>{v.titulo}</p>
                <p className="mt-0.5 text-[15px] leading-snug">{v.texto}</p>
              </li>
            ))}
          </ul>
          <p className="mt-3 font-mono text-[10px] uppercase leading-4 text-ink-soft">Beneficios sujetos a disponibilidad. Te contamos las condiciones vigentes al agendar.</p>
        </aside>
      </div>
    </section>
  );
}
