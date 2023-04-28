import React from "react";
import Image from "next/image";
import heroImage from "../../images/Background.png";
// import styles from "../styles/globals.css";

function AboutHero() {
  return (
    <div>
      <div className="containerabout">
        <div className="leftone">
          <p>Changing</p>
          <h1 className="aboutintroh1">The face Of Real Estate</h1>
          <p>One happy home owner at a time.</p>
          <button className="aboutbtn">Create Account</button>
        </div>

        <div className="rightone">
          <Image src={heroImage} alt="hero-image" />
        </div>
      </div>
    </div>
  );
}

export default AboutHero;
