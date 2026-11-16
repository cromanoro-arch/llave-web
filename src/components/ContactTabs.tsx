"use client";
import { useEffect, useState } from "react";
import ContactForm from "./ContactForm";
import PublishForm from "./PublishForm";

const TABS = [
  ["publicar", "Publicar mi aviso"],
  ["consulta", "Hacer una consulta"],
] as const;

export default function ContactTabs() {
  const [tab, setTab] = useState<(typeof TABS)[number][0]>("publicar");
  // Los botones "Consultar" de los avisos llevan a #consulta; "Publica gratis" lleva a #contacto.
  useEffect(() => {
    const sync = () => {
      if (location.hash === "#consulta") setTab("consulta");
      else if (location.hash === "#contacto") setTab("publicar");
    };
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);
  return (
    <div id="consulta">
      <div role="tablist" className="mb-5 grid grid-cols-2 border-2 border-ink">
        {TABS.map(([k, l]) => (
          <button key={k} type="button" role="tab" aria-selected={tab === k} onClick={() => setTab(k)}
            className={`px-3 py-2.5 font-head text-lg font-extrabold uppercase ${tab === k ? "bg-ink text-yel" : "bg-white hover:bg-yel"}`}>
            {l}
          </button>
        ))}
      </div>
      {tab === "publicar" ? <PublishForm /> : <ContactForm />}
    </div>
  );
}
