import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="bg-[#06070a]">
      <div className="max-w-[1440px] mx-auto px-10 h-[90px] flex items-center justify-between relative">

        <Link
          href="/contact"
          className="rounded-full bg-[#FF8B72] px-6 py-2 text-black text-sm"
        >
          צרי קשר
        </Link>

        <nav className="absolute left-1/2 -translate-x-1/2 hidden md:flex items-center gap-10 text-white text-sm">
          <Link href="/">ראשי</Link>
          <Link href="/about">אודות</Link>

          <Link
            href="/programs"
            className="rounded-full border border-[#96FFA7] px-5 py-2 text-[#96FFA7]"
          >
            התוכניות
          </Link>
        </nav>

        <Link
          href="/"
          className="text-[40px] leading-none"
          style={{ fontFamily: "'Placebo_FM', Arial, sans-serif" }}
        >
          מרכזות<span className="text-[#96FFA7]">אונליין</span>
        </Link>
      </div>
    </header>
  );
}