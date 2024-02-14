"use client";
import React, { useEffect, useState, useRef } from "react";

function Stepper({ steps, currentStep }) {
  const [newStep, setNewStep] = useState([]);
  const stepRef = useRef();

  const updateStep = (stepNumber, steps) => {
    const newSteps = [...steps];
    let count = 0;

    while (count < newSteps.length) {
      if (count === stepNumber) {
        newSteps[count] = {
          ...newSteps[count],
          highlighted: true,
          selected: true,
          completed: true,
        };
        count++;
      } else if (count < stepNumber) {
        newSteps[count] = {
          ...newSteps[count],
          highlighted: false,
          selected: true,
          completed: true,
        };
        count++;
      } else {
        newSteps[count] = {
          ...newSteps[count],
          highlighted: false,
          selected: false,
          completed: false,
        };
        count++;
      }
    }
    return newSteps;
  };
  useEffect(() => {
    const stepsState = steps.map((step, index) =>
      Object.assign(
        {},
        {
          description: step,
          completed: false,
          highlightedd: index === 0 ? true : false,
          selected: index === 0 ? true : false,
        }
      )
    );

    stepRef.current = stepsState;
    const current = updateStep(currentStep - 1, stepRef.current);
    setNewStep(current);
  }, [steps, currentStep]);

  const displaySteps = newStep.map((step, index) => {
    return (
      <div
        key={index}
        className={
          index !== newStep.length - 1
            ? "w-full flex items-center"
            : "flex items-center"
        }
      >
        <div className="relative flex flex-col items-center">
          <div
            className={`rounded-full transition duration-500 ease-in-out border-2 h-12 w-12 flex items-center justify-center py-3 ${
              step.selected
                ? "bg-[#FF7037] text-white font-bold border border-[#FF7037]"
                : ""
            } `}
          >
            {step.completed ? (
              <span className="text-white font-bold text-xl">&#10003;</span>
            ) : (
              index + 1
            )}
          </div>

          <div
            className={`absolute top-0 text-center mt-16 w-[120px] text-[12px] md:text-[18px] font-medium ${
              step.highlighted ? "text-gray-900" : "text-gray-400"
            } `}
          >
            {step.description}
          </div>
        </div>
        <div
          className={`flex-auto border-t-[2px] transition duration-500 ease-in-out ${
            step.completed ? "border-[#FF7037]" : "border-gray-300"
          } `}
        ></div>
      </div>
    );
  });

  return (
    <div className="flex justify-center">
      <div className="w-[320px] md:w-full xl:w-[700px] mx-[16px] p-[16px] md:px-[24px] flex justify-between items-center">
        {displaySteps}
      </div>
    </div>
  );
}

export default Stepper;
