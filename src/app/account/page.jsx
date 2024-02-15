"use client";
import React, { useState } from "react";
import Navbar from "@/components/common/Navbar";
import { AccountBar } from "@/components/AccountBar";
import UserProfile from "@/components/UserProfileManagement";
const Account = () => {
  return (
    <div className="max-w-[1440px] mx-auto bg-sixthGray gap-9">
      <Navbar />
      <div className="flex mt-5 ">
        <div className="mx-5 hidden lg:block bg-white max-w-[250px] h-fit rounded-xl">
          <AccountBar active={1} />
        </div>
        <div className="min-w-[375px] w-full bg-white rounded-xl md:ml-5 md:mr-5 md:mb-5 lg:ml-0">
          <UserProfile />
        </div>
      </div>
    </div>
  );
};

export default Account;
