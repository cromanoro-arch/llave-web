import Icon from "./Icon";
import { waLink } from "@/config";

export default function WhatsAppFab() {
  return (
    <a href={waLink()} aria-label="Hacer una consulta"
      className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full bg-brand px-4 py-3 font-semibold text-white shadow-card ring-4 ring-white/70 hover:brightness-95">
      <Icon name="chat" />
      <span className="hidden sm:inline">¿Dudas? Escríbenos</span>
    </a>
  );
}
