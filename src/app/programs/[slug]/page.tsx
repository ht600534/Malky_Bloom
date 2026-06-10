import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/site/header";
import ProgramDetailsSection from "@/components/programs/ProgramDetailsSection";
import { getProgramBySlug, getPublishedPrograms } from "@/lib/data/programs";
import SiteFooter from "@/components/site/FooterNew";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function ProgramDetailsPage({ params }: Props) {
  const { slug } = await params;
  const program = await getProgramBySlug(slug);

  if (!program || program.status !== "published") {
    notFound();
  }

  const programs = await getPublishedPrograms();
  const relatedPrograms = programs.filter((item) => item.slug !== slug).slice(0, 3);

  return (
    <>
      <SiteHeader />
      <ProgramDetailsSection program={program} relatedPrograms={relatedPrograms} />
      <SiteFooter />
    </>
  );
}
