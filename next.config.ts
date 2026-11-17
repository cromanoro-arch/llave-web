import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Para ocultar los avisos en borrador solo en el sitio publicado (ver src/data/listings.ts).
  env: { NEXT_PUBLIC_LLAVE_ENV: process.env.VERCEL_ENV ?? "" },
};

export default nextConfig;
