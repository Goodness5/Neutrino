import React from "react";
import AboutHero from "../components/AboutHero";
import AboutSection from "../components/AboutSection";
import AboutSectionL from "../components/AboutSectionL";
import AboutDiscover from "../components/AboutDiscover";
import AboutNumbers from "../components/AboutNumbers";
import AboutContact from "../components/AboutContact";

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
