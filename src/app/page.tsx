import { SiteHeaderMUI } from "@/components/site/header-mui";
import { NewHeroSection } from "@/components/site/new-hero";
import { ProgramCategories } from "@/components/site/program-categories";
import { WhyChooseUs } from "@/components/site/why-choose-us";
import { PopularPrograms } from "@/components/site/popular-programs";
import { SafeProgram } from "@/components/site/safe-program";
import { FAQ } from "@/components/site/faq";
import { Testimonials } from "@/components/site/testimonials";
import { Newsletter } from "@/components/site/newsletter";
import { FooterMUI } from "@/components/site/footer-mui";

export default function Home() {
  return (
    <>
      <SiteHeaderMUI />
      <main style={{ flex: 1 }}>
        <NewHeroSection />
        <ProgramCategories />
        <WhyChooseUs />
        <PopularPrograms />
        <Testimonials />
        <SafeProgram />
        <FAQ />
        <Newsletter />
      </main>
      <FooterMUI />
    </>
  );
}

