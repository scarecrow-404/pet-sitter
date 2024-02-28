import React from "react";
import { useEffect } from "react";
function StepperControl({
  handlePrev,
  currentStep,
  steps,
  handleNext,
  disable,
  selectedPets,
  setDisable,

}) {
  useEffect(()=>{
    if(selectedPets.length === 0){
      setDisable(true)
    }else if(selectedPets.length >0){
      setDisable(false)
    }
  },[selectedPets])
  
  return (
    <div className="flex justify-center items-end">
      <div className="container flex justify-around mb-[8px]">
        <button
          className={`py-[12px] px-[24px] rounded-[99px] text-[16px] font-[700] leading-[24px] cursor-pointer  hover:text-white transition duration-200 ease-in-out text-[#FF7037] bg-[#FFF1EC]
          ${
            currentStep === 1
              ? "opacity-30 cursor-not-allowed bg-fourthGray text-fifthGray hover:text-fifthGray"
              : ""
          }`}
          onClick={handlePrev}
        >
          Back
        </button>

        <button
          disabled={disable}
          className={`py-[12px] px-[24px] rounded-[99px] text-[16px] font-[700] leading-[24px] cursor-pointer hover:text-white transition duration-200 ease-in-out
          ${
            disable
              ? "opacity-30 cursor-not-allowed bg-fourthGray text-fifthGray hover:text-fifthGray"
              : "text-[#FFF1EC] bg-[#FF7037]"
          }`}
          onClick={handleNext}
        >
          {currentStep === steps.length ? "Confirm Booking" : "Next"}
        </button>
      </div>
    </div>
  );
}

export default StepperControl;
