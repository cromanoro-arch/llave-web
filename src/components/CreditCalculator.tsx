"use client";
import { useMemo, useState } from "react";

const fmt = (n: number) => n.toLocaleString("es-BO", { maximumFractionDigits: 0 });

type FP = { label: string; value: number; set: (v: number) => void; min: number; max: number; step: number; suffix: string };
function Field({ label, value, set, min, max, step, suffix }: FP) {
  return (
    <label className="block">
      <div className="flex justify-between font-mono text-xs uppercase"><span className="text-ink-mute">{label}</span><span className="font-semibold tabular-nums text-ink">{suffix === "USD" ? `USD ${fmt(value)}` : `${value}${suffix}`}</span></div>
      <input type="range" min={min} max={max} step={step} value={value} onChange={(e) => set(Number(e.target.value))} className="mt-2 w-full accent-red" />
    </label>
  );
}

export default function CreditCalculator() {
  const [price, setPrice] = useState(95000);
  const [down, setDown] = useState(20);
  const [years, setYears] = useState(20);
  const [rate, setRate] = useState(6);
  const [income, setIncome] = useState(1800);

  const r = useMemo(() => {
    const loan = price * (1 - down / 100);
    const i = rate / 100 / 12;
    const n = years * 12;
    const pay = i === 0 ? loan / n : (loan * i) / (1 - Math.pow(1 + i, -n));
    const cash = price * (down / 100) + price * 0.05;
    const ratio = income > 0 ? (pay / income) * 100 : 0;
    return { loan, pay, cash, ratio, total: pay * n };
  }, [price, down, years, rate, income]);

  const ratioTone = r.ratio <= 30 ? "bg-yel text-ink" : r.ratio <= 45 ? "bg-yel-tape text-ink" : "bg-red text-white";


  return (
    <section id="credito" className="container-x py-14">
      <div className="rule-double pb-3">
        <span className="kicker">Economía</span>
        <h2 className="h-cond mt-3 text-5xl sm:text-7xl">¿Cuánto pagarías al mes?</h2>
      </div>
      <div className="mt-8 grid gap-8 lg:grid-cols-[.85fr_1.15fr]">
        <div className="text-lg leading-relaxed text-ink-soft">
          <p className="first-letter:float-left first-letter:pr-2 first-letter:font-head first-letter:text-6xl first-letter:font-black first-letter:leading-[.8] first-letter:text-ink">
            El crédito de vivienda de interés social tiene tasas máximas de <b>5,5%, 6% o 6,5%</b> según el valor, para tu primera vivienda
            (hasta 460.000 UFV en casas y 400.000 UFV en departamentos). Mueve los valores y mira tu cuota.
          </p>
          <ul className="mt-5 border-t-2 border-ink font-mono text-sm">
            <li className="border-b border-ink py-2">■ Plazo legal de hasta 30 años; en la práctica, de 20 a 25.</li>
            <li className="border-b border-ink py-2">■ La cuota suele aceptarse hasta el 30% a 45% de tu ingreso.</li>
            <li className="border-b border-ink py-2">■ Reserva cerca de un 5% extra para impuestos y trámites.</li>
          </ul>
        </div>
        <div className="grid border-2 border-ink bg-paper-card sm:grid-cols-2">
          <div className="space-y-5 p-6">
            <Field label="Precio del inmueble" value={price} set={setPrice} min={20000} max={300000} step={1000} suffix="USD" />
            <Field label="Cuota inicial" value={down} set={setDown} min={0} max={60} step={5} suffix="%" />
            <Field label="Plazo" value={years} set={setYears} min={5} max={30} step={1} suffix=" años" />
            <div>
              <p className="font-mono text-xs uppercase text-ink-mute">Tasa anual</p>
              <div className="mt-2 grid grid-cols-4 border-2 border-ink">
                {[5.5, 6, 6.5, 9].map((v) => (
                  <button key={v} onClick={() => setRate(v)} className={`py-2 font-head text-lg font-black ${rate === v ? "bg-ink text-yel" : "bg-white hover:bg-paper"}`}>{v}%</button>
                ))}
              </div>
              <p className="mt-1 font-mono text-[10px] uppercase text-ink-mute">5,5–6,5%: vivienda social · 9%: referencia comercial</p>
            </div>
            <Field label="Tu ingreso mensual" value={income} set={setIncome} min={300} max={8000} step={50} suffix="USD" />
          </div>
          <div className="flex flex-col justify-between bg-ink p-6 text-white">
            <div>
              <p className="font-mono text-xs uppercase text-white/60">Cuota mensual estimada</p>
              <p className="mt-1 font-head text-6xl font-black italic text-yel-tape">USD {fmt(r.pay)}</p>
              <p className="font-mono text-xs text-white/60">≈ Bs {fmt(r.pay * 6.96)} al tipo oficial</p>
            </div>
            <dl className="mt-6 font-mono text-sm">
              <div className="flex justify-between border-t border-white/20 py-2"><dt className="text-white/60">Crédito</dt><dd>USD {fmt(r.loan)}</dd></div>
              <div className="flex justify-between border-t border-white/20 py-2"><dt className="text-white/60">Efectivo necesario</dt><dd>USD {fmt(r.cash)}</dd></div>
              <div className="flex justify-between border-t border-white/20 py-2"><dt className="text-white/60">Total al banco</dt><dd>USD {fmt(r.total)}</dd></div>
              <div className="flex justify-between border-t border-white/20 py-2"><dt className="text-white/60">Cuota / ingreso</dt><dd className={`px-2 font-semibold ${ratioTone}`}>{r.ratio.toFixed(0)}%</dd></div>
            </dl>
            <p className="mt-4 font-mono text-[10px] uppercase text-white/50">Cálculo referencial con cuota fija. La tasa final la define cada banco.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
