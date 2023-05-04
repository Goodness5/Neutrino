import Image from "next/image";
import React from "react";

const HomeImage = () => {
  return (
    <div className="relative h-[25rem] md:h-screen mt-[3rem] mx-[3rem] bg-homeImage ">
      <div className="absolute inset-0">
        <Image
          src="/homeassets/photo.png"
          alt="bg img"
          width={1200}
          height={500}
        />
      </div>
      <div className="text-white md:mt[-5rem] px-2 md:px-[10rem] relative z-10 h-[25rem] flex flex-col items-center justify-center gap-4">
        <p>
          «Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat»
        </p>

        <h2>John Black</h2>
      </div>
    </div>
  );
};

export default HomeImage;
