"use client";
import React, { useState, useEffect } from "react";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import Image from "next/image";
import star from "@/asset/images/Star2.svg";
import avatar from "@/asset/images/secondSitterDetail.svg";
import avatar2 from "@/asset/images/firstSitterDetail.svg";
import avatar3 from "@/asset/images/thirdSitterDetail.svg";
import Carousel from "@/components/Carousel";
import SitterDetail from "@/components/SitterDeatail";
import PopupBooking from "@/components/Popup";
import withAuth from "@/lib/utils/withAuth";
const SitterProfile = () => {
  const images = [{ url: avatar }, { url: avatar2 }, { url: avatar3 }];

  function renderStar(starNumber) {
    let stars = [];
    for (let i = 0; i < starNumber; i++) {
      stars.push(<Image key={i} src={star} alt="star" className=" w-[12px]" />);
    }
    return stars;
  }

  return (
    <div className=" overflow-x-hidden">
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

export default withAuth(SitterProfile);
