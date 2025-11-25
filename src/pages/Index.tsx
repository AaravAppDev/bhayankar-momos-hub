import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Menu from "@/components/Menu";
import Blog from "@/components/Blog";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main id="home">
        <Hero />
        <Menu />
        <Blog />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
