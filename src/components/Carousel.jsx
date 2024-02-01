// components/Carousel.js
import React, { useRef } from "react";
import Slider from "react-slick";
import Image from "next/image"; // Import the Image component
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import iconNext from "@/asset/images/iconNextButton.svg";
import iconPrev from "@/asset/images/iconPrev.svg";
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
    <div className="w-full relative h-fit">
      <Slider ref={sliderRef} {...settings}>
        {images.map((image, index) => (
          <div key={index} className="relative flex">
            {typeof image === "object" ? (
              <Image
                src={image.url}
                alt={`slide-${index}`}
                className=" w-[500px] h-[300px] object-cover px-3"
              />
            ) : (
              <Image
                src={image}
                alt={`slide-${index}`}
                className="w-[500px] h-[300px] "
              />
            )}
          </div>
        ))}
      </Slider>
      <button
        className="absolute w-[40px] h-[40px] top-1/2 transform -translate-y-1/2 bg-white text-black p-2 rounded-full left-[40px] cursor-pointer"
        onClick={goToPrev}
      >
        {"<"}
      </button>
      <button
        className="absolute w-[40px] h-[40px] top-1/2 transform -translate-y-1/2  bg-white text-black p-2 rounded-full right-[40px] cursor-pointer "
        onClick={goToNext}
      >
        {">"}
      </button>
    </div>
  );
};

export default Carousel;
