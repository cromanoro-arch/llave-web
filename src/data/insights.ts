export type Factor = { label: string; pct: number };
export type Insight = {
  id: string;
  title: string;
  subtitle: string;
  factors: Factor[];
  source: string;
  note?: string;
};

export const insights: Insight[] = [
  {
    id: "casas",
    title: "Casas y departamentos",
    subtitle: "Qué pesa más al elegir una vivienda",
    factors: [
      { label: "Ubicación", pct: 31 },
      { label: "Precio", pct: 25 },
      { label: "Tamaño / m²", pct: 20 },
      { label: "Seguridad", pct: 13 },
      { label: "Áreas comunes", pct: 9 },
    ],
    source: "Encuesta InfoCasas Uruguay 2025 (n=500, una sola elección)",
    note: "En Lima (2025) se repite el orden: ubicación 39%, precio y financiamiento 35%, seguridad 25%.",
  },
  {
    id: "autos",
    title: "Autos",
    subtitle: "Qué motiva la compra de un vehículo",
    factors: [
      { label: "Calidad", pct: 65 },
      { label: "Desempeño", pct: 56 },
      { label: "Motor y consumo", pct: 48 },
      { label: "Precio", pct: 44 },
      { label: "Tecnología", pct: 40 },
      { label: "Financiamiento", pct: 18 },
    ],
    source: "Deloitte Brasil 2026 (calidad, desempeño, precio) y Teads Latam 2024, 7 países (motor, tecnología, financiamiento)",
    note: "Respuesta múltiple: los porcentajes no suman 100%.",
  },
];

export const terrenoRanking = [
  { label: "Título y folio real a nombre del vendedor", detail: "Lo primero que se verifica en Derechos Reales." },
  { label: "Plano y urbanización aprobados", detail: "Más del 50% de las urbanizaciones del área de Santa Cruz operaron de forma irregular (El Día, 2016)." },
  { label: "Que no haya doble venta ni dueño anterior", detail: "En Arbieto (2024), 76 personas denunciaron lotes vendidos dos veces." },
  { label: "Riesgo de avasallamiento", detail: "Visitar el lote, hablar con vecinos y revisar colindancias." },
  { label: "Servicios básicos y uso de suelo", detail: "Agua, luz, alcantarillado y si se puede construir vivienda." },
  { label: "Riesgo geológico", detail: "En Bajo Llojeta (La Paz), el 73% del terreno está en alto riesgo (Visión 360, 2024)." },
];
