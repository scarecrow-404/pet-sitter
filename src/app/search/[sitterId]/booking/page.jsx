"use client";
import React, { useState } from "react";
import Image from "next/image";
import { StepperContext } from "@/contexts/StepperContext";
import Stepper from "@/components/common/Stepper";
import StepperControl from "@/components/common/StepperControl";

import starpic from "@/asset/images/Star1.svg";
import squarepic from "@/asset/images/Ellipse15(butblue).svg";

import Navbar from "@/components/common/Navbar";
import Pet from "@/components/common/steps/Pet";
import Information from "@/components/common/steps/Information";
import Payment from "@/components/common/steps/Payment";

const Booking = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [userData, setUserData] = useState("");
  const [paymentData, setPaymentData] = useState("");
  const steps = ["Your Pet", "Information", "Payment"];

  const displayStep = (step) => {
    switch (step) {
      case 1:
        return <Pet />;
      case 2:
        return <Information />;
      case 3:
        return <Payment />;
    }
  };

  const handleClick = (direction) => {
    let newStep = currentStep;

    direction === "next" ? newStep++ : newStep--;
    newStep > 0 && newStep <= steps.length && setCurrentStep(newStep);
  };

  return (
    <div className="bg-[#FAFAFB] h-full">
      <Navbar />
      <div className="flex lg:flex-row flex-col justify-center 2xl:w-[1440px] mx-[10px] lg:mx-auto pt-[40px] pb-[80px] md:px-[80px] gap-[16px]">
        <div className="bg-[#FFFFFF] flex flex-col md:w-full md:h-[860px] lg:h-[860px]  pb-2 ">
          <div className="">
            <Stepper steps={steps} currentStep={currentStep} />

            <div className="border-t-[20px] border-[#FAFAFB] mt-10 p-10 ">
              <StepperContext.Provider
                value={{
                  userData,
                  setUserData,
                  paymentData,
                  setPaymentData,
                }}
              >
                {displayStep(currentStep)}
              </StepperContext.Provider>
            </div>
          </div>

          <StepperControl
            handleClick={handleClick}
            currentStep={currentStep}
            steps={steps}
          />
        </div>

        <div className="bg-[#FFFFFF] flex flex-col">
          <div className="bg-[#FAFAFB] lg:w-[360px] rounded-[16px]">
            <div className="bg-[#FFFFFF] text-[24px] p-[24px] border-b-[1px]  ">
              <h1>Booking Detail</h1>
            </div>

            <div className="bg-[#FFFFFF] grid p-[24px]  gap-[24px]">
              <div className="h-[52px]">
                <p>Pet Sitter:</p>
                <p>Name By Owner Name</p>
              </div>

              <div className="h-[52px]">
                <p>Date & Time:</p>
                <p>Date | AM - PM</p>
              </div>

              <div className="h-[52px]">
                <p>Duration:</p>
                <p>Times</p>
              </div>

              <div className="h-[52px]">
                <p>Pet</p>
                <p>???</p>
              </div>
            </div>
            <div className="bg-black p-[24px] flex rounded-b-[16px] justify-between ">
              <span className="text-white ">Total</span>
              <span className="text-white ">Money THB</span>
            </div>

            <div className="bg-[#FAFAFB] lg:flex w-[400px] h-[250px] flex-col items-end justify-end hidden">
              <Image
                className="rotate-45"
                src={squarepic}
                alt="square_pic"
                width={108}
                height={108}
              />
            </div>

            <div className="bg-[#FAFAFB] lg:flex w-[400px] h-[300px] flex-col items-end justify-end hidden absolute">
              <Image
                className="rotate-90"
                src={starpic}
                alt="green_star"
                width={292}
                height={285}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#FAFAFB] h-[100px] w-full"></div>
    </div>
  );
};

export default Booking;
