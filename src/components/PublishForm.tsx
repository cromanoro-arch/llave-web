"use client";
import { useState } from "react";
import { submitForm } from "@/lib/submit";

const cls = "field mt-1 placeholder:text-ink-mute";
const TIPOS = ["Auto", "Camioneta / SUV", "Moto", "Casa", "Departamento", "Terreno", "Local / Oficina"];
const CIUDADES = ["Santa Cruz", "La Paz", "El Alto", "Cochabamba", "Sucre", "Tarija", "Oruro", "Potosí", "Trinidad", "Cobija", "Otra"];

// Formulario "Publica tu casa o auto": llega a la pestaña "CRM Avisos" de la hoja
// (con el Apps Script de docs/google-apps-script.gs). Con el script anterior llega a "Consultas".
export default function PublishForm() {
  const [state, setState] = useState<"idle" | "sending" | "ok" | "error" | "off">("idle");
  const [tipo, setTipo] = useState(TIPOS[0]);
  const isAuto = ["Auto", "Camioneta / SUV", "Moto"].includes(tipo);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const f = new FormData(form);
    if (f.get("empresa")) return;
    const v = (k: string) => String(f.get(k) || "").trim();
    setState("sending");
    const data = {
      kind: "publicar" as const,
      tipo: v("tipo"),
      ciudad: v("ciudad"),
      zona: v("zona"),
      resumen: v("resumen"),
      precio_usd: v("precio_usd"),
      precio_bs: v("precio_bs"),
      identificacion: v("identificacion"),
      nombre: v("nombre"),
      celular: v("celular"),
      dueno: v("dueno") ? "Sí, soy el dueño" : "",
      permiso: v("permiso") ? "Sí (formulario web)" : "",
    };
    const r = await submitForm({
      ...data,
      // Para el script anterior, que guarda todo lo que no es "visita" en la pestaña Consultas:
      motivo: `Publicar: ${data.tipo}`,
      mensaje: `${data.resumen} · ${data.ciudad} ${data.zona} · $us ${data.precio_usd} / Bs ${data.precio_bs} · ${data.identificacion} · ${data.dueno}`,
    });
    if (r === "ok") form.reset();
    setState(r === "ok" ? "ok" : r === "error" ? "error" : "off");
  }

  if (state === "ok")
    return (
      <div className="py-6 text-center">
        <span className="stamp text-2xl">Recibido</span>
        <p className="mt-5 font-head text-3xl font-black uppercase">¡Gracias! Ya tenemos tu aviso</p>
        <p className="mt-2 text-ink-soft">Te escribimos por WhatsApp para pedirte las fotos y armar la ficha. Publicar es gratis.</p>
        <button onClick={() => setState("idle")} className="btn-ink mt-6 px-6 py-3">Publicar otro</button>
      </div>
    );

  return (
    <form onSubmit={onSubmit} className="grid gap-3">
      <input name="empresa" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="label-mono">¿Qué vendes?
          <select name="tipo" value={tipo} onChange={(e) => setTipo(e.target.value)} className={cls}>
            {TIPOS.map((o) => <option key={o}>{o}</option>)}
          </select>
        </label>
        <label className="label-mono">Ciudad
          <select name="ciudad" className={cls}>{CIUDADES.map((o) => <option key={o}>{o}</option>)}</select>
        </label>
      </div>
      <label className="label-mono">{isAuto ? "Marca, modelo, año y km" : "Cómo es (m², dormitorios, baños)"}
        <input required name="resumen" maxLength={200} placeholder={isAuto ? "Toyota Corolla 2018, 80.000 km" : "Casa 250 m², 3 dormitorios, 2 baños"} className={cls} />
      </label>
      <div className="grid gap-3 sm:grid-cols-3">
        <label className="label-mono">Zona o barrio<input name="zona" maxLength={80} className={cls} /></label>
        <label className="label-mono">Precio $us<input name="precio_usd" inputMode="numeric" maxLength={12} className={cls} /></label>
        <label className="label-mono">Precio Bs<input name="precio_bs" inputMode="numeric" maxLength={12} className={cls} /></label>
      </div>
      <label className="label-mono">{isAuto ? "Placa (opcional)" : "N.º de inmueble o folio real (opcional)"}
        <input name="identificacion" maxLength={40} className={cls} />
      </label>
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="label-mono">Tu nombre<input required name="nombre" maxLength={80} className={cls} /></label>
        <label className="label-mono">Celular / WhatsApp<input required name="celular" type="tel" inputMode="tel" pattern="[0-9 +]{7,15}" placeholder="7xxxxxxx" className={cls} /></label>
      </div>
      <label className="flex items-start gap-2 text-sm">
        <input required type="checkbox" name="dueno" className="mt-1 accent-ink" />
        Soy el dueño (o familiar directo), no inmobiliaria ni revendedor.
      </label>
      <label className="flex items-start gap-2 text-sm">
        <input required type="checkbox" name="permiso" className="mt-1 accent-ink" />
        Acepto que La Llave me contacte por WhatsApp y guarde estos datos para preparar mi aviso. Lo publican solo cuando yo apruebe la ficha.
      </label>
      <button disabled={state === "sending"} className="btn-red mt-1 py-3 text-2xl disabled:opacity-60">
        {state === "sending" ? "Enviando..." : "Publicar gratis"}
      </button>
      {state === "off" && <p className="text-sm font-mono text-ink">El formulario se activa muy pronto. Inténtalo más tarde.</p>}
      {state === "error" && <p className="text-sm font-mono text-red">No se pudo enviar. Inténtalo de nuevo.</p>}
    </form>
  );
}
