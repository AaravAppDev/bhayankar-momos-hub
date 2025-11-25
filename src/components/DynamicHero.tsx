import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Flame, TrendingUp, Users, Award } from "lucide-react";
import heroImage from "@/assets/hero-momos.jpg";

const DynamicHero = () => {
  const [stats, setStats] = useState({
    momos_served: 50000,
    happy_customers: 10000,
    varieties: 15,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    const { data } = await supabase
      .from("dashboard_stats")
      .select("*")
      .single();
    
    if (data) {
      setStats(data);
    }
  };

  const scrollToMenu = () => {
    document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.6)), url(${heroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center text-white">
          <Badge variant="secondary" className="mb-6 bg-primary text-white animate-pulse">
            <Flame className="w-4 h-4 mr-2" />
            Delhi's Hottest Momos Since 2020
          </Badge>
          
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold mb-6 animate-fade-in">
            Dare to Try
            <br />
            <span className="gradient-text">Bhaynakar Momos</span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 text-gray-200 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            Where every bite tells a spicy story. Authentic flavors, bold spices, unforgettable taste.
          </p>
          
          <Button
            size="lg"
            className="animate-fade-in shadow-glow text-lg px-8 py-6"
            onClick={scrollToMenu}
            style={{ animationDelay: "0.4s" }}
          >
            <Flame className="mr-2 h-5 w-5" />
            Explore Our Menu
          </Button>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 animate-fade-in" style={{ animationDelay: "0.6s" }}>
            <div className="bg-background/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <TrendingUp className="w-10 h-10 mx-auto mb-3 text-primary" />
              <p className="text-3xl font-bold mb-2">{stats.momos_served.toLocaleString()}+</p>
              <p className="text-gray-200">Momos Served</p>
            </div>
            <div className="bg-background/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <Users className="w-10 h-10 mx-auto mb-3 text-primary" />
              <p className="text-3xl font-bold mb-2">{stats.happy_customers.toLocaleString()}+</p>
              <p className="text-gray-200">Happy Customers</p>
            </div>
            <div className="bg-background/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <Award className="w-10 h-10 mx-auto mb-3 text-primary" />
              <p className="text-3xl font-bold mb-2">{stats.varieties}+</p>
              <p className="text-gray-200">Varieties</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DynamicHero;
