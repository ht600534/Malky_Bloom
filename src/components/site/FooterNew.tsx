import Image from "next/image";
import FooterContent from "./footer-content";

export default async function SiteFooter() {
  return (
    <section className="w-full bg-black text-white relative overflow-visible py-28 min-h-[580px]">      {/* קישוט עליון */}
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
        menuGapClassName="gap-x-50"
        newsletterArrowStyle={{ marginLeft: "210px", marginBottom: "5px" }}
        newsletterTitleClassName="text-[38px]"
        newsletterFormClassName="w-full max-w-[320px]"
        newsletterMessageClassName="ml-36 -mt-2 text-right text-sm direction-rtl"
      />
    </section>
  );
}
