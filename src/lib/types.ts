export type ProgramCategory = "events" | "camp" | "year-circle" | "workshops";

export type ProgramImage = {
  url: string;
  alt: string;
};

export type ProgramMaterial = {
  label: string;
  url: string;
};

export type Program = {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  topic: string;
  targetAudience: string;
  duration: string;
  notes: string;
  category: ProgramCategory | null;
  tags: string[];
  images: ProgramImage[];
  graphics: ProgramImage[];
  materials: ProgramMaterial[];
  status: "draft" | "published";
};
