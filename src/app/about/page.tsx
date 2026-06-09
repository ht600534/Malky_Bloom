import { SiteHeader } from "@/components/site/header";
import { NewsletterForm } from "@/components/site/newsletter-form";
import SiteFooter from "@/components/site/FooterNew";

export default function AboutPage() {
  return (
    <>
      <SiteHeader />
      <main className="container flex-1 py-12">
        <h1 className="mb-4 text-4xl font-bold">אודות</h1>
        <p className="max-w-3xl leading-8 text-muted">
          מרכזות אונליין מספקת תוכניות תוכן מקצועיות למנהלות, רכזות וצוותים חינוכיים.
          האתר נבנה כדי להציג תוכניות בצורה מסודרת, עם פירוט מלא, סינון חכם לפי קטגוריה,
          ויכולת ניהול מלאה למנהלת לעדכון שוטף של תכנים.
        </p>
      </main>
      <SiteFooter />
    </>
  );
}
