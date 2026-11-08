import Icon from "./Icon";
import { waLink } from "@/config";

export default function WhatsAppFab() {
  return (
    <a href={waLink()} aria-label="Hacer una consulta"
      className="fixed bottom-5 right-5 z-50 flex items-center gap-2 border-2 border-ink bg-yel px-4 py-3 font-head text-lg font-black uppercase text-ink shadow-[4px_4px_0_#111] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[3px_3px_0_#111]">
      <Icon name="chat" />
      <span className="hidden sm:inline">¿Dudas? Escríbenos</span>
    </a>
  );
}
