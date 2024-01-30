import React from "react";
import whiteLogo from "@/asset/images/logoInWhite.svg";
import Image from "next/image";

const Footer = () => {
  return (
    <div className="flex flex-col items-center justify-center bg-black w-full min-h-2/6 p-4">
      <Image src={whiteLogo} alt="logo" />
      <div className="text-white">Find your perfect pet sitter with us.</div>
    </div>
  );
};

export default Footer;
