import Image from "next/image";
import React from "react";
import { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const Discover = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const images = [
    {
      src: "/home assets/photo.png",
      alt: "...",
      text: "Discover RealEstate trends in market",
    },
    {
      src: "/home assets/Photo2.png",
      alt: "...",
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
    },
    {
      src: "/home assets/Photo3.png",
      alt: "...",
      text: "Lorem ipsum dolor sit amet consectetur adipiscing elit",
    },
  ];

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (<div className="flex flex-col gap-8 px-4 md:px-8 w-full my-[2rem] py-8 shadow-xl shadow-indigo-500/40 mt-[3rem] bg-white rounded-lg">
  <div className="">
    <h1 className="text-center md:text-left">Discover RealEstate trends in market</h1>
    <p className="text-center md:text-left">Lorem ipsum dolor sit amet consectetur adipisicing elit</p>
  </div>
  <div className="flex flex-col md:flex-row md:items-center md:justify-center">
    <div className="mb-8 md:mb-0 md:mr-8">
      <h2>01</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
    </div>
    <div className="mb-8 md:mb-0 md:mr-8">
      <h2>02</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
    </div>
    <div className="mb-8 md:mb-0 md:mr-8">
      <h2>03</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
    </div>
    <div className="mb-8 md:mb-0">
      <h2>04</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
    </div>
  </div>
  <div className="relative w-full h-64 md:h-96">
    <Image
      src={images[currentSlide].src}
      alt={images[currentSlide].alt}
      layout="fill"
      objectFit="cover"
    />
    <div className="absolute inset-0 flex flex-col items-center justify-center">
      <div className="absolute top-0 opacity-70 right-0 flex flex-row justify-between">
        <button className="border-none p-3" onClick={handlePrevSlide}>
          <FaArrowLeft />
        </button>
        <button className="border-none p-3 ml-3" onClick={handleNextSlide}>
          <FaArrowRight />
        </button>
      </div>
      <h2 className="text-2xl md:text-4xl text-[#ea580c] text-center md:text-left">Some Text on Image</h2>
      <p className="text-[#ea580c] text-center md:text-left">{images[currentSlide].text}</p>
    </div>
  </div>
  <div className="flex md:flex-row justify-between">
    <div className="mb-8 md:mb-0 md:mr-4 w-3/5 md:w-1/5">
      <Image src="/home assets/DigitalEstate/spotify.png" width="100%" height="50vh" alt="...loading" />
    </div>
    <div className="mb-8 md:mb-0 md:mr-4 w-3/5  md:w-1/5 ml-3">
      <Image src="/home assets/DigitalEstate/ion_know.png" width="100%" height="50vh" alt="...loading" />
    </div>
    <div className="mb-8 md:mb-0 md:mr-4 w-3/5  md:w-1/5 ml-3">
      <Image src="/home assets/DigitalEstate/google.png" width="100%" height="50vh" alt="...loading" />
    </div>
  <div className="mb-8 md:mb-0 md:mr-4 w-3/5  md:w-1/5 ml-3">
    <Image src="/home assets/DigitalEstate/esa.png"  width="100%" height="50vh"alt="...loading" />
  </div>
  <div className="mb-8 md:mb-0 md:mr-4 w-3/5 ml-3 md:w-1/5">
    <Image src="/home assets/DigitalEstate/vimeo.png"  width="100%" height="50vh" alt="...loading" />
  </div>
</div>

    </div>
  );
};

export default Discover;
