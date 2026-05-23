import { SiteHeader } from "@/components/site/header";
import { SiteFooter } from "@/components/site/footer";
import { CategoryFilter } from "@/components/site/category-filter";
import { ProgramCard } from "@/components/site/program-card";
import { getProgramsByCategory } from "@/lib/data/programs";

type Props = {
  searchParams: Promise<{ category?: string }>;
};

export default async function ProgramsPage({ searchParams }: Props) {
  const query = await searchParams;
  const activeCategory = query.category ?? "all";
  const programs = getProgramsByCategory(activeCategory);

  return (
    <>
      <SiteHeader />
      <main className="container flex-1 py-12">
        <h1 className="mb-3 text-4xl font-bold">כל התוכניות</h1>
        <p className="mb-8 max-w-2xl text-muted">
          בחרי קטגוריה כדי לסנן תוכניות רלוונטיות. בכל תוכנית תוכלי לראות פירוט מלא ולשלוח פנייה.
        </p>
        <CategoryFilter active={activeCategory} />
        <div className="grid gap-5 md:grid-cols-3">
          {programs.map((program) => (
            <ProgramCard key={program.id} program={program} />
          ))}
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
