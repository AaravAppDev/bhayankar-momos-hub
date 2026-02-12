
-- Create menu_items table
CREATE TABLE public.menu_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  price TEXT NOT NULL,
  spice_level INTEGER NOT NULL DEFAULT 1,
  is_veg BOOLEAN NOT NULL DEFAULT false,
  image_url TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.menu_items ENABLE ROW LEVEL SECURITY;

-- Anyone can view active menu items
CREATE POLICY "Anyone can view active menu items"
ON public.menu_items
FOR SELECT
USING (active = true);

-- Admins can manage menu items
CREATE POLICY "Admins can manage menu items"
ON public.menu_items
FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role));

-- Trigger for updated_at
CREATE TRIGGER update_menu_items_updated_at
BEFORE UPDATE ON public.menu_items
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create storage bucket for menu images
INSERT INTO storage.buckets (id, name, public) VALUES ('menu-images', 'menu-images', true);

-- Storage policies
CREATE POLICY "Menu images are publicly accessible"
ON storage.objects FOR SELECT
USING (bucket_id = 'menu-images');

CREATE POLICY "Admins can upload menu images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'menu-images' AND has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update menu images"
ON storage.objects FOR UPDATE
USING (bucket_id = 'menu-images' AND has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete menu images"
ON storage.objects FOR DELETE
USING (bucket_id = 'menu-images' AND has_role(auth.uid(), 'admin'::app_role));
