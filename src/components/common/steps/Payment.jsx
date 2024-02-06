"use client";
import { useState } from "react";
import CreditCard from "../payment/CreditCard";
import Cash from "../payment/Cash";

function Payment() {
  const [changePage, setPage] = useState(true);

  const creditCard = () => setPage(true);
  const cash = () => setPage(false);

  return (
    <div className="flex flex-col justify-center">
      <div>
        <div className="flex mx-[20px] gap-[16px] ">
          <button
            className={`text-[12px] md:text-[18px] leading-[24px] h-[60px] md:h-[80px] w-full border-[4px] rounded-[999px]
            ${changePage ? "text-[#FF7037] border-[#FF7037]" : ""}
            `}
            onClick={!changePage ? creditCard : null}
          >
            Credit Card
          </button>
          <button
            className={`text-[12px] md:text-[18px] leading-[24px] h-[60px] md:h-[80px] w-full border-[4px] rounded-[999px]
            ${!changePage ? "text-[#FF7037] border-[#FF7037]" : ""}
            `}
            onClick={changePage ? cash : null}
          >
            Cash
          </button>
        </div>
        <div>{changePage ? <CreditCard /> : <Cash />}</div>
      </div>
    </div>
  );
}

export default Payment;
