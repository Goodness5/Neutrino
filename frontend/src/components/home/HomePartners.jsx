import Image from "next/image";
import React from "react";

const HomePartners = () => {
  return (
    <div className="flex flex-col md:flex-row gap-8 md:gap-0 justify-between w-full px-[4rem] items-center opacity-20">
      <Image
        src="/homeassets/DigitalEstate/spotify.png"
        alt="image"
        width={100}
        height={50}
      />
      <Image
        src="/homeassets/DigitalEstate/ion_know.png"
        alt="image"
        width={100}
        height={50}
      />
      <Image
        src="/homeassets/DigitalEstate/google.png"
        alt="image"
        width={100}
        height={50}
      />
      <Image
        src="/homeassets/DigitalEstate/esa.png"
        alt="image"
        width={100}
        height={50}
      />
      <Image
        src="/homeassets/DigitalEstate/vimeo.png"
        alt="image"
        width={100}
        height={50}
      />
    </div>
  );
};

export default HomePartners;
