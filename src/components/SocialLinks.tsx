import { socialLinks } from "@/config";

export default function SocialLinks({ className = "" }: { className?: string }) {
  const links = socialLinks();
  if (!links.length) return null;
  return (
    <div className={className}>
      <span className="label-mono">Pregúntanos directo por mensaje</span>
      <ul className="mt-2 flex flex-wrap gap-2">
        {links.map(([red, user, href]) => (
          <li key={red}>
            <a href={href} target="_blank" rel="noopener noreferrer" className="inline-flex items-baseline gap-2 border-2 border-ink bg-paper-card px-3 py-1.5 hover:bg-yel">
              <span className="font-head text-lg font-black uppercase leading-none">{red}</span>
              <span className="font-mono text-xs">@{user}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
