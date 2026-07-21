"use client";

import Link from "next/link";
import { startTransition, useCallback, useEffect, useRef, useState } from "react";
import { SafeImage } from "@/components/site/safe-image";
import { getProgramCategoryStyle } from "@/lib/data/programs";
import type { Program } from "@/lib/types";
import { isPdfUrl, normalizeImageUrl } from "@/lib/url";

type Props = {
  initialPrograms: Program[];
  initialHasMore: boolean;
  activeCategory: string;
  searchQuery: string;
};

const PAGE_SIZE = 12;

function getCacheKey(activeCategory: string, searchQuery: string) {
  return `programs-feed:${activeCategory}:${searchQuery.trim()}`;
}

function getInitialFeedState(
  initialPrograms: Program[],
  initialHasMore: boolean,
  activeCategory: string,
  searchQuery: string,
) {
  if (typeof window === "undefined") {
    return { programs: initialPrograms, hasMore: initialHasMore };
  }

  try {
    const cachedValue = window.sessionStorage.getItem(getCacheKey(activeCategory, searchQuery));
    if (!cachedValue) {
      return { programs: initialPrograms, hasMore: initialHasMore };
    }

    const parsed = JSON.parse(cachedValue) as { programs?: Program[]; hasMore?: boolean };
    if (Array.isArray(parsed.programs) && parsed.programs.length >= initialPrograms.length) {
      // בדיקה: האם תוכנית חדשה נוספה בראש, או שסלאג של תוכנית קיימת השתנה
      const serverMap = new Map(initialPrograms.map((p) => [p.id, p.slug]));
      const stale =
        (initialPrograms[0]?.id && parsed.programs[0]?.id !== initialPrograms[0].id) ||
        parsed.programs.some((c) => {
          const freshSlug = serverMap.get(c.id);
          return freshSlug !== undefined && freshSlug !== c.slug;
        });
      if (stale) {
        window.sessionStorage.removeItem(getCacheKey(activeCategory, searchQuery));
        return { programs: initialPrograms, hasMore: initialHasMore };
      }
      return {
        programs: parsed.programs,
        hasMore: Boolean(parsed.hasMore),
      };
    }
  } catch {
    window.sessionStorage.removeItem(getCacheKey(activeCategory, searchQuery));
  }

  return { programs: initialPrograms, hasMore: initialHasMore };
}

export default function ProgramsFeed({ initialPrograms, initialHasMore, activeCategory, searchQuery }: Props) {
  const [{ programs: initialCachedPrograms, hasMore: initialCachedHasMore }] = useState(() =>
    getInitialFeedState(initialPrograms, initialHasMore, activeCategory, searchQuery),
  );
  const [programs, setPrograms] = useState(initialCachedPrograms);
  const [hasMore, setHasMore] = useState(initialCachedHasMore);
  const [loading, setLoading] = useState(false);
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const loadingRef = useRef(false);

  useEffect(() => {
    try {
      window.sessionStorage.setItem(
        getCacheKey(activeCategory, searchQuery),
        JSON.stringify({ programs, hasMore }),
      );
    } catch {
      // Ignore storage quota failures and keep the in-memory experience working.
    }
  }, [programs, hasMore, activeCategory, searchQuery]);

  const loadMore = useCallback(async () => {
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
  }, [activeCategory, hasMore, programs.length, searchQuery]);

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
  }, [hasMore, loadMore]);

  return (
    <>
      <div className="mx-auto mt-10 grid max-w-[1280px] grid-cols-1 gap-6 sm:mt-14 sm:grid-cols-2 md:mt-20 md:gap-8 xl:grid-cols-3 xl:gap-10">
        {programs.map((program) => {
          const categoryStyle = getProgramCategoryStyle(program.category);
          const mainColor = categoryStyle.titleColor;
          const buttonClass = categoryStyle.buttonClassName;
          const coverAsset = [...program.images, ...program.graphics].find((item) => item.isCover) ?? [...program.images, ...program.graphics][0];

          return (
            <div
              key={program.id}
              className="flex min-h-[460px] w-full flex-col rounded-[30px] bg-[#ffffff] p-4 shadow-lg transition-all duration-300 hover:scale-[1.02] sm:min-h-[480px] sm:p-5"
            >
              <div className="mb-5 h-[200px] w-full overflow-hidden rounded-[12px] bg-[#232326] sm:h-[220px]">
                {coverAsset?.url ? (
                  isPdfUrl(coverAsset.url) ? (
                    <iframe
                      src={`${normalizeImageUrl(coverAsset.url)}#toolbar=0&navpanes=0&scrollbar=0`}
                      title={coverAsset.alt || program.title}
                      className="h-full w-full bg-white"
                    />
                  ) : (
                    <SafeImage
                      src={coverAsset.url}
                      alt={coverAsset.alt || program.title}
                      width={361}
                      height={200}
                      className="h-full w-full object-cover"
                      fallbackTitle={program.title}
                      fallbackCategory={program.category}
                    />
                  )
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
                  className={`block w-full rounded-full py-3 text-center text-base font-bold transition-all duration-300 sm:w-40 ${buttonClass}`}
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
        <div ref={sentinelRef} className="flex items-center justify-center py-12 sm:py-14">
          <div className="flex min-h-[88px] w-full max-w-[320px] flex-col items-center justify-center rounded-[28px] border border-[#111116]/10 bg-white px-6 py-5 text-[#111116] shadow-sm">
            <span className="mb-3 h-10 w-10 animate-spin rounded-full border-[3px] border-[#111116]/15 border-t-[#4be6b5]" />
            <span className="text-center text-sm sm:text-base" style={{ fontFamily: "Tahoma, Geneva, sans-serif" }}>
              {loading ? "טוען עוד תוכניות..." : "ממשיכים לטעון תוכניות נוספות"}
            </span>
            <span className="mt-1 text-center text-xs text-[#111116]/60" style={{ fontFamily: "Tahoma, Geneva, sans-serif" }}>
              הרשימה נשמרת גם אם תחזרי מעמוד תוכנית
            </span>
          </div>
        </div>
      ) : null}
    </>
  );
}