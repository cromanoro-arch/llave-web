import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Insights from "@/components/Insights";
import Listings from "@/components/Listings";
import Guide from "@/components/Guide";
import CreditCalculator from "@/components/CreditCalculator";
import Verify from "@/components/Verify";
import Verificador, { VerifyProvider } from "@/components/Verificador";
import Faq from "@/components/Faq";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import WhatsAppFab from "@/components/WhatsAppFab";
import { VisitProvider } from "@/components/VisitModal";

export default function Home() {
  return (
    <VisitProvider>
    <VerifyProvider>
      <Header />
      <main>
        <Hero />
        <Listings />
        <Insights />
        <Guide />
        <CreditCalculator />
        <Verify />
        <Verificador />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFab />
    </VerifyProvider>
    </VisitProvider>
  );
}
