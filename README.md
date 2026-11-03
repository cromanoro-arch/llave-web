# Llave: casas, terrenos y autos en Bolivia

Sitio informativo y de venta hecho con Next.js 15 y Tailwind CSS.

## Correr en tu compu

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # compilación de producción
```

## Dónde cambiar el contenido

- `src/config.ts`: número de WhatsApp (vacío = los botones llevan al formulario) y `SHEETS_URL`, la dirección que guarda los formularios en Google Sheets.
- `src/data/listings.ts`: avisos destacados (ejemplos).
- `src/data/faq.json`: las 40 preguntas frecuentes por categoría.
- `src/data/insights.ts`: factores de decisión de "Lo que más importa".

## Publicar

Se publica gratis en Vercel importando este repositorio (Framework: Next.js, sin configuración extra).

## Dónde se guardan los datos

Las solicitudes de visita y las consultas llegan a la hoja de Google Sheets "Llave - Consultas y visitas" (pestañas Visitas y Consultas) mediante el script de `docs/google-apps-script.gs`.
