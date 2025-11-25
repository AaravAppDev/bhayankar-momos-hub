import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

const StatsManager = () => {
  const [stats, setStats] = useState({
    id: "",
    momos_served: 0,
    happy_customers: 0,
    varieties: 0,
  });
  const [loading, setLoading] = useState(false);

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

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase
        .from("dashboard_stats")
        .update({
          momos_served: stats.momos_served,
          happy_customers: stats.happy_customers,
          varieties: stats.varieties,
        })
        .eq("id", stats.id);

      if (error) throw error;
      toast.success("Stats updated successfully!");
    } catch (error) {
      toast.error("Failed to update stats");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Dashboard Statistics</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleUpdate} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="momos_served">Momos Served</Label>
              <Input
                id="momos_served"
                type="number"
                value={stats.momos_served}
                onChange={(e) => setStats({ ...stats, momos_served: parseInt(e.target.value) })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="happy_customers">Happy Customers</Label>
              <Input
                id="happy_customers"
                type="number"
                value={stats.happy_customers}
                onChange={(e) => setStats({ ...stats, happy_customers: parseInt(e.target.value) })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="varieties">Varieties</Label>
              <Input
                id="varieties"
                type="number"
                value={stats.varieties}
                onChange={(e) => setStats({ ...stats, varieties: parseInt(e.target.value) })}
                required
              />
            </div>
          </div>
          <Button type="submit" disabled={loading}>
            {loading ? "Updating..." : "Update Stats"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default StatsManager;
