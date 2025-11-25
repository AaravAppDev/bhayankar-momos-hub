import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Trash2, Edit, Plus } from "lucide-react";
import { Switch } from "@/components/ui/switch";

interface SocialLink {
  id: string;
  platform: string;
  url: string;
  icon: string;
  active: boolean;
}

const SocialLinksManager = () => {
  const [links, setLinks] = useState<SocialLink[]>([]);
  const [editing, setEditing] = useState<SocialLink | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchLinks();
  }, []);

  const fetchLinks = async () => {
    const { data } = await supabase
      .from("social_links")
      .select("*")
      .order("platform");
    
    if (data) {
      setLinks(data);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editing) return;
    setLoading(true);

    try {
      if (editing.id) {
        const { error } = await supabase
          .from("social_links")
          .update(editing)
          .eq("id", editing.id);
        if (error) throw error;
        toast.success("Social link updated!");
      } else {
        const { error } = await supabase
          .from("social_links")
          .insert(editing);
        if (error) throw error;
        toast.success("Social link created!");
      }
      setEditing(null);
      fetchLinks();
    } catch (error) {
      toast.error("Failed to save social link");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this social link?")) return;
    
    const { error } = await supabase
      .from("social_links")
      .delete()
      .eq("id", id);
    
    if (error) {
      toast.error("Failed to delete");
    } else {
      toast.success("Social link deleted!");
      fetchLinks();
    }
  };

  const startNew = () => {
    setEditing({
      id: "",
      platform: "",
      url: "",
      icon: "",
      active: true,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Social Links</h2>
        <Button onClick={startNew}>
          <Plus className="w-4 h-4 mr-2" />
          New Link
        </Button>
      </div>

      {editing && (
        <Card>
          <CardHeader>
            <CardTitle>{editing.id ? "Edit" : "New"} Social Link</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="platform">Platform Name</Label>
                <Input
                  id="platform"
                  value={editing.platform}
                  onChange={(e) => setEditing({ ...editing, platform: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="url">URL</Label>
                <Input
                  id="url"
                  type="url"
                  value={editing.url}
                  onChange={(e) => setEditing({ ...editing, url: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="icon">Icon Name (Lucide icon)</Label>
                <Input
                  id="icon"
                  value={editing.icon}
                  onChange={(e) => setEditing({ ...editing, icon: e.target.value })}
                  placeholder="e.g., Instagram, Facebook, Twitter"
                  required
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="active"
                  checked={editing.active}
                  onCheckedChange={(checked) => setEditing({ ...editing, active: checked })}
                />
                <Label htmlFor="active">Active</Label>
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {links.map((link) => (
          <Card key={link.id}>
            <CardContent className="pt-6">
              <h3 className="font-bold mb-2">{link.platform}</h3>
              <p className="text-sm text-muted-foreground mb-4 truncate">{link.url}</p>
              <div className="flex justify-between items-center">
                <span className={`text-xs ${link.active ? 'text-green-500' : 'text-muted-foreground'}`}>
                  {link.active ? 'Active' : 'Inactive'}
                </span>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => setEditing(link)}>
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => handleDelete(link.id)}>
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

export default SocialLinksManager;
