import PageHeader from "@/components/PageHeader";
import DynamicContact from "@/components/DynamicContact";

const ContactPage = () => (
  <>
    <PageHeader
      eyebrow="Say Hello"
      title="Visit or"
      highlight="Message Us"
      description="Find the shop, our working hours, and drop a message — it lands straight in our DMs."
    />
    <DynamicContact />
  </>
);

export default ContactPage;
