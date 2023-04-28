import React from "react";
import AboutHero from "../components/about/AboutHero";
import AboutSection from "../components/about/AboutSection";
import AboutSectionL from "../components/about/AboutSectionL";
import AboutDiscover from "../components/about/AboutDiscover";
import AboutNumbers from "../components/about/AboutNumbers";
import AboutContact from "../components/about/AboutContact";

function about() {
  return (
    <div>
      <AboutHero />
      <AboutSection />
      <AboutSectionL />
      <AboutDiscover />
      <AboutNumbers />
      <AboutContact />
    </div>
  );
}

export default about;
