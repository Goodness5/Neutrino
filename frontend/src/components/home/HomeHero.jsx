import Image from "next/image";
import React from "react";

const HomeHero = () => {
  return (
    <div className="flex flex-col md:flex-row justify-center gap-4 px-8 items-center">
      <div className="flex flex-col gap-4 md:w-[35%] text-center md:text-left">
        <span>Prochain is</span>
        <h1 className="font-bold text-5xl">The real estate marketplace</h1>
        <p>A Blockchain based tokenized real estate platform</p>
      </div>
      <div className="grow">
        <Image
          src="/homeassets/DigitalEstate/photo.jpg"
          alt="hero Image"
          width={800}
          height={400}
          className="rounded-md hover:animate-pulse"
        />
      </div>
    </div>
  );
};

export default HomeHero;
