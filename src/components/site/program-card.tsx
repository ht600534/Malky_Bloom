import Image from "next/image";
import Link from "next/link";
import type { Program } from "@/lib/types";

type Props = {
  program: Program;
};

export function ProgramCard({ program }: Props) {
  return (
    <Link href={`/programs/${program.slug}`} className="block">
      <article className="rounded-[28px] bg-[#F7F7F7] p-4 transition-all duration-300 hover:-translate-y-1">
        <div className="relative h-[180px] overflow-hidden rounded-[20px] bg-[#111]">
          {program.images[0]?.url ? (
            <Image
              src={program.images[0].url}
              alt={program.images[0].alt ?? program.title}
              fill
              sizes="(max-width:768px) 100vw, 33vw"
              className="object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-[#999]">
              אין תמונה
            </div>
          )}
        </div>

        <div className="pt-5 text-center">
          <h3
            className="text-[34px] leading-none text-[#FF7458]"
            style={{ fontFamily: "'Placebo_FM', Arial, sans-serif" }}
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