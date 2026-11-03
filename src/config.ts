// Número de WhatsApp con código de país, sin "+" ni espacios (ej.: "59171234567").
// Déjalo vacío para que los botones lleven al formulario de contacto.
export const WHATSAPP = "";

// URL de la "Aplicación web" de Google Apps Script que guarda los formularios
// en la hoja "Llave - Consultas y visitas". Ver docs/google-apps-script.md
export const SHEETS_URL = "https://script.google.com/macros/s/AKfycbyvLT6FbETda_InRS9CcqOdt3HLKkB_mkYZIcBEnJ3e3I3phnrudt7hnlnKor_d12BK/exec";

export const waLink = (text = "Hola, quiero información") =>
  WHATSAPP ? `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}` : "#contacto";
