import React from "react";
import logo from "@/asset/images/logoInBlack.svg";
import Image from "next/image";

function sidebar() {
  return (
    <div>
      <div className="logo">
        <Image src={logo} alt="logoInBlack" />
      </div>
      <div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}

export default sidebar;
