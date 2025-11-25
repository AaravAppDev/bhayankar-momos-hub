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

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image_url: string;
  author: string;
  date: string;
  published: boolean;
}

const BlogManager = () => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [editing, setEditing] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    const { data } = await supabase
      .from("blog_posts")
      .select("*")
      .order("date", { ascending: false });
    
    if (data) {
      setBlogs(data);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editing) return;
    setLoading(true);

    try {
      if (editing.id) {
        const { error } = await supabase
          .from("blog_posts")
          .update(editing)
          .eq("id", editing.id);
        if (error) throw error;
        toast.success("Blog updated!");
      } else {
        const { error } = await supabase
          .from("blog_posts")
          .insert(editing);
        if (error) throw error;
        toast.success("Blog created!");
      }
      setEditing(null);
      fetchBlogs();
    } catch (error) {
      toast.error("Failed to save blog");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this blog post?")) return;
    
    const { error } = await supabase
      .from("blog_posts")
      .delete()
      .eq("id", id);
    
    if (error) {
      toast.error("Failed to delete");
    } else {
      toast.success("Blog deleted!");
      fetchBlogs();
    }
  };

  const startNew = () => {
    setEditing({
      id: "",
      title: "",
      excerpt: "",
      content: "",
      image_url: "",
      author: "",
      date: new Date().toISOString().split('T')[0],
      published: true,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Blog Posts</h2>
        <Button onClick={startNew}>
          <Plus className="w-4 h-4 mr-2" />
          New Post
        </Button>
      </div>

      {editing && (
        <Card>
          <CardHeader>
            <CardTitle>{editing.id ? "Edit" : "New"} Blog Post</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={editing.title}
                  onChange={(e) => setEditing({ ...editing, title: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="excerpt">Excerpt</Label>
                <Textarea
                  id="excerpt"
                  value={editing.excerpt}
                  onChange={(e) => setEditing({ ...editing, excerpt: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="content">Content</Label>
                <Textarea
                  id="content"
                  value={editing.content}
                  onChange={(e) => setEditing({ ...editing, content: e.target.value })}
                  rows={6}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="image_url">Image URL</Label>
                <Input
                  id="image_url"
                  value={editing.image_url}
                  onChange={(e) => setEditing({ ...editing, image_url: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="author">Author</Label>
                  <Input
                    id="author"
                    value={editing.author}
                    onChange={(e) => setEditing({ ...editing, author: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={editing.date}
                    onChange={(e) => setEditing({ ...editing, date: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="published"
                  checked={editing.published}
                  onCheckedChange={(checked) => setEditing({ ...editing, published: checked })}
                />
                <Label htmlFor="published">Published</Label>
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
        {blogs.map((blog) => (
          <Card key={blog.id}>
            <CardContent className="pt-6">
              <h3 className="font-bold mb-2">{blog.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">{blog.excerpt}</p>
              <div className="flex justify-between items-center">
                <span className={`text-xs ${blog.published ? 'text-green-500' : 'text-muted-foreground'}`}>
                  {blog.published ? 'Published' : 'Draft'}
                </span>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => setEditing(blog)}>
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => handleDelete(blog.id)}>
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

export default BlogManager;
