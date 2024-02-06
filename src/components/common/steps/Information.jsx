"use client";
import React, { useContext } from "react";
import { StepperContext } from "@/contexts/StepperContext";

function Information() {
  const { userData, setUserData } = useContext(StepperContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  return (
    <div className="">
      <div className="h-[24px] mt-[12px] text-[12px] md:text-[18px] leading-[32px] ">
        Your Name*
      </div>
      <div className="bg-white my-[8px] p-[4px] flex border border-x-slate-400 rounded-[8px]">
        <input
          onChange={handleChange}
          value={userData["username"] || ""}
          name="username"
          type="username"
          placeholder="Full name"
          className="p-[4px] px-[8px] w-full text-[12px] md:text-[16px] "
        />
      </div>

      <div className="xl:flex w-full mt-[40px] gap-[8px]">
        <div className="w-full">
          <div className="h-[24px] my-[12px] xl:my-auto text-[12px] md:text-[18px] leading-[24px]">
            Email*
          </div>
          <div className="bg-white xl:w-full my-[8px] p-[4px] flex border border-x-slate-400 rounded-[8px]">
            <input
              onChange={handleChange}
              value={userData["email"] || ""}
              name="email"
              type="email"
              placeholder="youremail@company.com"
              className="p-[4px] px-[8px] w-full text-[12px] md:text-[16px] "
            />
          </div>
        </div>

        <div className="w-full">
          <div className="h-[24px] mt-[40px] my-[12px] xl:my-auto text-[12px] md:text-[18px] leading-[24px] ">
            Phone*
          </div>
          <div className="bg-white xl:w-full my-[8px] p-[4px] flex border border-x-slate-400 rounded-[8px]">
            <input
              onChange={handleChange}
              value={userData["phone"] || ""}
              name="phone"
              type="tel"
              placeholder="xxx-xxx-xxxx"
              className="p-[4px] px-[8px] w-full text-[12px] md:text-[16px] "
            />
          </div>
        </div>
      </div>

      <div className="h-[24px] mt-[40px] text-[12px] md:text-[18px] leading-[24px] ">
        Additional Message (To pet sitter)
      </div>
      <div className="bg-white my-[8px] p-[4px] flex border border-x-slate-400 rounded-[8px]">
        <textarea
          onChange={handleChange}
          value={userData["text"] || ""}
          name="text"
          type="text"
          className="h-[140px] p-[12px] w-full text-[12px] md:text-[16px] "
        />
      </div>
    </div>
  );
}

export default Information;
