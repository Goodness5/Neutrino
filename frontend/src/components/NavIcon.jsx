import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const NavIcon = () => {
  const [open, setOpen] = useState(true);

  if (open) {
    return (
      <div
        onClick={() => setOpen(!open)}
        className="flex flex-col gap-2 p-1 hover:cursor-pointer rounded-md md:hidden"
      >
        <Image
          src="/navbarassets/control.png"
          alt="toggle button"
          width={32}
          height={32}
        />
      </div>
    );
  } else {
    return (
      <div
        onClick={() => setOpen(!open)}
        className="flex flex-col gap-2 p-1 hover:cursor-pointer rounded-md md:hidden"
      >
        <Image
          src="/navbarassets/cancel.png"
          alt="cancel button"
          width={32}
          height={32}
          className="relative"
        />

        <div className="flex flex-col absolute right-0 top-20 gap-4 bg-[rgba(0,0,0,0.8)] p-8 rounded-xl z-20 font-sans">
          <span className="bg-gray-200 hover:bg-gray-300 rounded-lg p-2 flex gap-2 items-center">
            <Image
              src="/footerassets/rec.png"
              alt="icon"
              width={5}
              height={2}
            />
            <Link href="/buy">
              <span>Explore</span>
            </Link>
          </span>
          <span className="bg-gray-200 hover:bg-gray-300 rounded-lg p-2 flex gap-2 items-center">
            <Image
              src="/footerassets/rec.png"
              alt="icon"
              width={5}
              height={2}
            />
            <Link href="/Sell">
              <span>Sell</span>
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
          <ConnectButton />
        </div>
      </div>
    );
  }
};

export default NavIcon;
