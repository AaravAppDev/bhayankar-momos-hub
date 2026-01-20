import { Button } from "@/components/ui/button";
import { Flame } from "lucide-react";
import heroImage from "@/assets/hero-momos.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-x-hidden w-full max-w-full">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ 
          backgroundImage: `url(${heroImage})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-background"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20 text-center">
        <div className="animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 backdrop-blur-sm border border-primary/30 mb-6">
            <Flame className="w-4 h-4 text-primary animate-pulse" />
            <span className="text-sm font-medium text-white">Dangerously Delicious</span>
          </div>
          
          <h1 className="font-display text-6xl md:text-8xl font-bold mb-6 text-white drop-shadow-2xl">
            Bhayankar
            <span className="block gradient-text">Momos</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto">
            Experience the ultimate fusion of bold flavors and authentic taste. 
            Where every bite is an adventure!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button variant="hero" size="xl" className="group">
              Order Now
              <Flame className="w-5 h-5 group-hover:animate-pulse" />
            </Button>
            <Button variant="outline" size="xl" className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20">
              View Menu
            </Button>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent"></div>
    </section>
  );
};

export default Hero;
