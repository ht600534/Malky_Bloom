import { SiteHeader } from "@/components/site/header";
import HeroSection from "@/components/site/hero/HeroSection";
import { ProgramCategories } from "@/components/site/program-categories";
import { TheaterImageBlock } from "@/components/site/theater-image-block";
import PopularPrograms from "@/components/site/popular-programs";
import SafeProgramSection from "@/components/site/SafeProgramSection";
import ContactConsultBox from "@/components/site/ContactConsultBox";
import FaqSection from "@/components/site/FaqSection";
import FooterNew from "@/components/site/FooterNew";
import { getPublishedPrograms } from "@/lib/data/programs";
export default async function Home() {
  const programs = await getPublishedPrograms();
  return (
    <>
      <SiteHeader />
      <HeroSection />
      <TheaterImageBlock />
      <ProgramCategories />
      {/* <WhyChooseUs /> */}
      <PopularPrograms programs={programs} />
      <SafeProgramSection />
      <ContactConsultBox />
      <FaqSection />
        <FooterNew />
    </>
  );
}

