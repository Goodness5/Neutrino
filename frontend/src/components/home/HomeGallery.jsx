import Image from "next/image";
import React from "react";
import HomeGalleryImage from "./HomeGalleryImage";

const HomeGallery = () => {
  return (
    <div className="flex flex-col gap-8 px-8 w-full my-[2rem]">
      <div className="flex flex-col items-center justify-center">
        <span>
          <Image
            src="/footer assets/rec.png"
            alt="line"
            width={100}
            height={3}
          />
        </span>
        <h1 className="font-bold text-3xl">Explore our neighbourhoods</h1>
      </div>
      <div className="flex gap-4 flex-col md:flex-row">
        <div className="flex-1">
          <HomeGalleryImage img="Photo1" title="Chicago" text="Illinois" />
        </div>
        <div className="flex-1">
          <HomeGalleryImage img="Photo2" title="Boston" text="Masachusets" />
        </div>
        <div className="flex-1">
          <HomeGalleryImage
            img="Photo3"
            title="San Francisco"
            text="California"
          />
        </div>
      </div>
      <div className="flex gap-4 flex-col md:flex-row">
        <div className="w-[30%]">
          <HomeGalleryImage img="Photo4" title="Washington, D.C." text="USA" />
        </div>
        <div className="grow">
          <HomeGalleryImage
            img="Photo5"
            title="New York City"
            text="New York"
          />
        </div>
      </div>
      <div className="flex gap-4 flex-col md:flex-row">
        <div className="grow">
          <HomeGalleryImage
            img="Photo7"
            title="Los Angeles"
            text="California"
          />
        </div>
        <div className="w-[30%]">
          <HomeGalleryImage img="Photo8" title="Miami" text="Florida" />
        </div>
      </div>
    </div>
  );
};

export default HomeGallery;
