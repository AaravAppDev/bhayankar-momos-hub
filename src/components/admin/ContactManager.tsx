import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

const ContactManager = () => {
  const [contact, setContact] = useState({
    id: "",
    email: "",
    phone: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchContact();
  }, []);

  const fetchContact = async () => {
    const { data } = await supabase
      .from("contact_info")
      .select("*")
      .single();
    
    if (data) {
      setContact(data);
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase
        .from("contact_info")
        .update({
          email: contact.email,
          phone: contact.phone,
        })
        .eq("id", contact.id);

      if (error) throw error;
      toast.success("Contact info updated!");
    } catch (error) {
      toast.error("Failed to update contact info");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Contact Information</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleUpdate} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={contact.email}
              onChange={(e) => setContact({ ...contact, email: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              type="tel"
              value={contact.phone}
              onChange={(e) => setContact({ ...contact, phone: e.target.value })}
              required
            />
          </div>
          <Button type="submit" disabled={loading}>
            {loading ? "Updating..." : "Update Contact Info"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ContactManager;
