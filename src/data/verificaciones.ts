// Páginas oficiales de Bolivia para revisar el estado de un auto o un inmueble.
// La Llave NO consulta estos sitios por su cuenta: solo enlaza y explica qué dato
// poner. Casi todos piden un código de verificación (captcha), por eso la
// consulta la hace la persona en el sitio oficial.
// Enlaces revisados el 16/11/2026. Si alguno cambia, actualízalo aquí.

export type Check = {
  org: string; // quién lo emite
  title: string; // qué revisas
  shows: string; // qué te muestra
  needs: string[]; // qué dato pide
  url?: string; // enlace oficial (si se puede en línea)
  mode: "En línea · gratis" | "En oficina · con arancel" | "En el auto";
  tip?: string;
};

export type Kind = "Auto" | "Inmueble";

export const checks: Record<Kind, Check[]> = {
  Auto: [
    {
      org: "RUAT",
      title: "Deudas de impuestos del vehículo",
      shows: "Gestiones que se deben del impuesto municipal a la propiedad del vehículo.",
      needs: ["Placa (PTA) sin espacios ni guiones, ej. 1234ABC", "Código de verificación de la pantalla"],
      url: "https://www.ruat.gob.bo/vehiculos/consultageneral/InicioBusquedaVehiculo.jsf",
      mode: "En línea · gratis",
    },
    {
      org: "RUAT · Tránsito",
      title: "Multas de tránsito, ITV e inmovilizadores",
      shows: "Infracciones pendientes, dónde se pusieron y si la inspección técnica está pagada.",
      needs: ["Placa (PTA)", "Código de verificación"],
      url: "https://www.ruat.gob.bo/vehiculos/consultadeudainfraccionitv/InicioBusquedaVehiculoRecPolicia.jsf",
      mode: "En línea · gratis",
    },
    {
      org: "RUAT",
      title: "Datos técnicos del registro",
      shows: "Marca, modelo, año, color, chasis y motor tal como están registrados.",
      needs: ["Placa (PTA)", "N.º del certificado de propiedad (CRPVA) que te muestra el vendedor", "Código de verificación"],
      url: "https://www.ruat.gob.bo/vehiculos/consultadetallada/InicioBusquedaVehiculo.jsf",
      mode: "En línea · gratis",
      tip: "Compara lo que sale con el auto real. Si el color o el chasis no coinciden, no sigas.",
    },
    {
      org: "RUAT · Diprove",
      title: "Chasis vs. registro policial",
      shows: "Si el número de chasis corresponde a un vehículo registrado.",
      needs: ["Número de chasis (VIN): está en el parabrisas, en la puerta y en el RUAT", "Código de verificación"],
      url: "https://www.ruat.gob.bo/vehiculos/consultadiprove/InicioConsultaDiprove.jsf",
      mode: "En línea · gratis",
    },
    {
      org: "Aduana Nacional",
      title: "Placa clonada",
      shows: "Si la placa está reportada como clonada (\"gemeleada\").",
      needs: ["Placa (PTA)"],
      url: "https://www.aduana.gob.bo/aduana7/placas2",
      mode: "En línea · gratis",
    },
    {
      org: "UNIVida",
      title: "SOAT de la gestión",
      shows: "Pide ver la roseta o el comprobante SOAT del año. Si falta, se compra con la placa.",
      needs: ["Placa (PTA)"],
      url: "https://www.univida.bo",
      mode: "En el auto",
    },
  ],
  Inmueble: [
    {
      org: "RUAT",
      title: "Deudas del impuesto a la propiedad (IPBI)",
      shows: "Gestiones impagas del impuesto municipal del inmueble.",
      needs: ["N.º de inmueble o código catastral (sale en la última boleta de pago)", "Municipio", "Código de verificación"],
      url: "https://www.ruat.gob.bo/inmuebles/consultageneral/InicioBusquedaInmueble.jsf",
      mode: "En línea · gratis",
      tip: "Lo ideal: las últimas 5 gestiones pagadas.",
    },
    {
      org: "RUAT",
      title: "Datos técnicos del inmueble",
      shows: "Superficie, zona y construcción registradas en la alcaldía.",
      needs: ["N.º de inmueble", "Municipio", "C.I. del propietario", "Código de verificación"],
      url: "https://www.ruat.gob.bo/inmuebles/consultadetallada/InicioBusquedaInmueble.jsf",
      mode: "En línea · gratis",
      tip: "Compara los m² con lo que dice el aviso y el plano.",
    },
    {
      org: "Derechos Reales",
      title: "Folio real, alodial y gravámenes",
      shows: "Quién es el dueño y si hay hipotecas, embargos o anotaciones. Es el papel más importante.",
      needs: ["N.º de matrícula (folio real)", "Formulario 003 y C.I.", "Se pide en ventanilla de DD.RR. del departamento"],
      url: "https://tramitesddrr.organojudicial.gob.bo/",
      mode: "En oficina · con arancel",
      tip: "Pide el alodial del mismo día de la firma. El enlace muestra requisitos y oficinas.",
    },
    {
      org: "Derechos Reales",
      title: "Estado de un trámite",
      shows: "Si un trámite que te mencionan está en curso, observado o terminado.",
      needs: ["N.º de documento o trámite", "Oficina de DD.RR."],
      url: "https://magistratura.organojudicial.gob.bo/consultaddrr/index.php?r=consulta/index",
      mode: "En línea · gratis",
    },
    {
      org: "Alcaldía · Catastro",
      title: "Plano aprobado y línea municipal",
      shows: "Que lo construido esté aprobado y el lote no invada vías ni áreas verdes.",
      needs: ["Código catastral", "Se pide en la alcaldía del municipio"],
      mode: "En oficina · con arancel",
    },
  ],
};
