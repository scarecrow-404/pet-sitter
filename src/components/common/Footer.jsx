import React from "react";
import whiteLogo from "@/asset/images/logoInWhite.svg";
import Image from "next/image";

const Footer = () => {
  return (
    <div className="flex flex-col items-center justify-center bg-black w-full min-h-2/6 p-4 max-w-[1440px] mx-auto">
      <Image src={whiteLogo} alt="logo" className=" w-fit md:w-52" />
      <div className="text-white">Find your perfect pet sitter with us.</div>
    </div>
  );
};

export default Footer;
