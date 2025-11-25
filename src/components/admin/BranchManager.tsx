import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Trash2, Edit, Plus } from "lucide-react";
import { Switch } from "@/components/ui/switch";

interface Branch {
  id: string;
  name: string;
  address: string;
  phone: string;
  is_main: boolean;
  working_hours: string;
  map_url: string;
  active: boolean;
}

const BranchManager = () => {
  const [branches, setBranches] = useState<Branch[]>([]);
  const [editing, setEditing] = useState<Branch | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchBranches();
  }, []);

  const fetchBranches = async () => {
    const { data } = await supabase
      .from("shop_branches")
      .select("*")
      .order("is_main", { ascending: false });
    
    if (data) {
      setBranches(data);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editing) return;
    setLoading(true);

    try {
      if (editing.id) {
        const { error } = await supabase
          .from("shop_branches")
          .update(editing)
          .eq("id", editing.id);
        if (error) throw error;
        toast.success("Branch updated!");
      } else {
        const { error } = await supabase
          .from("shop_branches")
          .insert(editing);
        if (error) throw error;
        toast.success("Branch created!");
      }
      setEditing(null);
      fetchBranches();
    } catch (error) {
      toast.error("Failed to save branch");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this branch?")) return;
    
    const { error } = await supabase
      .from("shop_branches")
      .delete()
      .eq("id", id);
    
    if (error) {
      toast.error("Failed to delete");
    } else {
      toast.success("Branch deleted!");
      fetchBranches();
    }
  };

  const startNew = () => {
    setEditing({
      id: "",
      name: "",
      address: "",
      phone: "",
      is_main: false,
      working_hours: "Mon-Sun: 11:00 AM - 10:00 PM",
      map_url: "",
      active: true,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Shop Branches</h2>
        <Button onClick={startNew}>
          <Plus className="w-4 h-4 mr-2" />
          New Branch
        </Button>
      </div>

      {editing && (
        <Card>
          <CardHeader>
            <CardTitle>{editing.id ? "Edit" : "New"} Branch</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={editing.name}
                  onChange={(e) => setEditing({ ...editing, name: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Textarea
                  id="address"
                  value={editing.address}
                  onChange={(e) => setEditing({ ...editing, address: e.target.value })}
                  required
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={editing.phone}
                    onChange={(e) => setEditing({ ...editing, phone: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="working_hours">Working Hours</Label>
                  <Input
                    id="working_hours"
                    value={editing.working_hours}
                    onChange={(e) => setEditing({ ...editing, working_hours: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="map_url">Map URL (Optional)</Label>
                <Input
                  id="map_url"
                  value={editing.map_url}
                  onChange={(e) => setEditing({ ...editing, map_url: e.target.value })}
                />
              </div>
              <div className="flex gap-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="is_main"
                    checked={editing.is_main}
                    onCheckedChange={(checked) => setEditing({ ...editing, is_main: checked })}
                  />
                  <Label htmlFor="is_main">Main Branch</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="active"
                    checked={editing.active}
                    onCheckedChange={(checked) => setEditing({ ...editing, active: checked })}
                  />
                  <Label htmlFor="active">Active</Label>
                </div>
              </div>
              <div className="flex gap-2">
                <Button type="submit" disabled={loading}>
                  {loading ? "Saving..." : "Save"}
                </Button>
                <Button type="button" variant="outline" onClick={() => setEditing(null)}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {branches.map((branch) => (
          <Card key={branch.id}>
            <CardContent className="pt-6">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold">{branch.name}</h3>
                {branch.is_main && (
                  <span className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded">Main</span>
                )}
              </div>
              <p className="text-sm text-muted-foreground mb-2">{branch.address}</p>
              <p className="text-sm mb-2">{branch.phone}</p>
              <p className="text-sm text-muted-foreground mb-4">{branch.working_hours}</p>
              <div className="flex justify-between items-center">
                <span className={`text-xs ${branch.active ? 'text-green-500' : 'text-muted-foreground'}`}>
                  {branch.active ? 'Active' : 'Inactive'}
                </span>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => setEditing(branch)}>
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => handleDelete(branch.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default BranchManager;
