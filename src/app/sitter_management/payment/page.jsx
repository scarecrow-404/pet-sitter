"use client"
import React, { useState } from "react";
import { Sidebar, TopBar } from "@/components/sidebar";
const Payment = () => {
  return (
    <div className="flex bg-sixthGray justify-center">
      <div className="hidden bg-sixthGray lg:block relative">
        <Sidebar active={3} />
      </div>
      <div className="flex-1 min-w-[375px] mx-auto md:w-auto md:mx-3 bg-sixthGray max-w-[1200px] lg:ml-60">
        <TopBar />
      </div>
    </div>
  );
};

export default Payment;
