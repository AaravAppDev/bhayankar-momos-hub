import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { LogOut } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BlogManager from "@/components/admin/BlogManager";
import ContactManager from "@/components/admin/ContactManager";
import BranchManager from "@/components/admin/BranchManager";
import StatsManager from "@/components/admin/StatsManager";
import SocialLinksManager from "@/components/admin/SocialLinksManager";
import ContactMessagesManager from "@/components/admin/ContactMessagesManager";
import AnnouncementsManager from "@/components/admin/AnnouncementsManager";

const Admin = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate("/auth");
        return;
      }

      const { data: roleData } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", session.user.id)
        .eq("role", "admin")
        .maybeSingle();

      if (!roleData) {
        toast.error("Access denied. Admin privileges required.");
        navigate("/");
        return;
      }

      setIsAdmin(true);
    } catch (error) {
      console.error("Auth check error:", error);
      navigate("/auth");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success("Logged out successfully");
    navigate("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg">Loading...</p>
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="border-b bg-background shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3 md:py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <h1 className="font-display text-xl sm:text-2xl md:text-3xl font-bold gradient-text">
            Admin Dashboard
          </h1>
          <Button onClick={handleLogout} variant="outline" size="sm" className="w-full sm:w-auto">
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 md:py-8">
        <Tabs defaultValue="messages" className="space-y-6">
          <div className="overflow-x-auto -mx-4 px-4">
            <TabsList className="grid w-full grid-cols-3 sm:grid-cols-4 lg:grid-cols-7 gap-1 sm:gap-2 min-w-max">
              <TabsTrigger value="messages" className="text-xs sm:text-sm">Messages</TabsTrigger>
              <TabsTrigger value="announcements" className="text-xs sm:text-sm">Closures</TabsTrigger>
              <TabsTrigger value="stats" className="text-xs sm:text-sm">Stats</TabsTrigger>
              <TabsTrigger value="blogs" className="text-xs sm:text-sm">Blogs</TabsTrigger>
              <TabsTrigger value="branches" className="text-xs sm:text-sm">Branches</TabsTrigger>
              <TabsTrigger value="contact" className="text-xs sm:text-sm">Contact</TabsTrigger>
              <TabsTrigger value="social" className="text-xs sm:text-sm">Social</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="messages">
            <ContactMessagesManager />
          </TabsContent>

          <TabsContent value="announcements">
            <AnnouncementsManager />
          </TabsContent>

          <TabsContent value="stats">
            <StatsManager />
          </TabsContent>

          <TabsContent value="blogs">
            <BlogManager />
          </TabsContent>

          <TabsContent value="branches">
            <BranchManager />
          </TabsContent>

          <TabsContent value="contact">
            <ContactManager />
          </TabsContent>

          <TabsContent value="social">
            <SocialLinksManager />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Admin;
