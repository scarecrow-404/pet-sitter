"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Stepper from "@/components/common/Stepper";
import StepperControl from "@/components/common/StepperControl";

import starpic from "@/asset/images/Star1.svg";
import squarepic from "@/asset/images/Ellipse15(butblue).svg";
import { useParams } from "next/navigation";
import Navbar from "@/components/common/Navbar";
import PopupBooking from "@/components/PopupBooking";
import Pet from "@/components/common/steps/Pet";
import Information from "@/components/common/steps/Information";
import Payment from "@/components/common/steps/Payment";
import { useUser } from "@/hooks/hooks";
import { set } from "date-fns";

const Booking = () => {
  //่รับข้อมูลต่อมาจาก sodix
  const params = useParams();
  const { userId } = useUser();
  const { bookingData, setBookingData } = useUser();
  const [dataForSearch, setDataForSearch] = useState(bookingData);
  const [currentStep, setCurrentStep] = useState(1);
  const steps = ["Your Pet", "Information", "Payment"];
  const [errors, setErrors] = useState({});
  const [popupButton, setPopupButton] = useState(false);
  const [disable, setDisable] = useState(true);

  const [paymentMethod, setPaymentMethod] = useState({
    creditCard: true,
    cash: false,
  });

  const sitterId = params.sitterId;

  //from pet
  const [selectedPets, setSelectedPets] = useState([]);

  //from information
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");

  const [totalAmount, setTotalAmout] = useState(0);
  let hoursWtMin = "";
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
    payment_type: "",
  });
  // displayStep จะเป็นการแสดงข้อมูลของแต่ละ step โดยจะเช็คว่า step ที่เข้ามาเป็นอะไร แล้วจะแสดงข้อมูลของ step นั้นๆ
  function formatDate(dataForSearch) {
    const formattedDate = `${dataForSearch.getDate()} ${getMonthName(
      dataForSearch.getMonth()
    )}, ${dataForSearch.getFullYear()}`;
    return formattedDate;
  }
  function getMonthName(monthIndex) {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    return months[monthIndex];
  }

  function getTimeDifference(startTime, endTime) {
    let startTimeCutAM;
    let endTimeCutAM;
    if (startTime.includes("AM")) {
      startTimeCutAM = startTime.replace("AM", "");
    } else {
      startTimeCutAM = startTime.replace("PM", "");
    }
    const formattedStartTime = startTimeCutAM.replace(".", ":");

    if (endTime.includes("AM")) {
      endTimeCutAM = endTime.replace("AM", "");
    } else {
      endTimeCutAM = endTime.replace("PM", "");
    }

    const formattedEndTime = endTimeCutAM.replace(".", ":");

    const [startHour, startMinute] = formattedStartTime.split(":").map(Number);
    const [endHour, endMinute] = formattedEndTime.split(":").map(Number);

    const start = new Date(2000, 0, 1, startHour, startMinute);
    const end = new Date(2000, 0, 1, endHour, endMinute);

    const diff = end.getTime() - start.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    hoursWtMin = hours + "." + minutes;
    return { hours, minutes };
  }

  const formattedDate = formatDate(dataForSearch.date);
  useEffect(() => {
    calculateTotal(selectedPets.length, startTime, endTime);   
  }, [selectedPets]);

  const { startTime, endTime } = dataForSearch;
  const { hours, minutes } = getTimeDifference(startTime, endTime);
  const calculateTotal = (numberOfPets, startTime, endTime) => { 
    const baseCost = 600; // Base cost for 3-hour booking
    const additionalCostPerPet = 300; // Additional cost per extra pet
    const additionalHourlyRate = 200; // Additional hourly rate for bookings over 3 hours

    // Calculate duration in hours and minutes
    // let { startTime, endTime } = dataForSearch;
    const { hours, minutes } = getTimeDifference(startTime, endTime);   
    // Convert duration to total hours
    const totalHours = hours + minutes / 60;

    // Calculate total cost based on the number of pets and duration
    let totalCost = baseCost;

    // Check if the duration is over 3 hours
    if (totalHours > 3) {
      totalCost += (totalHours - 3) * additionalHourlyRate;
    }

    // Calculate additional cost for pets
    const additionalPetCost = (numberOfPets - 1) * additionalCostPerPet;
    totalCost += additionalPetCost;
    setTotalAmout(totalCost);
  };

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
            id={sitterId}
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
            handleClickCreditCard={handleClickCreditCard}
            handleClickCash={handleClickCash}
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
      setBookingData({
        ...bookingData,
        petselect: selectedPets,
        price: totalAmount,
        duration: hoursWtMin,
      });

      setCurrentStep(newStep + 1);
    } else if (newStep === 2) {
      setBookingData({ ...bookingData, additionMessage: message });
      setCurrentStep(newStep + 1);
    } else if (newStep === 3) {
      const checkStep3 = {};
      if (values.payment_type === "") {
        setErrors({});
        setPopupButton("Payment Type is required");
      } else if (values.payment_type === "creditcard") {
        if (values.cardNumber === "") {
          checkStep3.cardNumber = "*Please Enter Your Credit Card Number";
        } else if (!/^\d{16,19}$/.test(values.cardNumber.replace(/\s/g, ""))) {
          checkStep3.cardNumber = "*Please Enter a Valid Credit Card Number";
        }
        if (values.cardOwner === "") {
          checkStep3.cardOwner = "*Please Enter Card Owner Name";
        }
        if (values.expiryDate === "") {
          checkStep3.expiryDate = "*Please Enter Card Expiry Date";
        }
        if (values.cvccvv === "") {
          checkStep3.cvccvv = "*Please Enter Card CVC/CVV";
        } else if (!/^\d{3,4}$/.test(values.cvccvv)) {
          checkStep3.cvccvv = "*Please Enter a Valid CVC/CVV";
        }

        if (Object.keys(checkStep3).length) {
          setErrors({ ...checkStep3 });
        } else {
          setErrors({});
          setPopupButton(true);
        }
      } else if (values.payment_type === "cash") {
        setErrors({});
        setPopupButton(true);
      }
    }
  };

  const closePopup = () => {
    setPopupButton(false);
  };

  const handleClickCreditCard = () => {
    setValues({ ...values, payment_type: "creditcard" });
  };
  const handleClickCash = () => {
    setValues({ ...values, payment_type: "cash" });
  };

  const handleInput = (event) => {
    const newObj = { ...values, [event.target.name]: event.target.value };
    setValues(newObj);
  };

  useEffect(() => {}, [values]);

  return (
    <div className="bg-[#FAFAFB] ">
      <div className="bg-[#FAFAFB] h-full ">
        <Navbar />
        <PopupBooking
          trigger={popupButton}
          closePopup={closePopup}
          values={values}
        />
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
                selectedPets={selectedPets}
                currentStep={currentStep}
                steps={steps}
                disable={disable}
                setDisable={setDisable}
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

                    <p className="text-[16px] font-[500] leading-[28px]">
                      {bookingData.sittername}
                    </p>

                    <p className="text-[16px] font-[500] leading-[28px]">
                      By {bookingData.fullname}
                    </p>
                  </div>

                  <div className="lg:h-[52px] lg:block flex justify-between">
                    <p className="pt-3 text-[14px] lg:text-[#7B7E8F] font-[500] leading-[24px]">
                      Date & Time:
                    </p>
                    <p className="text-[16px] font-[500] leading-[28px]">
                      {formattedDate}
                    </p>
                    <p>
                      {dataForSearch.startTime} - {dataForSearch.endTime}
                    </p>
                  </div>

                  <div className="lg:h-[52px] lg:block flex justify-between">
                    <p className=" pt-3 text-[14px] lg:text-[#7B7E8F] font-[500] leading-[24px]">
                      Duration:
                    </p>
                    <p className="text-[16px] font-[500] leading-[28px]">
                      {hours} hours {minutes} minutes
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
                        : "-"}
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
                  <span className="text-white ">
                    {selectedPets.length > 0 ? `${totalAmount} THB` : "0 THB"}
                  </span>
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
