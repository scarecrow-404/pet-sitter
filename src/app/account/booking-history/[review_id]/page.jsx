import React from "react";
import Image from "next/image";

const ReviewPage = () => {
  return (
    <div className="w-[800px] h-[600px] rounded-16px ">
      <div>
        <h1 className="text-[12px] md:text-[16px] font-[700] leading-[32px]">
          Your Rating and Review
        </h1>
        <div>
          <Image src="" alt="" />
        </div>
      </div>
      {/* map */}
      <div className="">
        <div>
          <Image src="" alt="" />
          <div>
            <p className="text-[16px] md:text-[18px] font-[500] leading-[26px]">
              (Name)
            </p>
            <p className="text-[14px] font-[500] leading-[24px] text-[#7B7E8F] ">
              (Date)
            </p>
          </div>
        </div>
        <div>
          <div>(rating Star)</div>
          <p className="text-[16px] font-[500] leading-[28px]">(message)</p>
        </div>
      </div>
      {/* map end */}
      <button className="text-[16px] font-[700] leading-[24px] text-[#FF7037] bg-[#FFF1EC] py-[12px] px-[24px] rounded-[99px]">
        View Pet Sitter
      </button>
    </div>
  );
};

export default ReviewPage;
