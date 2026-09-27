import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronDown, MapPin, Youtube } from "lucide-react";
import heroImage from "@/assets/hero-momos.jpg";

const DynamicHero = () => {
  return (
    <section className="relative min-h-[calc(100svh-2rem)] overflow-hidden bg-hero-cream pt-16 text-hero-ink lg:grid lg:grid-cols-2">
      <div className="relative z-10 flex items-center px-5 py-10 sm:px-10 sm:py-14 lg:px-16 xl:px-24">
        <div className="mx-auto w-full max-w-xl lg:mx-0">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 inline-flex items-center border-l-2 border-hero-crimson pl-3"
          >
            <span className="text-xs font-bold uppercase text-hero-crimson">Bhayankar Momos</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mb-6 max-w-2xl font-display text-4xl font-bold uppercase leading-[1.02] text-hero-ink sm:text-5xl lg:text-6xl xl:text-7xl"
          >
            Not your ordinary <span className="text-hero-crimson">momos.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mb-8 max-w-lg text-base font-medium leading-relaxed text-hero-muted sm:text-lg"
          >
            Bold flavours. Crazy cravings. Bhayankar taste.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="grid grid-cols-2 gap-3 sm:flex sm:flex-wrap"
          >
            <Button asChild size="lg" className="col-span-2 h-12 rounded-sm bg-hero-ink px-6 text-sm font-bold text-hero-cream shadow-none hover:bg-hero-crimson sm:col-span-1">
              <Link to="/contact">
                Explore Menu
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-12 rounded-sm border-hero-ink bg-transparent px-5 text-sm font-bold text-hero-ink hover:bg-hero-ink hover:text-hero-cream"
            >
              <Link to="/about">Our Story</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-12 rounded-sm border-hero-ink bg-transparent px-5 text-sm font-bold text-hero-ink hover:bg-hero-ink hover:text-hero-cream"
            >
              <a
                href="https://www.youtube.com/@bhayankarmomos"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Watch Bhayankar Momos on YouTube"
              >
                <Youtube className="h-4 w-4" />
                YouTube
              </a>
            </Button>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mt-7 flex items-center gap-3 text-xs font-semibold text-hero-muted"
          >
            <MapPin className="h-4 w-4 text-hero-crimson" />
            Visit our shop for the full selection
          </motion.div>
        </div>
      </div>

      <motion.div
        className="relative min-h-[38svh] overflow-hidden bg-hero-crimson lg:min-h-0"
        initial={{ opacity: 0, scale: 1.04 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <img
          src={heroImage}
          alt="Freshly steamed Bhayankar Momos"
          className="absolute inset-0 h-full w-full object-cover object-center mix-blend-multiply"
        />
        <div className="absolute inset-0 bg-hero-crimson/20" aria-hidden />
        <div className="absolute bottom-5 left-5 border-l-2 border-hero-cream/80 pl-3 text-xs font-bold uppercase text-hero-cream sm:bottom-8 sm:left-8">
          Steamed fresh. Served bold.
        </div>
      </motion.div>

      <motion.div
        aria-hidden
        className="absolute bottom-2 left-1/2 z-20 -translate-x-1/2 text-hero-cream lg:text-hero-ink"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
      >
        <ChevronDown className="h-6 w-6" />
      </motion.div>
    </section>
  );
};

export default DynamicHero;
