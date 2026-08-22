import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Calendar, User, ArrowLeft, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FadeIn } from "@/components/ScrollAnimations";
import founderImage from "@/assets/founder-kamal.jpg";

const TITLE = "Bhayankar Momos Founder — Kamal Goyal's Story";
const DESCRIPTION =
  "Meet Kamal Goyal, the founder of Bhayankar Momos. The story behind India's boldest momos brand, from a single cart to a beloved neighbourhood shop.";
const URL = "https://www.bhayankarmomos.in/blog/bhayankar-momos-founder";

const setMeta = (key: "name" | "property", keyValue: string, content: string) => {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${key}="${keyValue}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(key, keyValue);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
};

const FounderBlog = () => {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = TITLE;
    setMeta('meta[name="description"]', "content", DESCRIPTION);
    setMeta('meta[property="og:title"]', "content", TITLE);
    setMeta('meta[property="og:description"]', "content", DESCRIPTION);
    setMeta('meta[property="og:url"]', "content", URL);

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    const prevCanonical = canonical?.href;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = URL;

    const ld = document.createElement("script");
    ld.type = "application/ld+json";
    ld.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Article",
      headline: TITLE,
      description: DESCRIPTION,
      mainEntityOfPage: URL,
      author: { "@type": "Person", name: "Kamal Goyal", jobTitle: "Founder" },
      about: {
        "@type": "Person",
        name: "Kamal Goyal",
        jobTitle: "Founder, Bhayankar Momos",
        worksFor: { "@type": "Organization", name: "Bhayankar Momos", url: "https://www.bhayankarmomos.in/" },
      },
      publisher: { "@type": "Organization", name: "Bhayankar Momos" },
    });
    document.head.appendChild(ld);

    return () => {
      document.title = prevTitle;
      if (prevCanonical && canonical) canonical.href = prevCanonical;
      ld.remove();
    };
  }, []);

  return (
    <article className="pt-28 pb-16 md:pt-36">
      <div className="container mx-auto px-4 max-w-3xl">
        <FadeIn>
          <Button asChild variant="ghost" size="sm" className="mb-6 -ml-2">
            <Link to="/blog">
              <ArrowLeft className="w-4 h-4 mr-1" /> Back to blog
            </Link>
          </Button>

          <Badge variant="secondary" className="mb-4">Founder Story</Badge>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Bhayankar Momos <span className="gradient-text">Founder</span>: Kamal Goyal
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-8">
            <span className="flex items-center gap-1"><User className="w-4 h-4" /> Bhayankar Momos</span>
            <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> Founder Story</span>
          </div>

          <img
            src={founderImage}
            alt="Kamal Goyal, founder of Bhayankar Momos"
            className="w-full rounded-2xl shadow-glow mb-8 object-cover aspect-[4/3]"
            loading="lazy"
          />
        </FadeIn>

        <FadeIn>
          <div className="space-y-5 text-base sm:text-lg leading-relaxed text-muted-foreground">
            <p>
              <strong className="text-foreground">Kamal Goyal is the founder of Bhayankar Momos</strong> — the
              man behind the name that made an entire neighbourhood fall in love with dangerously delicious
              dumplings. What began as one small cart, a steamer and a fiercely guarded chilli recipe is today a
              shop people cross town for.
            </p>

            <h2 className="font-display text-2xl font-bold text-foreground pt-4">The beginning</h2>
            <p>
              Kamal started with almost nothing but conviction: momos in the city were safe, predictable and
              forgettable. He wanted the opposite — momos that people would talk about, dare their friends to
              try, and come back for the very next evening. The name says it out loud. <em>Bhayankar</em>.
            </p>

            <h2 className="font-display text-2xl font-bold text-foreground pt-4">The obsession with flavour</h2>
            <p>
              Every batch of filling is hand-mixed, every wrapper rolled to the same thickness, and every sauce
              tasted before it reaches a plate. Kamal spent years tuning the heat curve of the signature chutney
              so it hits hard, then leaves you wanting one more bite instead of a glass of water.
            </p>

            <h2 className="font-display text-2xl font-bold text-foreground pt-4">Building more than a shop</h2>
            <p>
              For Kamal, regulars are not customers — they are the reason the shutter goes up each day. He knows
              orders by face, remembers who wants extra chutney, and treats feedback as the real recipe book.
              With new branches on the way, that personal touch is the one thing he refuses to scale away.
            </p>

            <blockquote className="border-l-4 border-primary pl-4 italic">
              &quot;Every momo that leaves our kitchen carries a piece of my heart. We don&apos;t just serve food;
              we create memories.&quot;
              <span className="block mt-2 text-sm font-semibold text-foreground not-italic">— Kamal Goyal, Founder</span>
            </blockquote>

            <h2 className="font-display text-2xl font-bold text-foreground pt-4">What&apos;s next</h2>
            <p>
              More branches, more flavours, and the same fire. Follow the journey on YouTube, or come taste it
              yourself at the shop.
            </p>
          </div>
        </FadeIn>

        <FadeIn>
          <div className="flex flex-col sm:flex-row gap-3 mt-10">
            <Button asChild size="lg" className="shadow-glow">
              <a href="https://www.youtube.com/@bhayankarmomos" target="_blank" rel="noopener noreferrer">
                <Youtube className="mr-2 h-5 w-5" /> Watch on YouTube
              </a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/contact">Visit the shop</Link>
            </Button>
          </div>
        </FadeIn>
      </div>
    </article>
  );
};

export default FounderBlog;
