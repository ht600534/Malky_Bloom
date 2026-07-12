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
  menuGapClassName = "gap-x-50",
  newsletterArrowStyle = { marginLeft: "210px", marginBottom: "5px" },
  newsletterTitleClassName = "text-[38px]",
  newsletterFormClassName = "w-full max-w-[320px]",
  newsletterMessageClassName = "ml-36 -mt-2 text-right text-sm direction-rtl",
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
    <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-[minmax(280px,340px)_minmax(220px,260px)_minmax(420px,1fr)] gap-y-14 gap-x-12 relative z-20 w-full">
      <div className="flex flex-col items-start text-left gap-6">
        <span className="text-[42px] leading-[1.05] bg-gradient-to-r from-[#96FFA7] to-[#4FDAB3] bg-clip-text text-transparent mb-20 mt-10" style={{ fontFamily: "'Placebo_FM', Arial, sans-serif" }}>
          מרכזות <span className="font-light" style={{ color: "white" }}>אונליין</span>
        </span>
        <div className="flex items-center gap-3 mt-6">
          <Image src="/figma/Vector%20(7).svg" alt="טלפון" width={24} height={24} />
          <span className="text-[24px] font-normal" style={{ fontFamily: "'Ploni ML v2 AAA', Arial, sans-serif" }}>
            {phone}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <Image src="/figma/Vector%20(8).svg" alt="מייל" width={24} height={24} />
          <a
            href={`mailto:${email}`}
            className="text-[24px] font-normal hover:text-[#4FDAB3] transition-colors cursor-pointer relative"
            style={{ fontFamily: "'Ploni ML v2 AAA', Arial, sans-serif" }}
            title="שלחי מייל"
          >
            {email}
          </a>
        </div>
      </div>
      <div className={`mt-30 mr-12 grid grid-cols-2 ${menuGapClassName} gap-y-3 text-right text-[24px] leading-[1.55] text-[#96FFA7]`} style={{ fontFamily: "Tahoma, Geneva, sans-serif" }}>
        {footerLinks.map((item) => (
          <Link key={item.label} href={item.href} className="whitespace-nowrap transition hover:text-white " style={{ fontFamily: "Tahoma, Geneva, sans-serif" }}>
            {item.label}
          </Link>
        ))}
      </div>
      <div className="flex flex-col items-end text-right gap-6 mt-20 mr-0">
        <div className="flex flex-col items-end gap-3">
          <Image src="/figma/Vector%20(6).svg" alt="חץ כתום " width={100} height={72} style={newsletterArrowStyle} />
          <span className={`${newsletterTitleClassName} leading-[1.05]`} style={{ fontFamily: "'Placebo_FM', Arial, sans-serif", fontWeight: "none" }}>
            רוצה להתעדכן<br />כשתוכנית חדשה <br /> עולה לאתר?
          </span>
        </div>
        <FooterNewsletterForm className={newsletterFormClassName} messageClassName={newsletterMessageClassName} />
      </div>
    </div>
  );
}