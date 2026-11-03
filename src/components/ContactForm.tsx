"use client";
import { useState } from "react";
import { submitForm } from "@/lib/submit";

const cls = "rounded-xl bg-white/10 px-4 py-3 text-sm placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-clay";

export default function ContactForm() {
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
      motivo: String(f.get("motivo")),
      mensaje: String(f.get("mensaje") || ""),
    });
    if (r === "ok") form.reset();
    setState(r === "ok" ? "ok" : r === "error" ? "error" : "off");
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-3 rounded-3xl bg-white/5 p-6 ring-1 ring-white/10">
      <input name="empresa" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
      <input required name="nombre" placeholder="Tu nombre" className={cls} />
      <input required name="celular" type="tel" inputMode="tel" placeholder="Celular / WhatsApp" className={cls} />
      <select name="motivo" className={`${cls} text-white`}>
        {["Quiero comprar", "Quiero vender", "Quiero publicar un auto", "Consulta sobre trámites"].map((o) => <option key={o} className="text-ink">{o}</option>)}
      </select>
      <textarea name="mensaje" rows={3} placeholder="Cuéntanos qué buscas" className={cls} />
      <button disabled={state === "sending"} className="rounded-xl bg-clay py-3 font-semibold hover:bg-clay/90 disabled:opacity-60">
        {state === "sending" ? "Enviando..." : "Enviar consulta"}
      </button>
      {state === "ok" && <p className="text-sm text-emerald-300">¡Gracias! Te escribimos muy pronto.</p>}
      {state === "off" && <p className="text-sm text-amber-300">El formulario se activa muy pronto. Inténtalo más tarde.</p>}
                {state === "error" && <p className="text-sm text-red-300">No se pudo enviar. Inténtalo de nuevo.</p>}
    </form>
  );
}
