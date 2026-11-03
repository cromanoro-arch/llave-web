// Número de WhatsApp con código de país, sin "+" ni espacios (ej.: "59171234567").
// Déjalo vacío para que los botones lleven al formulario de contacto.
export const WHATSAPP = "";

export const waLink = (text = "Hola, quiero información") =>
  WHATSAPP ? `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}` : "#contacto";
