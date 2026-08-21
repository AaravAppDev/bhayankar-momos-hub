import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  highlight?: string;
  description?: string;
}

const PageHeader = ({ eyebrow, title, highlight, description }: PageHeaderProps) => {
  return (
    <section className="relative overflow-hidden pt-28 pb-12 md:pt-36 md:pb-16 bg-muted/30">
      {/* living background */}
      <motion.div
        aria-hidden
        className="absolute -top-24 -left-16 w-72 h-72 rounded-full gradient-fire opacity-20 blur-3xl"
        animate={{ x: [0, 40, 0], y: [0, 20, 0], scale: [1, 1.15, 1] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="absolute -bottom-28 -right-10 w-80 h-80 rounded-full bg-accent opacity-20 blur-3xl"
        animate={{ x: [0, -30, 0], y: [0, -25, 0], scale: [1, 1.2, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container mx-auto px-4 relative z-10 text-center">
        {eyebrow && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <Badge variant="secondary" className="mb-4">{eyebrow}</Badge>
          </motion.div>
        )}
        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05, duration: 0.5 }}
          className="font-display text-3xl sm:text-4xl md:text-6xl font-bold mb-4"
        >
          {title} {highlight && <span className="gradient-text">{highlight}</span>}
        </motion.h1>
        {description && (
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12, duration: 0.5 }}
            className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            {description}
          </motion.p>
        )}
      </div>
    </section>
  );
};

export default PageHeader;
