import { useState, useEffect, useRef, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, Upload, GripVertical, Flame, ArrowUp, ArrowDown } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: string;
  spice_level: number;
  is_veg: boolean;
  image_url: string | null;
  sort_order: number;
  active: boolean;
}

const MenuManager = () => {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [uploading, setUploading] = useState(false);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    spice_level: 1,
    is_veg: false,
    image_url: null as string | null,
    sort_order: 0,
    active: true,
  });

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const { data, error } = await supabase
      .from("menu_items")
      .select("*")
      .order("sort_order", { ascending: true });

    if (error) {
      toast.error("Failed to fetch menu items");
    } else {
      setItems(data || []);
    }
    setLoading(false);
  };

  const resetForm = () => {
    setForm({
      name: "",
      description: "",
      price: "",
      spice_level: 1,
      is_veg: false,
      image_url: null,
      sort_order: items.length,
      active: true,
    });
    setEditingItem(null);
  };

  const openEdit = (item: MenuItem) => {
    setEditingItem(item);
    setForm({
      name: item.name,
      description: item.description,
      price: item.price,
      spice_level: item.spice_level,
      is_veg: item.is_veg,
      image_url: item.image_url,
      sort_order: item.sort_order,
      active: item.active,
    });
    setDialogOpen(true);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file");
      return;
    }

    setUploading(true);
    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from("menu-images")
      .upload(fileName, file);

    if (uploadError) {
      toast.error("Failed to upload image");
      setUploading(false);
      return;
    }

    const { data: urlData } = supabase.storage
      .from("menu-images")
      .getPublicUrl(fileName);

    setForm((prev) => ({ ...prev, image_url: urlData.publicUrl }));
    setUploading(false);
    toast.success("Image uploaded");
  };

  const handleSave = async () => {
    if (!form.name.trim() || !form.price.trim()) {
      toast.error("Name and price are required");
      return;
    }

    if (editingItem) {
      const { error } = await supabase
        .from("menu_items")
        .update(form)
        .eq("id", editingItem.id);

      if (error) {
        toast.error("Failed to update item");
      } else {
        toast.success("Item updated");
      }
    } else {
      const { error } = await supabase.from("menu_items").insert(form);

      if (error) {
        toast.error("Failed to add item");
      } else {
        toast.success("Item added");
      }
    }

    setDialogOpen(false);
    resetForm();
    fetchItems();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this menu item?")) return;

    const { error } = await supabase.from("menu_items").delete().eq("id", id);
    if (error) {
      toast.error("Failed to delete item");
    } else {
      toast.success("Item deleted");
      fetchItems();
    }
  };

  const toggleActive = async (item: MenuItem) => {
    const { error } = await supabase
      .from("menu_items")
      .update({ active: !item.active })
      .eq("id", item.id);

    if (error) {
      toast.error("Failed to update item");
    } else {
      fetchItems();
    }
  };

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    setDragOverIndex(index);
  };

  const handleDrop = async (targetIndex: number) => {
    if (draggedIndex === null || draggedIndex === targetIndex) {
      setDraggedIndex(null);
      setDragOverIndex(null);
      return;
    }

    const reordered = [...items];
    const [moved] = reordered.splice(draggedIndex, 1);
    reordered.splice(targetIndex, 0, moved);

    // Optimistic update
    setItems(reordered);
    setDraggedIndex(null);
    setDragOverIndex(null);

    // Persist new order
    await persistOrder(reordered);
  };

  const moveItem = async (index: number, direction: "up" | "down") => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= items.length) return;

    const reordered = [...items];
    [reordered[index], reordered[targetIndex]] = [reordered[targetIndex], reordered[index]];
    setItems(reordered);
    await persistOrder(reordered);
  };

  const persistOrder = async (reordered: MenuItem[]) => {
    const updates = reordered.map((item, i) =>
      supabase.from("menu_items").update({ sort_order: i }).eq("id", item.id)
    );

    const results = await Promise.all(updates);
    const hasError = results.some((r) => r.error);
    if (hasError) {
      toast.error("Failed to save order");
      fetchItems();
    } else {
      toast.success("Order updated");
    }
  };

  if (loading) return <p>Loading menu items...</p>;

  return (
    <Card>
      <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <CardTitle className="text-lg sm:text-xl">Menu Items</CardTitle>
        <Dialog open={dialogOpen} onOpenChange={(open) => { setDialogOpen(open); if (!open) resetForm(); }}>
          <DialogTrigger asChild>
            <Button size="sm" className="w-full sm:w-auto">
              <Plus className="w-4 h-4 mr-2" /> Add Item
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingItem ? "Edit Item" : "Add New Item"}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-2">
              <div>
                <Label>Name *</Label>
                <Input
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  placeholder="e.g. Chicken Momos"
                />
              </div>
              <div>
                <Label>Description</Label>
                <Textarea
                  value={form.description}
                  onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                  placeholder="A short description..."
                  rows={2}
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label>Price *</Label>
                  <Input
                    value={form.price}
                    onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))}
                    placeholder="₹120"
                  />
                </div>
                <div>
                  <Label>Spice Level (1-5)</Label>
                  <Input
                    type="number"
                    min={1}
                    max={5}
                    value={form.spice_level}
                    onChange={(e) => setForm((f) => ({ ...f, spice_level: parseInt(e.target.value) || 1 }))}
                  />
                </div>
              </div>
              <div>
                <Label>Image</Label>
                {form.image_url && (
                  <img src={form.image_url} alt="Preview" className="w-full h-32 object-cover rounded-md mb-2" />
                )}
                <div className="flex items-center gap-2">
                  <label className="flex items-center gap-2 cursor-pointer px-3 py-2 border rounded-md text-sm hover:bg-muted transition-smooth">
                    <Upload className="w-4 h-4" />
                    {uploading ? "Uploading..." : "Upload Image"}
                    <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} disabled={uploading} />
                  </label>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Switch checked={form.is_veg} onCheckedChange={(v) => setForm((f) => ({ ...f, is_veg: v }))} />
                <Label>Vegetarian</Label>
              </div>
              <div className="flex items-center gap-3">
                <Switch checked={form.active} onCheckedChange={(v) => setForm((f) => ({ ...f, active: v }))} />
                <Label>Active</Label>
              </div>
              <div>
                <Label>Sort Order</Label>
                <Input
                  type="number"
                  value={form.sort_order}
                  onChange={(e) => setForm((f) => ({ ...f, sort_order: parseInt(e.target.value) || 0 }))}
                />
              </div>
              <Button onClick={handleSave} className="w-full">
                {editingItem ? "Update Item" : "Add Item"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        {items.length === 0 ? (
          <p className="text-muted-foreground text-center py-8">No menu items yet. Add your first item!</p>
        ) : (
          <div className="space-y-1">
            {items.map((item, index) => (
              <div
                key={item.id}
                draggable
                onDragStart={() => handleDragStart(index)}
                onDragOver={(e) => handleDragOver(e, index)}
                onDragEnd={() => { setDraggedIndex(null); setDragOverIndex(null); }}
                onDrop={() => handleDrop(index)}
                className={`flex items-center gap-3 p-3 rounded-lg border transition-all duration-200 ${
                  !item.active ? "opacity-50" : ""
                } ${draggedIndex === index ? "opacity-30 scale-95" : ""} ${
                  dragOverIndex === index && draggedIndex !== index ? "border-primary border-2 bg-primary/5" : ""
                }`}
              >
                <div className="flex flex-col items-center gap-0.5 flex-shrink-0">
                  <GripVertical className="w-4 h-4 text-muted-foreground cursor-grab active:cursor-grabbing hidden sm:block" />
                  <Button variant="ghost" size="icon" className="h-6 w-6 sm:hidden" onClick={() => moveItem(index, "up")} disabled={index === 0}>
                    <ArrowUp className="w-3 h-3" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-6 w-6 sm:hidden" onClick={() => moveItem(index, "down")} disabled={index === items.length - 1}>
                    <ArrowDown className="w-3 h-3" />
                  </Button>
                </div>
                {item.image_url ? (
                  <img src={item.image_url} alt={item.name} className="w-12 h-12 sm:w-16 sm:h-16 rounded-md object-cover flex-shrink-0" />
                ) : (
                  <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-md bg-muted flex items-center justify-center flex-shrink-0">
                    <span className="text-xs text-muted-foreground">No img</span>
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 className="font-semibold text-sm sm:text-base truncate">{item.name}</h4>
                    {item.is_veg && (
                      <span className="text-xs bg-green-500 text-white px-1.5 py-0.5 rounded">Veg</span>
                    )}
                    <span className="flex items-center text-primary">
                      {Array.from({ length: item.spice_level }).map((_, i) => (
                        <Flame key={i} className="w-3 h-3" />
                      ))}
                    </span>
                  </div>
                  <p className="text-sm font-bold text-primary">{item.price}</p>
                </div>
                <div className="flex items-center gap-1 flex-shrink-0">
                  <Switch checked={item.active} onCheckedChange={() => toggleActive(item)} />
                  <Button variant="ghost" size="icon" onClick={() => openEdit(item)}>
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(item.id)}>
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MenuManager;
