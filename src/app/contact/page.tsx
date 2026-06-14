import { SiteHeader } from "@/components/site/header";
import SiteFooter from "@/components/site/FooterNew";
import { ContactFormPage } from "@/components/site/contact-form-page";

export default function ContactPage() {
  return (
    <>
      <SiteHeader />
      <ContactFormPage />
      <SiteFooter />
    </>
  );
}
