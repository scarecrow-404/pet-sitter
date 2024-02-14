"use client";
import { useState } from "react";
import CreditCard from "../payment/CreditCard";
import Cash from "../payment/Cash";
import supabase from "@/lib/utils/db";
import { useUser } from "@/hooks/hooks";
function Payment({ values, handleInput, errors, handleClick }) {
  return (
    <div className="flex flex-col justify-center ">
      <div>
        <div className="flex mx-[20px] lg:mx-[60px] gap-[16px] ">
          <button
            className={`text-[12px] md:text-[18px] font-[500] leading-[26px] h-[60px] md:h-[80px] w-full border-[4px] rounded-[999px]
            ${values.creditCard ? "text-[#FF7037] border-[#FF7037]" : ""}
            `}
            value={values.creditCard}
            onClick={handleClick}
          >
            Credit Card
          </button>

          <button
            className={`text-[12px] md:text-[18px] font-[500] leading-[26px] h-[60px] md:h-[80px] w-full border-[4px] rounded-[999px]
            ${values.cash ? "text-[#FF7037] border-[#FF7037]" : ""}
            `}
            value={values.cash}
            onClick={handleClick}
          >
            Cash
          </button>
        </div>
        <div className="mx-[20px] lg:mx-[40px] ">
          {values.creditCard ? (
            <CreditCard
              values={values}
              handleInput={handleInput}
              errors={errors}
            />
          ) : (
            <Cash />
          )}
        </div>
      </div>
    </div>
  );
}

export default Payment;
