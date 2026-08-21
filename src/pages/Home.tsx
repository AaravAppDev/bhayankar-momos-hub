import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Newspaper, MapPin, ChefHat } from "lucide-react";
import DynamicHero from "@/components/DynamicHero";
import { FadeIn, ScaleIn } from "@/components/ScrollAnimations";
import { Card, CardContent } from "@/components/ui/card";

const highlights = [
  {
    icon: Newspaper,
    title: "Our Stories",
    text: "Spicy tales, customer favourites and kitchen secrets.",
    to: "/blog",
    cta: "Read the blog",
  },
  {
    icon: ChefHat,
    title: "Who We Are",
    text: "Meet Kamal Goyal and the fire behind every dumpling.",
    to: "/about",
    cta: "Our story",
  },
  {
    icon: MapPin,
    title: "Visit Us",
    text: "Find the shop, working hours and drop us a message.",
    to: "/contact",
    cta: "Get in touch",
  },
];

const Home = () => {
  return (
    <>
      <DynamicHero />

      <section className="py-14 sm:py-20 bg-background">
        <div className="container mx-auto px-4">
          <FadeIn className="text-center mb-10">
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-3">
              Explore <span className="gradient-text">Bhayankar</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Everything about the shop, the people and the flavour — one tap away.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
            {highlights.map((item, i) => (
              <ScaleIn key={item.title} delay={i * 0.1}>
                <Link to={item.to} className="block h-full group">
                  <motion.div whileHover={{ y: -6 }} transition={{ type: "spring", stiffness: 300, damping: 20 }} className="h-full">
                    <Card className="h-full shadow-card hover:shadow-glow transition-smooth">
                      <CardContent className="p-6">
                        <div className="w-14 h-14 gradient-fire rounded-2xl flex items-center justify-center mb-4">
                          <item.icon className="w-7 h-7 text-primary-foreground" />
                        </div>
                        <h3 className="font-display text-xl font-bold mb-2">{item.title}</h3>
                        <p className="text-muted-foreground mb-4">{item.text}</p>
                        <span className="inline-flex items-center gap-2 text-primary font-medium">
                          {item.cta}
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-smooth" />
                        </span>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Link>
              </ScaleIn>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
