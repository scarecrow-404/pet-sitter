// components/Carousel.js
import React, { useRef } from "react";
import Slider from "react-slick";
import Image from "next/image"; // Import the Image component
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import iconNext from "@/asset/images/IconButtonNext.svg";
import iconPrev from "@/asset/images/IconButtonPrev.svg";
const Carousel = ({ images, picNum }) => {
  const sliderRef = useRef(null);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: picNum,
    slidesToScroll: 1,
  };

  const goToPrev = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev();
    }
  };

  const goToNext = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext();
    }
  };

  return (
    <div className=" relative h-fit max-w-screen overflow-hidden">
      <Slider ref={sliderRef} {...settings}>
        {images.map((image, index) => (
          <div key={index} className="relative flex">
            {typeof image === "object" ? (
              <Image
                src={image.url}
                alt={`slide-${index}`}
                className="w-full max-w-[500px] h-[300px] object-cover px-[1px]"
                width={400}
                height={300}
              />
            ) : (
              <Image
                src={image}
                alt={`slide-${index}`}
                className="w-full max-w-[500px] h-[300px] px-[1px]"
                width={400}
                height={300}
              />
            )}
          </div>
        ))}
      </Slider>
      <button
        className="absolute w-[40px] h-[40px] top-1/2 transform -translate-y-1/2  bg-white text-black p-2 rounded-full left-0 ml-[40px] cursor-pointer"
        onClick={goToPrev}
      >
        <div className="flex justify-center">
          <Image src={iconPrev} />
        </div>
      </button>
      <button
        className="absolute w-[40px] h-[40px] top-1/2 transform -translate-y-1/2  bg-white text-black p-2 rounded-full right-0 mr-[40px] cursor-pointer "
        onClick={goToNext}
      >
        <div className="flex justify-center">
          <Image src={iconNext} />
        </div>
      </button>
    </div>
  );
};

export default Carousel;
