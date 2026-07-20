import { SiteHeader } from "@/components/site/header";
import HeroSection from "@/components/site/hero/HeroSection";
import { ProgramCategories } from "@/components/site/program-categories";
import { TheaterImageBlock } from "@/components/site/theater-image-block";
import PopularPrograms from "@/components/site/popular-programs";
import SafeProgramSection from "@/components/site/SafeProgramSection";
import ContactConsultBox from "@/components/site/ContactConsultBox";
import FaqSection from "@/components/site/FaqSection";
import FooterNew from "@/components/site/FooterNew";
import HomeLeadNudge from "@/components/site/home-lead-nudge";
// import IntroSplash from "@/components/site/intro-splash";
import { getPublishedPrograms } from "@/lib/data/programs";

export const revalidate = 3600; // רענון אוטומטי כל 24 שעות

export default async function Home() {
  const programs = await getPublishedPrograms();
  return (
    <>
      {/* <IntroSplash /> */}
      <SiteHeader />
      <HomeLeadNudge />
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

