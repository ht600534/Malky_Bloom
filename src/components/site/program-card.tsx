import Image from "next/image";
import Link from "next/link";
import type { Program } from "@/lib/types";
import { categoryLabels } from "@/lib/data/programs";

type Props = {
  program: Program;
};

export function ProgramCard({ program }: Props) {
  const categoryLabel = program.category ? categoryLabels[program.category] : null;

  return (
    <article className="overflow-hidden rounded-2xl border border-stroke bg-surface-soft">
      <div className="relative flex h-48 items-center justify-center bg-surface">
        {program.images[0]?.url ? (
          <Image
            src={program.images[0].url}
            alt={program.images[0].alt ?? program.title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover"
          />
        ) : (
          <span className="text-sm text-muted">אין תמונה</span>
        )}
      </div>
      <div className="space-y-3 p-4">
        <div className="flex flex-wrap gap-2">
          {categoryLabel ? <span className="chip">{categoryLabel}</span> : null}
          {program.topic ? <span className="chip">{program.topic}</span> : null}
        </div>
        <h3 className="text-lg font-semibold">{program.title}</h3>
        {program.shortDescription ? <p className="text-sm text-muted">{program.shortDescription}</p> : null}
        {program.targetAudience ? (
          <p className="text-xs text-muted">קהל יעד: {program.targetAudience}</p>
        ) : null}
        {program.duration ? <p className="text-xs text-muted">אורך: {program.duration}</p> : null}
        <Link
          href={`/programs/${program.slug}`}
          className="inline-flex rounded-full bg-brand px-4 py-2 text-sm font-semibold text-[#041410]"
        >
          לפרטים מלאים
        </Link>
      </div>
    </article>
  );
}
