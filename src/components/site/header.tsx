"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function SiteHeader() {
  const pathname = usePathname();
  const isProgramsPage = pathname?.startsWith("/programs");

  return (
    <header className="bg-[#06070a]">
      <div className="max-w-[1440px] mx-auto px-10 h-[116px] flex items-center justify-between relative">
  <Link
          href="/"
          className="text-[40px] leading-none"
          style={{ fontFamily: "'Placebo_FM', Arial, sans-serif" }}
        >
          מרכזות<span className="text-[#4be6b5]">אונליין</span>
        </Link>
       

        <nav className="absolute left-1/2 -translate-x-1/2 hidden md:flex items-center gap-12 text-white text-sm">
          {[
            { label: "ראשי", href: "/" },
            { label: "אודות", href: "/about" },
            { label: "התוכניות", href: "/programs" },
          ].map((item) => {
            const isActive = pathname === item.href || (item.href !== "/" && pathname?.startsWith(item.href));

            return (
              <Link key={item.href} href={item.href} className="relative inline-flex items-center justify-center text-sm font-medium transition-colors duration-200 overflow-visible">
                {isActive ? (
                  <span className="relative inline-flex items-center justify-center w-[110px] h-[41px] overflow-visible text-[#4be6b5]">
                    <img
                      src="/figma/Vector 1 (1).svg"
                      alt=""
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 w-full h-full "
                    />
                    <span className="relative text-center px-2">{item.label}</span>
                  </span>
                ) : (
                  <span className="px-5 py-2 text-white hover:text-[#4be6b5]">
                    {item.label}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

       <Link
          href="/contact"
          className="rounded-full bg-[#ff7a6b] px-7 py-3 text-black text-sm"
        >
          צרי קשר
        </Link>
      </div>
    </header>
  );
}