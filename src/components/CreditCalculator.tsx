"use client";
import { useMemo, useState } from "react";

const fmt = (n: number) => n.toLocaleString("es-BO", { maximumFractionDigits: 0 });

type FP = { label: string; value: number; set: (v: number) => void; min: number; max: number; step: number; suffix: string };
function Field({ label, value, set, min, max, step, suffix }: FP) {
  return (
    <label className="block">
      <div className="flex justify-between text-sm"><span className="text-ink-soft">{label}</span><span className="font-semibold tabular-nums">{suffix === "USD" ? `USD ${fmt(value)}` : `${value}${suffix}`}</span></div>
      <input type="range" min={min} max={max} step={step} value={value} onChange={(e) => set(Number(e.target.value))} className="mt-2 w-full accent-brand" />
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

  const ratioTone = r.ratio <= 30 ? "text-brand" : r.ratio <= 45 ? "text-amber-600" : "text-red-600";


  return (
    <section id="credito" className="py-20">
      <div className="container-x grid gap-10 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
        <div>
          <p className="eyebrow">Calculadora de crédito</p>
          <h2 className="h2 mt-3">¿Cuánto pagarías al mes?</h2>
          <p className="mt-4 text-ink-soft">
            El crédito de vivienda de interés social tiene tasas máximas de <b>5,5%, 6% o 6,5%</b> según el valor, para tu primera vivienda
            (hasta 460.000 UFV en casas y 400.000 UFV en departamentos). Mueve los valores y mira tu cuota.
          </p>
          <ul className="mt-6 space-y-2 text-sm text-ink-soft">
            <li>• Plazo legal de hasta 30 años; en la práctica, de 20 a 25.</li>
            <li>• Los bancos suelen aceptar una cuota de hasta el 30% a 45% de tu ingreso.</li>
            <li>• Reserva cerca de un 5% extra para impuestos y trámites.</li>
          </ul>
        </div>
        <div className="grid gap-6 rounded-3xl bg-white p-6 shadow-card sm:grid-cols-2 sm:p-8">
          <div className="space-y-5">
            <Field label="Precio del inmueble" value={price} set={setPrice} min={20000} max={300000} step={1000} suffix="USD" />
            <Field label="Cuota inicial" value={down} set={setDown} min={0} max={60} step={5} suffix="%" />
            <Field label="Plazo" value={years} set={setYears} min={5} max={30} step={1} suffix=" años" />
            <div>
              <p className="text-sm text-ink-soft">Tasa anual</p>
              <div className="mt-2 grid grid-cols-4 gap-1">
                {[5.5, 6, 6.5, 9].map((v) => (
                  <button key={v} onClick={() => setRate(v)} className={`rounded-lg py-2 text-sm font-medium ${rate === v ? "bg-brand text-white" : "bg-sand text-ink-soft"}`}>{v}%</button>
                ))}
              </div>
              <p className="mt-1 text-xs text-ink-mute">5,5–6,5%: vivienda social. 9%: referencia comercial, consulta tu banco.</p>
            </div>
            <Field label="Tu ingreso mensual" value={income} set={setIncome} min={300} max={8000} step={50} suffix="USD" />
          </div>
          <div className="flex flex-col justify-between rounded-2xl bg-ink p-6 text-white">
            <div>
              <p className="text-sm text-white/60">Cuota mensual estimada</p>
              <p className="mt-1 font-display text-5xl">USD {fmt(r.pay)}</p>
              <p className="mt-1 text-sm text-white/60">≈ Bs {fmt(r.pay * 6.96)} al tipo oficial</p>
            </div>
            <dl className="mt-6 space-y-3 text-sm">
              <div className="flex justify-between"><dt className="text-white/60">Monto del crédito</dt><dd>USD {fmt(r.loan)}</dd></div>
              <div className="flex justify-between"><dt className="text-white/60">Efectivo que necesitas</dt><dd>USD {fmt(r.cash)}</dd></div>
              <div className="flex justify-between"><dt className="text-white/60">Total pagado al banco</dt><dd>USD {fmt(r.total)}</dd></div>
              <div className="flex justify-between border-t border-white/10 pt-3"><dt className="text-white/60">Cuota / ingreso</dt><dd className={`rounded bg-white px-2 font-semibold ${ratioTone}`}>{r.ratio.toFixed(0)}%</dd></div>
            </dl>
            <p className="mt-6 text-xs text-white/50">Cálculo referencial con cuota fija. La aprobación y la tasa final las define cada banco.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
