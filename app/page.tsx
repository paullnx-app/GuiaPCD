import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import WhyChooseUs from "@/components/WhyChooseUs";
import ProcessSteps from "@/components/ProcessSteps";
import Testimonials from "@/components/Testimonials";
import Benefits from "@/components/Benefits";
import Contact from "@/components/Contact";
import Blog from "@/components/Blog";
import { getSiteUrl } from "@/lib/siteUrl";

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  title: "Despachante PCD em BH | Guia PCD, Isenção Veicular",
  description:
    "Guia PCD: despachante especialista em isenção veicular para PcD em Belo Horizonte. IPI, ICMS e IPVA. Atendimento na Av. Contorno, Santa Efigênia, e região.",
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title: "Despachante PCD em BH | Guia PCD",
    description:
      "Despachante especialista em isenção veicular para PcD em Belo Horizonte e região.",
    url: siteUrl,
    type: "website",
    locale: "pt_BR",
  },
};

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Services />
      <WhyChooseUs />
      <ProcessSteps />
      <Testimonials />
      <Benefits />
      <Contact />
      <Blog />
      <Footer />
    </main>
  );
}
