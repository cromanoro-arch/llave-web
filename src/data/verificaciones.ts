// Páginas oficiales de Bolivia para revisar el estado de un auto o un inmueble.
// La Llave NO consulta estos sitios por su cuenta: solo enlaza y explica qué dato
// poner. Casi todos piden un código de verificación (captcha), por eso la
// consulta la hace la persona en el sitio oficial.
// Enlaces revisados el 16/11/2026. Si alguno cambia, actualízalo aquí.

// gratis   = cualquiera lo consulta en línea, al momento y sin pagar
// pago     = tiene costo (arancel o compra) y se hace en oficina o en línea pagando
// personal = solo el dueño (o alguien con su permiso) tiene el dato o puede pedirlo
export type Access = "gratis" | "pago" | "personal";

export type Check = {
  org: string; // quién lo emite
  title: string; // qué revisas
  shows: string; // qué te muestra
  needs: string[]; // qué dato pide
  access: Access;
  url?: string; // enlace oficial
  how?: string[]; // paso a paso (para lo que se paga o es personal)
  tip?: string;
};

export type Kind = "Auto" | "Inmueble";

export const accessInfo: Record<Access, { label: string; sub: string }> = {
  gratis: { label: "Rápido y gratis", sub: "Lo consulta cualquiera, en línea, en 2 minutos. Solo necesitas la placa o el número." },
  personal: { label: "Personal · lo da el dueño", sub: "Necesita un dato que solo tiene el dueño. Pídeselo: si no quiere darlo, es una señal de alerta." },
  pago: { label: "Con costo · en oficina", sub: "Tiene un costo oficial y se pide en ventanilla. Te explicamos cómo, paso a paso." },
};

export const checks: Record<Kind, Check[]> = {
  Auto: [
    {
      org: "RUAT",
      title: "Deudas de impuestos del vehículo",
      shows: "Gestiones que se deben del impuesto municipal a la propiedad del vehículo.",
      needs: ["Placa (PTA) sin espacios ni guiones, ej. 1234ABC", "Código de verificación de la pantalla"],
      url: "https://www.ruat.gob.bo/vehiculos/consultageneral/InicioBusquedaVehiculo.jsf",
      access: "gratis",
    },
    {
      org: "RUAT · Tránsito",
      title: "Multas de tránsito, ITV e inmovilizadores",
      shows: "Infracciones pendientes, dónde se pusieron y si la inspección técnica está pagada.",
      needs: ["Placa (PTA)", "Código de verificación"],
      url: "https://www.ruat.gob.bo/vehiculos/consultadeudainfraccionitv/InicioBusquedaVehiculoRecPolicia.jsf",
      access: "gratis",
    },
    {
      org: "Aduana Nacional",
      title: "Placa clonada",
      shows: "Si la placa está reportada como clonada (\"gemeleada\").",
      needs: ["Placa (PTA)"],
      url: "https://www.aduana.gob.bo/aduana7/placas2",
      access: "gratis",
    },
    {
      org: "RUAT · Diprove",
      title: "Chasis vs. registro policial",
      shows: "Si el número de chasis corresponde a un vehículo registrado.",
      needs: ["Número de chasis (VIN): está en el parabrisas, en la puerta y en el RUAT", "Código de verificación"],
      url: "https://www.ruat.gob.bo/vehiculos/consultadiprove/InicioConsultaDiprove.jsf",
      access: "gratis",
    },
    {
      org: "RUAT",
      title: "Datos técnicos del registro",
      shows: "Marca, modelo, año, color, chasis y motor tal como están registrados.",
      needs: ["Placa (PTA)", "N.º del certificado de propiedad (CRPVA)", "Código de verificación"],
      url: "https://www.ruat.gob.bo/vehiculos/consultadetallada/InicioBusquedaVehiculo.jsf",
      access: "personal",
      how: [
        "Pídele al vendedor que te muestre el certificado de propiedad (CRPVA) original.",
        "Anota el número del certificado y la placa.",
        "Abre la consulta, pon los dos datos y el código de verificación.",
        "Compara color, chasis y motor con el auto que tienes enfrente.",
      ],
      tip: "Si el color o el chasis no coinciden, no sigas.",
    },
    {
      org: "UNIVida",
      title: "SOAT de la gestión",
      shows: "El seguro obligatorio del año. Debe estar pagado para circular y para transferir.",
      needs: ["Placa (PTA)"],
      url: "https://www.univida.bo",
      access: "pago",
      how: [
        "Pide ver la roseta o el comprobante SOAT de este año.",
        "Si no lo tiene, se compra en univida.bo, en su app o en sus puntos de venta, solo con la placa.",
        "Acuerda con el vendedor quién lo paga antes de cerrar el trato.",
      ],
    },
  ],
  Inmueble: [
    {
      org: "RUAT",
      title: "Deudas del impuesto a la propiedad (IPBI)",
      shows: "Gestiones impagas del impuesto municipal del inmueble.",
      needs: ["N.º de inmueble o código catastral (sale en la boleta de impuestos)", "Municipio", "Código de verificación"],
      url: "https://www.ruat.gob.bo/inmuebles/consultageneral/InicioBusquedaInmueble.jsf",
      access: "gratis",
      tip: "Lo ideal: las últimas 5 gestiones pagadas.",
    },
    {
      org: "Derechos Reales",
      title: "Estado de un trámite",
      shows: "Si un trámite que te mencionan está en curso, observado o terminado.",
      needs: ["N.º de documento o trámite", "Oficina de DD.RR."],
      url: "https://magistratura.organojudicial.gob.bo/consultaddrr/index.php?r=consulta/index",
      access: "gratis",
    },
    {
      org: "RUAT",
      title: "Datos técnicos del inmueble",
      shows: "Superficie, zona y construcción registradas en la alcaldía.",
      needs: ["N.º de inmueble", "Municipio", "C.I. del propietario", "Código de verificación"],
      url: "https://www.ruat.gob.bo/inmuebles/consultadetallada/InicioBusquedaInmueble.jsf",
      access: "personal",
      how: [
        "Pídele al vendedor la última boleta de impuestos y su número de carnet.",
        "Abre la consulta, elige el municipio y pon el número de inmueble y el C.I.",
        "Compara los m² con lo que dice el aviso y el plano.",
      ],
    },
    {
      org: "Derechos Reales",
      title: "Folio real, alodial y gravámenes",
      shows: "Quién es el dueño y si hay hipotecas, embargos o anotaciones. Es el papel más importante.",
      needs: ["N.º de matrícula (folio real)", "Formulario 003 y C.I."],
      url: "https://tramitesddrr.organojudicial.gob.bo/",
      access: "pago",
      how: [
        "Pídele al vendedor el número de matrícula del folio real (está en su folio o testimonio).",
        "Lo ideal es que el dueño lo pida, o te dé una autorización firmada: un tercero debe demostrar interés.",
        "Ve a la oficina de Derechos Reales del departamento con el Formulario 003 y el carnet.",
        "Paga el arancel en caja y recoge el certificado en ventanilla.",
      ],
      tip: "Pide el alodial del mismo día de la firma. El enlace muestra requisitos y oficinas.",
    },
    {
      org: "Alcaldía · Catastro",
      title: "Plano aprobado y línea municipal",
      shows: "Que lo construido esté aprobado y el lote no invada vías ni áreas verdes.",
      needs: ["Código catastral"],
      access: "pago",
      how: [
        "Pídele al vendedor el plano aprobado y el certificado catastral que ya tenga.",
        "Si no los tiene o son antiguos, se piden en la dirección de catastro de la alcaldía del municipio, con el código catastral.",
      ],
    },
  ],
};
