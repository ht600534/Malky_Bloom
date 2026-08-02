import { SiteHeader } from "@/components/site/header";
import { ContactFormPage } from "@/components/site/contact-form-page";
import FooterContent from "@/components/site/footer-content";
import Image from "next/image";

export default async function ContactPage() {
  return (
    <>
      <SiteHeader />
      <ContactFormPage />
      <section className="relative min-h-[360px] w-full overflow-visible bg-black py-10 text-white sm:py-12 md:py-14 flex flex-col ">
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
            bg-[#171717]
          "
          />

          <div className="absolute left-1/2 top-0 z-10 -translate-x-1/2 -translate-y-[58%]">
            <Image
              src="/figma/Isolation_Mode.svg"
              alt=""
              width={34}
              height={34}
            />
          </div>
        </div>
        <FooterContent
          phone="0733515872"
          email="website600534@gmail.com"
          menuGapClassName="gap-x-8 sm:gap-x-12 lg:gap-x-16"
          newsletterArrowStyle={{ marginBottom: "5px" }}
          newsletterTitleClassName="text-[30px] sm:text-[34px] lg:text-[38px]"
          newsletterFormClassName="w-full max-w-[320px]"
          newsletterMessageClassName="mt-2 text-right text-sm direction-rtl"
        />
        <div className="mt-auto text-center px-4 pb-0 pt-8">
          <a
            href="mailto:website600534@gmail.com"
            className="text-green text-sm tracking-wide transition-colors hover:text-[#ff7a6b]"
            style={{ fontFamily: "Tahoma, Geneva, sans-serif", fontSize: "10px" }}
          >
           בניית אתרים   — website600534@gmail.com
          </a>
        </div>
      </section>
    </>
  );
}
