import React from "react";
import Image from "next/image";
import cathand from "@/asset/images/Vector.svg";

function Cash() {
  return (
    <div className="bg-[#F6F6F9] flex flex-col justify-center text-center mt-[40px] px-[40px] pb-[40px]">
      <div className="mt-[24px]">
        <Image
          className="mx-auto w-[102px] h-[105px] "
          src={cathand}
          alt="cat_hand"
        />
      </div>
      <div className="text-[14px] md:text-[16px] mt-[24px]">
        If you want to pay by cash,
        <br />
        you are required to make a cash Payment
        <br />
        upon arrival at the pet sitter&apos;s location.
      </div>
    </div>
  );
}

export default Cash;
