import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Insights from "@/components/Insights";
import Listings from "@/components/Listings";
import Guide from "@/components/Guide";
import CreditCalculator from "@/components/CreditCalculator";
import Verify from "@/components/Verify";
import Faq from "@/components/Faq";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import WhatsAppFab from "@/components/WhatsAppFab";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Listings />
        <Insights />
        <Guide />
        <CreditCalculator />
        <Verify />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFab />
    </>
  );
}
