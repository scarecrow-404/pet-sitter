"use client";
import React from "react";

function Information({ values, handleInput, errors }) {
  return (
    <div className="mx-[20px] lg:mx-[40px]">
      <div className="h-[24px] mt-[12px] text-[12px] md:text-[16px] font-[500] leading-[24px] ">
        Your Name*
      </div>
      <div
        className={
          errors.name
            ? "bg-white my-[8px] p-[4px] xl:w-full flex items-center border border-red-400 rounded-[8px]"
            : "bg-white my-[8px] p-[4px] xl:w-full flex items-center border order-x-slate-400 rounded-[8px]"
        }
      >
        <input
          onChange={(event) => handleInput(event)}
          value={values.name}
          id="name"
          name="name"
          type="name"
          placeholder="Full name"
          className="p-[4px] px-[8px] w-full text-[12px] md:text-[16px] font-[500] leading-[24px] border-none focus:ring-0"
        />
        {errors.name && (
          <span className="flex flex-col justify-start items-center text-[13px] text-white bg-red-600 w-[18px] h-[18px] rounded-full">
            &#33;
          </span>
        )}
      </div>
      {errors.name && <small className="text-[#e74c3c]">{errors.name}</small>}

      <div className="xl:flex w-full mt-[40px] gap-[8px]">
        <div className="w-full">
          <div className="h-[24px] text-[12px] md:text-[16px] font-[500] leading-[24px]">
            Email*
          </div>
          <div
            className={
              errors.email
                ? "bg-white my-[8px] p-[4px] xl:w-full flex items-center border border-red-400 rounded-[8px]"
                : "bg-white my-[8px] p-[4px] xl:w-full flex items-center border order-x-slate-400 rounded-[8px]"
            }
          >
            <input
              onChange={(event) => handleInput(event)}
              value={values.email}
              id="email"
              name="email"
              type="email"
              placeholder="your_email@company.com"
              className="p-[4px] px-[8px] w-full text-[12px] md:text-[16px] font-[500] leading-[24px] border-none focus:ring-0"
            />
            {errors.email && (
              <span className="flex flex-col justify-start items-center text-[13px] text-white bg-red-600 w-[18px] h-[18px] rounded-full">
                &#33;
              </span>
            )}
          </div>
          {errors.email && (
            <small className="text-[#e74c3c]">{errors.email}</small>
          )}
        </div>

        <div className="w-full">
          <div className="h-[24px] mt-[40px] my-[12px] xl:my-auto text-[12px] md:text-[16px] font-[500] leading-[24px] ">
            Phone*
          </div>
          <div
            className={
              errors.phoneNumber
                ? "bg-white my-[8px] p-[4px] xl:w-full flex items-center border border-red-400 rounded-[8px]"
                : "bg-white my-[8px] p-[4px] xl:w-full flex items-center border order-x-slate-400 rounded-[8px]"
            }
          >
            <input
              onChange={(event) => handleInput(event)}
              value={values.phoneNumber}
              id="phoneNumber"
              name="phoneNumber"
              type="tel"
              placeholder="xxx-xxx-xxxx"
              className="p-[4px] px-[8px] w-full text-[12px] md:text-[16px] font-[500] leading-[24px] border-none focus:ring-0"
            />
            {errors.phoneNumber && (
              <span className="flex flex-col justify-start items-center text-[13px] text-white bg-red-600 w-[18px] h-[18px] rounded-full">
                &#33;
              </span>
            )}
          </div>
          {errors.phoneNumber && (
            <small className="text-[#e74c3c]">{errors.phoneNumber}</small>
          )}
        </div>
      </div>

      <div className="h-[24px] mt-[40px] text-[12px] md:text-[16px] leading-[24px] ">
        Additional Message (To pet sitter)
      </div>
      <div className="bg-white my-[8px] p-[4px] xl:w-full flex items-center border order-x-slate-400 rounded-[8px]">
        <textarea
          onChange={(event) => handleInput(event)}
          value={values.message}
          id="message"
          name="message"
          type="message"
          className="py-[12px] px-[16px] w-full text-[12px] md:text-[16px] border-none focus:ring-0"
        />
      </div>
    </div>
  );
}

export default Information;
