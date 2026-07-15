"use client";

import Link from "next/link";
import { startTransition, useEffect, useRef, useState } from "react";
import { SafeImage } from "@/components/site/safe-image";
import { getProgramCategoryStyle } from "@/lib/data/programs";
import type { Program } from "@/lib/types";

type Props = {
  initialPrograms: Program[];
  initialHasMore: boolean;
  activeCategory: string;
  searchQuery: string;
};

const PAGE_SIZE = 6;

export default function ProgramsFeed({ initialPrograms, initialHasMore, activeCategory, searchQuery }: Props) {
  const [programs, setPrograms] = useState(initialPrograms);
  const [hasMore, setHasMore] = useState(initialHasMore);
  const [loading, setLoading] = useState(false);
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const loadingRef = useRef(false);

  useEffect(() => {
    setPrograms(initialPrograms);
    setHasMore(initialHasMore);
    setLoading(false);
    loadingRef.current = false;
  }, [initialPrograms, initialHasMore, activeCategory, searchQuery]);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel || !hasMore) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const firstEntry = entries[0];
        if (!firstEntry?.isIntersecting || loadingRef.current) {
          return;
        }

        void loadMore();
      },
      { rootMargin: "260px 0px" },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [hasMore, loading, programs.length, activeCategory, searchQuery]);

  async function loadMore() {
    if (loadingRef.current || !hasMore) {
      return;
    }

    loadingRef.current = true;
    setLoading(true);

    try {
      const params = new URLSearchParams({
        offset: String(programs.length),
        limit: String(PAGE_SIZE),
      });

      if (activeCategory && activeCategory !== "all") {
        params.set("category", activeCategory);
      }

      if (searchQuery) {
        params.set("q", searchQuery);
      }

      const response = await fetch(`/api/programs?${params.toString()}`, { cache: "no-store" });
      const result = await response.json();

      if (!response.ok) {
        setHasMore(false);
        return;
      }

      startTransition(() => {
        setPrograms((prev) => {
          const existingIds = new Set(prev.map((program) => program.id));
          const nextPrograms = (result.programs ?? []).filter((program: Program) => !existingIds.has(program.id));
          return [...prev, ...nextPrograms];
        });
        setHasMore(Boolean(result.hasMore));
      });
    } finally {
      loadingRef.current = false;
      setLoading(false);
    }
  }

  return (
    <>
      <div className="relative mt-20 flex flex-wrap items-center justify-center gap-6 md:gap-10">
        {programs.map((program) => {
          const categoryStyle = getProgramCategoryStyle(program.category);
          const mainColor = categoryStyle.titleColor;
          const buttonClass = categoryStyle.buttonClassName;

          return (
            <div
              key={program.id}
              className="flex h-[480px] w-full max-w-[371px] flex-col rounded-[30px] bg-[#fffff] p-5 shadow-lg transition-all duration-300 hover:scale-[1.02]"
            >
              <div className="mb-5 h-[200px] w-full overflow-hidden rounded-[12px] bg-[#232326]">
                {program.images?.[0]?.url ? (
                  <SafeImage
                    src={program.images[0].url}
                    alt={program.images[0].alt || program.title}
                    width={361}
                    height={200}
                    className="h-full w-full object-cover"
                    fallbackTitle={program.title}
                    fallbackCategory={program.category}
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-black text-center">
                    <span
                      className="px-6 text-[28px] leading-tight"
                      style={{ fontFamily: "'Placebo_FM', Arial, sans-serif", color: mainColor }}
                    >
                      {program.title}
                    </span>
                  </div>
                )}
              </div>

              <h3
                className="mb-4 text-right text-2xl font-bold leading-tight md:text-3xl"
                style={{ fontFamily: "'Placebo_FM', Arial, sans-serif", color: mainColor }}
              >
                {program.title}
              </h3>

              <p
                className="flex-1 text-right text-base font-light leading-7 text-white"
                style={{ color: "black", fontFamily: "Tahoma, Geneva, sans-serif" }}
              >
                {program.shortDescription}
              </p>

              <div className="mt-6 w-full">
                <Link
                  href={`/programs/${program.slug}`}
                  className={`block w-40 rounded-full py-3 text-center text-base font-bold transition-all duration-300 ${buttonClass}`}
                  style={{ fontFamily: "Tahoma, Geneva, sans-serif", color: buttonClass.includes("text-white") ? "white" : "black" }}
                >
                  לדף התוכנית ←
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {hasMore ? (
        <div ref={sentinelRef} className="flex items-center justify-center py-14">
          <div className="flex items-center gap-3 text-[#111116]">
            <span className="h-5 w-5 animate-spin rounded-full border-2 border-[#111116]/20 border-t-[#111116]" />
            <span style={{ fontFamily: "Tahoma, Geneva, sans-serif" }}>{loading ? "טוען עוד תוכניות..." : "גללי לעוד תוכניות"}</span>
          </div>
        </div>
      ) : null}
    </>
  );
}