import { SiteHeader } from "@/components/site/header";
import { ContactForm } from "@/components/site/contact-form";
import SiteFooter from "@/components/site/FooterNew";

export default function ContactPage() {
  return (
    <>
      <SiteHeader />
      <main className="container flex-1 py-12">
        <h1 className="mb-4 text-4xl font-bold">צור קשר</h1>
        <p className="mb-8 max-w-2xl text-muted">
          נשמח לעזור בהתאמת תוכנית למסגרת שלך. מלאי פרטים ונחזור אלייך בהקדם.
        </p>
        <ContactForm />
      </main>
      <SiteFooter />
    </>
  );
}
