export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  image: string;
  category: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "The Secret Behind Our Spicy Sauce",
    excerpt: "Discover the unique blend of ingredients that makes our signature sauce unforgettable.",
    content: "Our signature spicy sauce is the result of years of experimentation and passion. We blend traditional Himalayan spices with a modern twist, creating a flavor profile that's both authentic and innovative. The secret lies in our careful selection of red chilies, garlic, and a special blend of aromatic spices that have been passed down through generations.",
    date: "2024-01-15",
    author: "Chef Rajesh",
    image: "https://images.unsplash.com/photo-1596040033229-a0b63bf8d8a6?w=800&q=80",
    category: "Recipe"
  },
  {
    id: 2,
    title: "The Art of Perfect Momos: Tips from Our Kitchen",
    excerpt: "Learn the techniques that make our momos stand out from the rest.",
    content: "Making perfect momos is an art that requires patience, skill, and the right techniques. From kneading the dough to the perfect thickness to ensuring each fold is precise, every step matters. Our chefs have mastered the traditional steaming method that keeps our momos juicy on the inside while maintaining a delicate exterior. Temperature control and timing are crucial - steam for too long and they become soggy, too short and they're undercooked.",
    date: "2024-01-10",
    author: "Chef Priya",
    image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=800&q=80",
    category: "Tips & Tricks"
  },
  {
    id: 3,
    title: "Why Bhayankar Momos is Taking the City by Storm",
    excerpt: "From a small street cart to the most talked-about momo brand in town.",
    content: "What started as a humble street food venture has grown into a phenomenon. Our commitment to quality, authentic flavors, and customer satisfaction has made Bhayankar Momos a household name. We've never compromised on our ingredients, always sourcing the freshest vegetables and meats. Our secret? We treat every customer like family and every momo like it's our last. The name 'Bhayankar' (scary/fierce) represents our bold approach to flavors - we're not afraid to push boundaries and create something truly unique.",
    date: "2024-01-05",
    author: "Founder's Story",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&q=80",
    category: "Story"
  }
];
