-- Create enum for user roles
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- Create user_roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- Create blog_posts table
CREATE TABLE public.blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  image_url TEXT,
  author TEXT NOT NULL,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  published BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view published blogs"
  ON public.blog_posts FOR SELECT
  USING (published = true);

CREATE POLICY "Admins can do everything with blogs"
  ON public.blog_posts FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- Create shop_branches table
CREATE TABLE public.shop_branches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  address TEXT NOT NULL,
  phone TEXT NOT NULL,
  is_main BOOLEAN DEFAULT false,
  working_hours TEXT NOT NULL,
  map_url TEXT,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.shop_branches ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active branches"
  ON public.shop_branches FOR SELECT
  USING (active = true);

CREATE POLICY "Admins can manage branches"
  ON public.shop_branches FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- Create contact_info table
CREATE TABLE public.contact_info (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.contact_info ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view contact info"
  ON public.contact_info FOR SELECT
  USING (true);

CREATE POLICY "Admins can update contact info"
  ON public.contact_info FOR UPDATE
  USING (public.has_role(auth.uid(), 'admin'));

-- Create social_links table
CREATE TABLE public.social_links (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  platform TEXT NOT NULL,
  url TEXT NOT NULL,
  icon TEXT NOT NULL,
  active BOOLEAN DEFAULT true,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.social_links ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active social links"
  ON public.social_links FOR SELECT
  USING (active = true);

CREATE POLICY "Admins can manage social links"
  ON public.social_links FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- Create dashboard_stats table
CREATE TABLE public.dashboard_stats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  momos_served INTEGER NOT NULL DEFAULT 0,
  happy_customers INTEGER NOT NULL DEFAULT 0,
  varieties INTEGER NOT NULL DEFAULT 0,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.dashboard_stats ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view dashboard stats"
  ON public.dashboard_stats FOR SELECT
  USING (true);

CREATE POLICY "Admins can update dashboard stats"
  ON public.dashboard_stats FOR UPDATE
  USING (public.has_role(auth.uid(), 'admin'));

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_blog_posts_updated_at
  BEFORE UPDATE ON public.blog_posts
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_shop_branches_updated_at
  BEFORE UPDATE ON public.shop_branches
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_contact_info_updated_at
  BEFORE UPDATE ON public.contact_info
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_social_links_updated_at
  BEFORE UPDATE ON public.social_links
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_dashboard_stats_updated_at
  BEFORE UPDATE ON public.dashboard_stats
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default data
INSERT INTO public.contact_info (email, phone) 
VALUES ('info@bhayankarmomos.in', '+91 98765 43210');

INSERT INTO public.shop_branches (name, address, phone, is_main, working_hours, active)
VALUES (
  'Bhaynakar Momos - Main Branch',
  'Shop No. 15, MG Road, Delhi 110001',
  '+91 98765 43210',
  true,
  'Mon-Sun: 11:00 AM - 10:00 PM',
  true
);

INSERT INTO public.dashboard_stats (momos_served, happy_customers, varieties)
VALUES (50000, 10000, 15);

INSERT INTO public.social_links (platform, url, icon, active)
VALUES 
  ('Instagram', 'https://instagram.com/bhayankarmomos', 'Instagram', true),
  ('Facebook', 'https://facebook.com/bhayankarmomos', 'Facebook', true),
  ('Twitter', 'https://twitter.com/bhayankarmomos', 'Twitter', true);