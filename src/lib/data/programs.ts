import type { Program, ProgramCategory } from "@/lib/types";
import {
  dbProgramToClient,
  getPublishedProgramBySlug,
  listPublishedPrograms,
} from "@/lib/supabase/program-repository";
import { getSupabaseServerClient } from "@/lib/supabase/server";

/**
 * Fallback קטגוריות קבועות — מוצגות כאשר לא ניתן לטעון מה-DB.
 * בעתיד יוחלף לגמרי בטעינה מהמסד.
 */
export const categoryLabels: Record<ProgramCategory | "all", string> = {
  all: "הכל",
  events: "אירועים",
  camp: "מחנה",
  "year-circle": "מעגל השנה",
  workshops: "סדנאות",
};

/** טוען קטגוריות מה-DB. מחזיר רק "הכל" + מה שיש במסד. */
export async function getCategoriesFromDb(): Promise<Record<string, string>> {
  const labels: Record<string, string> = { all: "הכל" };

  try {
    const supabase = getSupabaseServerClient();
    const { data, error } = await supabase
      .from("program_categories")
      .select("*")
      .order("sort_order", { ascending: true });

    // Fallback לקטגוריות הקבועות רק כשבאמת אין חיבור ל-DB (error)
    if (error) {
      console.warn("[categories] DB error, using fallback:", error.message);
      return { ...labels, ...categoryLabels };
    }

    // טבלה קיימת אבל ריקה — מחזירים רק "הכל" (יופיע רק כפתור "הכל")
    if (!data || data.length === 0) {
      return labels;
    }

    for (const cat of data) {
      labels[cat.slug] = cat.name;
    }
    return labels;
  } catch (err) {
    console.error("[categories] load failed:", err);
    return { ...labels, ...categoryLabels };
  }
}

/**
 * חיפוש חכם — מפצל את השאילתה למילים,
 * ומחפש התאמה חלקית או מלאה של כל מילה.
 * תומך בעברית (כולל ניקוד) ובאנגלית.
 */
function matchesSearch(program: Program, query: string): boolean {
  const haystack = [
    program.title,
    program.shortDescription,
    program.fullDescription,
    program.topic,
    program.targetAudience,
    program.duration,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  const words = query
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .filter((w) => w.length > 0);

  return words.every((word) => haystack.includes(word));
}

/** Published programs from Supabase only (no demo data). */
export async function getPublishedPrograms(): Promise<Program[]> {
  try {
    const { data, error } = await listPublishedPrograms();
    if (error) {
      console.error("[programs] Supabase:", error.message);
      return [];
    }
    return (data ?? []).map((row) => dbProgramToClient(row));
  } catch (error) {
    console.error("[programs] load failed:", error);
    return [];
  }
}

export async function getProgramsByCategory(category?: string, searchQuery?: string) {
  let programs = await getPublishedPrograms();

  if (category && category !== "all") {
    programs = programs.filter((program) => program.category === category);
  }

  const q = searchQuery?.trim();
  if (q) {
    programs = programs.filter((program) => matchesSearch(program, q));
  }

  return programs;
}

export async function getProgramBySlug(slug: string) {
  try {
    const { data, error } = await getPublishedProgramBySlug(slug);
    if (!error && data) {
      return dbProgramToClient(data);
    }
  } catch (error) {
    console.error("[programs] slug load failed:", error);
  }
  return undefined;
}
