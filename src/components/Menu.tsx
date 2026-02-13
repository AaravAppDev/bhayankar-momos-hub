import { useEffect, useState, useRef, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Flame, ChevronLeft, ChevronRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { FadeIn, ScaleIn } from "./ScrollAnimations";
import { Button } from "@/components/ui/button";
import chickenMomos from "@/assets/chicken-momos.jpg";
import vegMomos from "@/assets/veg-momos.jpg";
import paneerMomos from "@/assets/paneer-momos.jpg";

interface MenuItemData {
  id: string;
  name: string;
  description: string;
  price: string;
  spice_level: number;
  is_veg: boolean;
  image_url: string | null;
}

const fallbackItems: MenuItemData[] = [
  {
    id: "1",
    name: "Classic Chicken Momos",
    description: "Juicy chicken wrapped in thin dough, steamed to perfection with our secret spice blend.",
    price: "₹120",
    spice_level: 2,
    image_url: chickenMomos,
    is_veg: false,
  },
  {
    id: "2",
    name: "Spicy Veg Momos",
    description: "Fresh vegetables with our signature spicy kick. A vegetarian's dream come true!",
    price: "₹100",
    spice_level: 3,
    image_url: vegMomos,
    is_veg: true,
  },
  {
    id: "3",
    name: "Paneer Delight",
    description: "Cottage cheese momos with aromatic herbs. Creamy, dreamy, and absolutely delicious.",
    price: "₹130",
    spice_level: 1,
    image_url: paneerMomos,
    is_veg: true,
  },
];

const MenuItemCard = ({ item }: { item: MenuItemData }) => (
  <Card className="group overflow-hidden shadow-card hover:shadow-glow transition-smooth cursor-pointer min-w-[280px] sm:min-w-[320px] snap-start flex-shrink-0">
    <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden">
      <img
        src={item.image_url || "/placeholder.svg"}
        alt={item.name}
        className="w-full h-full object-cover group-hover:scale-110 transition-smooth"
      />
      <div className="absolute top-4 right-4 flex gap-2">
        {item.is_veg && (
          <Badge variant="secondary" className="bg-green-500 text-white">
            Veg
          </Badge>
        )}
        {item.spice_level > 0 && (
          <Badge variant="secondary" className="bg-primary text-white flex items-center gap-1">
            {Array.from({ length: item.spice_level }).map((_, i) => (
              <Flame key={i} className="w-3 h-3" />
            ))}
          </Badge>
        )}
      </div>
    </div>
    <CardContent className="p-4 sm:p-6">
      <div className="flex justify-between items-start mb-2 gap-2">
        <h3 className="font-display text-lg sm:text-xl font-bold">{item.name}</h3>
        <span className="text-lg sm:text-xl font-bold text-primary whitespace-nowrap">{item.price}</span>
      </div>
      <p className="text-sm sm:text-base text-muted-foreground">{item.description}</p>
    </CardContent>
  </Card>
);

const Menu = () => {
  const [menuItems, setMenuItems] = useState<MenuItemData[]>(fallbackItems);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  useEffect(() => {
    const fetchItems = async () => {
      const { data } = await supabase
        .from("menu_items")
        .select("*")
        .eq("active", true)
        .order("sort_order", { ascending: true });

      if (data && data.length > 0) {
        setMenuItems(data);
      }
    };
    fetchItems();
  }, []);

  const updateScrollButtons = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 2);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    updateScrollButtons();
    el.addEventListener("scroll", updateScrollButtons, { passive: true });
    window.addEventListener("resize", updateScrollButtons);
    return () => {
      el.removeEventListener("scroll", updateScrollButtons);
      window.removeEventListener("resize", updateScrollButtons);
    };
  }, [menuItems, updateScrollButtons]);

  const scroll = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const scrollAmount = 340;
    el.scrollBy({ left: direction === "left" ? -scrollAmount : scrollAmount, behavior: "smooth" });
  };

  return (
    <section id="menu" className="py-12 sm:py-16 md:py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <FadeIn className="text-center mb-8 md:mb-12">
          <Badge variant="secondary" className="mb-4">Our Menu</Badge>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Dare to Try Our <span className="gradient-text">Signature Momos</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
            Every dumpling is a masterpiece, crafted with passion and served with fire.
          </p>
        </FadeIn>

        <div className="relative group">
          {canScrollLeft && (
            <Button
              variant="outline"
              size="icon"
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 rounded-full bg-background/90 backdrop-blur-sm shadow-lg opacity-0 group-hover:opacity-100 transition-smooth hidden sm:flex"
              onClick={() => scroll("left")}
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
          )}
          {canScrollRight && (
            <Button
              variant="outline"
              size="icon"
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 rounded-full bg-background/90 backdrop-blur-sm shadow-lg opacity-0 group-hover:opacity-100 transition-smooth hidden sm:flex"
              onClick={() => scroll("right")}
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          )}

          <div
            ref={scrollRef}
            className="flex gap-4 sm:gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4 -mx-4 px-4"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none", WebkitOverflowScrolling: "touch" }}
          >
            {menuItems.map((item, index) => (
              <ScaleIn key={item.id} delay={index * 0.08}>
                <MenuItemCard item={item} />
              </ScaleIn>
            ))}
          </div>

          <p className="text-center text-xs text-muted-foreground mt-2 sm:hidden">
            ← Swipe to see more →
          </p>
        </div>
      </div>
    </section>
  );
};

export default Menu;
