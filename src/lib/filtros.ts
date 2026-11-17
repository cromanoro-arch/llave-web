import type { Listing } from "@/data/listings";

// Filtros del buscador. Se guardan en la dirección de la página (?tipo=Casa&zona=Sopocachi...)
// para que una búsqueda se pueda compartir por WhatsApp tal cual.
export const TC = 6.96;

export type Extra = "garaje" | "terraza" | "jardin" | "amoblado" | "churrasquera" | "ascensor" | "mascotas";
export const EXTRAS: { id: Extra; label: string }[] = [
  { id: "garaje", label: "Garaje" },
  { id: "terraza", label: "Terraza" },
  { id: "jardin", label: "Jardín" },
  { id: "amoblado", label: "Amoblado" },
  { id: "churrasquera", label: "Churrasquera" },
  { id: "ascensor", label: "Ascensor" },
  { id: "mascotas", label: "Acepta mascotas" },
];

export type Filtros = {
  tipo: string; // "" = todo · "Casa" · "Departamento" · "Terreno" · "Oficina" · "Auto"
  ciudad: string;
  zona: string;
  moneda: "USD" | "Bs";
  min: number; // precio, siempre guardado en USD
  max: number;
  dorm: number;
  banos: number;
  m2: number; // superficie mínima (construida o de terreno)
  con: Extra[];
  marca: string;
  anio: number; // año desde
  km: number; // km hasta
  trans: string;
  comb: string;
  x4: boolean;
  orden: "" | "barato" | "caro";
};

export const VACIO: Filtros = {
  tipo: "", ciudad: "", zona: "", moneda: "USD", min: 0, max: 0, dorm: 0, banos: 0, m2: 0, con: [],
  marca: "", anio: 0, km: 0, trans: "", comb: "", x4: false, orden: "",
};

const num = (v: string | null) => (v && Number(v) > 0 ? Number(v) : 0);

export function leer(q: string): Filtros {
  const p = new URLSearchParams(q);
  const extras = EXTRAS.map((e) => e.id);
  return {
    tipo: p.get("tipo") ?? "",
    ciudad: p.get("ciudad") ?? "",
    zona: p.get("zona") ?? "",
    moneda: p.get("moneda") === "Bs" ? "Bs" : "USD",
    min: num(p.get("min")),
    max: num(p.get("max")),
    dorm: num(p.get("dorm")),
    banos: num(p.get("banos")),
    m2: num(p.get("m2")),
    con: (p.get("con") ?? "").split(",").filter((x): x is Extra => extras.includes(x as Extra)),
    marca: p.get("marca") ?? "",
    anio: num(p.get("anio")),
    km: num(p.get("km")),
    trans: p.get("trans") ?? "",
    comb: p.get("comb") ?? "",
    x4: p.get("x4") === "1",
    orden: p.get("orden") === "barato" || p.get("orden") === "caro" ? (p.get("orden") as "barato" | "caro") : "",
  };
}

export function escribir(f: Filtros): string {
  const p = new URLSearchParams();
  (Object.keys(VACIO) as (keyof Filtros)[]).forEach((k) => {
    const v = f[k];
    if (k === "moneda") { if (v === "Bs") p.set(k, "Bs"); return; }
    if (Array.isArray(v)) { if (v.length) p.set(k, v.join(",")); return; }
    if (v === true) p.set(k, "1");
    else if (v) p.set(k, String(v));
  });
  const s = p.toString();
  return s ? `?${s}` : "";
}

// Avisa a la lista de avisos que cambió la búsqueda (lo usa el buscador de la portada).
export const EVENTO = "llave:buscar";
export function buscar(f: Filtros) {
  window.history.replaceState(null, "", `${window.location.pathname}${escribir(f)}#explorar`);
  window.dispatchEvent(new Event(EVENTO));
  document.getElementById("explorar")?.scrollIntoView({ behavior: "smooth" });
}

export function cumple(l: Listing, f: Filtros): boolean {
  if (f.tipo && l.type !== f.tipo) return false;
  if (f.ciudad && l.ciudad !== f.ciudad) return false;
  if (f.zona && l.zona !== f.zona) return false;
  if ((f.min || f.max) && !l.precioUsd) return false;
  if (f.min && (l.precioUsd ?? 0) < f.min) return false;
  if (f.max && (l.precioUsd ?? 0) > f.max) return false;
  // Dormitorios, baños, m² y extras solo los tienen los inmuebles: si se piden, los autos quedan fuera.
  if (f.dorm && (l.dormitorios ?? 0) < f.dorm) return false;
  if (f.banos && (l.banos ?? 0) < f.banos) return false;
  if (f.m2 && Math.max(l.m2 ?? 0, l.terrenoM2 ?? 0) < f.m2) return false;
  for (const e of f.con) if (e === "garaje" ? !l.garaje : !l[e]) return false;
  if (f.marca && l.marca !== f.marca) return false;
  if (f.anio && (!l.anio || l.anio < f.anio)) return false;
  if (f.km && (l.km === undefined || l.km > f.km)) return false;
  if (f.trans && l.transmision !== f.trans) return false;
  if (f.comb && l.combustible !== f.comb) return false;
  if (f.x4 && l.traccion !== "4x4") return false;
  return true;
}

export function aplicar(lista: Listing[], f: Filtros): Listing[] {
  const r = lista.filter((l) => cumple(l, f));
  if (f.orden) {
    const p = (l: Listing) => l.precioUsd ?? (f.orden === "barato" ? Infinity : -Infinity);
    r.sort((a, b) => (f.orden === "barato" ? p(a) - p(b) : p(b) - p(a)));
  }
  return r;
}

export const usd = (n: number) => `USD ${n.toLocaleString("es-BO")}`;
export const bs = (n: number) => `Bs ${Math.round(n * TC).toLocaleString("es-BO")}`;
