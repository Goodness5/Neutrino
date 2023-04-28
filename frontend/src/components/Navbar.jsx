import React from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  return (
    <header className="flex flex-col md:flex-row mx-[4rem] py-[2rem] md:items-center">
      <div className="flex justify-between flex-1">
        <div>
          <Image
            src="/footer assets/Group 20.png"
            alt="logo"
            width={150}
            height={30}
          />
        </div>
        <div className="md:flex gap-4 font-bold items-end hidden mb-4 md:flex-row md:items-center md:mb-0">
          <span className="hover:bg-gray-300 p-2 flex gap-4 items-center md:flex-col md:gap-0 md:items-start">
            <Image
              src="/footer assets/rec.png"
              alt="icon"
              width={5}
              height={2}
            />
            <Link href="/">Buy</Link>
          </span>
          <span className="hover:bg-gray-300 p-2 flex gap-4 items-center md:flex-col md:gap-0 md:items-start">
            <Image
              src="/footer assets/rec.png"
              alt="icon"
              width={5}
              height={2}
            />
            <Link href="/">Rent</Link>
          </span>
          <span className="hover:bg-gray-300 p-2 flex gap-4 items-center md:flex-col md:gap-0 md:items-start ">
            <Image
              src="/footer assets/rec.png"
              alt="icon"
              width={5}
              height={2}
            />
            <Link href="/">Sell</Link>
          </span>
        </div>
        <div className="flex flex-col gap-2 p-1 border-2 border-[#2a2a2a] hover:cursor-pointer rounded-md md:hidden">
          <span className="bg-[#2a2a2a] w-[2rem] h-[0.2rem] rounded-2xl"></span>
          <span className="bg-[#2a2a2a] w-[2rem] h-[0.2rem] rounded-2xl"></span>
          <span className="bg-[#2a2a2a] w-[2rem] h-[0.2rem] rounded-2xl"></span>
        </div>
      </div>
      <div className="md:flex hidden md:justify-end flex-1">
        <ConnectButton />
      </div>
    </header>
  );
};

export default Navbar;


