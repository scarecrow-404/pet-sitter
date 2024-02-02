"use client";
import React, { useState } from "react";
import { Sidebar, TopBar } from "@/components/sidebar";
import { Input } from "@chakra-ui/react";
const BookingList = () => {
  const data = [
    {
      id: 1,
      PetOwnerName: "John Wick",
      amountPet: 2,
      Duration: 3,
      BookedDate: "25 Aug,7 AM - 10 AM",
      Status: "Waiting for confirm",
    },
    {
      id: 2,
      PetOwnerName: "John Wick",
      amountPet: 2,
      Duration: 3,
      BookedDate: "25 Aug,7 AM - 10 AM",
      Status: "Waiting for service",
    },
    {
      id: 3,
      PetOwnerName: "John Wick",
      amountPet: 2,
      Duration: 3,
      BookedDate: "25 Aug,7 AM - 10 AM",
      Status: "In service",
    },
    {
      id: 4,
      PetOwnerName: "John Wick",
      amountPet: 2,
      Duration: 3,
      BookedDate: "25 Aug,7 AM - 10 AM",
      Status: "Success",
    },
    {
      id: 5,
      PetOwnerName: "John Wick",
      amountPet: 2,
      Duration: 3,
      BookedDate: "25 Aug,7 AM - 10 AM",
      Status: "Canceled",
    },{
      id: 5,
      PetOwnerName: "John Wick",
      amountPet: 2,
      Duration: 3,
      BookedDate: "25 Aug,7 AM - 10 AM",
      Status: "Canceled",
    },{
      id: 5,
      PetOwnerName: "John Wick",
      amountPet: 2,
      Duration: 3,
      BookedDate: "25 Aug,7 AM - 10 AM",
      Status: "Canceled",
    },{
      id: 5,
      PetOwnerName: "John Wick",
      amountPet: 2,
      Duration: 3,
      BookedDate: "25 Aug,7 AM - 10 AM",
      Status: "Canceled",
    },{
      id: 5,
      PetOwnerName: "John Wick",
      amountPet: 2,
      Duration: 3,
      BookedDate: "25 Aug,7 AM - 10 AM",
      Status: "Canceled",
    },{
      id: 5,
      PetOwnerName: "John Wick",
      amountPet: 2,
      Duration: 3,
      BookedDate: "25 Aug,7 AM - 10 AM",
      Status: "Canceled",
    },
    {
      id: 2,
      PetOwnerName: "John Wick",
      amountPet: 2,
      Duration: 3,
      BookedDate: "25 Aug,7 AM - 10 AM",
      Status: "Waiting for service",
    },
    {
      id: 2,
      PetOwnerName: "John Wick",
      amountPet: 2,
      Duration: 3,
      BookedDate: "25 Aug,7 AM - 10 AM",
      Status: "Waiting for service",
    },
    {
      id: 2,
      PetOwnerName: "John Wick",
      amountPet: 2,
      Duration: 3,
      BookedDate: "25 Aug,7 AM - 10 AM",
      Status: "Waiting for service",
    },
    {
      id: 2,
      PetOwnerName: "John Wick",
      amountPet: 2,
      Duration: 3,
      BookedDate: "25 Aug,7 AM - 10 AM",
      Status: "Waiting for service",
    }
    
  ];

  return (
    <div className="flex bg-sixthGray justify-center">
      <div className="hidden bg-sixthGray lg:block relative">
        <Sidebar active={2} />
      </div>
      <div className="flex-1 min-w-[375px] mx-auto md:w-auto md:mx-3 bg-sixthGray max-w-[1200px] lg:ml-60">
        <TopBar />
        <div className="Title flex justify-between items-center py-3">
          <div className="nameTitle pl-5">Booking List</div>
          <div className="flex pr-5 gap-4">
            <Input htmlSize={4} width="auto" placeholder="Search..." />
            <Input htmlSize={4} width="auto" placeholder="All status" />
          </div>
        </div>
        <div className="Title flex justify-center items-start py-3 bg-white rounded-2xl lg:h-screen">
          <table className="border-separate border-slate-400 min-w-[375px] w-full md:max-w-[768px] md:w-full xl:max-w-[1440px] xl:w-full rounded-3xl overflow-hidden ">
            <thead className="text-white bg-black text-[13px] md:text-[14px]">
              <tr>
                <th className="text-center py-4 md:py-6">Name</th>
                <th className="text-center py-4 md:py-6 hidden md:table-cell ">Pet(s)</th>
                <th className="text-center py-4 md:py-6 hidden md:table-cell">Duration</th>
                <th className="text-center py-4 md:py-6">Booked Date</th>
                <th className="text-center py-4 md:py-6">Status</th>
              </tr>
            </thead>
            <tbody className="text-[13px] md:text-[16px]">
              {data.map((item, id) => {
                return (
                  <tr key={id} className="cursor-pointer hover:bg-fourthGray" >
                    <td className="text-center py-2 md:py-6 ">{item.PetOwnerName}</td>
                    <td className="text-center py-2 md:py-6 hidden md:table-cell">{item.amountPet}</td>
                    <td className="text-center py-2 md:py-6 hidden md:table-cell">{item.Duration}</td>
                    <td className="text-center py-2 md:py-6">{item.BookedDate}</td>
                    <td
                      className={`${
                        item.Status === "Waiting for confirm"
                          ? "text-pink-500"
                          : item.Status === "Waiting for service"
                          ? "text-orange-300"
                          : item.Status === "In service"
                          ? "text-blue-500"
                          : item.Status === "Success"
                          ? "text-green-400"
                          : item.Status === "Canceled"
                          ? "text-red-400"
                          : null
                      } text-center py-2 md:py-6`}
                    >
                      {item.Status}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BookingList;
