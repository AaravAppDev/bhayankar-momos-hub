import { Button } from "@/components/ui/button";
import { Flame } from "lucide-react";
import heroImage from "@/assets/hero-momos.jpg";

const DynamicHero = () => {

  const scrollToMenu = () => {
    document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.6)), url(${heroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center text-white">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 backdrop-blur-sm border border-primary/30 mb-6">
            <Flame className="w-4 h-4 text-primary animate-pulse" />
            <span className="text-sm font-medium text-white">Dangerously Delicious</span>
          </div>
          
          <h1 className="font-display text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold mb-6 animate-fade-in leading-tight">
            Dare to Try
            <br />
            <span className="gradient-text">Bhaynakar Momos</span>
          </h1>
          
          <p className="text-lg sm:text-xl md:text-2xl mb-8 text-gray-200 animate-fade-in px-4" style={{ animationDelay: "0.2s" }}>
            Where every bite tells a spicy story. Authentic flavors, bold spices, unforgettable taste.
          </p>
          
          <Button
            size="lg"
            className="animate-fade-in shadow-glow text-lg px-8 py-6"
            onClick={scrollToMenu}
            style={{ animationDelay: "0.4s" }}
          >
            <Flame className="mr-2 h-5 w-5" />
            Explore Our Menu
          </Button>
        </div>
      </div>
    </section>
  );
};

export default DynamicHero;
