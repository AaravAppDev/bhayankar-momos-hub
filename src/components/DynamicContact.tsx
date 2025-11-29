import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";

interface ContactInfo {
  email: string;
  phone: string;
}

interface Branch {
  id: string;
  name: string;
  address: string;
  phone: string;
  working_hours: string;
  is_main: boolean;
}

const contactSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(100, "Name is too long"),
  phone: z.string().trim().min(10, "Phone number must be at least 10 digits").max(15, "Phone number is too long"),
  email: z.string().trim().email("Invalid email address").max(255, "Email is too long"),
  message: z.string().trim().min(10, "Message must be at least 10 characters").max(1000, "Message is too long")
});

const DynamicContact = () => {
  const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null);
  const [branches, setBranches] = useState<Branch[]>([]);
  const [formData, setFormData] = useState({ name: "", phone: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const [contactResult, branchesResult] = await Promise.all([
      supabase.from("contact_info").select("*").single(),
      supabase.from("shop_branches").select("*").eq("active", true).order("is_main", { ascending: false }),
    ]);

    if (contactResult.data) setContactInfo(contactResult.data);
    if (branchesResult.data) setBranches(branchesResult.data);
  };

  const mainBranch = branches.find(b => b.is_main) || branches[0];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validate form data
      const validatedData = contactSchema.parse(formData);

      // Insert into database
      const { error } = await supabase
        .from("contact_messages")
        .insert([{
          name: validatedData.name,
          phone: validatedData.phone,
          email: validatedData.email,
          message: validatedData.message
        }]);

      if (error) throw error;

      toast.success("Message sent successfully! We'll get back to you soon.");
      setFormData({ name: "", phone: "", email: "", message: "" });
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast.error(error.errors[0].message);
      } else {
        console.error("Error submitting message:", error);
        toast.error("Failed to send message. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-12 sm:py-16 md:py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-12">
          <Badge variant="secondary" className="mb-4">Get In Touch</Badge>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Let's <span className="gradient-text">Connect</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
            Have questions? Want to know more? We're always here to chat about momos!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          <Card className="shadow-card">
            <CardContent className="p-6 md:p-8">
              <h3 className="font-display text-2xl font-bold mb-6">Send us a message</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input 
                  placeholder="Your Name" 
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
                <Input 
                  placeholder="Phone Number" 
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                />
                <Input 
                  placeholder="Email Address" 
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
                <Textarea 
                  placeholder="Your Message" 
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                />
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="space-y-6">
            {mainBranch && (
              <>
                <Card className="shadow-card">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <MapPin className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="font-bold mb-2">{mainBranch.name}</h4>
                        <p className="text-muted-foreground">{mainBranch.address}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-card">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <Phone className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="font-bold mb-2">Phone</h4>
                        <p className="text-muted-foreground">{mainBranch.phone}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </>
            )}

            {contactInfo && (
              <Card className="shadow-card">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Mail className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-bold mb-2">Email</h4>
                      <p className="text-muted-foreground">{contactInfo.email}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {mainBranch && (
              <Card className="shadow-card">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Clock className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-bold mb-2">Working Hours</h4>
                      <p className="text-muted-foreground">{mainBranch.working_hours}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {branches.length > 1 && (
              <Card className="shadow-card bg-primary/5">
                <CardContent className="p-6">
                  <h4 className="font-bold mb-3">All Our Locations</h4>
                  <div className="space-y-3">
                    {branches.map((branch) => (
                      <div key={branch.id} className="text-sm">
                        <p className="font-medium">{branch.name}</p>
                        <p className="text-muted-foreground">{branch.address}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DynamicContact;
