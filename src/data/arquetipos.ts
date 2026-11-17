// Nichos y arquetipos de comprador. Cada aviso dice para quién es (campo `para` en listings.ts)
// y la sección "¿Quién eres tú?" filtra los avisos por arquetipo (?para=familia).
// Regla (Ley 453): los mensajes hablan de la necesidad del comprador, nunca prometen
// ganancias, escasez ni urgencia falsas. El precio sigue visible en cada aviso.

export type ArquetipoId = "familia" | "lujo" | "futbolista" | "inversion" | "exterior" | "alquiler" | "primerauto" | "trabajo";

export type Arquetipo = {
  id: ArquetipoId;
  corto: string; // etiqueta "PARA: ..." en el aviso y en el filtro activo
  pregunta: string; // el gancho
  promesa: string; // por qué La Llave le sirve a esta persona
  cta: string; // texto del botón cuando hay avisos
  pedido: string; // mensaje que se precarga si pide algo que todavía no hay
};

export const ARQUETIPOS: Arquetipo[] = [
  {
    id: "familia", corto: "Familias con hijos",
    pregunta: "¿Tus hijos ya no caben en el departamento?",
    promesa: "Casas con 3 o más dormitorios, patio para que jueguen y colegios cerca. El folio real lo revisamos antes de que des un solo peso.",
    cta: "Ver casas para mi familia",
    pedido: "Hola, busco casa para mi familia. Somos __ personas, necesitamos __ dormitorios, en la zona __.",
  },
  {
    id: "lujo", corto: "Buscan lo mejor",
    pregunta: "¿Buscas un departamento de lujo con vista?",
    promesa: "Pisos altos, vista al Illimani y las mejores zonas. Visita privada, a tu hora y sin curiosos.",
    cta: "Ver lo exclusivo",
    pedido: "Hola, busco un departamento de lujo con vista, en la zona __. Mi presupuesto es de __.",
  },
  {
    id: "futbolista", corto: "Futbolistas y deportistas",
    pregunta: "¿Eres futbolista y llegas a un club nuevo?",
    promesa: "Te mudas por contrato y necesitas entrar ya. Casa o depto con entrega inmediata, garaje y privacidad cerca del club. Armamos las visitas en una tarde y revisamos los papeles mientras entrenas.",
    cta: "Ver lo que está listo para entrar",
    pedido: "Hola, soy deportista y llego al club __ en la ciudad de __. Busco casa o departamento para entrar el __.",
  },
  {
    id: "inversion", corto: "Inversionistas",
    pregunta: "¿Tienes dólares guardados y no sabes dónde ponerlos?",
    promesa: "Lotes con plano aprobado y departamentos con folio limpio: lo que compras con papeles en regla lo puedes alquilar o revender sin trabas. Primero te mostramos el papel, después el terreno.",
    cta: "Ver para invertir",
    pedido: "Hola, quiero invertir unos __ dólares en un lote o departamento en __.",
  },
  {
    id: "exterior", corto: "Bolivianos en el exterior",
    pregunta: "¿Vives en España, Argentina o EE.UU. y quieres tu casa en Bolivia?",
    promesa: "Te hacemos la visita por videollamada, revisamos folio y alodial por ti y te mandamos todo por WhatsApp para que decidas desde allá.",
    cta: "Ver desde donde estoy",
    pedido: "Hola, vivo en __ y quiero comprar casa en __, Bolivia. ¿Me pueden mostrar opciones por videollamada?",
  },
  {
    id: "alquiler", corto: "Cansados de alquilar",
    pregunta: "¿Llevas años pagando alquiler?",
    promesa: "Con el crédito de vivienda social la cuota puede parecerse a lo que hoy pagas de alquiler, pero lo que pagas es tuyo. Mira los avisos aptos y calcula tu cuota.",
    cta: "Ver los aptos para crédito",
    pedido: "Hola, pago __ Bs de alquiler y quiero ver si me alcanza para comprar con crédito de vivienda social.",
  },
  {
    id: "primerauto", corto: "Primer auto",
    pregunta: "¿Es tu primer auto y te da miedo que te estafen?",
    promesa: "RUAT sin deudas ni prenda, chasis y motor comparados con los papeles y precio claro en Bs y USD. Nada de sorpresas en la Alcaldía.",
    cta: "Ver autos sin sorpresas",
    pedido: "Hola, busco mi primer auto, tengo un presupuesto de __ y lo quiero para __.",
  },
  {
    id: "trabajo", corto: "Para el trabajo duro",
    pregunta: "¿Tu trabajo empieza donde se acaba el asfalto?",
    promesa: "Camionetas 4x4 diésel con revisión mecánica completa, para el campo, la mina o la obra. Que el vehículo no sea lo que te falle.",
    cta: "Ver camionetas de trabajo",
    pedido: "Hola, busco una camioneta para trabajo en __. La necesito para __.",
  },
];

export const arquetipo = (id: string) => ARQUETIPOS.find((a) => a.id === id);
