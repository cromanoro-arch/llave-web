// Zonas y barrios por ciudad, para el buscador de avisos y el formulario de publicación.
// Para agregar una zona, súmala al grupo que corresponda (el orden es el que se ve en la lista).
export type GrupoZonas = { grupo: string; zonas: string[] };

export const CIUDADES = ["La Paz", "El Alto", "Santa Cruz", "Cochabamba", "Sucre", "Tarija", "Oruro", "Potosí"] as const;
export type Ciudad = (typeof CIUDADES)[number];

export const ZONAS: Partial<Record<Ciudad, GrupoZonas[]>> = {
  "La Paz": [
    { grupo: "Centro", zonas: ["Sopocachi", "San Pedro", "Miraflores", "Centro", "San Jorge", "Bella Vista", "Tembladerani"] },
    { grupo: "Zona Sur", zonas: ["Calacoto", "San Miguel", "Achumani", "Irpavi", "Obrajes", "Alto Obrajes", "Cota Cota", "Los Pinos", "Seguencoma", "Bolognia", "Aranjuez", "Mallasa", "Chasquipampa", "Ovejuyo", "Huajchilla"] },
    { grupo: "Norte y otras", zonas: ["Villa Fátima", "Villa Pabón", "Chuquiaguillo", "Gran Poder", "Villa Victoria", "Pura Pura", "Achachicala", "Vino Tinto"] },
  ],
  "El Alto": [
    { grupo: "El Alto", zonas: ["Ciudad Satélite", "Villa Adela", "16 de Julio", "La Ceja", "Río Seco", "Villa Bolívar", "Ciudad Ballivián", "Villa Dolores", "Alto Lima", "Senkata", "Villa Esperanza", "Mercedario"] },
  ],
  "Santa Cruz": [
    { grupo: "Santa Cruz", zonas: ["Equipetrol", "Equipetrol Norte", "Urbarí", "Las Palmas", "Sirari", "Urubó", "Centro", "Norte (4.º anillo)", "Plan 3000", "Villa 1.º de Mayo", "Doble vía La Guardia"] },
  ],
  Cochabamba: [
    { grupo: "Cochabamba", zonas: ["Queru Queru", "Cala Cala", "Recoleta", "Sarco", "Centro", "Tiquipaya", "Sacaba", "Quillacollo", "Colcapirhua"] },
  ],
};

export const zonasDe = (ciudad: string): string[] =>
  (ZONAS[ciudad as Ciudad] ?? []).flatMap((g) => g.zonas);
