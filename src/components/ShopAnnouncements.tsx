import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { format, isAfter, isBefore, isToday } from "date-fns";

interface Announcement {
  id: string;
  title: string;
  message: string;
  start_date: string;
  end_date: string;
}

const ShopAnnouncements = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);

  useEffect(() => {
    fetchAnnouncements();

    // Subscribe to realtime updates
    const channel = supabase
      .channel('announcements_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'shop_announcements'
        },
        () => {
          fetchAnnouncements();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchAnnouncements = async () => {
    try {
      const today = new Date();
      const { data, error } = await supabase
        .from("shop_announcements")
        .select("*")
        .eq("active", true)
        .lte("start_date", today.toISOString().split('T')[0])
        .gte("end_date", today.toISOString().split('T')[0])
        .order("created_at", { ascending: false });

      if (error) throw error;
      setAnnouncements(data || []);
    } catch (error) {
      console.error("Error fetching announcements:", error);
    }
  };

  if (announcements.length === 0) return null;

  return (
    <div className="container mx-auto px-4 py-4 space-y-3">
      {announcements.map((announcement) => (
        <Alert key={announcement.id} variant="destructive" className="border-2 animate-in fade-in slide-in-from-top-2">
          <AlertCircle className="h-5 w-5" />
          <AlertTitle className="font-bold text-lg">{announcement.title}</AlertTitle>
          <AlertDescription className="mt-2">
            <p className="mb-2">{announcement.message}</p>
            <p className="text-sm font-medium">
              Closed: {format(new Date(announcement.start_date), "MMMM d")} - {format(new Date(announcement.end_date), "MMMM d, yyyy")}
            </p>
          </AlertDescription>
        </Alert>
      ))}
    </div>
  );
};

export default ShopAnnouncements;