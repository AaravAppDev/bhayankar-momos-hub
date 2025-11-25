import { Flame, Facebook, Instagram, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-charcoal text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 gradient-fire rounded-lg flex items-center justify-center">
                <Flame className="w-6 h-6 text-white" />
              </div>
              <span className="font-display text-xl font-bold">Bhayankar Momos</span>
            </div>
            <p className="text-white/70 mb-4">
              Serving the city's most daring and delicious momos since 2020. 
              We don't just make food, we create experiences.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary transition-smooth">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary transition-smooth">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary transition-smooth">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#home" className="text-white/70 hover:text-white transition-smooth">Home</a></li>
              <li><a href="#menu" className="text-white/70 hover:text-white transition-smooth">Menu</a></li>
              <li><a href="#blog" className="text-white/70 hover:text-white transition-smooth">Blog</a></li>
              <li><a href="#about" className="text-white/70 hover:text-white transition-smooth">About</a></li>
              <li><a href="#contact" className="text-white/70 hover:text-white transition-smooth">Contact</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-display font-bold mb-4">Stay Updated</h3>
            <p className="text-white/70 text-sm mb-3">
              Get the latest offers and updates delivered to your inbox!
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:border-primary"
              />
              <button className="px-4 py-2 gradient-fire rounded-lg font-medium hover:opacity-90 transition-smooth">
                Join
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 text-center text-white/70 text-sm">
          <p>© 2025 Bhayankar Momos. All rights reserved. Made with 🔥 and ❤️</p>
          <p className="mt-2">
            <a href="https://www.bhayankarmomos.in" className="hover:text-white transition-smooth">www.bhayankarmomos.in</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
