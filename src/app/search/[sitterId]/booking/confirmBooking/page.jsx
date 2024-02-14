"use client";
import React from "react";
import Image from "next/image";
import Navbar from "@/components/common/Navbar";

import left from "@/asset/images/left_cat_meow_meow.svg";
import right from "@/asset/images/right_cat_meow_meow.svg";

function page() {
  return (
    <div className="bg-[#FAFAFB] flex flex-col justify-center">
      <Navbar />
      <div className="flex justify-center h-full">
        <div className="lg:w-[1440px] lg:h-[1024px] h-screen flex justify-center">
          <div className="hidden lg:block pr-[40px] ">
            <div className="">
              <Image src={left} alt="left_pic" />
            </div>
          </div>
          <div className=" flex flex-col items-center pt-[40px] lg:pt-[88px] ">
            <div className=" w-[318px] sm:w-[420px] md:w-[600px] lg:w-[632px] flex flex-col  ">
              <div className="text-center bg-black text-white gap-[40px] p-[24px] rounded-t-[16px] ">
                <h1 className="text-[24px] lg:text-[36px] font-[700] leading-[36px] ">
                  Thank You For Booking
                </h1>
                <div className="lg:flex justify-center text-[16px] text-center text-[#AEB1C3] font-[500] leading-[28px]">
                  <p>We will send your booking </p>
                  <p>information to Pet Sitter.</p>
                </div>
              </div>
              <div className="p-[20px] sm:p-[40px] gap-[24px] bg-white ">
                <div className="text-[16px] text-[#AEB1C3] font-[500] leading-[28px]">
                  <p>Transaction Date: (date)</p>
                  <p>Transaction No. : (number)</p>
                </div>
                <div className="mt-[24px]">
                  <p className="text-[14px] text-[#7B7E8F] font-[500] leading-[24px]">
                    Pet Sitter:
                  </p>
                  <p className="text-[16px] font-[500] leading-[24px]">
                    (name) By (ownerName)
                  </p>
                </div>
                <div className="lg:flex flex-row">
                  <div className="mt-[10px] sm:mt-[24px] w-full">
                    <p className="text-[14px] text-[#7B7E8F] font-[500] leading-[24px]">
                      Date & Time:
                    </p>
                    <p className="text-[16px] font-[500] leading-[24px]">
                      (Date) | (Time)
                    </p>
                  </div>
                  <div className="mt-[10px] sm:mt-[24px] lg:ml-[24px] w-full">
                    <p className="text-[14px] text-[#7B7E8F] font-[500] leading-[24px]">
                      Duration:
                    </p>
                    <p className="text-[16px] font-[500] leading-[24px]">
                      (hours)
                    </p>
                  </div>
                </div>
                <div className="my-[10px] sm:my-[24px]">
                  <p className="text-[14px] text-[#7B7E8F] font-[500] leading-[24px]">
                    Pet:
                  </p>
                  <p className="text-[16px] font-[500] leading-[24px]">
                    (pet name)
                  </p>
                </div>
                <hr />
                <div className="flex flex-row justify-between mt-[10px] sm:mt-[24px]">
                  <p className="text-[16px] font-[500] leading-[28px]">total</p>
                  <p className="text-[18px] font-[500] leading-[26px]">
                    (price)
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-center items-end w-full mt-[20px] sm:mt-[24px] gap-[5px] sm:gap-[16px]  h-[48px]">
              <button className="text-[14px] md:text-[16px] font-[700] leading-[24px] w-[157px] sm:w-[165px] md:w-[180px] h-[48] py-[12px] sm:px-[24px] rounded-[99px] text-[#FF7037] bg-[#FFF1EC]">
                Booking History
              </button>
              <button className="text-[14px] md:text-[16px] font-[700] leading-[24px] w-[157px] sm:w-[165px] md:w-[180px] h-[48] py-[12px] sm:px-[24px] rounded-[99px] text-white bg-[#FF7037]">
                Back to Home
              </button>
            </div>
          </div>
          <div className="hidden h-[900px] lg:flex flex-col items-end justify-end pl-[40px] ">
            <div className="">
              <Image src={right} alt="right_pic" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
