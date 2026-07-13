import { getSupabaseServerClient } from "@/lib/supabase/server";
import type { ProgramCategory } from "@/lib/types";
import type { ProgramPayload } from "@/lib/validations/program";

export type DbProgramImage = {
  id: string;
  image_url: string;
  alt_text: string;
  sort_order: number;
  is_cover: boolean;
  asset_type: "photo" | "graphic";
};

export type DbProgramFile = {
  id: string;
  label: string;
  file_url: string;
  sort_order: number;
};

export type DbProgram = {
  id: string;
  title: string;
  slug: string;
  short_description: string | null;
  full_description: string | null;
  topic: string | null;
  target_audience: string | null;
  duration: string | null;
  notes: string | null;
  category: string | null;
  status: "draft" | "published";
  created_at: string;
  updated_at: string;
  program_images?: DbProgramImage[];
  program_files?: DbProgramFile[];
};

const programSelect = `
  *,
  program_images ( id, image_url, alt_text, sort_order, is_cover, asset_type ),
  program_files ( id, label, file_url, sort_order )
`;

function emptyToNull(value: string | undefined) {
  const trimmed = value?.trim();
  return trimmed ? trimmed : null;
}

export function programPayloadToRow(input: ProgramPayload) {
  return {
    title: input.title.trim(),
    slug: input.slug,
    short_description: emptyToNull(input.shortDescription),
    full_description: emptyToNull(input.fullDescription),
    topic: emptyToNull(input.topic),
    target_audience: emptyToNull(input.targetAudience),
    duration: emptyToNull(input.duration),
    notes: emptyToNull(input.notes),
    category: input.category ?? null,
    status: input.status,
    updated_at: new Date().toISOString(),
  };
}

export async function syncProgramAssets(programId: string, input: ProgramPayload) {
  const supabase = getSupabaseServerClient();

  await supabase.from("program_images").delete().eq("program_id", programId);
  await supabase.from("program_files").delete().eq("program_id", programId);

  const images = input.images ?? [];
  if (images.length > 0) {
    const { error } = await supabase.from("program_images").insert(
      images.map((img, index) => ({
        program_id: programId,
        image_url: img.url.trim(),
        alt_text: img.alt?.trim() || input.title,
        sort_order: index,
        is_cover: img.isCover ?? index === 0,
        asset_type: img.assetType,
      })),
    );
    if (error) {
      throw new Error(error.message);
    }
  }

  const materials = input.materials ?? [];
  if (materials.length > 0) {
    const { error } = await supabase.from("program_files").insert(
      materials.map((file, index) => ({
        program_id: programId,
        label: file.label?.trim() || `קובץ ${index + 1}`,
        file_url: file.url?.trim() || "",
        sort_order: index,
      })),
    );
    if (error) {
      throw new Error(error.message);
    }
  }
}

export async function listProgramsAdmin() {
  const supabase = getSupabaseServerClient();
  return supabase.from("programs").select(programSelect).order("created_at", { ascending: false });
}

export async function getProgramByIdAdmin(id: string) {
  const supabase = getSupabaseServerClient();
  return supabase.from("programs").select(programSelect).eq("id", id).maybeSingle();
}

export async function listPublishedPrograms() {
  const supabase = getSupabaseServerClient();
  return supabase
    .from("programs")
    .select(programSelect)
    .eq("status", "published")
    .order("created_at", { ascending: false });
}

export async function getPublishedProgramBySlug(slug: string) {
  const supabase = getSupabaseServerClient();
  return supabase
    .from("programs")
    .select(programSelect)
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle();
}

export function dbProgramToClient(row: DbProgram) {
  const images = (row.program_images ?? [])
    .filter((img) => img.asset_type === "photo")
    .sort((a, b) => a.sort_order - b.sort_order)
    .map((img) => ({ url: img.image_url, alt: img.alt_text || row.title }));

  const graphics = (row.program_images ?? [])
    .filter((img) => img.asset_type === "graphic")
    .sort((a, b) => a.sort_order - b.sort_order)
    .map((img) => ({ url: img.image_url, alt: img.alt_text || row.title }));

  const materials = (row.program_files ?? [])
    .sort((a, b) => a.sort_order - b.sort_order)
    .map((file) => ({ label: file.label, url: file.file_url }));

  const category = (row.category as ProgramCategory | null) ?? null;

  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    shortDescription: row.short_description ?? "",
    fullDescription: row.full_description ?? "",
    topic: row.topic ?? "",
    targetAudience: row.target_audience ?? "",
    duration: row.duration ?? "",
    notes: row.notes ?? "",
    category,
    status: row.status,
    images,
    graphics,
    materials,
    tags: row.topic ? [row.topic] : [],
  };
}

export function dbProgramToAdminForm(row: DbProgram) {
  const client = dbProgramToClient(row);
  return {
    title: client.title,
    shortDescription: client.shortDescription,
    fullDescription: client.fullDescription,
    topic: client.topic,
    targetAudience: client.targetAudience,
    duration: client.duration,
    notes: client.notes,
    category: row.category ?? undefined,
    status: client.status,
    images: [
      ...client.images.map((img) => ({
        url: img.url,
        alt: img.alt,
        assetType: "photo" as const,
        isCover: false,
      })),
      ...client.graphics.map((img) => ({
        url: img.url,
        alt: img.alt,
        assetType: "graphic" as const,
        isCover: false,
      })),
    ],
    materials: client.materials.map((m) => ({ label: m.label, url: m.url ?? "" })),
  };
}
