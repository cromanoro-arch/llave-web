"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { submitForm } from "@/lib/submit";
import Icon from "./Icon";

type Target = { title: string; type: string } | null;
const Ctx = createContext<(t?: Target) => void>(() => {});
export const useVisit = () => useContext(Ctx);

const input = "w-full rounded-xl border border-ink/15 bg-white px-4 py-3 text-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20";

export function VisitProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [target, setTarget] = useState<Target>(null);
  const [state, setState] = useState<"idle" | "sending" | "ok" | "error" | "off">("idle");

  const show = (t: Target = null) => { setTarget(t); setState("idle"); setOpen(true); };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = open ? "hidden" : "";
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const today = new Date().toISOString().slice(0, 10);
  const isAuto = target?.type === "Auto";

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    if (f.get("empresa")) return; // anti-spam
    setState("sending");
    const r = await submitForm({
      kind: "visita",
      aviso: String(f.get("aviso") || ""),
      tipo: target?.type || "General",
      nombre: String(f.get("nombre")),
      celular: String(f.get("celular")),
      fecha: String(f.get("fecha")),
      horario: String(f.get("horario")),
      modalidad: String(f.get("modalidad")),
      comentario: String(f.get("comentario") || ""),
    });
    setState(r === "ok" ? "ok" : r === "error" ? "error" : "off");
  }

  return (
    <Ctx.Provider value={show}>
      {children}
      {open && (
        <div className="fixed inset-0 z-[60] flex items-end justify-center bg-ink/50 p-0 backdrop-blur-sm sm:items-center sm:p-4" onClick={() => setOpen(false)}>
          <div role="dialog" aria-modal="true" aria-labelledby="visit-title" onClick={(e) => e.stopPropagation()}
            className="max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-t-3xl bg-sand p-6 shadow-card sm:rounded-3xl sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="eyebrow">{isAuto ? "Prueba de manejo" : "Visita"}</p>
                <h2 id="visit-title" className="mt-1 font-display text-2xl">{isAuto ? "Agenda tu prueba de manejo" : "Agenda tu visita"}</h2>
              </div>
              <button onClick={() => setOpen(false)} aria-label="Cerrar" className="grid h-9 w-9 place-items-center rounded-full bg-white text-ink-soft hover:text-ink">✕</button>
            </div>

            {state === "ok" ? (
              <div className="mt-8 text-center">
                <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-brand text-white"><Icon name="check" className="h-7 w-7" /></span>
                <p className="mt-4 text-lg font-semibold">¡Solicitud recibida!</p>
                <p className="mt-2 text-sm text-ink-soft">Te confirmamos el día y la hora por llamada o mensaje al celular que dejaste.</p>
                <button onClick={() => setOpen(false)} className="mt-6 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white">Listo</button>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="mt-6 grid gap-3">
                <input name="empresa" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
                <label className="text-sm text-ink-soft">{isAuto ? "Vehículo" : "Propiedad"}
                  <input name="aviso" defaultValue={target?.title || ""} placeholder="¿Qué quieres ver?" className={`${input} mt-1`} />
                </label>
                <div className="grid gap-3 sm:grid-cols-2">
                  <label className="text-sm text-ink-soft">Nombre<input required name="nombre" className={`${input} mt-1`} /></label>
                  <label className="text-sm text-ink-soft">Celular<input required name="celular" type="tel" inputMode="tel" pattern="[0-9 +]{7,15}" placeholder="7xxxxxxx" className={`${input} mt-1`} /></label>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <label className="text-sm text-ink-soft">Fecha preferida<input required name="fecha" type="date" min={today} className={`${input} mt-1`} /></label>
                  <label className="text-sm text-ink-soft">Horario
                    <select name="horario" className={`${input} mt-1`}>
                      <option>Mañana (9:00 a 12:00)</option><option>Tarde (14:00 a 18:00)</option><option>Sábado por la mañana</option>
                    </select>
                  </label>
                </div>
                <fieldset className="text-sm text-ink-soft">
                  <legend>Modalidad</legend>
                  <div className="mt-1 grid grid-cols-2 gap-2">
                    {["Presencial", "Videollamada"].map((m, i) => (
                      <label key={m} className="flex cursor-pointer items-center gap-2 rounded-xl border border-ink/15 bg-white px-4 py-3 has-[:checked]:border-brand has-[:checked]:bg-brand-light">
                        <input type="radio" name="modalidad" value={m} defaultChecked={i === 0} className="accent-brand" />{m}
                      </label>
                    ))}
                  </div>
                </fieldset>
                <label className="text-sm text-ink-soft">Comentario (opcional)<textarea name="comentario" rows={2} className={`${input} mt-1`} /></label>
                {state === "off" && <p className="text-sm text-amber-700">Las reservas en línea se activan muy pronto. Por ahora, inténtalo más tarde.</p>}
                {state === "error" && <p className="text-sm text-red-600">No pudimos enviar tu solicitud. Revisa tu conexión e inténtalo de nuevo.</p>}
                <button disabled={state === "sending"} className="mt-2 rounded-xl bg-clay py-3 font-semibold text-white hover:bg-clay/90 disabled:opacity-60">
                  {state === "sending" ? "Enviando..." : "Solicitar visita"}
                </button>
                <p className="text-center text-xs text-ink-mute">Sin costo ni compromiso. Usamos tus datos solo para coordinar la visita.</p>
              </form>
            )}
          </div>
        </div>
      )}
    </Ctx.Provider>
  );
}

export function VisitButton({ title, type, className, children }: { title?: string; type?: string; className?: string; children: React.ReactNode }) {
  const show = useVisit();
  return <button type="button" onClick={() => show(title ? { title, type: type || "" } : null)} className={className}>{children}</button>;
}
