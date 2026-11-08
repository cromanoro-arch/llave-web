"use client";
import { useState } from "react";
import { submitForm } from "@/lib/submit";

const cls = "field placeholder:text-ink-mute";

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
    <form onSubmit={onSubmit} className="grid gap-3">
      <input name="empresa" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
      <input required name="nombre" placeholder="Tu nombre" className={cls} />
      <input required name="celular" type="tel" inputMode="tel" placeholder="Celular / WhatsApp" className={cls} />
      <select name="motivo" className={cls}>
        {["Quiero comprar", "Quiero vender", "Quiero publicar un auto", "Consulta sobre trámites"].map((o) => <option key={o}>{o}</option>)}
      </select>
      <textarea name="mensaje" rows={3} placeholder="Cuéntanos qué buscas" className={cls} />
      <button disabled={state === "sending"} className="btn-red py-3 text-2xl disabled:opacity-60">
        {state === "sending" ? "Enviando..." : "Enviar consulta"}
      </button>
      {state === "ok" && <p className="text-sm font-mono text-green-800">¡Gracias! Te escribimos muy pronto.</p>}
      {state === "off" && <p className="text-sm font-mono text-ink">El formulario se activa muy pronto. Inténtalo más tarde.</p>}
                {state === "error" && <p className="text-sm font-mono text-red">No se pudo enviar. Inténtalo de nuevo.</p>}
    </form>
  );
}
