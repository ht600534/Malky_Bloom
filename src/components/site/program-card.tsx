import Image from "next/image";
import Link from "next/link";
import type { Program } from "@/lib/types";
import { categoryLabels } from "@/lib/data/programs";

type Props = {
  program: Program;
};

export function ProgramCard({ program }: Props) {
  return (
    <article className="overflow-hidden rounded-2xl border border-stroke bg-surface-soft">
      <div className="relative h-48">
        <Image
          src={program.images[0]?.url ?? ""}
          alt={program.images[0]?.alt ?? program.title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover"
        />
      </div>
      <div className="space-y-3 p-4">
        <span className="chip">{categoryLabels[program.category]}</span>
        <h3 className="text-lg font-semibold">{program.title}</h3>
        <p className="text-sm text-muted">{program.shortDescription}</p>
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
