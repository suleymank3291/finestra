import Navbar from "@/components/Navbar";
import HeroSlider from "@/components/sections/HeroSlider";
import WelcomeText from "@/components/sections/WelcomeText";
import CategoryGrid from "@/components/sections/CategoryGrid";
import StorySection from "@/components/sections/StorySection";
import BreathingText from "@/components/sections/BreathingText";
import BranchCards from "@/components/sections/BranchCards";
import FlexAnimation from "@/components/sections/FlexAnimation";
import CustomerReviews from "@/components/sections/CustomerReviews";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSlider />
        <WelcomeText />
        <CategoryGrid />
        <StorySection />
        <BreathingText />
        <BranchCards />
        <FlexAnimation />
        <CustomerReviews />
      </main>
      <Footer />
    </>
  );
}
