export type Listing = {
  id: number;
  type: "Casa" | "Departamento" | "Terreno" | "Auto";
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
};

export const listings: Listing[] = [
  { id: 7, type: "Auto", title: "Renault Duster 2020", city: "La Paz", price: "Precio a consultar", specs: ["40.000 km", "Modelo 2020", "Gasolina", "SUV"], tag: "Papeles al día", hue: "from-amber-200 to-rose-100", icon: "car", photos: 0, verified: "RUAT e impuestos al día" },
  { id: 1, type: "Casa", title: "Casa de 3 dormitorios con jardín", city: "Equipetrol Norte, Santa Cruz", price: "USD 95.000", specs: ["220 m² terreno", "3 dorm.", "2 baños", "Garaje 2 autos"], tag: "Folio real al día", hue: "from-emerald-200 to-teal-100", icon: "house", photos: 18, verified: "Folio real y alodial al 28/10/2026", extra: "Entrega inmediata" },
  { id: 2, type: "Departamento", title: "Departamento con vista al Illimani", city: "Calacoto, La Paz", price: "USD 128.000", specs: ["105 m²", "2 dorm.", "Parqueo", "Expensas Bs 450"], tag: "Apto crédito social", hue: "from-sky-200 to-indigo-100", icon: "building", photos: 22, verified: "Folio real propio (PH) al 30/10/2026", extra: "Apto crédito social" },
  { id: 3, type: "Terreno", title: "Lote urbano con plano aprobado", city: "Tiquipaya, Cochabamba", price: "USD 48.000", specs: ["360 m²", "Agua y luz", "Uso residencial", "Calle asfaltada"], tag: "Plano visado", hue: "from-amber-200 to-orange-100", icon: "land", photos: 12, verified: "Plano aprobado y folio al 25/10/2026", extra: "Agua, luz y alcantarillado" },
  { id: 4, type: "Auto", title: "Suzuki Vitara 2021 automática", city: "La Paz", price: "USD 21.500", specs: ["48.000 km", "Gasolina", "4x2", "RUAT al día"], tag: "Sin gravámenes", hue: "from-rose-200 to-orange-100", icon: "car", photos: 26, verified: "RUAT sin deudas ni prenda al 01/11/2026", extra: "≈ Bs 78 de gasolina cada 100 km" },
  { id: 5, type: "Casa", title: "Casa familiar cerca de colegios", city: "Queru Queru, Cochabamba", price: "USD 165.000", specs: ["300 m² terreno", "4 dorm.", "3 baños", "Churrasquera"], hue: "from-lime-200 to-emerald-100", icon: "house", photos: 20, verified: "Folio real e IPBI 5 gestiones al día", extra: "Cerca de 3 colegios" },
  { id: 6, type: "Auto", title: "Toyota Hilux 2019 diésel", city: "Santa Cruz", price: "USD 33.900", specs: ["92.000 km", "Diésel", "4x4", "Revisión mecánica"], tag: "Historial verificado", hue: "from-slate-200 to-sky-100", icon: "car", photos: 30, verified: "RUAT y chasis verificados al 31/10/2026", extra: "Inspección mecánica de 120 puntos" },
];
