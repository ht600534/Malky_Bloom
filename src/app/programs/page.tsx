import Image from "next/image";
import Link from "next/link";
import { SiteHeader } from "@/components/site/header";
import { getProgramsByCategory, categoryLabels } from "@/lib/data/programs";
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
  const heroTitle = activeCategory === "all" ? "כל התוכניות" : categoryLabels[activeCategory as keyof typeof categoryLabels] ?? "כל התוכניות";

  return (
    <>
      <SiteHeader />
      <main className="bg-[#06070a] text-white">
        <div className="flex flex-col items-center justify-center min-h-[420px]">
          <h1
            className="mt-12 text-[#96FFA7] text-[100px] leading-none"
            style={{ fontFamily: "'Placebo_FM', Arial, sans-serif" }}
          >
            {heroTitle}
          </h1>
        </div>

        <div className="relative h-[74px] bg-[#F3F3F3]">
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

        <section className="bg-[#F3F3F3] pb-40 pt-20">
          <div className="mb-20 flex flex-wrap justify-center gap-4">
            {Object.entries(categoryLabels).map(([value, label]) => {
              const isActive = activeCategory === value;

              return (
                <Link  style={{ fontFamily: "Tahoma, Geneva, sans-serif", color: '#111116', border: `2px solid ${isActive ? '#111116' : 'white'}` }}
                  key={value}
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
          <div className="flex flex-wrap justify-center gap-6 md:gap-10  mt-20 items-center relative">
            {/* כרטיסים */}
            {programs.map((program, idx) => {
              // צבעים דינמיים: 0 = ירוק, 1 = כתום
              const isGreen = idx % 2 === 0;
              const mainColor = isGreen ? '#4FDAB3' : '#FF7458';
              const gradient = isGreen
                ? 'bg-gradient-to-r from-[#96FFA7] to-[#4FDAB3] bg-clip-text text-transparent'
                : 'text-[#FF7458]';
              const buttonClass = isGreen
                ? 'bg-gradient-to-r from-[#96FFA7] to-[#4FDAB3] text-black'
                : 'bg-[#FF7458] text-white';
              return (
                <div
                  key={program.id}
                  className="w-full max-w-[361px] h-[480px] bg-[#0E0E0E] rounded-[30px] p-5 flex flex-col shadow-lg transition-all duration-300 hover:scale-[1.02]"
                >
                  {/* Image */}
                  <div className="w-full h-[200px] overflow-hidden rounded-[12px] mb-5 bg-[#232326]">
                    {program.images?.[0]?.url ? (
                      <Image
                        src={program.images[0].url}
                        alt={program.images[0].alt || program.title}
                        width={361}
                        height={200}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-white/40">
                        No Image
                      </div>
                    )}
                  </div>

                  {/* Title */}
                  <h3
                    className={`text-2xl md:text-3xl font-bold text-right leading-tight mb-4 ${gradient}`}
                    style={{ fontFamily: "'Placebo_FM', Arial, sans-serif", color: !isGreen ? mainColor : undefined }}
                  >
                    {program.title}
                  </h3>

                  {/* Description */}
                  <p className="text-white text-right text-base leading-7 font-light flex-1 min-h-[56px]" style={{ fontFamily: "Tahoma, Geneva, sans-serif" }}>
                    {program.shortDescription}
                  </p>

                  {/* Button */}
                  <div className="mt-6 w-full">
                    <Link
                      href={`/programs/${program.slug}`}
                      className={`w-40 py-3 rounded-full font-bold text-base text-center transition-all duration-300 block ${buttonClass}`}
                      style={{ fontFamily: "Tahoma, Geneva, sans-serif", color: 'black' }}
                    >
                      לדף התוכנית ←
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
