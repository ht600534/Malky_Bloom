import type { Program, ProgramCategory } from "@/lib/types";
import {
  dbProgramToClient,
  getPublishedProgramBySlug,
  listPublishedPrograms,
} from "@/lib/supabase/program-repository";

export const categoryLabels: Record<ProgramCategory | "all", string> = {
  all: "הכל",
  events: "אירועים",
  camp: "מחנה",
  "year-circle": "מעגל השנה",
  workshops: "סדנאות",
};

function matchesSearch(program: Program, query: string) {
  const q = query.toLowerCase();
  const haystack = [
    program.title,
    program.shortDescription,
    program.fullDescription,
    program.topic,
    program.targetAudience,
    program.duration,
  ]
    .join(" ")
    .toLowerCase();
  return haystack.includes(q);
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
