import React from "react";
import HeroSlider from "../components/Hero/HeroSlider";
import Categories from "../components/categories/Categories";
import Themes from "../components/Themes/Themes";
import CuratedCollections from "../components/CuratedCollection/CuratedCollection";
import TrendingProducts from "../components/TrendingProduct/TrendingProducts";
import OfferSection from "../components/OfferSection";
import StylingGuide from "../components/StylingGuide";
import ScrollImageStack from "../components/ScrollImageStack";
import BenefitsBar from "../components/BenefitsBar";
import StyleGuideSlider from "../components/StyleGuideSlider";
import Testimonials from "../components/Testimonials";

function Home() {
  return (
    <>
      <HeroSlider />
      <Categories />
      <Themes />
      <CuratedCollections />
      <TrendingProducts />
      <OfferSection />
      <StylingGuide />
      <ScrollImageStack />
      <BenefitsBar />
      <StyleGuideSlider />
      <Testimonials />
    </>
  );
}

export default Home;