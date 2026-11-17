export type Listing = {
  id: number;
  type: "Casa" | "Departamento" | "Terreno" | "Oficina" | "Auto";
  title: string;
  city: string;
  price: string;
  specs: string[];
  tag?: string;
  photos: number;
  verified?: string;
  extra?: string;
  hue: string;
  icon: "house" | "building" | "land" | "car";
  // ── Datos para el buscador (filtros). Si un dato no se sabe, se deja sin poner. ──
  ciudad: string; // como en src/data/zonas.ts: "La Paz", "El Alto", "Santa Cruz"...
  zona?: string; // barrio, como en src/data/zonas.ts: "Sopocachi", "Calacoto"...
  precioUsd?: number; // sin poner = "Precio a consultar"
  // Casas, departamentos, terrenos y oficinas
  dormitorios?: number;
  banos?: number;
  m2?: number; // superficie construida
  terrenoM2?: number; // superficie del terreno
  garaje?: number; // cuántos autos entran (0 = sin garaje)
  terraza?: boolean;
  jardin?: boolean;
  amoblado?: boolean;
  churrasquera?: boolean;
  ascensor?: boolean;
  mascotas?: boolean; // acepta mascotas
  // Autos
  marca?: string;
  anio?: number;
  km?: number;
  transmision?: "Automática" | "Mecánica";
  combustible?: "Gasolina" | "Diésel" | "GNV" | "Híbrido" | "Eléctrico";
  traccion?: "4x2" | "4x4";
  carroceria?: "SUV" | "Sedán" | "Camioneta" | "Hatchback" | "Vagoneta" | "Minibús" | "Coupé";
  /** Fotos en /public (la primera es la portada). */
  images?: string[];
  /** Borrador: se ve en las vistas previas, pero no en el sitio publicado hasta que el dueño apruebe la ficha. */
  draft?: boolean;
};

const todos: Listing[] = [
  { id: 8, type: "Auto", title: "Honda Civic Coupé 2018 automático", city: "La Paz", price: "Bs 150.000", specs: ["34.000 km", "Motor 2.0 i-VTEC", "Automático CVT", "Blanco, aros de aleación"], tag: "Papeles al día", hue: "from-slate-200 to-sky-100", icon: "car", photos: 5, extra: "Cámara de retroceso, climatizador y Bluetooth",
    ciudad: "La Paz", precioUsd: 21552, marca: "Honda", anio: 2018, km: 34000, transmision: "Automática", combustible: "Gasolina", traccion: "4x2", carroceria: "Coupé",
    images: [1, 2, 3, 4, 5].map((n) => `/avisos/honda-civic-2018/${n}.jpg`), draft: true },
  { id: 7, type: "Auto", title: "Renault Duster 2020", city: "La Paz", price: "Precio a consultar", specs: ["40.000 km", "Modelo 2020", "Gasolina", "SUV"], tag: "Papeles al día", hue: "from-amber-200 to-rose-100", icon: "car", photos: 0, verified: "RUAT e impuestos al día",
    ciudad: "La Paz", marca: "Renault", anio: 2020, km: 40000, combustible: "Gasolina", carroceria: "SUV" },
  { id: 1, type: "Casa", title: "Casa de 3 dormitorios con jardín", city: "Equipetrol Norte, Santa Cruz", price: "USD 95.000", specs: ["220 m² terreno", "3 dorm.", "2 baños", "Garaje 2 autos"], tag: "Folio real al día", hue: "from-emerald-200 to-teal-100", icon: "house", photos: 18, verified: "Folio real y alodial al 28/10/2026", extra: "Entrega inmediata",
    ciudad: "Santa Cruz", zona: "Equipetrol Norte", precioUsd: 95000, dormitorios: 3, banos: 2, terrenoM2: 220, garaje: 2, jardin: true },
  { id: 2, type: "Departamento", title: "Departamento con vista al Illimani", city: "Calacoto, La Paz", price: "USD 128.000", specs: ["105 m²", "2 dorm.", "Parqueo", "Expensas Bs 450"], tag: "Apto crédito social", hue: "from-sky-200 to-indigo-100", icon: "building", photos: 22, verified: "Folio real propio (PH) al 30/10/2026", extra: "Apto crédito social",
    ciudad: "La Paz", zona: "Calacoto", precioUsd: 128000, dormitorios: 2, banos: 2, m2: 105, garaje: 1, terraza: true },
  { id: 3, type: "Terreno", title: "Lote urbano con plano aprobado", city: "Tiquipaya, Cochabamba", price: "USD 48.000", specs: ["360 m²", "Agua y luz", "Uso residencial", "Calle asfaltada"], tag: "Plano visado", hue: "from-amber-200 to-orange-100", icon: "land", photos: 12, verified: "Plano aprobado y folio al 25/10/2026", extra: "Agua, luz y alcantarillado",
    ciudad: "Cochabamba", zona: "Tiquipaya", precioUsd: 48000, terrenoM2: 360 },
  { id: 4, type: "Auto", title: "Suzuki Vitara 2021 automática", city: "La Paz", price: "USD 21.500", specs: ["48.000 km", "Gasolina", "4x2", "RUAT al día"], tag: "Sin gravámenes", hue: "from-rose-200 to-orange-100", icon: "car", photos: 26, verified: "RUAT sin deudas ni prenda al 01/11/2026", extra: "≈ Bs 78 de gasolina cada 100 km",
    ciudad: "La Paz", precioUsd: 21500, marca: "Suzuki", anio: 2021, km: 48000, transmision: "Automática", combustible: "Gasolina", traccion: "4x2", carroceria: "SUV" },
  { id: 5, type: "Casa", title: "Casa familiar cerca de colegios", city: "Queru Queru, Cochabamba", price: "USD 165.000", specs: ["300 m² terreno", "4 dorm.", "3 baños", "Churrasquera"], hue: "from-lime-200 to-emerald-100", icon: "house", photos: 20, verified: "Folio real e IPBI 5 gestiones al día", extra: "Cerca de 3 colegios",
    ciudad: "Cochabamba", zona: "Queru Queru", precioUsd: 165000, dormitorios: 4, banos: 3, terrenoM2: 300, garaje: 1, jardin: true, churrasquera: true },
  { id: 6, type: "Auto", title: "Toyota Hilux 2019 diésel", city: "Santa Cruz", price: "USD 33.900", specs: ["92.000 km", "Diésel", "4x4", "Revisión mecánica"], tag: "Historial verificado", hue: "from-slate-200 to-sky-100", icon: "car", photos: 30, verified: "RUAT y chasis verificados al 31/10/2026", extra: "Inspección mecánica de 120 puntos",
    ciudad: "Santa Cruz", precioUsd: 33900, marca: "Toyota", anio: 2019, km: 92000, combustible: "Diésel", traccion: "4x4", carroceria: "Camioneta" },
];

// Los borradores solo se ven en las vistas previas de Vercel, no en el sitio publicado
// (LLAVE_ENV se fija al compilar en next.config.ts, así funciona también en componentes de cliente).
export const listings: Listing[] = process.env.NEXT_PUBLIC_LLAVE_ENV === "production" ? todos.filter((l) => !l.draft) : todos;
