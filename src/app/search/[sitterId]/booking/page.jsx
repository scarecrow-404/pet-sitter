"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Stepper from "@/components/common/Stepper";
import StepperControl from "@/components/common/StepperControl";

import starpic from "@/asset/images/Star1.svg";
import squarepic from "@/asset/images/Ellipse15(butblue).svg";

import Navbar from "@/components/common/Navbar";
import Pet from "@/components/common/steps/Pet";
import Information from "@/components/common/steps/Information";
import Payment from "@/components/common/steps/Payment";
import { useUser } from "@/hooks/hooks";

const Booking = () => {
  //่รับข้อมูลต่อมาจาก sodix
  const { userId } = useUser();
  const { bookingData, setBookingData } = useUser();
  console.log(bookingData);

  const [currentStep, setCurrentStep] = useState(1);
  const steps = ["Your Pet", "Information", "Payment"];
  const [errors, setErrors] = useState({});

  const [paymentMethod, setPaymentMethod] = useState({
    creditCard: true,
    cash: false,
  });
  //from pet
  const [selectedPets, setSelectedPets] = useState([]);

  //from information
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");

  const [values, setValues] = useState({
    pets_id: "",
    name: "",
    email: "",
    phoneNumber: "",
    message: "",
    cardNumber: "",
    cardOwner: "",
    expiryDate: "",
    cvccvv: "",
    price: 0,
    creditCard: "creditcard",
    cash: "cash",
  });

  const displayStep = (step) => {
    switch (step) {
      case 1:
        return (
          <Pet
            values={values}
            handleInput={handleInput}
            HandleCheck={HandleCheck}
            selectedPets={selectedPets}
            setSelectedPets={setSelectedPets}
            errors={errors}
          />
        );
      case 2:
        return (
          <Information
            values={values}
            handleInput={handleInput}
            errors={errors}
            fullName={fullName}
            email={email}
            phoneNumber={phoneNumber}
            message={message}
            setFullName={setFullName}
            setEmail={setEmail}
            setPhoneNumber={setPhoneNumber}
            setMessage={setMessage}
          />
        );
      case 3:
        return (
          <Payment
            values={values}
            handleInput={handleInput}
            handleClick={handleClick}
            errors={errors}
          />
        );
    }
  };

  const handlePrev = () => {
    let newStep = currentStep;
    newStep--;
    newStep > 0 && newStep <= steps.length && setCurrentStep(newStep);
  };

  const HandleCheck = (index) => {
    setCheck((prevState) =>
      prevState.map((item, idx) => (idx === index ? !item : item))
    );
  };

  const handleNext = () => {
    let newStep = currentStep;

    if (newStep === 1) {
      setCurrentStep(newStep + 1);
    } else if (newStep === 2) {
      // const checkStep2 = {};
      // if (values.name === "") {
      //   checkStep2.name = "*Please Enter Your Name";
      // }
      // if (values.email === "") {
      //   checkStep2.email = "*Please Enter Your Email";
      // }
      // if (values.phoneNumber === "") {
      //   checkStep2.phoneNumber = "*Please Enter Your Number";
      // }
      // if (Object.keys(checkStep2).length) {
      //   setErrors({ ...checkStep2 });
      // } else {
      //   setErrors({});
      //   setCurrentStep(newStep + 1);
      // }
      setCurrentStep(newStep + 1);
    } else if (newStep === 3) {
      const checkStep3 = {};
      if (values.cardNumber === "") {
        checkStep3.cardNumber = "*Please Enter Your Credit Card Number";
      }
      if (values.cardOwner === "") {
        checkStep3.cardOwner = "*Please Enter Card Owner Name";
      }
      if (values.expiryDate === "") {
        checkStep3.expiryDate = "*Please Enter Card Expiry Date";
      }
      if (values.cvccvv === "") {
        checkStep3.cvccvv = "*Please Enter Card CVC/CVV";
      }
      if (Object.keys(checkStep3).length) {
        setErrors({ ...checkStep3 });
      } else {
        setErrors({});
        setCurrentStep(newStep + 1);
      }
    }
  };

  const handleClick = () => {
    setValues({
      creditCard: !setValues.creditCard,
      cash: !setValues.cash,
    });
  };

  const handleInput = (event) => {
    const newObj = { ...values, [event.target.name]: event.target.value };
    setValues(newObj);
  };

  useEffect(() => {
    console.log(values);
  }, [values]);

  return (
    <div className="bg-[#FAFAFB] ">
      <div className="bg-[#FAFAFB] h-full ">
        <Navbar />
        <div className="flex lg:flex-row flex-col">
          <div className="w-full flex lg:flex-row flex-col justify-center 2xl:w-[1440px] lg:mx-auto pt-[40px] md:px-[80px] gap-[16px]">
            <div className="bg-[#FFFFFF] flex flex-col md:w-full h-auto mb-[20px] pb-[20px] ">
              <div className="">
                <Stepper steps={steps} currentStep={currentStep} />
                <div className="border-t-[20px] border-[#FAFAFB] pt-[20px] md:pt-[30px] my-[40px] mx-[10px] sm:mx-[30px] md:mx-[0px] md:p-[10px]">
                  {displayStep(currentStep)}
                </div>
              </div>
              <StepperControl
                handlePrev={handlePrev}
                handleNext={handleNext}
                currentStep={currentStep}
                steps={steps}
              />
            </div>
            <div className="bg-[#FFFFFF] w-full min-w-[320px] sm:max-w-[600px] lg:w-[300px] mx-auto">
              <div className="bg-[#FAFAFB] rounded-[16px] ">
                <div className="bg-[#FFFFFF] text-[24px] font-[700] leading-[32px] p-[24px] border-b-[1px] ">
                  <h1>Booking Detail</h1>
                </div>

                <div className="bg-[#FFFFFF] grid p-[24px] gap-[24px] ">
                  <div className="lg:h-[52px] lg:block flex justify-between ">
                    <p className="text-[14px] font-[500] lg:text-[#7B7E8F] leading-[24px]">
                      Pet Sitter:
                    </p>
                    <div className="flex">
                      <p className="text-[16px] font-[500] leading-[28px]">
                        Name
                      </p>
                      &nbsp;
                      <p className="text-[16px] font-[500] leading-[28px]">
                        By Owner Name
                      </p>
                    </div>
                  </div>

                  <div className="lg:h-[52px] lg:block flex justify-between">
                    <p className="text-[14px] lg:text-[#7B7E8F] font-[500] leading-[24px]">
                      Date & Time:
                    </p>
                    <p className="text-[16px] font-[500] leading-[28px]">
                      Date | AM - PM
                    </p>
                  </div>

                  <div className="lg:h-[52px] lg:block flex justify-between">
                    <p className="text-[14px] lg:text-[#7B7E8F] font-[500] leading-[24px]">
                      Duration:
                    </p>
                    <p className="text-[16px] font-[500] leading-[28px]">
                      Times
                    </p>
                  </div>
                  <div className="lg:h-[52px] lg:block flex justify-between">
                    <p className="text-[14px] lg:text-[#7B7E8F] font-[500] leading-[24px]">
                      Pet
                    </p>

                    <p className="text-[16px] font-[500] leading-[28px]">
                      {selectedPets.length > 0
                        ? selectedPets.map(
                            (pet, index) =>
                              `${pet.name}${
                                index !== selectedPets.length - 1 ? ", " : ""
                              }`
                          )
                        : "No pets selected"}
                    </p>
                  </div>
                  <div className="lg:h-[52px] lg:block flex justify-between">
                    <p className="text-[14px] lg:text-[#7B7E8F] font-[500] leading-[24px]">
                      Additional Message (To pet sitter)
                    </p>

                    <p className="text-[16px] font-[500] leading-[28px]">
                      {message}
                    </p>
                  </div>
                </div>
                <div className="bg-black p-[24px] flex rounded-b-[16px] text-[14px] font-[500] leading-[26px] justify-between ">
                  <span className="text-white ">Total</span>
                  <span className="text-white ">Money THB</span>
                </div>

                <div className="bg-[#FAFAFB] lg:flex w-[400px] h-[150px] flex-col items-end justify-end hidden">
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
        </div>
        <div className="bg-[#FAFAFB] h-[200px] w-full invisible "></div>
      </div>
    </div>
  );
};

export default Booking;
