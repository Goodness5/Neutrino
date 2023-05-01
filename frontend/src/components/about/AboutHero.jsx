import React from "react";
import Image from "next/image";
import heroImage from "../../images/Background.png";
import styling from "../../../styles/Home.module.css";

function AboutHero() {
  return (
    <div>
      <div className={styling.containerabout}>
        <div className={styling.leftone}>
          <p>Changing</p>
          <h1 className={styling.aboutintroh1}>The face Of Real Estate</h1>
          <p>One happy home owner at a time.</p>
          <button className={styling.aboutbtn}>Create Account</button>
        </div>

        <div className={styling.rightone}>
          <Image
            className={styling.ki}
            src={heroImage}
            alt="hero-image"
            id="remove"
          />
        </div>
      </div>
    </div>
  );
}

export default AboutHero;
