import { SHEETS_URL } from "@/config";

export type Payload = { kind: "visita" | "consulta"; [k: string]: string };

export async function submitForm(data: Payload): Promise<"ok" | "sin-conexion" | "error"> {
  if (!SHEETS_URL) {
    console.warn("SHEETS_URL vacío: el formulario no se guardó", data);
    return "sin-conexion";
  }
  try {
    await fetch(SHEETS_URL, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(data),
    });
    return "ok";
  } catch {
    return "error";
  }
}
