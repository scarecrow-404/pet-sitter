"use client";
import React, { useState, useEffect } from "react";
import { Sidebar, TopBar } from "@/components/Sidebar";
import {
  Input,
  Button,
  Avatar,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Lorem,
  Box,
} from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import Thb from "@/asset/images/thb.svg";
import wallet from "@/asset/images/wallet.svg";
import Image from "next/image";
import { useParams } from "next/navigation";
import supabase from "@/lib/utils/db";
const Payment = () => {
  const dataAccount = [
    {
      id: 1,
      date: "25 Aug 2023",
      name: "John Wick",
      TransactionNo: 122312,
      amount: 900,
    },
    {
      id: 2,
      date: "25 Aug 2023",
      name: "John Wick",
      TransactionNo: 122312,
      amount: 900,
    },
    {
      id: 3,
      date: "25 Aug 2023",
      name: "John Wick",
      TransactionNo: 122312,
      amount: 900,
    },
    {
      id: 4,
      date: "25 Aug 2023",
      name: "John Wick",
      TransactionNo: 122312,
      amount: 900,
    },
    {
      id: 5,
      date: "25 Aug 2023",
      name: "John Wick",
      TransactionNo: 122312,
      amount: 900,
    },
    {
      id: 6,
      date: "25 Aug 2023",
      name: "John Wick",
      TransactionNo: 122312,
      amount: 900,
    },
    {
      id: 7,
      date: "25 Aug 2023",
      name: "John Wick",
      TransactionNo: 122312,
      amount: 900,
    },
  ];

  const params = useParams();
  const [ownPet, setOwnPet] = useState([]);

  let totalAmout1 = ownPet.reduce(
    (acc, item) => acc + parseFloat(item.total_amout),
    0
  );
  async function getOwnPetData() {
    let { data, error } = await supabase
      .from("booking_list_render")
      .select("*")
      .eq("pet_sitter_id", params.sitterId);

    if (error) {
      console.error(error);
    }

    let uniqueData = Array.from(new Set(data.map((item) => item.id))).map(
      (id) => {
        return data.find((item) => item.id === id);
      }
    );

    console.log("own", uniqueData);
    setOwnPet(uniqueData);
  }

  useEffect(() => {
    getOwnPetData();
  }, []);
  return (
    <div className="flex bg-sixthGray justify-center h-screen">
      <div className="hidden bg-sixthGray lg:block relative">
        <Sidebar active={3} />
      </div>
      <div className="flex-1 min-w-[375px] mx-auto md:w-auto md:mx-3 bg-sixthGray max-w-[1200px] lg:ml-60">
        <TopBar />
        <div className="Title flex justify-between items-center pt-3 pl-5">
          <div className="nameTitle">Payout Option</div>
        </div>
        <div className="Title flex flex-col items-center py-3 gap-3  bg-sixthGray">
          <div className="flex  justify-between w-full gap-4">
            <div className=" bg-white rounded-xl w-full px-5 flex flex-row justify-between items-center h-16">
              <div className="flex gap-4">
                <Image src={Thb} />
                <p>Total Earning</p>
              </div>
              <div>
                <p>
                  {totalAmout1}
                  THB
                </p>
              </div>
            </div>
            <div className=" bg-white rounded-xl w-full px-5 flex flex-row justify-between items-center h-16">
              <div className="flex gap-4">
                <Image src={wallet} />
                <p>Bank Account</p>
              </div>
              <div className="flex items-center">
                <p className="text-secondOrange">SCB *444 </p>
                <ChevronRightIcon />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl w-full flex flex-row justify-center items-center">
            <table className="border-separate border-slate-400 min-w-[375px] w-full md:max-w-[768px] md:w-full xl:max-w-[1440px] xl:w-full rounded-3xl overflow-hidden ">
              <thead className="text-white bg-black text-[13px] md:text-[14px]">
                <tr>
                  <th className="text-center py-4 md:py-6">Date</th>
                  <th className="text-center py-4 md:py-6">From</th>
                  <th className="text-center py-4 md:py-6 hidden md:table-cell">
                    TransactionNo
                  </th>
                  <th className="text-center py-4 md:py-6">Amount</th>
                </tr>
              </thead>
              <tbody className="text-[13px] md:text-[16px]">
                {ownPet.map((item) => {
                  const months = [
                    "January",
                    "February",
                    "March",
                    "April",
                    "May",
                    "June",
                    "July",
                    "August",
                    "September",
                    "October",
                    "November",
                    "December",
                  ];
                  const createdAtDate = new Date(item.booking_date);
                  const monthName = months[createdAtDate.getMonth()];
                  const day = createdAtDate.getDate();
                  const year = createdAtDate.getFullYear();
                  const formattedDate = ` ${day} ${monthName}, ${year}`;

                  return (
                    <tr
                      key={item.id}
                      className="cursor-pointer hover:bg-fourthGray"
                    >
                      <td className="text-center py-2 md:py-6 ">
                        {formattedDate}
                      </td>
                      <td className="text-center py-2 md:py-6 ">
                        {item.full_name}
                      </td>
                      <td className="text-center py-2 md:py-6 hidden md:table-cell">
                        {item.transactionNo}
                      </td>
                      <td className="text-center py-2 md:py-6 text-success-500">
                        {item.total_amout}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
