import { SiteHeader } from "@/components/site/header";
import { SiteFooter } from "@/components/site/footer";
import HeroSection from "@/components/site/hero/HeroSection";
import { ProgramCategories } from "@/components/site/program-categories";
import { WhyChooseUs } from "@/components/site/why-choose-us";
import { TheaterImageBlock } from "@/components/site/theater-image-block";
import { PopularPrograms } from "@/components/site/popular-programs";
import { SafeProgram } from "@/components/site/safe-program";
import { FAQ } from "@/components/site/faq";
import { Newsletter } from "@/components/site/newsletter";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <HeroSection />
      <TheaterImageBlock />
      <ProgramCategories />
      <WhyChooseUs />
      <SiteFooter />
    </>
  );
}

