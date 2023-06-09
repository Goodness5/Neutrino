import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Carousel = dynamic(() => import('react-slick'), {
  ssr: false // disable server-side rendering
});

const images = [
  { src: "/carousel/carousel1.png", alt: "Carousel 1" },
  { src: "/carousel/carousel2.png", alt: "Carousel 2" },
  { src: "/carousel/carousel3.png", alt: "Carousel 3" },
];

function Slider() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const settings = {
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000,
    dots: true,
    dotsClass: "slick-dots custom-indicator"
  };

  if (!isMounted) return null;

  return (
    <div style={{ overflow: 'hidden' }}>
      <Carousel {...settings} >
        {images.map(({ src, alt }, index) => (
          <div key={index} className="">
            <div style={{ position: 'relative', width: '100%', height: '100vh' }}>
              <Image src={src} alt={alt} layout="fill" className="p-0" />
            </div>
          </div>
        ))}
      </Carousel>
      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        
      </div>
    </div>
  );
}

export default Slider;
