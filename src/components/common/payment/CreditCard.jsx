import React, { useContext } from "react";
import { StepperContext } from "@/contexts/StepperContext";

function CreditCard() {
  const { userData, setUserData } = useContext(StepperContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  return (
    <div>
      <form action="">
        <div className="xl:flex w-full mt-[40px] gap-[8px]">
          <div className="w-full">
            <div className="h-[24px] my-[12px] xl:my-auto text-[12px] md:text-[18px] leading-[24px]">
              Card Number*
            </div>
            <div className="bg-white xl:w-full my-[8px] p-[4px] flex border border-x-slate-400 rounded-[8px]">
              <input
                onChange={handleChange}
                value={userData["cardnumber"] || ""}
                name="cardnumber"
                type="number"
                placeholder="xxx-xxxx-x-xx-xx"
                className="p-[4px] px-[8px] w-full text-[12px] md:text-[16px] "
              />
            </div>
          </div>

          <div className="w-full">
            <div className="h-[24px] mt-[40px] my-[12px] xl:my-auto text-[12px] md:text-[18px] leading-[24px] ">
              Card Owner*
            </div>
            <div className="bg-white xl:w-full my-[8px] p-[4px] flex border border-x-slate-400 rounded-[8px]">
              <input
                onChange={handleChange}
                value={userData["cardowner"] || ""}
                name="cardowner"
                type="text"
                placeholder="Card ownder name"
                className="p-[4px] px-[8px] w-full text-[12px] md:text-[16px] "
              />
            </div>
          </div>
        </div>

        <div className="xl:flex w-full mt-[40px] gap-[8px]">
          <div className="w-full">
            <div className="h-[24px] my-[12px] xl:my-auto text-[12px] md:text-[18px] leading-[24px]">
              Expiry Date*
            </div>
            <div className="bg-white xl:w-full my-[8px] p-[4px] flex border border-x-slate-400 rounded-[8px]">
              <input
                onChange={handleChange}
                value={userData["expirydate"] || ""}
                name="expirydate"
                type="number"
                placeholder="xxx-xxx-xxxx"
                className="p-[4px] px-[8px] w-full text-[12px] md:text-[16px] "
              />
            </div>
          </div>

          <div className="w-full">
            <div className="h-[24px] mt-[40px] my-[12px] xl:my-auto text-[12px] md:text-[18px] leading-[24px] ">
              CVC/CVV*
            </div>
            <div className="bg-white xl:w-full my-[8px] p-[4px] flex border border-x-slate-400 rounded-[8px]">
              <input
                onChange={handleChange}
                value={userData["cvccvv"] || ""}
                name="cvccvv"
                type="number"
                placeholder="xxx"
                className="p-[4px] px-[8px] w-full text-[12px] md:text-[16px] "
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default CreditCard;
