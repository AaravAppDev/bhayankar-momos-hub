import Navbar from "@/components/Navbar";
import DynamicHero from "@/components/DynamicHero";
import Menu from "@/components/Menu";
import DynamicBlog from "@/components/DynamicBlog";
import About from "@/components/About";
import DynamicContact from "@/components/DynamicContact";
import Footer from "@/components/Footer";
import ThemeToggle from "@/components/ThemeToggle";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main id="home">
        <DynamicHero />
        <Menu />
        <DynamicBlog />
        <About />
        <DynamicContact />
      </main>
      <Footer />
      <ThemeToggle />
    </div>
  );
};

export default Index;
