import React from "react";
import Image from "next/image";
import heroImage from "../images/Rectangle.png";

function AboutSection() {
  return (
    <div>
      <div className="containerabout">
        <div className="leftone">
          <Image src={heroImage} alt="hero-image" />
        </div>

        <div className="rightone">
          <h2 className="aboutintroh2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </h2>
          <p className="sectionp">
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
