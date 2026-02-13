
-- Drop restrictive policies
DROP POLICY "Anyone can view active menu items" ON public.menu_items;
DROP POLICY "Admins can manage menu items" ON public.menu_items;

-- Recreate as PERMISSIVE policies
CREATE POLICY "Anyone can view active menu items"
ON public.menu_items
FOR SELECT
TO public
USING (active = true);

CREATE POLICY "Admins can manage menu items"
ON public.menu_items
FOR ALL
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));
