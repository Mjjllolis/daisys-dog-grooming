import Header from "@/components/site/Header";
import Hero from "@/components/site/Hero";
import Ticker from "@/components/site/Ticker";
import About from "@/components/site/About";
import Services from "@/components/site/Services";
import Pricing from "@/components/site/Pricing";
import Testimonials from "@/components/site/Testimonials";
import Faq from "@/components/site/Faq";
import Blog from "@/components/site/Blog";
import Offer from "@/components/site/Offer";
import Footer from "@/components/site/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Ticker />
        <About />
        <Services />
        <Pricing />
        <Testimonials />
        <Faq />
        <Blog />
        <Offer />
      </main>
      <Footer />
    </>
  );
}
