import Hero from "../../components/layouts/Hero";
import Categories from "./Categories";
import CTA from "./CTA";
import FAQ from "./FAQ";
import Features from "./Features";
import { slides } from "../../components/layouts/DataSlides";

export default function Home() {
  return (
    <div className="pt-16"> {/* padding top à cause de la navbar fixe */}
      <Hero images={slides} />
      <Categories />
      <Features />
      <FAQ />
      <CTA />
    </div>
  );
}
