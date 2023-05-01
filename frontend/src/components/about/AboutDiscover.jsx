import React from "react";
import Image from "next/image";
import line from "../../images/Rectanglediscover.png";
import styling from "../../../styles/Home.module.css";

function AboutDiscover() {
  return (
    <div>
      <div className={styling.containerabout}>
        <div className={styling.leftone}>
          <Image src={line} alt="line" />
          <h1 className={`${styling.discover} ${styling.upperline}`}>
            Discover RealEstate trends in market
          </h1>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
        </div>
      </div>
    </div>
  );
}

export default AboutDiscover;
