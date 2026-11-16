// Pegar en script.google.com → Nuevo proyecto (o en la hoja → Extensiones → Apps Script).
// Implementar → Nueva implementación → Aplicación web
//   Ejecutar como: Yo   ·   Quién tiene acceso: Cualquier usuario
// Copiar la URL (termina en /exec) y ponerla en src/config.ts → SHEETS_URL.

function doPost(e) {
  const d = JSON.parse(e.postData.contents || "{}");
  const ss = SpreadsheetApp.openById("1VKrRU2tFL6vzjWMpG469DkIr0XXt4ZRRN6Co5qH0qEM");
  const now = new Date();
  const clean = (v) => String(v || "").slice(0, 500).replace(/^[=+\-@]/, "'$&");

  if (d.kind === "publicar") {
    // Formulario "Publica tu casa o auto" → pestaña CRM Avisos, en la primera fila libre.
    const sh = ss.getSheetByName("CRM Avisos");
    const fechas = sh.getRange("B2:B").getValues();
    let fila = 2;
    while (fila - 2 < fechas.length && fechas[fila - 2][0] !== "") fila++;
    const num = (v) => { const n = Number(String(v || "").replace(/[^0-9]/g, "")); return n || ""; };
    sh.getRange(fila, 1, 1, 21).setValues([[
      "", now, clean(d.tipo), clean(d.ciudad), clean(d.zona), clean(d.resumen),
      num(d.precio_usd), num(d.precio_bs), clean(d.nombre), clean(d.celular),
      "Formulario de la web", "", "Por confirmar", clean(d.identificacion), "Sin revisar", "",
      "Pendiente", "3. Interesado", "Escribir por WhatsApp y pedir fotos", now,
      "Desde la web: " + clean(d.dueno) + " · acepta que lo contactemos",
    ]]);
  } else if (d.kind === "visita") {
    ss.getSheetByName("Visitas").appendRow([
      now, clean(d.aviso), clean(d.tipo), clean(d.nombre), clean(d.celular),
      clean(d.fecha), clean(d.horario), clean(d.modalidad), clean(d.comentario), "Pendiente",
    ]);
  } else {
    ss.getSheetByName("Consultas").appendRow([
      now, clean(d.nombre), clean(d.celular), clean(d.motivo), clean(d.mensaje), "Pendiente",
    ]);
  }

  // Aviso por correo al dueño de la hoja (opcional: borra estas líneas si no lo quieres).
  MailApp.sendEmail(Session.getEffectiveUser().getEmail(),
    "Llave: " + (d.kind === "publicar" ? "nuevo aviso para publicar" : d.kind === "visita" ? "nueva solicitud de visita" : "nueva consulta"),
    JSON.stringify(d, null, 2));

  return ContentService.createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}
