import React from "react";
import Image from "next/image";
import heroImage from "../../images/Rectangle.png";
import styling from "../../../styles/Home.module.css";

function AboutSection() {
  return (
    <div>
      <div className={`${styling.containerabout} ${styling.resp}`}>
        <div className={`${styling.leftone} ${styling.hideonmobile}`}>
          <Image src={heroImage} alt="hero-image" />
        </div>

        <div className={`${styling.rightone} ${styling.alignleft}`}>
          <h2 className={styling.aboutintroh2}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </h2>
          <p className={styling.sectionp}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni quae
            itaque magnam nemo veritatis asperiores? Commodi earum quas minus
            cum vero libero voluptatem. Vero, aut quibusdam harum accusamus
            explicabo quam?
          </p>
        </div>
      </div>
    </div>
  );
}

export default AboutSection;
