import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import DynamicBlog from "@/components/DynamicBlog";
import { FadeIn } from "@/components/ScrollAnimations";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import founderImage from "@/assets/founder-kamal.jpg";

const BlogPage = () => (
  <>
    <PageHeader
      eyebrow="Our Stories"
      title="Latest from the"
      highlight="Bhayankar Kitchen"
      description="Spicy tales, customer favourites, and the journey behind every dumpling."
    />

    <section className="pt-10 sm:pt-14">
      <div className="container mx-auto px-4">
        <FadeIn>
          <Link to="/blog/bhayankar-momos-founder" className="block group">
            <Card className="overflow-hidden shadow-card hover:shadow-glow transition-smooth">
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="h-56 md:h-full overflow-hidden">
                  <img
                    src={founderImage}
                    alt="Kamal Goyal, founder of Bhayankar Momos"
                    className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
                    loading="lazy"
                  />
                </div>
                <CardContent className="p-6 sm:p-8 flex flex-col justify-center">
                  <Badge variant="secondary" className="mb-3 w-fit">Founder Story</Badge>
                  <h2 className="font-display text-2xl sm:text-3xl font-bold mb-3">
                    Bhayankar Momos Founder: Kamal Goyal
                  </h2>
                  <p className="text-muted-foreground mb-4">
                    From a single cart to the city&apos;s boldest momos — the story of the man behind the name.
                  </p>
                  <span className="inline-flex items-center gap-2 text-primary font-medium">
                    Read the story <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-smooth" />
                  </span>
                </CardContent>
              </div>
            </Card>
          </Link>
        </FadeIn>
      </div>
    </section>

    <DynamicBlog />
  </>
);

export default BlogPage;
