import Image from "next/image";
import React from "react";
import HomeTextBox from "../home/HomeTextBox";

const PropertyDetails = ({ img, price, title, text }) => {
  return (
   
    <div className="relative h-[15rem] w-[100%] ">
      <div className="absolute inset-0">
        <Image src={`/home assets/${img}.png`} alt="bg img" layout="fill" />
      </div>
      <p>{price}</p>
      <div className="relative z-10 h-full flex flex-col items-start justify-end gap-4">
        <HomeTextBox title={title} text={text} />
      </div>
    </div>
  );
};

export default PropertyDetails;
