import { SiteHeader } from "@/components/site/header";
import HeroSection from "@/components/site/hero/HeroSection";
import { ProgramCategories } from "@/components/site/program-categories";
// import { WhyChooseUs } from "@/components/site/why-choose-us";
import { TheaterImageBlock } from "@/components/site/theater-image-block";
import PopularPrograms from "@/components/site/popular-programs";
import SafeProgramSection from "@/components/site/SafeProgramSection";
import ContactConsultBox from "@/components/site/ContactConsultBox";
import FaqSection from "@/components/site/FaqSection";
// import { SafeProgram } from "@/components/site/safe-program";
// import { FAQ } from "@/components/site/faq";
// import { Newsletter } from "@/components/site/newsletter";
import FooterNew from "@/components/site/FooterNew";
export default function Home() {
  return (
    <>
      <SiteHeader />
      <HeroSection />
      <TheaterImageBlock />
      <ProgramCategories />
      {/* <WhyChooseUs /> */}
      <PopularPrograms />
      <SafeProgramSection />
      <ContactConsultBox />
      <FaqSection />
        <FooterNew />
    </>
  );
}

