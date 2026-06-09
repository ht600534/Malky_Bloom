import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/site/header";
import { ContactForm } from "@/components/site/contact-form";
import { categoryLabels, getProgramBySlug } from "@/lib/data/programs";
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

  const cover = program.images[0];

  return (
    <>
      <SiteHeader />
      <main className="container flex-1 py-12">
        <div className="mb-8 grid gap-8 md:grid-cols-2">
          {cover ? (
            <div className="relative h-72 overflow-hidden rounded-2xl border border-stroke">
              <Image
                src={cover.url}
                alt={cover.alt}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          ) : (
            <div className="flex h-72 items-center justify-center rounded-2xl border border-dashed border-stroke text-muted">
              אין תמונה
            </div>
          )}
          <div className="space-y-4">
            {program.category ? (
              <span className="chip">{categoryLabels[program.category]}</span>
            ) : null}
            <h1 className="text-4xl font-bold">{program.title}</h1>
            {program.topic ? <p className="text-lg text-brand">נושא: {program.topic}</p> : null}
            {program.shortDescription ? <p className="text-muted">{program.shortDescription}</p> : null}
            {program.fullDescription ? <p>{program.fullDescription}</p> : null}
            <dl className="grid gap-2 text-sm text-muted">
              {program.targetAudience ? (
                <div>
                  <dt className="font-semibold text-white">קהל יעד</dt>
                  <dd>{program.targetAudience}</dd>
                </div>
              ) : null}
              {program.duration ? (
                <div>
                  <dt className="font-semibold text-white">אורך</dt>
                  <dd>{program.duration}</dd>
                </div>
              ) : null}
            </dl>
          </div>
        </div>

        {program.images.length > 1 ? (
          <section className="mb-10">
            <h2 className="mb-4 text-2xl font-bold">תמונות</h2>
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
              {program.images.slice(1).map((img) => (
                <div key={img.url} className="relative h-48 overflow-hidden rounded-xl border border-stroke">
                  <Image src={img.url} alt={img.alt} fill className="object-cover" sizes="300px" />
                </div>
              ))}
            </div>
          </section>
        ) : null}

        {program.graphics.length > 0 ? (
          <section className="mb-10">
            <h2 className="mb-4 text-2xl font-bold">גרפיקות</h2>
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
              {program.graphics.map((img) => (
                <div key={img.url} className="relative h-48 overflow-hidden rounded-xl border border-stroke">
                  <Image src={img.url} alt={img.alt} fill className="object-cover" sizes="300px" />
                </div>
              ))}
            </div>
          </section>
        ) : null}

        {program.materials.length > 0 ? (
          <section className="mb-10">
            <h2 className="mb-4 text-2xl font-bold">חומרים נלווים</h2>
            <ul className="space-y-2">
              {program.materials.map((file) => (
                <li key={file.url}>
                  <Link href={file.url} className="text-brand underline" target="_blank" rel="noreferrer">
                    {file.label || "הורדת קובץ"}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        <ContactForm programId={program.id} />
      </main>
      <SiteFooter />
    </>
  );
}
