import Image from "next/image";
import FooterContent from "./footer-content";

export default async function SiteFooter() {
  return (
    <section className="relative min-h-[580px] w-full overflow-visible bg-black py-20 text-white sm:py-24 md:py-28">      {/* קישוט עליון */}
      {/* <div className="absolute left-1/2 -translate-x-1/2 -top-8 z-10">
        <Image src="/figma/Elements.svg" alt="קישוט" width={64} height={32} />
      </div> */}
      <div className="absolute top-0 left-0 w-full h-[74px] bg-black">
        <div
          className="
      absolute
      left-1/2
      top-0
      h-[74px]
      w-[120px]
      -translate-x-1/2
      -translate-y-1/2
      rounded-b-[999px]
      bg-[#F7F7F7]
    "
        />

        <div className="absolute left-1/2 top-0 z-10 -translate-x-1/2 -translate-y-[58%]">
          <Image
            src="/figma/Vector (10).svg"
            alt=""
            width={34}
            height={34}
          />
        </div>
      </div>
      <FooterContent
        phone="0733515872"
        email="mo0733515872@gmail.com"
        menuGapClassName="gap-x-8 sm:gap-x-12 lg:gap-x-16"
        newsletterArrowStyle={{ marginBottom: "5px" }}
        newsletterTitleClassName="text-[30px] sm:text-[34px] lg:text-[38px]"
        newsletterFormClassName="w-full max-w-[320px]"
        newsletterMessageClassName="mt-2 text-right text-sm direction-rtl"
      />

      {/* ── Credits ── */}
      <div className="relative z-20 mt-14 px-4 pb-4 text-center sm:mt-20">
        <a
          href="mailto:henny600534@gmail.com"
          className="text-green hover:text-[#ff7a6b] transition-colors text-sm tracking-wide"
          style={{ fontFamily: "Tahoma, Geneva, sans-serif"}}
        >
          
          עיצוב ובניית אתרים  — Henny600534@gmail.com
        </a>
      </div>
    </section>
  );
}
