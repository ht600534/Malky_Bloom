import Link from "next/link";
import { getCategoriesFromDb } from "@/lib/data/programs";
import FooterNewsletterForm from "./footer-newsletter-form";
import Image from "next/image";

const categoryLinkConfig = [
  { label: "חגים", fallbackSlug: "year-circle", matchTerms: ["חגים", "מעגל השנה"] },
  { label: "ערבי הורים", fallbackSlug: "parent-evenings", matchTerms: ["ערבי הורים", "ערב הורים"] },
  { label: "תוכניות נושא", fallbackSlug: "workshops", matchTerms: ["תוכניות נושא", "תוכנית נושא", "סדנאות"] },
  { label: "מחנות", fallbackSlug: "camp", matchTerms: ["מחנות", "מחנה", "מחנות קיץ וחורף"] },
] satisfies ReadonlyArray<{ label: string; fallbackSlug: string; matchTerms: string[] }>;

type FooterContentProps = {
  phone: string;
  email: string;
  menuGapClassName?: string;
  newsletterArrowStyle?: React.CSSProperties;
  newsletterTitleClassName?: string;
  newsletterFormClassName?: string;
  newsletterMessageClassName?: string;
};

export default async function FooterContent({
  phone,
  email,
  menuGapClassName = "gap-x-8 sm:gap-x-12 lg:gap-x-16",
  newsletterArrowStyle = { marginBottom: "5px" },
  newsletterTitleClassName = "text-[12px]",
  newsletterFormClassName = "w-full max-w-[320px]",
  newsletterMessageClassName = "mt-2 text-right text-sm direction-rtl",
}: FooterContentProps) {
  const categories = await getCategoriesFromDb();
  const categoryEntries = Object.entries(categories).filter(([slug]) => slug !== "all");
  const footerLinks = [
    { label: "אודות", href: "/about" },
    { label: "יצירת קשר", href: "/contact" },
    ...categoryLinkConfig.map((item) => ({
      label: item.label,
      href: (() => {
        const matchedEntry = categoryEntries.find(([slug, name]) => {
          const normalizedName = name.trim();
          return item.matchTerms.includes(normalizedName) || slug === item.fallbackSlug;
        });

        return matchedEntry ? `/programs?category=${matchedEntry[0]}` : "/programs";
      })(),
    })),
  ];

  return (
    <div className="relative z-20 mx-auto grid w-full max-w-7xl grid-cols-1 gap-x-12 gap-y-12 px-4 sm:px-6 md:grid-cols-2 lg:grid-cols-[minmax(240px,320px)_minmax(220px,260px)_minmax(320px,1fr)] lg:gap-y-14 xl:gap-x-16">
      <div className="flex flex-col items-center gap-5 text-center md:items-start md:text-left">
        <span className="mb-4 mt-10  bg-gradient-to-r from-[#4be6b5] to-[#4be6b5] bg-clip-text text-[34px] leading-[1.05] text-transparent sm:text-[38px] lg:mb-12 lg:text-[42px]" style={{ fontFamily: "'Placebo_FM', Arial, sans-serif" }}>
          מרכזות <span className="font-light" style={{ color: "white" }}>אונליין</span>
        </span>
        <div className="mt-2 flex items-center gap-3">
          <Image src="/figma/Vector%20(7).svg" alt="טלפון" width={14} height={14} />
          <span className="text-[14px] font-normal sm:text-[12px] lg:text-[14px]" style={{ fontFamily: "'Ploni ML v2 AAA', Arial, sans-serif" }}>
            {phone}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <Image src="/figma/Vector%20(8).svg" alt="מייל" width={14} height={14} />
          <a
            href={`mailto:${email}`}
            className="relative cursor-pointer text-[16px] font-normal transition-colors hover:text-[#4be6b5] sm:text-[10px] lg:text-[14px]"
            style={{ fontFamily: "'Ploni ML v2 AAA', Arial, sans-serif" }}
            title="שלחי מייל"
          >
            {email}
          </a>
        </div>
      </div>
      <div className={`grid grid-cols-2 justify-items-right gap-y-2 text-right text-[18px] leading-[1.05] text-[#4be6b5] sm:text-[20px] lg:mt-24 lg:mr-100 lg:-translate-x-14 lg:justify-items-right lg:text-right lg:text-[14px] xl:mr-12 xl:-translate-x-8 ${menuGapClassName}`} style={{ fontFamily: "Tahoma, Geneva, sans-serif" }}>
        {footerLinks.map((item) => (
          <Link key={item.label} href={item.href} className="whitespace-nowrap transition hover:text-white " style={{ fontFamily: "Tahoma, Geneva, sans-serif" }}>
            {item.label}
          </Link>
        ))}
      </div>
      <div className="flex flex-col items-center gap-6 text-center md:col-span-2 md:items-end md:text-right lg:col-span-1 lg:mt-14 ml-40">
        <div className="flex flex-col items-right gap-3">
          <Image src="/figma/Vector%20(6).svg" alt="חץ כתום " width={60} height={32} className="self-right" style={newsletterArrowStyle} />
          <span className={`${newsletterTitleClassName} leading-[1.05] text-right`} style={{ fontFamily: "'Placebo_FM', Arial, sans-serif", fontWeight: "none",fontSize:'26px' }}>
            רוצה להתעדכן<br />כשתוכנית חדשה <br /> עולה לאתר?
          </span>
        </div>
        <FooterNewsletterForm className={newsletterFormClassName} messageClassName={newsletterMessageClassName} />
      </div>
    </div>
  );
}