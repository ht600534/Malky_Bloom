import type { Program, ProgramCategory } from "@/lib/types";

export const categoryLabels: Record<ProgramCategory | "all", string> = {
  all: "הכל",
  events: "אירועים",
  camp: "מחנה",
  "year-circle": "מעגל השנה",
  workshops: "סדנאות",
};

export const samplePrograms: Program[] = [
  {
    id: "p1",
    slug: "sadnat-leil-hodaia",
    title: "סדנת ליל הודיה",
    shortDescription: "ערב תוכן עם כלים חווייתיים, מוזיקה וחיבור קבוצתי.",
    fullDescription:
      "תוכנית מלאה לערב תוכן הכוללת פתיחה, פעילות מרכזית, חומרי עזר וקטעי סיכום. מתאימה למסגרות חינוכיות וקהילתיות.",
    category: "events",
    tags: ["ערב", "קהילה", "תוכן"],
    images: [
      { url: "https://images.unsplash.com/photo-1515169067868-5387ec356754?q=80&w=1200&auto=format&fit=crop", alt: "תוכן לאירוע" },
    ],
    status: "published",
  },
  {
    id: "p2",
    slug: "maagal-hashana-kitot",
    title: "מעגל השנה לכיתות",
    shortDescription: "מערך שנתי מובנה עם יעדים, פעילויות והנחיה.",
    fullDescription:
      "תוכנית שנתית עם חלוקה לנושאים, רעיונות לתכנים, מסמכי עבודה וכלי הנחיה. מאפשרת התאמה לפי גיל ורמת הקבוצה.",
    category: "year-circle",
    tags: ["שנתי", "מערכים", "כיתות"],
    images: [
      { url: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=1200&auto=format&fit=crop", alt: "תוכנית שנתית" },
    ],
    status: "published",
  },
  {
    id: "p3",
    slug: "toolkit-machane",
    title: "Toolkit למחנה",
    shortDescription: "תוכנית מחנה עם מתודות, חלוקה לצוותים וציוד נלווה.",
    fullDescription:
      "תוכנית מחנה מעשית הכוללת תחנות, דפי הדרכה, תקציב דוגמה ורשימת ציוד. מתאימה לצוותי הדרכה ולמנהלות תוכן.",
    category: "camp",
    tags: ["מחנה", "שטח", "צוות"],
    images: [
      { url: "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?q=80&w=1200&auto=format&fit=crop", alt: "פעילות מחנה" },
    ],
    status: "published",
  },
];

export function getPublishedPrograms() {
  return samplePrograms.filter((p) => p.status === "published");
}

export function getProgramsByCategory(category?: string) {
  const programs = getPublishedPrograms();
  if (!category || category === "all") {
    return programs;
  }

  return programs.filter((program) => program.category === category);
}

export function getProgramBySlug(slug: string) {
  return samplePrograms.find((program) => program.slug === slug);
}
