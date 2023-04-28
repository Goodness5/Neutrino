import React from "react";
import AboutHero from "../about/AboutHero";
import AboutSection from "../about/AboutSection";
import AboutSectionL from "../about/AboutSectionL";
import AboutDiscover from "../about/AboutDiscover";
import AboutNumbers from "../about/AboutNumbers";
import AboutContact from "../about/AboutContact";

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
