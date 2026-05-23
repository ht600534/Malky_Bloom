import Image from "next/image";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/site/header";
import { SiteFooter } from "@/components/site/footer";
import { ContactForm } from "@/components/site/contact-form";
import { categoryLabels, getProgramBySlug } from "@/lib/data/programs";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function ProgramDetailsPage({ params }: Props) {
  const { slug } = await params;
  const program = getProgramBySlug(slug);

  if (!program || program.status !== "published") {
    notFound();
  }

  return (
    <>
      <SiteHeader />
      <main className="container flex-1 py-12">
        <div className="mb-8 grid gap-8 md:grid-cols-2">
          <div className="relative h-72 overflow-hidden rounded-2xl border border-stroke">
            <Image
              src={program.images[0].url}
              alt={program.images[0].alt}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div className="space-y-4">
            <span className="chip">{categoryLabels[program.category]}</span>
            <h1 className="text-4xl font-bold">{program.title}</h1>
            <p className="text-muted">{program.fullDescription}</p>
            <div className="flex flex-wrap gap-2">
              {program.tags.map((tag) => (
                <span key={tag} className="chip">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
        <ContactForm programId={program.id} />
      </main>
      <SiteFooter />
    </>
  );
}
