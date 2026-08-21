import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Flame, MapPin, ChevronDown } from "lucide-react";
import heroImage from "@/assets/hero-momos.jpg";

const DynamicHero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ scale: 1.12 }}
        animate={{ scale: 1 }}
        transition={{ duration: 8, ease: "easeOut" }}
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0.65)), url(${heroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* drifting warm glows */}
      <motion.div
        aria-hidden
        className="absolute top-1/4 -left-20 w-72 h-72 rounded-full gradient-fire opacity-25 blur-3xl z-0"
        animate={{ x: [0, 60, 0], y: [0, -30, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="absolute bottom-0 -right-16 w-80 h-80 rounded-full bg-accent opacity-20 blur-3xl z-0"
        animate={{ x: [0, -50, 0], y: [0, 30, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 backdrop-blur-sm border border-primary/30 mb-6"
          >
            <Flame className="w-4 h-4 text-primary animate-pulse" />
            <span className="text-sm font-medium text-primary-foreground">Dangerously Delicious</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight text-primary-foreground"
          >
            Dare to Try
            <br />
            <span className="gradient-text">Bhaynakar Momos</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="text-lg sm:text-xl md:text-2xl mb-8 text-primary-foreground/80 px-4"
          >
            Where every bite tells a spicy story. Authentic flavors, bold spices, unforgettable taste.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-3 justify-center items-center"
          >
            <Button asChild size="lg" className="shadow-glow text-lg px-8 py-6">
              <Link to="/contact">
                <MapPin className="mr-2 h-5 w-5" />
                Visit Our Shop
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="text-lg px-8 py-6 bg-transparent border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground/10"
            >
              <Link to="/about">Our Story</Link>
            </Button>
          </motion.div>
        </div>
      </div>

      <motion.div
        aria-hidden
        className="absolute bottom-24 left-1/2 -translate-x-1/2 z-10 text-primary-foreground/70"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
      >
        <ChevronDown className="w-7 h-7" />
      </motion.div>
    </section>
  );
};

export default DynamicHero;
