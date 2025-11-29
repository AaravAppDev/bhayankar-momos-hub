-- Create shop_announcements table for closure dates and special messages
CREATE TABLE public.shop_announcements (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.shop_announcements ENABLE ROW LEVEL SECURITY;

-- Admins can manage announcements
CREATE POLICY "Admins can manage announcements"
ON public.shop_announcements
FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role));

-- Anyone can view active announcements
CREATE POLICY "Anyone can view active announcements"
ON public.shop_announcements
FOR SELECT
USING (active = true);

-- Trigger for updated_at
CREATE TRIGGER update_shop_announcements_updated_at
BEFORE UPDATE ON public.shop_announcements
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();