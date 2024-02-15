import React from "react";
import Image from "next/image";
import xicon from "@/asset/images/iconX.svg";

function PopupBooking(props) {



  
  return props.trigger ? (
    <div className="bg-black bg-opacity-60 flex justify-center w-screen h-screen fixed z-20">
      <div className="bg-white w-[400px] h-[208px] mt-[250px] rounded-[16px]">
        <div
          className="flex justify-between py-[16px] px-[24px] border-[
#E4E6ED] border-b-[1px]"
        >
          <h1 className="text-[20px] font-[700] leading-[28px] ">
            Booking Confirmation
          </h1>
          <button>
            <Image
              src={xicon}
              alt="cancle"
              width={24}
              height={24}
              onClick={props.closePopup}
            />
          </button>
        </div>

        <div className="p-[24px] h-auto flex flex-col justify-center ">
          <p className="text-[#7B7E8F] text-[16px] font-[500] leading-[28px]">
            Are you sure to booking this pet sitter?
          </p>
          <div className="flex justify-between mt-[24px] ">
            <button
              className="text-[16px] font-[700] leading-[24px] py-[12px] px-[24px] rounded-[99px] gap-[8px] text-[#FF7037] bg-[#FFF1EC]"
              onClick={props.closePopup}
            >
              close
            </button>
            <button className="text-[16px] font-[700] leading-[24px] py-[12px] px-[24px] rounded-[99px] gap-[8px] text-white bg-[#FF7037]">
              Yes, I'm sure
            </button>
          </div>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
}

export default PopupBooking;
