type Name = "house" | "building" | "land" | "car" | "key" | "shield" | "doc" | "calc" | "check" | "chat" | "pin" | "alert";

const paths: Record<Name, React.ReactNode> = {
  house: <path d="M3 11.5 12 4l9 7.5M5 10v10h14V10M10 20v-6h4v6" />,
  building: <path d="M5 21V4h10v17M15 9h4v12M8 8h2M8 12h2M8 16h2M3 21h18" />,
  land: <path d="M3 18 9 8l4 6 3-4 5 8H3ZM16 6a2 2 0 1 0 0-.01" />,
  car: <path d="M4 16v-4l2-5h12l2 5v4M4 16h16M4 16v2h3v-2M17 16v2h3v-2M7.5 13h.01M16.5 13h.01" />,
  key: <path d="M14 10a4 4 0 1 0-3.9 3.1L4 19v2h3v-2h2v-2h2l2.1-2.1A4 4 0 0 0 14 10Zm1-1h.01" />,
  shield: <path d="M12 3 4 6v6c0 4.5 3.4 8 8 9 4.6-1 8-4.5 8-9V6l-8-3Zm-3 9 2 2 4-4" />,
  doc: <path d="M7 3h7l4 4v14H7V3Zm7 0v4h4M10 12h5M10 16h5" />,
  calc: <path d="M6 3h12v18H6V3Zm3 4h6M9 11h.01M12 11h.01M15 11h.01M9 14h.01M12 14h.01M15 14h.01M9 17h.01M12 17h.01M15 17h.01" />,
  check: <path d="m5 12 4 4 10-10" />,
  chat: <path d="M4 5h16v11H9l-5 4V5Z" />,
  pin: <path d="M12 21s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12Zm0-9a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />,
  alert: <path d="M12 4 2 20h20L12 4Zm0 6v4m0 3h.01" />,
};

export default function Icon({ name, className = "h-5 w-5" }: { name: Name; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      {paths[name]}
    </svg>
  );
}
export type { Name as IconName };
