import SectionDivider from "@/components/ui/SectionDivider";
import Hero from "./Hero";
import HeroStats from "./HeroStats";
import Features from "./Features";
import FAQ from "./FAQ";
import CTA from "./CTA";
import PageMeta from "@/components/common/PageMeta";

export default function Home() {
  return (
    <>
      <PageMeta
        title="Welcome - Anime Voyager"
        description="Where Anime Worlds Come Alive"
      />

      <Hero />
      <HeroStats />

      <div className="responsive-container">
        <SectionDivider className="mx-auto mt-16 mb-8 max-w-xl" />
      </div>

      <Features />

      <div className="responsive-container">
        <SectionDivider className="mx-auto mt-16 my-8 max-w-xl" />
      </div>

      <FAQ />

      <div className="responsive-container">
        <SectionDivider className="mx-auto mt-16 max-w-xl" />
      </div>

      <CTA />
    </>
  );
}
