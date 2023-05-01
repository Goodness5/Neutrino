import Image from "next/image";
import React from "react";
import PropertyDetails from "./Propertydetails"

const Properties = () => {
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
          <PropertyDetails img="Photo1"
           title="Chicago"
            text="Illinois" />
            <button className="p-4 bg-black text-white">Buy</button>
        </div>
        <div className="flex-1">
          <PropertyDetails img="Photo2"
           title="Boston" 
           text="Masachusets" />
           <button>Buy</button>
        </div>
        <div className="flex-1">
          <PropertyDetails
            img="Photo3"
            title="San Francisco"
            text="California"
          />
          <button className="p-4 bg-black  rounded-lg text-white">Buy</button>
        </div>
      </div>
      <div className="flex gap-4 flex-col md:flex-row">
        <div className="md:w-[30%] w-full">
          <PropertyDetails img="Photo4"
           title="Washington, D.C."
            text="USA" />
          <button className="p-4 bg-black  rounded-lg text-white">Buy</button>
        </div>
        <div className="grow">
          <PropertyDetails
            img="Photo5"
            title="New York City"
            text="New York"
          />
          <button className="p-4 bg-black  rounded-lg text-white">Buy</button>
        </div>
      </div>
      <div className="flex gap-4 flex-col md:flex-row">
        <div className="grow">
          <PropertyDetails
            img="Photo7"
            title="Los Angeles"
            text="California"
          />
          <button className="p-4 bg-black rounded-lg text-white">Buy</button>
        </div>
        <div className="md:w-[30%] w-full">
          <PropertyDetails img="Photo8"
           title="Miami"
            text="Florida" />
          <button className="p-4 bg-black  rounded-lg text-white">Buy</button>
        </div>
      </div>
    </div>
  );
};

export default Properties;
