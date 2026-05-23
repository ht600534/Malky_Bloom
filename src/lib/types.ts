export type ProgramCategory = "events" | "camp" | "year-circle" | "workshops";

export type ProgramImage = {
  url: string;
  alt: string;
};

export type Program = {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  category: ProgramCategory;
  tags: string[];
  images: ProgramImage[];
  status: "draft" | "published";
};
