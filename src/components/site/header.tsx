import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="z-20 bg-[#06070a]">
      <div className="container flex items-center justify-between py-5">
        <Link href="/contact" className="rounded-full bg-[#ff7d5d] px-4 py-1.5 text-sm font-semibold text-black">
          צרי קשר
        </Link>
        <nav className="hidden items-center gap-8 text-sm text-[#d8dae5] md:flex">
          <Link href="/">ראשי</Link>
          <Link href="/about">אודות</Link>
          <Link href="/programs" className="nav-circle px-4 py-2 text-sm font-medium">
            התוכניות
          </Link>
        </nav>
        <Link href="/" className="text-2xl font-bold tracking-tight">
          מרכזות<span className="text-[#54efc0]">אונליין</span>
        </Link>
      </div>
    </header>
  );
}
