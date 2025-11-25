import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Flame, Heart, Trophy, Users } from "lucide-react";

const About = () => {
  const features = [
    {
      icon: Flame,
      title: "Bold Flavors",
      description: "We're not afraid to turn up the heat and create unforgettable taste experiences."
    },
    {
      icon: Heart,
      title: "Made with Love",
      description: "Every momo is handcrafted with care, passion, and the finest ingredients."
    },
    {
      icon: Trophy,
      title: "Award Winning",
      description: "Recognized as the best street food brand in the city for two years running."
    },
    {
      icon: Users,
      title: "Community First",
      description: "We're more than a food brand - we're a family that brings people together."
    }
  ];

  return (
    <section id="about" className="py-12 sm:py-16 md:py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-12">
          <Badge variant="secondary" className="mb-4">Our Story</Badge>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            More Than Just <span className="gradient-text">Momos</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto px-4">
            Started in 2020 with a single cart and a dream to revolutionize street food. 
            Today, Bhayankar Momos is synonymous with quality, flavor, and a fiery passion for food.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-12 md:mt-16">
          {features.map((feature) => (
            <Card key={feature.title} className="text-center shadow-card hover:shadow-glow transition-smooth">
              <CardContent className="p-6">
                <div className="w-16 h-16 gradient-fire rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-display text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-16 p-6 md:p-8 bg-card rounded-2xl shadow-card w-full max-w-4xl">
            <div className="py-4 sm:py-0">
              <div className="font-display text-3xl sm:text-4xl md:text-5xl font-bold gradient-text mb-2">500K+</div>
              <div className="text-sm md:text-base text-muted-foreground">Momos Served</div>
            </div>
            <div className="py-4 sm:py-0 border-y sm:border-y-0 sm:border-x border-border">
              <div className="font-display text-3xl sm:text-4xl md:text-5xl font-bold gradient-text mb-2">50K+</div>
              <div className="text-sm md:text-base text-muted-foreground">Happy Customers</div>
            </div>
            <div className="py-4 sm:py-0">
              <div className="font-display text-3xl sm:text-4xl md:text-5xl font-bold gradient-text mb-2">10+</div>
              <div className="text-sm md:text-base text-muted-foreground">Varieties</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
