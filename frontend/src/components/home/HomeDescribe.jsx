import Image from "next/image";
import React from "react";
import HomeDescribeDetails from "./HomeDescribeDetails";

const HomeDescribe = () => {
  return (
    <div className="px-10 text-center md:text-left">
      <div className="my-[3rem]">
        <span>
          <Image
            className="my-4"
            src="/footerassets/rec.png"
            alt="line"
            width={100}
            height={3}
          />
        </span>
        <h1 className="text-2xl font-bold">
          Discover RealEstate trends in market
        </h1>
        <p>A Blockchain based tokenized real estate platform</p>
      </div>
      <div className="flex flex-col items-start md:flex-row gap-4">
        <HomeDescribeDetails
          number="01."
          text="Prochain allows property owners to easily sell fractions of their properties"
          info="Increased Liquidity"
        />
        <HomeDescribeDetails
          number="02."
          text="Prochain eliminates intermediaries, reducing transaction costs"
          info="Lower Transaction Costs"
        />
        <HomeDescribeDetails
          number="03."
          text="The use of smart contracts ensures that all transactions are transparent and secure"
          info="Transparency and Security"
        />
        <HomeDescribeDetails
          number="04."
          text="Prochain provides a platform for investors to invest in real estate with lower capital requirements"
          info="Increased Access"
        />
        <HomeDescribeDetails
          number="05."
          text="Prochain eliminates intermediaries, reducing transaction costs"
          info="Lower Transaction Costs"
        />
      </div>
    </div>
  );
};

export default HomeDescribe;
