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
