import Icon from "./Icon";
import ContactTabs from "./ContactTabs";
import { waLink, WHATSAPP } from "@/config";

export default function Contact() {
  return (
    <section id="contacto" className="container-x py-14">
      <div className="grid border-[3px] border-ink bg-paper-card lg:grid-cols-2">
        <div className="border-b-[3px] border-ink p-8 lg:border-b-0 lg:border-r-[3px]">
          <h2 className="sec-tag">Publique su aviso</h2>
          <p className="h-cond mt-5 text-4xl sm:text-5xl">¿Vendes casa, terreno o auto?</p>
          <p className="mt-4 text-lg leading-relaxed text-ink-soft">
            Solo publicamos avisos de dueños directos. Déjanos los datos y te escribimos por WhatsApp: revisamos tus papeles, armamos la ficha con fotos y precio claro en $us y Bs, y lo difundimos en nuestras redes.
          </p>
          <p className="tape mt-6">Publicar es gratis</p>
          {WHATSAPP && <a href={waLink()} className="btn-ink mt-6 gap-2"><Icon name="chat" className="h-4 w-4" />Escribir por WhatsApp</a>}
        </div>
        <div className="p-8"><ContactTabs /></div>
      </div>
    </section>
  );
}
