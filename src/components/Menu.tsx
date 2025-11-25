import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Flame } from "lucide-react";
import chickenMomos from "@/assets/chicken-momos.jpg";
import vegMomos from "@/assets/veg-momos.jpg";
import paneerMomos from "@/assets/paneer-momos.jpg";

interface MenuItemProps {
  name: string;
  description: string;
  price: string;
  spiceLevel: number;
  image: string;
  isVeg?: boolean;
}

const MenuItem = ({ name, description, price, spiceLevel, image, isVeg }: MenuItemProps) => {
  return (
    <Card className="group overflow-hidden shadow-card hover:shadow-glow transition-smooth cursor-pointer">
      <div className="relative h-64 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-110 transition-smooth"
        />
        <div className="absolute top-4 right-4 flex gap-2">
          {isVeg && (
            <Badge variant="secondary" className="bg-green-500 text-white">
              Veg
            </Badge>
          )}
          <Badge variant="secondary" className="bg-primary text-white flex items-center gap-1">
            {Array.from({ length: spiceLevel }).map((_, i) => (
              <Flame key={i} className="w-3 h-3" />
            ))}
          </Badge>
        </div>
      </div>
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-display text-xl font-bold">{name}</h3>
          <span className="text-xl font-bold text-primary">{price}</span>
        </div>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
};

const Menu = () => {
  const menuItems: MenuItemProps[] = [
    {
      name: "Classic Chicken Momos",
      description: "Juicy chicken wrapped in thin dough, steamed to perfection with our secret spice blend.",
      price: "₹120",
      spiceLevel: 2,
      image: chickenMomos,
    },
    {
      name: "Spicy Veg Momos",
      description: "Fresh vegetables with our signature spicy kick. A vegetarian's dream come true!",
      price: "₹100",
      spiceLevel: 3,
      image: vegMomos,
      isVeg: true,
    },
    {
      name: "Paneer Delight",
      description: "Cottage cheese momos with aromatic herbs. Creamy, dreamy, and absolutely delicious.",
      price: "₹130",
      spiceLevel: 1,
      image: paneerMomos,
      isVeg: true,
    },
  ];

  return (
    <section id="menu" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">Our Menu</Badge>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Dare to Try Our <span className="gradient-text">Signature Momos</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Every dumpling is a masterpiece, crafted with passion and served with fire.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {menuItems.map((item) => (
            <MenuItem key={item.name} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Menu;
