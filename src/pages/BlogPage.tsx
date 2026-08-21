import PageHeader from "@/components/PageHeader";
import DynamicBlog from "@/components/DynamicBlog";

const BlogPage = () => (
  <>
    <PageHeader
      eyebrow="Our Stories"
      title="Latest from the"
      highlight="Bhayankar Kitchen"
      description="Spicy tales, customer favourites, and the journey behind every dumpling."
    />
    <DynamicBlog />
  </>
);

export default BlogPage;
