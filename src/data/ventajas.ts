// Ventajas de comprar con La Llave. Edita los textos aquí.
// Pendiente de completar por cris: nombres de talleres aliados, montos o % de los
// cupones y condiciones. Mientras tanto, los textos son generales y no prometen
// cifras. Cambia `detalle` cuando tengas los datos reales.

export type Ventaja = { titulo: string; texto: string; detalle?: string; para?: string };

export const ventajasAutos: Ventaja[] = [
  {
    titulo: "Cupones de lavado",
    texto: "Al comprar tu auto con nosotros te llevas cupones de lavado para estrenarlo limpio.",
    detalle: "Cantidad y lugares: consulta al agendar.",
    para: "Todos los autos",
  },
  {
    titulo: "Detailing",
    texto: "Limpieza profunda, pulido y cuidado de interiores con aliados de confianza.",
    detalle: "Paquetes para gama alta y para cualquier auto.",
    para: "Gama alta y cualquier auto",
  },
  {
    titulo: "Chapería y pintura verificada",
    texto: "Si el auto necesita un retoque, te derivamos a un servicio de chapería revisado por nosotros: trabajo y precio claros antes de empezar.",
    para: "Todos los autos",
  },
  {
    titulo: "Y más beneficios",
    texto: "Vamos sumando aliados para el cuidado de tu auto. Pregunta qué hay vigente cuando agendes tu prueba de manejo.",
  },
];

export const ventajasTodos: Ventaja[] = [
  { titulo: "Papeles revisados", texto: "Antes de publicar revisamos folio real o RUAT, y te decimos la fecha de la revisión." },
  { titulo: "Te guiamos a verificar", texto: "Te mostramos qué consultar gratis, qué tiene costo y qué datos pedirle al dueño." },
  { titulo: "Precio claro", texto: "Siempre en dólares y bolivianos, al tipo de cambio oficial." },
  { titulo: "Visita o prueba agendada", texto: "Eliges día y hora; te confirmamos por llamada o mensaje." },
];
