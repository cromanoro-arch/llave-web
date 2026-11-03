export default function Footer() {
  return (
    <footer className="border-t border-ink/10 py-10 text-sm text-ink-mute">
      <div className="container-x flex flex-col justify-between gap-4 sm:flex-row">
        <p>© {new Date().getFullYear()} Llave · Casas, terrenos y autos en Bolivia</p>
        <p className="max-w-xl">La información de trámites e impuestos es referencial y puede cambiar. Confirma montos y requisitos con Derechos Reales, tu alcaldía, el RUAT o tu banco antes de firmar.</p>
      </div>
    </footer>
  );
}
