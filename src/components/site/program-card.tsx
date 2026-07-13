import Link from "next/link";
import { SafeImage } from "@/components/site/safe-image";
import { getProgramCategoryStyle } from "@/lib/data/programs";
import type { Program } from "@/lib/types";

type Props = {
  program: Program;
};

export function ProgramCard({ program }: Props) {
  const categoryStyle = getProgramCategoryStyle(program.category);

  return (
    <Link href={`/programs/${program.slug}`} className="block">
      <article className="rounded-[28px] bg-[#F7F7F7] p-4 transition-all duration-300 hover:-translate-y-1">
        <div className="relative h-[180px] overflow-hidden rounded-[20px] bg-[#111]">
          {program.images[0]?.url ? (
            <SafeImage
              src={program.images[0].url}
              alt={program.images[0].alt ?? program.title}
              fill
              sizes="(max-width:768px) 100vw, 33vw"
              className="object-cover"
              fallbackTitle={program.title}
              fallbackCategory={program.category}
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-white text-center">
              <span
                className="px-6 text-[28px] leading-tight"
                style={{ fontFamily: "'Placebo_FM', Arial, sans-serif", color: categoryStyle.placeholderTextColor }}
              >
                {program.title}
              </span>
            </div>
          )}
        </div>

        <div className="pt-5 text-center">
          <h3
            className="text-[34px] leading-none"
            style={{ fontFamily: "'Placebo_FM', Arial, sans-serif", color: categoryStyle.titleColor }}
          >
            {program.title}
          </h3>

          {program.shortDescription && (
            <p className="mt-3 text-[13px] leading-4 text-[#777] px-4">
              {program.shortDescription}
            </p>
          )}
        </div>
      </article>
    </Link>
  );
}