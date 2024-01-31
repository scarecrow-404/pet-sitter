import React, { useState } from "react";
import Image from "next/image";
import iconCalenda from "@/asset/images/CalendaIcon.svg";
import iconClock from "@/asset/images/iconClock.svg";
function PopupBooking() {
  return (
    <div className="w-[550px] h-fit ">
      <div className="flex font-bold h-[32px] items-center justify-between px-[40px] py-[25px]">
        <p>Booking</p>
        <button>X</button>
      </div>
      <hr></hr>
      <div className="flex flex-col p-[40px] text-[18px]">
        <div className="flex flex-col gap-4">
          <p>Select date and time you want to schedule the service.</p>
          <label className="flex gap-[16px] ">
            <Image src={iconCalenda} />
            <input
              className=" placeholder:italic placeholder:text-slate-400 w-[412px] h-[40px] border-2 border-black p-[12px] rounded-lg "
              placeholder="DD/MM/YY"
            ></input>
          </label>
          <label className="flex gap-[16px] ">
            <Image src={iconClock} />
            <input
              className=" placeholder:italic placeholder:text-slate-400 w-[412px] h-[40px] border-2 border-black p-[12px] rounded-lg "
              placeholder="DD/MM/YY"
            ></input>
          </label>
        </div>
      </div>
    </div>
  );
}

export default PopupBooking;
