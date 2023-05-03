import React from "react";
import styles from "../../styles/Home.module.css";
import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <footer>
      <div className={`${styles.footer}`}>
        <div className="flex flex-col md:flex-row gap-8 items-center md:items-start justify-between py-[1rem] mx-[4rem]">
          <div className="flex flex-col items-center md:items-start md:items-start gap-4 flex-1">
            <span>
              <Image
                src="/prochain.png"
                alt="logo"
                width={150}
                height={40}
              />
            </span>
            <span className="text-center md:text-left">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit
            </span>
            <span className="flex gap-2">
              <span>
                <Image
                  src="/footer assets/tw.png"
                  alt="logo"
                  width={30}
                  height={30}
                />
              </span>
              <span>
                <Image
                  src="/footer assets/p.png"
                  alt="logo"
                  width={30}
                  height={30}
                />
              </span>
              <span>
                <Image
                  src="/footer assets/002-facebook-logo-button.png"
                  alt="logo"
                  width={30}
                  height={30}
                />
              </span>
              <span>
                <Image
                  src="/footer assets/inst.png"
                  alt="logo"
                  width={30}
                  height={30}
                />
              </span>
            </span>
          </div>
          <div className="flex flex-col items-center md:items-start gap-4 flex-1">
            <span className="font-bold text-xl">ProChain</span>
            <span className="my-[-0.4rem]">
              <Image
                src="/footer assets/Rectangle.png"
                alt="line"
                width={100}
                height={3}
              />
            </span>
            <span>
              <Link href="/">About</Link>
            </span>
            <span>
              <Link href="/">Contact Us</Link>
            </span>
          </div>
          <div className="flex flex-col items-center md:items-start gap-4 flex-1">
            <span className="font-bold text-xl">Buy</span>
            <span className="my-[-0.4rem]">
              <Image
                src="/footer assets/Rectangle.png"
                alt="line"
                width={100}
                height={3}
              />
            </span>
            <span>
              <Link href="/">Apartments</Link>
            </span>
            <span>
              <Link href="/">Houses</Link>
            </span>
            <span>
              <Link href="/">Offices</Link>
            </span>
            <span>
              <Link href="/">Land</Link>
            </span>
          </div>
          <div className="flex flex-col items-center md:items-start gap-4 flex-1">
            <span className="font-bold text-xl">Rent</span>
            <span className="my-[-0.4rem]">
              <Image
                src="/footer assets/Rectangle.png"
                alt="line"
                width={100}
                height={3}
              />
            </span>
            <span>
              <Link href="/">Apartments</Link>
            </span>
            <span>
              <Link href="/">Houses</Link>
            </span>
            <span>
              <Link href="/">Offices</Link>
            </span>
            <span>
              <Link href="/">Land</Link>
            </span>
          </div>
          <div className="flex flex-col items-center md:items-start gap-4 flex-1">
            <span className="font-bold text-xl">Customers</span>
            <span className="my-[-0.4rem]">
              <Image
                src="/footer assets/Rectangle.png"
                alt="line"
                width={100}
                height={3}
              />
            </span>
            <span>
              <Link href="/">For Home Sellers</Link>
            </span>
            <span>
              <Link href="/">For Real Estate Agents</Link>
            </span>
          </div>
        </div>
      </div>
      <div
        className={`${styles.footer} flex flex-col items-center gap-2 md:gap-0 md:flex-row justify-between mx-[4rem]`}
      >
        <p className="text-center md:text-left">
          © 2018 Open Listings Co. Licensed in CA, WA, TX & IL. TREC: Info
        </p>
        <Link href="/">Terms of use · Privacy policy</Link>
      </div>
    </footer>
  );
};

export default Footer;
