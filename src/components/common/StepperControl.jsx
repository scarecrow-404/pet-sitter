import React from "react";

function StepperControl({ handleClick, currentStep, steps }) {
  return (
    <div className="flex justify-center items-end">
      <div className="container flex justify-around mt-[16px] mb-[8px]">
        <button
          className={`py-[12px] px-[24px] rounded-[99px] font-semibold cursor-pointer hover:text-white transition duration-200 ease-in-out text-[#FF7037] bg-[#FFF1EC]
          ${currentStep === 1 ? "opacity-30 cursor-not-allowed" : ""}`}
          onClick={() => handleClick()}
        >
          Back
        </button>

        <button
          className="py-[12px] px-[24px] rounded-[99px] font-semibold cursor-pointer hover:text-white transition duration-200 ease-in-out text-[#FFF1EC] bg-[#FF7037]
        "
          onClick={() => handleClick("next")}
        >
          {currentStep === steps.length ? "Confirm Booking" : "Next"}
        </button>
      </div>
    </div>
  );
}

export default StepperControl;
