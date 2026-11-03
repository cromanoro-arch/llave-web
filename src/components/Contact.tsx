import Icon from "./Icon";
import { waLink, WHATSAPP } from "@/config";

export default function Contact() {
  return (
    <section id="contacto" className="py-20">
      <div className="container-x">
        <div className="grid gap-8 overflow-hidden rounded-[2rem] bg-ink p-8 text-white sm:p-12 lg:grid-cols-2">
          <div>
            <p className="eyebrow">Hablemos</p>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl">¿Quieres vender o tienes una duda puntual?</h2>
            <p className="mt-4 text-white/70">Déjanos tus datos y te respondemos en minutos, en horario de oficina. Publicar es simple: te pedimos los papeles, los verificamos y armamos tu aviso con fotos y precio claro.</p>
            {WHATSAPP && <a href={waLink()} className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 font-semibold text-ink hover:brightness-95"><Icon name="chat" />Escribir por WhatsApp</a>}
          </div>
          <form className="grid gap-3 rounded-3xl bg-white/5 p-6 ring-1 ring-white/10">
            <input placeholder="Tu nombre" className="rounded-xl bg-white/10 px-4 py-3 text-sm placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-clay" />
            <input placeholder="Celular / WhatsApp" className="rounded-xl bg-white/10 px-4 py-3 text-sm placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-clay" />
            <select className="rounded-xl bg-white/10 px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-clay">
              {["Quiero comprar", "Quiero vender", "Quiero publicar un auto", "Consulta sobre trámites"].map((o) => <option key={o} className="text-ink">{o}</option>)}
            </select>
            <textarea rows={3} placeholder="Cuéntanos qué buscas" className="rounded-xl bg-white/10 px-4 py-3 text-sm placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-clay" />
            <button type="button" className="rounded-xl bg-clay py-3 font-semibold hover:bg-clay/90">Enviar consulta</button>
          </form>
        </div>
      </div>
    </section>
  );
}
