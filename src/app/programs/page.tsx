import { SiteHeader } from "@/components/site/header";
import { CategoryFilter } from "@/components/site/category-filter";
import { ProgramCard } from "@/components/site/program-card";
import { ProgramsSearch } from "@/components/site/programs-search";
import { getProgramsByCategory } from "@/lib/data/programs";
import SiteFooter from "@/components/site/FooterNew";

export const dynamic = "force-dynamic";

type Props = {
  searchParams: Promise<{ category?: string; q?: string }>;
};

export default async function ProgramsPage({ searchParams }: Props) {
  const query = await searchParams;
  const activeCategory = query.category ?? "all";
  const searchQuery = query.q ?? "";
  const programs = await getProgramsByCategory(activeCategory, searchQuery);

  return (
    <>
      <SiteHeader />
      <main className="container flex-1 py-12">
        <h1 className="mb-3 text-4xl font-bold">כל התוכניות</h1>
        <p className="mb-6 max-w-2xl text-muted">
          התוכניות מוצגות ישירות ממסד הנתונים. רק תוכניות במצב &quot;מפורסם&quot; מופיעות כאן.
        </p>
        <ProgramsSearch defaultQuery={searchQuery} category={activeCategory} />
        <CategoryFilter active={activeCategory} />
        {programs.length > 0 ? (
          <div className="grid gap-5 md:grid-cols-3">
            {programs.map((program) => (
              <ProgramCard key={program.id} program={program} />
            ))}
          </div>
        ) : (
          <div className="mt-8 rounded-2xl border border-dashed border-stroke p-8 text-center text-muted">
            <p className="mb-2 text-lg font-semibold text-white">אין תוכניות להצגה</p>
            <p>
              {searchQuery
                ? "לא נמצאו תוצאות לחיפוש. נסי מילים אחרות."
                : "במסך הניהול: צרי תוכנית ובחרי סטטוס «מפורסם»."}
            </p>
          </div>
        )}
      </main>
      <SiteFooter />
    </>
  );
}
