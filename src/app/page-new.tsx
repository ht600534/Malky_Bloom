import { SiteHeaderMUI } from "@/components/site/header-mui";
import { HeroSection } from "@/components/site/hero-section";
import { FeaturesSection } from "@/components/site/features-section";
import { CTASection } from "@/components/site/cta-section";
import { FooterMUI } from "@/components/site/footer-mui";

export default function Home() {
  return (
    <>
      <SiteHeaderMUI />
      <main style={{ flex: 1 }}>
        <HeroSection />
        <FeaturesSection />
        <CTASection />
      </main>
      <FooterMUI />
    </>
  );
}
