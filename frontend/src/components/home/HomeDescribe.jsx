import Image from "next/image";
import React from "react";
import HomeDescribeDetails from "./HomeDescribeDetails";

const HomeDescribe = () => {
  return (
    <div className="px-10">
      <div className="my-[3rem]">
        <span>
          <Image
            className="my-4"
            src="/footer assets/rec.png"
            alt="line"
            width={100}
            height={3}
          />
        </span>
        <h1 className="text-2xl font-bold">
          Discover RealEstate trends in market
        </h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
      </div>
      <div className="flex gap-4">
        <HomeDescribeDetails
          number="01."
          text="Lorem ipsum dolor sit amet, consectetur adipiscing elit"
          info="Adipiscing elit"
        />
        <HomeDescribeDetails
          number="02."
          text="Lorem ipsum dolor sit amet, consectetur adipiscing elit"
          info="Adipiscing elit"
        />
        <HomeDescribeDetails
          number="03."
          text="Lorem ipsum dolor sit amet, consectetur adipiscing elit"
          info="Adipiscing elit"
        />
        <HomeDescribeDetails
          number="04."
          text="Lorem ipsum dolor sit amet, consectetur adipiscing elit"
          info="Adipiscing elit"
        />
        <HomeDescribeDetails
          number="05."
          text="Lorem ipsum dolor sit amet, consectetur adipiscing elit"
          info="Adipiscing elit"
        />
      </div>
    </div>
  );
};

export default HomeDescribe;
