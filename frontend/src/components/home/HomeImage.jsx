import Image from "next/image";
import React from "react";

const HomeImage = () => {
  return (
    <div className="my-[3rem] flex justify-center mx-4">
      <div
        className="px-4 py-[10rem] md:px-[10rem] text-white text-center flex flex-col gap-4"
        style={{ backgroundImage: "url(/homeassets/photo.png)" }}
      >
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
