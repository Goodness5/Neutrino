import Image from "next/image";
import React from "react";

const HomeImage = () => {
  return (
    <div className="my-[3rem] flex justify-center mx-4">
      <div
        className="px-4 py-[10rem] md:px-[10rem] text-white text-center flex flex-col gap-4"
        style={{ backgroundImage: "url(/homeassets/photo.png)" }}
      >
        <p className="text-2xl">
          Prochain is a decentralized application (Dapp) built on the blockchain
          that allows property owners to rent and sell their properties using
          fractionalized tokens. The platform also enables buyers to purchase
          and rent properties using these tokens.
        </p>
      </div>
    </div>
  );
};

export default HomeImage;
