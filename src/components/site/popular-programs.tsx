
import { getPublishedPrograms } from "@/lib/data/programs";
import Image from "next/image";
import Link from "next/link";

export default async function PopularPrograms() {
  const programs = await getPublishedPrograms();
  const popular = programs.slice(0, 2);

  return (
    <section className="w-full bg-[#0a0a0d] py-16 md:py-24 relative">

      {/* עיגול SVG Vector-8 מעל הכותרת */}
      <div className="flex">
        <div className="flex-col items-end mb-12">
          <div className="flex" style={{ marginRight: '138px' }}>
            <img src="/figma/Vector-8.svg" alt="עיגול דקורטיבי" className="w-6 h-6 mb-2 mr-1" />
          </div>
          <div className="max-w-7xl relative">
            {/* כותרת במרכז */}
            <div className="flex flex-col mb-10 md:mb-14" mr-5>
              <h2
                className="text-4xl font-bold text-right mb-12 bg-gradient-to-r from-[#96FFA7] to-[#4FDAB3] bg-clip-text text-transparent leading-tight mb-4 text-right"
                style={{
                  letterSpacing: '-1px',
                  direction: 'rtl',
                  marginRight: '138px',
                  fontFamily: "'Placebo_FM', Arial, sans-serif"
                }}
              >
                התוכניות<br />הפופולאריות<br />שלנו
              </h2>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap justify-center gap-6 md:gap-10 mr-40 mt-20 items-center relative">
          {/* כרטיסים */}
          {popular.map((program, idx) => {
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
                    style={{ fontFamily: "Tahoma, Geneva, sans-serif", color:'black' }}
                  >
                    לדף התוכנית ←
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {/* עיגול SVG עם חץ בצד ימין */}
      <div className="hidden md:flex  items-center justify-center absolute ">
        <span className="relative flex items-center justify-center"  style={{marginRight:'340px'}}>
          <img src="/figma/Ellipse 111.svg" alt="עיגול ניווט" className="w-14 h-14"/>
          <img src="/figma/Vector (3).svg" alt="חץ" className="w-5 h-5 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
        </span>
        <span className="relative flex items-center justify-center"  style={{marginRight:'10px'}}>
          <img src="/figma/Ellipse 111.svg" alt="עיגול ניווט" className="w-14 h-14"/>
          <img src="/figma/Vector (4).svg" alt="חץ" className="w-5 h-5 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
        </span>
      </div>
            <img src="/figma/Vector-2.svg" alt="עיגול דקורטיבי" className="w-10 h-10 mb-2 mt-50 mr-190 text-center" />

    </section>
  );
}