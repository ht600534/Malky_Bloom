import Link from "next/link";
import { SiteHeader } from "@/components/site/header";
import { getProgramsPage, getCategoriesFromDb } from "@/lib/data/programs";
import ProgramsFeed from "@/components/site/programs-feed";
import SiteFooter from "@/components/site/FooterNew";

export const dynamic = "force-dynamic";

type Props = {
  searchParams: Promise<{ category?: string; q?: string }>;
};

export default async function ProgramsPage({ searchParams }: Props) {
  const query = await searchParams;
  const activeCategory = query.category ?? "all";
  const searchQuery = query.q ?? "";
  const [{ programs, hasMore }, activeLabels] = await Promise.all([
    getProgramsPage({ category: activeCategory, searchQuery, limit: 9, offset: 0 }),
    getCategoriesFromDb(),
  ]);
  const heroTitle = activeCategory === "all" ? "כל התוכניות" : activeLabels[activeCategory] ?? "כל התוכניות";

  /** מפה של צבעי כותרת + כפתור לפי slug קטגוריה */
  const categoryColors: Record<string, { hero: string; btn: string }> = {
    all: { hero: "#96FFA7", btn: "bg-gradient-to-r from-[#96FFA7] to-[#4FDAB3] text-black" },
  };
  for (const [slug, name] of Object.entries(activeLabels)) {
    if (slug === "all") continue;
    const matchHeb = name + " " + slug; // מחפש גם בשם העברי וגם ב-slug
    if (matchHeb.includes("חג") || matchHeb.includes("מעגל"))   { categoryColors[slug] = { hero: "#FCD34D", btn: "bg-[#FCD34D] text-black" }; }
    else if (matchHeb.includes("הורים") || matchHeb.includes("ערב")) { categoryColors[slug] = { hero: "#60A5FA", btn: "bg-[#60A5FA] text-white" }; }
    else if (matchHeb.includes("נושא") || matchHeb.includes("סדנא")) { categoryColors[slug] = { hero: "#67E8F9", btn: "bg-[#67E8F9] text-black" }; }
    else if (matchHeb.includes("מחנה") || matchHeb.includes("קייטנה") || slug === "camp") { categoryColors[slug] = { hero: "#FF7458", btn: "bg-[#FF7458] text-white" }; }
    else { categoryColors[slug] = { hero: "#96FFA7", btn: "bg-gradient-to-r from-[#96FFA7] to-[#4FDAB3] text-black" }; }
  }

  const heroColor = categoryColors[activeCategory]?.hero ?? "#96FFA7";

  return (
    <>
      <SiteHeader />
      <main className="bg-[#06070a] text-white">
        <div className="flex flex-col items-center justify-center min-h-[420px]">
          <h1
            className="mt-12 text-[100px] leading-none"
            style={{ fontFamily: "'Placebo_FM', Arial, sans-serif", color: heroColor }}
          >
            {heroTitle}
          </h1>
        </div>

        <div className="relative h-[74px] bg-[#F7F7F7]">
          <div
            className="
      absolute
      left-1/2
      top-0
      h-[74px]
      w-[120px]
      -translate-x-1/2
      -translate-y-1/2
      rounded-b-[99px]
      bg-black
    "
          />

          <div className="absolute left-1/2 top-0 z-10 -translate-x-1/2 -translate-y-[58%] "  >
            <img
              src="/figma/Isolation_Mode.svg"
              alt=""
              className="h-[34px] w-[34px] "
            />
          </div>
        </div>

        <section className="bg-[#F7F7F7] pb-40 pt-20">
          {/* חיפוש */}
          <div className="mb-10 flex justify-center">
            <div className="relative w-full max-w-[400px]">
              <form method="GET" action="/programs">
                {activeCategory !== "all" ? <input type="hidden" name="category" value={activeCategory} /> : null}
                <input
                  type="text"
                  name="q"
                  defaultValue={searchQuery}
                  placeholder="חפשי תוכנית לפי נושא, שם או תיאור..."
                  className="w-full h-[46px] pr-10 pl-4 rounded-full bg-white text-black text-right text-sm focus:outline-none focus:ring-2 focus:ring-[#4FDAB3] transition"
                  style={{ fontFamily: "Tahoma, Geneva, sans-serif" }}
                />
                <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9ca3af] hover:text-[#4FDAB3] transition-colors">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
                </button>
              </form>
            </div>
          </div>
          <div className="mb-20 flex flex-wrap justify-center gap-4">
            {Object.entries(activeLabels).map(([value, label]) => {
              const isActive = activeCategory === value;

              return (
                <Link  style={{ fontFamily: "Tahoma, Geneva, sans-serif", color: '#111116', border: `2px solid ${isActive ? '#111116' : 'white'}` }}
                  key={value}
                  scroll={false}
                  href={
                    value === "all"
                      ? "/programs"
                      : `/programs?category=${value}`
                  }
                  className={`
              h-[42px]
              px-8
              rounded-full
              flex
              items-center
              justify-center
              text-[15px]
              transition
              ${isActive
                      ? "bg-white text-black"
                      : "bg-[white] text-black"
                    }
            `}
                >
                  {label}
                </Link>
              );
            })}
          </div>
          <ProgramsFeed
            initialPrograms={programs}
            initialHasMore={hasMore}
            activeCategory={activeCategory}
            searchQuery={searchQuery}
          />
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
