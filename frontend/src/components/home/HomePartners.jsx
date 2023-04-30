import Image from "next/image";
import React from "react";

const HomePartners = () => {
  return (
    <div className="flex flex-col md:flex-row gap-4 justify-between w-full px-8 items-center opacity-20">
      <Image
        src="/home assets/UI DigitalEstate (Copy) (1)/0_-UxHK_uftidJ0oAY.png"
        alt="image"
        width={100}
        height={50}
      />
      <Image
        src="/home assets/UI DigitalEstate (Copy) (1)/43_digital_logo_black_HI.png"
        alt="image"
        width={100}
        height={50}
      />
      <Image
        src="/home assets/UI DigitalEstate (Copy) (1)/first-home-robot-that-sees-and-tracks-intruders-indiegogo-5344.png"
        alt="image"
        width={100}
        height={50}
      />
      <Image
        src="/home assets/UI DigitalEstate (Copy) (1)/large_slack-imgs.com.png"
        alt="image"
        width={100}
        height={50}
      />
      <Image
        src="/home assets/UI DigitalEstate (Copy) (1)/Spotify_logo_black.png"
        alt="image"
        width={100}
        height={50}
      />
    </div>
  );
};

export default HomePartners;
