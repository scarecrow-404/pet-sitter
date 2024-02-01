"use client";
import React from "react";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import avatar from "@/asset/images/secondSitterDetail.svg";
import avatar2 from "@/asset/images/firstSitterDetail.svg";
import avatar3 from "@/asset/images/thirdSitterDetail.svg";
import Carousel from "@/components/Carousel";
import SitterDetail from "@/components/SitterDeatail";

const SitterProfile = () => {
  const images = [{ url: avatar }, { url: avatar2 }, { url: avatar3 }];

  return (
    <div className=" overflow-x-hidden max-w-[1440px] mx-auto">
      <Navbar />

      <div className="lg:hidden md:hidden m-3 ">
        <Carousel images={images} picNum={1} />
      </div>
      <div className="hidden md:block lg:hidden">
        <Carousel images={images} picNum={2} />
      </div>
      <div className="hidden lg:block md:hidden ">
        <Carousel images={images} picNum={3} />
      </div>
      <SitterDetail />

      <Footer />
    </div>
  );
};

export default SitterProfile;
