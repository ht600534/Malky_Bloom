"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="bg-[#06070a]">
      <div className="relative mx-auto flex max-w-[1440px] flex-col gap-4 px-4 py-4 sm:px-6 md:h-[116px] md:flex-row md:items-center md:justify-between md:px-10 md:py-0">
        <Link
          href="/"
          className="text-center text-[30px] leading-none sm:text-[34px] md:text-[40px]"
          style={{ fontFamily: "'Placebo_FM', Arial, sans-serif" }}
        >
          מרכזות<span className="text-[#4be6b5]">אונליין</span>
        </Link>

        <nav className="flex flex-wrap items-center justify-center gap-3 text-white text-sm md:absolute md:left-1/2 md:top-1/2 md:w-auto md:-translate-x-1/2 md:-translate-y-1/2 md:gap-8">
          {[
            { label: "ראשי", href: "/" },
            { label: "אודות", href: "/about" },
            { label: "התוכניות", href: "/programs" },
          ].map((item) => {
            const isActive = pathname === item.href || (item.href !== "/" && pathname?.startsWith(item.href));

            return (
              <Link key={item.href} href={item.href} className="relative inline-flex items-center justify-center overflow-visible text-sm font-medium transition-colors duration-200">
                {isActive ? (
                  <span className="relative inline-flex h-[38px] min-w-[92px] items-center justify-center overflow-visible px-4 text-[#4be6b5] md:h-[41px] md:w-[110px] md:px-0">
                    <img
                      src="/figma/Vector 1 (1).svg"
                      alt=""
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 w-full h-full "
                    />
                    <span className="relative text-center px-2">{item.label}</span>
                  </span>
                ) : (
                  <span className="rounded-full px-4 py-2 text-white hover:text-[#4be6b5] md:px-5">
                    {item.label}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        <Link
          href="/contact"
          className="mx-auto rounded-full bg-[#ff7a6b] px-6 py-3 text-sm text-black md:mx-0 md:px-7"
        >
          צרי קשר
        </Link>
      </div>
    </header>
  );
}