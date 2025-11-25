import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Flame, Heart, Trophy, Users, Award, ChefHat } from "lucide-react";
import { FadeIn, ScaleIn, SlideInLeft, SlideInRight } from "./ScrollAnimations";
import founderImage from "@/assets/founder-kamal.jpg";

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
        <FadeIn className="text-center mb-8 md:mb-12">
          <Badge variant="secondary" className="mb-4">Our Story</Badge>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            More Than Just <span className="gradient-text">Momos</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto px-4">
            Started in 2020 with a single cart and a dream to revolutionize street food. 
            Today, Bhayankar Momos is synonymous with quality, flavor, and a fiery passion for food.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-12 md:mt-16">
          {features.map((feature, index) => (
            <ScaleIn key={feature.title} delay={index * 0.1}>
              <Card className="text-center shadow-card hover:shadow-glow transition-smooth h-full">
                <CardContent className="p-6">
                  <div className="w-16 h-16 gradient-fire rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-display text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            </ScaleIn>
          ))}
        </div>

        <FadeIn delay={0.2} className="mt-16 text-center">
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
        </FadeIn>

        {/* Founder Section */}
        <div className="mt-20">
          <FadeIn className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">Meet the Visionary</Badge>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              Founder & <span className="gradient-text">Head Chef</span>
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center max-w-6xl mx-auto">
            <SlideInLeft>
              <div className="relative">
                <div className="aspect-square rounded-2xl overflow-hidden shadow-glow">
                  <img
                    src={founderImage}
                    alt="Kamal Goyal - Founder & Head Chef"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-4 -right-4 w-24 h-24 gradient-fire rounded-full flex items-center justify-center shadow-glow">
                  <ChefHat className="w-12 h-12 text-white" />
                </div>
              </div>
            </SlideInLeft>

            <SlideInRight>
              <div className="space-y-6">
                <div>
                  <h3 className="font-display text-3xl sm:text-4xl font-bold mb-2">Kamal Goyal</h3>
                  <p className="text-xl text-primary font-semibold mb-4">Founder & Head Chef</p>
                </div>

                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                  From humble beginnings in New Delhi to creating one of the city&apos;s most beloved momo destinations, 
                  Kamal&apos;s journey is fueled by passion, dedication, and an unwavering commitment to authentic flavors.
                </p>

                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                  With years of culinary expertise and a deep understanding of traditional recipes, 
                  Kamal has perfected the art of creating momos that are not just food, but an experience. 
                  Every recipe is crafted with care, every ingredient chosen with precision.
                </p>

                <div className="grid grid-cols-2 gap-4 pt-4">
                  <Card className="shadow-card">
                    <CardContent className="p-4 text-center">
                      <Award className="w-8 h-8 text-primary mx-auto mb-2" />
                      <p className="font-bold">15+ Years</p>
                      <p className="text-sm text-muted-foreground">Experience</p>
                    </CardContent>
                  </Card>
                  <Card className="shadow-card">
                    <CardContent className="p-4 text-center">
                      <Trophy className="w-8 h-8 text-primary mx-auto mb-2" />
                      <p className="font-bold">Award Winner</p>
                      <p className="text-sm text-muted-foreground">2023 & 2024</p>
                    </CardContent>
                  </Card>
                </div>

                <blockquote className="border-l-4 border-primary pl-4 italic text-muted-foreground">
                  &quot;Every momo that leaves our kitchen carries a piece of my heart. 
                  We don&apos;t just serve food; we create memories.&quot;
                  <span className="block mt-2 text-sm font-semibold text-foreground">- Kamal Goyal</span>
                </blockquote>
              </div>
            </SlideInRight>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
