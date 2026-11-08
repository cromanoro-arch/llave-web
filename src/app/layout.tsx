import type { Metadata } from "next";
import { Barlow_Condensed, Newsreader, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const head = Barlow_Condensed({ subsets: ["latin"], weight: ["600", "800", "900"], style: ["normal", "italic"], variable: "--font-head" });
const serif = Newsreader({ subsets: ["latin"], style: ["normal", "italic"], variable: "--font-serif" });
const mono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "600"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: "La Llave | Clasificados de casas, terrenos y autos en Bolivia",
  description:
    "Los clasificados de Bolivia, verificados: casas, departamentos, terrenos y autos con precio en USD y Bs, folio real o RUAT revisado y guía de compra.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body className={`${head.variable} ${serif.variable} ${mono.variable}`}>{children}</body>
    </html>
  );
}
