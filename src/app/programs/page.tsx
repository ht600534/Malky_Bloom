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
    getProgramsPage({ category: activeCategory, searchQuery, limit: 12, offset: 0 }),
    getCategoriesFromDb(),
  ]);
  const heroTitle = activeCategory === "all" ? "כל התוכניות" : activeLabels[activeCategory] ?? "כל התוכניות";

  /** מפה של צבעי כותרת + כפתור לפי slug קטגוריה */
  const categoryColors: Record<string, { hero: string; btn: string }> = {
    all: { hero: "#4be6b5", btn: "bg-gradient-to-r from-[#4be6b5] to-[#4be6b5] text-black" },
  };
  for (const [slug, name] of Object.entries(activeLabels)) {
    if (slug === "all") continue;
    const matchHeb = name + " " + slug; // מחפש גם בשם העברי וגם ב-slug
    if (matchHeb.includes("חג") || matchHeb.includes("מעגל"))   { categoryColors[slug] = { hero: "#FCD34D", btn: "bg-[#FCD34D] text-black" }; }
    else if (matchHeb.includes("הורים") || matchHeb.includes("ערב")) { categoryColors[slug] = { hero: "#60A5FA", btn: "bg-[#60A5FA] text-white" }; }
    else if (matchHeb.includes("נושא") || matchHeb.includes("סדנא")) { categoryColors[slug] = { hero: "#67E8F9", btn: "bg-[#67E8F9] text-black" }; }
    else if (matchHeb.includes("מחנה") || matchHeb.includes("קייטנה") || slug === "camp") { categoryColors[slug] = { hero: "#ff7a6b", btn: "bg-[#ff7a6b] text-white" }; }
    else { categoryColors[slug] = { hero: "#4be6b5", btn: "bg-gradient-to-r from-[#4be6b5] to-[#4be6b5] text-black" }; }
  }

  const heroColor = categoryColors[activeCategory]?.hero ?? "#4be6b5";

  return (
    <>
      <SiteHeader />
      <main className="bg-[#06070a] text-white">
        <div className="flex min-h-[260px] flex-col items-center justify-center px-6 pb-10 pt-16 sm:min-h-[320px] md:min-h-[420px] md:pb-0 md:pt-0">
          <h1
            className="mt-6 text-center text-[52px] leading-none sm:text-[72px] md:mt-12 md:text-[100px]"
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

        <section className="bg-[#F7F7F7] pb-20 pt-12 sm:pb-28 sm:pt-16 md:pb-40 md:pt-20">
          {/* חיפוש */}
          <div className="mb-8 flex justify-center px-4 sm:mb-10">
            <div className="relative w-full max-w-[400px]">
              <form method="GET" action="/programs">
                {activeCategory !== "all" ? <input type="hidden" name="category" value={activeCategory} /> : null}
                <input
                  type="text"
                  name="q"
                  defaultValue={searchQuery}
                  placeholder="חפשי תוכנית לפי נושא, שם או תיאור..."
                  className="w-full h-[46px] pr-10 pl-4 rounded-full bg-white text-black text-right text-sm focus:outline-none focus:ring-2 focus:ring-[#4be6b5] transition"
                  style={{ fontFamily: "Tahoma, Geneva, sans-serif" }}
                />
                <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9ca3af] hover:text-[#4be6b5] transition-colors">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
                </button>
              </form>
            </div>
          </div>
          <div className="mb-12 flex flex-wrap justify-center gap-3 px-4 sm:mb-16 sm:gap-4 md:mb-20">
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
                  px-5 sm:px-8
              rounded-full
              flex
              items-center
              justify-center
                  text-[14px] sm:text-[15px]
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
          <div className="px-4 sm:px-6">
            <ProgramsFeed
              key={`${activeCategory}:${searchQuery}`}
              initialPrograms={programs}
              initialHasMore={hasMore}
              activeCategory={activeCategory}
              searchQuery={searchQuery}
            />
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
