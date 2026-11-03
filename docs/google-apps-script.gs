// Pegar en la hoja "Llave - Consultas y visitas" → Extensiones → Apps Script.
// Implementar → Nueva implementación → Aplicación web
//   Ejecutar como: Yo   ·   Quién tiene acceso: Cualquier usuario
// Copiar la URL (termina en /exec) y ponerla en src/config.ts → SHEETS_URL.

function doPost(e) {
  const d = JSON.parse(e.postData.contents || "{}");
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const now = new Date();
  const clean = (v) => String(v || "").slice(0, 500).replace(/^[=+\-@]/, "'$&");

  if (d.kind === "visita") {
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
    "Llave: nueva " + (d.kind === "visita" ? "solicitud de visita" : "consulta"),
    JSON.stringify(d, null, 2));

  return ContentService.createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}
