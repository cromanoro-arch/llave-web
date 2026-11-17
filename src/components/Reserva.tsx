"use client";
import { useState } from "react";
import { submitForm } from "@/lib/submit";

// "La Llave Reserva": búsqueda a pedido para compradores de alto presupuesto.
// Se cobra al comprador solo si encuentra y compra, y la tarifa se acuerda por escrito antes
// de empezar (ver plan/ideas-ventas-y-crecimiento.md). Nada de precios ocultos al vendedor.

const pasos = [
  ["Nos cuentas qué buscas", "Modelo, año, color, zona, metros, presupuesto. Lo que para ti no se negocia."],
  ["Buscamos y filtramos", "Revisamos dueños directos, grupos y contactos. Descartamos lo que no tiene papeles en regla."],
  ["Te mostramos 3 opciones", "Verificadas: folio o RUAT, deudas y, en autos, revisión en taller. Con fotos y video."],
  ["Visita privada y trámite", "A tu hora, sin curiosos. Te acompañamos en la negociación, la minuta y el traspaso."],
];

const cls = "w-full border-2 border-paper/40 bg-ink-soft px-3 py-2.5 font-serif text-base text-paper placeholder:text-paper/50 focus:outline-none focus:ring-2 focus:ring-yel";

export default function Reserva() {
  const [state, setState] = useState<"idle" | "sending" | "ok" | "error" | "off">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const f = new FormData(form);
    if (f.get("empresa")) return;
    setState("sending");
    const r = await submitForm({
      kind: "consulta",
      nombre: String(f.get("nombre")),
      celular: String(f.get("celular")),
      motivo: "La Llave Reserva",
      mensaje: [
        `Busca: ${f.get("tipo")}`,
        `Qué: ${f.get("que")}`,
        `Presupuesto: ${f.get("presupuesto")}`,
        `Para cuándo: ${f.get("cuando")}`,
      ].join("\n"),
    });
    if (r === "ok") form.reset();
    setState(r === "ok" ? "ok" : r === "error" ? "error" : "off");
  }

  return (
    <section id="reserva" className="mt-6 bg-ink py-16 text-paper">
      <div className="container-x">
        <div className="border-b-2 border-yel pb-3">
          <span className="inline-block bg-yel px-2 py-1 font-mono text-[11px] font-semibold uppercase tracking-wider text-ink">La Llave Reserva · Búsqueda a pedido</span>
          <h2 className="h-cond mt-3 text-5xl text-paper sm:text-7xl">No mires 200 avisos. Dinos qué quieres y te lo encontramos.</h2>
        </div>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1.1fr_.9fr]">
          <div>
            <p className="text-lg leading-relaxed text-paper/80">
              Para quien busca una camioneta, un auto o una casa de alto valor y no tiene tiempo para curiosos, precios falsos ni papeles dudosos.
              Un asesor de La Llave hace la búsqueda por ti y solo te muestra lo que vale la pena.
            </p>
            <ol className="mt-6">
              {pasos.map(([t, d], i) => (
                <li key={t} className="flex gap-4 border-t border-paper/30 py-4">
                  <span className="font-head text-4xl font-black leading-none text-yel">{i + 1}</span>
                  <div>
                    <p className="font-head text-2xl font-extrabold uppercase">{t}</p>
                    <p className="mt-1 text-paper/75">{d}</p>
                  </div>
                </li>
              ))}
            </ol>
            <div className="mt-4 border-2 border-yel p-4 font-mono text-[13px] leading-relaxed">
              <p className="font-semibold uppercase text-yel">¿Cuánto cuesta?</p>
              <p className="mt-1 text-paper/85">
                Contarnos qué buscas es gratis. Si decides que busquemos por ti, acordamos la tarifa por escrito antes de empezar,
                y solo la pagas si compras lo que te encontramos. El vendedor no paga nada y el precio que ves es el del dueño.
              </p>
            </div>
          </div>

          <form onSubmit={onSubmit} className="grid content-start gap-3 border-2 border-paper/40 p-6">
            <input name="empresa" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
            <p className="font-head text-3xl font-black uppercase">Cuéntanos qué buscas</p>
            <select name="tipo" className={cls} aria-label="Qué buscas">
              {["Camioneta o auto", "Casa", "Departamento", "Terreno", "Oficina o local"].map((o) => <option key={o}>{o}</option>)}
            </select>
            <textarea required name="que" rows={3} placeholder="Ej.: 4Runner 2020 o más nueva, blanca, menos de 60.000 km" className={cls} />
            <input required name="presupuesto" placeholder="Presupuesto (ej.: hasta USD 45.000)" className={cls} />
            <select name="cuando" className={cls} aria-label="Para cuándo">
              {["Lo antes posible", "Este mes", "En 1 a 3 meses", "Solo estoy viendo"].map((o) => <option key={o}>{o}</option>)}
            </select>
            <input required name="nombre" placeholder="Tu nombre" className={cls} />
            <input required name="celular" type="tel" inputMode="tel" placeholder="Celular / WhatsApp" className={cls} />
            <button disabled={state === "sending"} className="inline-flex items-center justify-center bg-yel px-4 py-3 font-head text-2xl font-black uppercase text-ink hover:bg-yel-tape disabled:opacity-60">
              {state === "sending" ? "Enviando..." : "Quiero que busquen por mí"}
            </button>
            <p className="font-mono text-[11px] text-paper/60">Te escribe un asesor por WhatsApp. Tus datos no se publican.</p>
            {state === "ok" && <p className="font-mono text-sm text-yel">¡Recibido! Te escribimos hoy mismo.</p>}
            {state === "off" && <p className="font-mono text-sm text-paper">El formulario se activa muy pronto. Inténtalo más tarde.</p>}
            {state === "error" && <p className="font-mono text-sm text-red">No se pudo enviar. Inténtalo de nuevo.</p>}
          </form>
        </div>
      </div>
    </section>
  );
}
