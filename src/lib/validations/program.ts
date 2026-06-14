import { z } from "zod";
import { generateProgramSlug } from "@/lib/slug";

const optionalText = z.string().trim().optional().or(z.literal(""));

export const programImageInputSchema = z.object({
  url: z.string().url("כתובת קובץ/תמונה לא תקינה"),
  alt: optionalText,
  assetType: z.enum(["photo", "graphic"]).default("photo"),
  isCover: z.boolean().optional(),
});

export const programFileInputSchema = z.object({
  label: optionalText,
  url: z.string().url("כתובת חומר לא תקינה"),
});

const programSchemaBase = z.object({
  title: z.string().min(2, "נדרש שם תוכנית"),
  slug: optionalText,
  shortDescription: optionalText,
  fullDescription: optionalText,
  topic: optionalText,
  targetAudience: optionalText,
  duration: optionalText,
  notes: optionalText,
  category: z.string().optional(),
  status: z.enum(["draft", "published"]).default("draft"),
  images: z.array(programImageInputSchema).optional(),
  materials: z.array(programFileInputSchema).optional(),
});

export const programSchema = programSchemaBase.transform((data) => ({
  ...data,
  slug: generateProgramSlug(data.title, data.slug),
}));

export type ProgramInput = z.input<typeof programSchemaBase>;
export type ProgramPayload = z.output<typeof programSchema>;
