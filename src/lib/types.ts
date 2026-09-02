export type ProgramCategory = string;

export type ProgramImage = {
  url: string;
  alt: string;
  assetType?: "photo" | "graphic";
  isCover?: boolean;
};

export type ProgramMaterial = {
  label: string;
  url?: string;
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
  creatorName: string;
  seminarName: string;
  category: ProgramCategory | null;
  tags: string[];
  images: ProgramImage[];
  graphics: ProgramImage[];
  materials: ProgramMaterial[];
  status: "draft" | "published";
};

export type ProgramCategoryStyle = {
  badgeClassName: string;
  titleColor: string;
  buttonClassName: string;
  placeholderTextColor: string;
};
