import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const navItems = [
  { name: "Home", to: "/" },
  { name: "Blog", to: "/blog" },
  { name: "About", to: "/about" },
  { name: "Contact", to: "/contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => setIsOpen(false), [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed left-0 right-0 top-0 z-50 border-b text-hero-ink transition-smooth",
        scrolled
          ? "border-hero-ink/10 bg-hero-cream/95 shadow-card backdrop-blur-lg"
          : "border-hero-ink/10 bg-hero-cream/90 backdrop-blur-md",
      )}
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex min-w-0 items-center" aria-label="Bhayankar Momos home">
            <span className="truncate font-display text-lg font-bold uppercase text-hero-ink sm:text-xl">
              Bhayankar <span className="text-hero-crimson">Momos.</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-8 md:flex">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.to}
                end={item.to === "/"}
                className={({ isActive }) =>
                  cn(
                    "relative py-2 text-sm font-semibold transition-smooth hover:text-hero-crimson",
                    isActive ? "text-hero-crimson" : "text-hero-ink",
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    {item.name}
                    {isActive && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-hero-crimson"
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-10 w-10 rounded-sm text-hero-ink hover:bg-hero-ink hover:text-hero-cream md:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle navigation"
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden border-t border-hero-ink/10 md:hidden"
            >
              <div className="flex flex-col gap-1 py-3">
                {navItems.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.to}
                    end={item.to === "/"}
                    className={({ isActive }) =>
                      cn(
                        "border-l-2 px-4 py-3 text-sm font-semibold transition-smooth",
                        isActive
                          ? "border-hero-crimson bg-hero-crimson/5 text-hero-crimson"
                          : "border-transparent text-hero-ink hover:bg-hero-ink/5",
                      )
                    }
                  >
                    {item.name}
                  </NavLink>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;
