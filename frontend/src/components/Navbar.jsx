import React from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";
import Image from "next/image";
import NavIcon from "./NavIcon";

const Navbar = () => {
  return (
    <header className="flex flex-col md:flex-row mx-[4rem] py-[2rem] md:pb-0 md:items-center">
      <div className="flex justify-between flex-1">
        <Link href="/">
          <Image
            src="/prochain.png"
            alt="logo"
            width={150}
            height={40}
            className="animate-pulse"
          />
        </Link>
        <div className="md:flex gap-4 font-bold items-end hidden mb-4 md:flex-row md:items-center md:mb-0">
          <span className="hover:bg-gray-300 p-2 flex gap-4 items-center md:flex-col md:gap-0 md:items-start">
            <Image
              src="/footerassets/rec.png"
              alt="icon"
              width={5}
              height={2}
            />
            <Link href="/buy">
              <span className="text-xl font-sans cursor-pointer">Explore</span>
            </Link>
          </span>
          <span className="hover:bg-gray-300 p-2 flex gap-4 items-center md:flex-col md:gap-0 md:items-start ">
            <Image
              src="/footerassets/rec.png"
              alt="icon"
              width={5}
              height={2}
            />
            <Link href="/Sell">
              <span className="text-xl font-sans cursor-pointer">Sell</span>
            </Link>
          </span>
          <span className="hover:bg-gray-300 p-2 flex gap-4 items-center md:flex-col md:gap-0 md:items-start ">
            <Image
              src="/footerassets/rec.png"
              alt="icon"
              width={5}
              height={2}
            />
            <Link href="https://app.gitbook.com/invite/xtM7vQwAwbHXi487Pe0d/sHLIuQMtnr3NQ3YUOs3i">
              <span className="text-xl font-sans cursor-pointer">Docs</span>
            </Link>
          </span>
          <span className="hover:bg-gray-300 p-2 flex gap-4 items-center md:flex-col md:gap-0 md:items-start ">
            <Image
              src="/footerassets/rec.png"
              alt="icon"
              width={5}
              height={2}
            />
            <Link href="https://gamma.app/docs/Making-Real-Estate-Smarter-with-Tokenization-ghi8c5kw2dravb6">
              <span className="text-xl font-sans cursor-pointer">
                Pitch-Deck
              </span>
            </Link>
          </span>
        </div>
        <NavIcon />
      </div>
      <div className="md:flex hidden md:justify-end flex-1">
        <ConnectButton />
      </div>
    </header>
  );
};

export default Navbar;
