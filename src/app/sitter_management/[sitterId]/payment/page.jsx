"use client";
import React, { useState, useEffect, use } from "react";
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
import withAuth from "@/lib/utils/withAuth";
import { ChevronRightIcon } from "@chakra-ui/icons";
import Thb from "@/asset/images/thb.svg";
import wallet from "@/asset/images/wallet.svg";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import supabase from "@/lib/utils/db";
import { useUser } from "@/hooks/hooks";
import { el, ro } from "date-fns/locale";
const Payment = () => {
  const params = useParams();
  const router = useRouter();
  const { sitterId, user } = useUser();
  const [ownPet, setOwnPet] = useState([]);
  const [bankNumber, setBankNumber] = useState([]);
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
    }
    let uniqueData;
    if (data) {
      uniqueData = Array.from(new Set(data.map((item) => item.id))).map(
        (id) => {
          return data.find((item) => item.id === id);
        }
      );
    } else {
      uniqueData = [];
    }
    setOwnPet(uniqueData);
  }
  async function getBankNumber() {
    let { data, error } = await supabase
      .from("banknumber")
      .select("*")
      .eq("id", params.sitterId);
    if (error) {
    }
    setBankNumber(data[0].bank_acc_number);
  }
  const lastThreeDigits = bankNumber.slice(-3);

  useEffect(() => {
    let isMounted = true;

    const fetchDataAsync = async () => {
      try {
        if (!user) {
          throw new Error("User data not available");
        }
        if (
          params.sitterId !== undefined &&
          sitterId !== undefined &&
          params.sitterId !== null &&
          sitterId !== null &&
          params.sitterId != sitterId
        ) {
          router.push("/");
        } else if (user?.user_type === "sitter") {
          await Promise.all([getOwnPetData(), getBankNumber()]);
        }
      } catch (error) {
      }
    };

    const fetchUser = async () => {
      try {
        await user;
      } catch (error) {
      }
    };

    fetchUser().then(() => {
      if (isMounted) {
        fetchDataAsync();
      }
    });

    return () => {
      isMounted = false;
    };
  }, [user]);
  return (
    <div className="flex bg-sixthGray justify-center h-screen">
      <div className="hidden bg-sixthGray lg:block relative">
        <Sidebar active={3} />
      </div>
      <div className="flex-1 min-w-[375px] mx-auto md:w-auto md:mx-3 bg-sixthGray max-w-[1200px] lg:ml-60">
        <TopBar />
        <div className="Title flex justify-between items-center pt-3 pl-5">
          <div className="nameTitle font-semibold">Payout Option</div>
        </div>
        <div className="Title flex flex-col items-center py-3 gap-3  bg-sixthGray">
          <div className="flex  justify-between w-full gap-4">
            <div className=" bg-white rounded-xl w-full px-5 flex flex-row justify-between items-center h-16 ">
              <div className="flex md:gap-4">
                <Image src={Thb} />
                <p className="hidden md:flex">Total Earning</p>
                <p className="md:hidden">Total</p>
              </div>
              <div>
                <p>{totalAmout1} THB</p>
              </div>
            </div>
            <div className=" bg-white rounded-xl w-full px-5 flex flex-row justify-between items-center h-16">
              <div className="flex gap-4">
                <Image src={wallet} />
                <p className="hidden md:flex">Bank Account</p>
                <p className="md:hidden">Bank</p>
              </div>
              <div className="flex items-center pl-[20px]">
                <p className="text-secondOrange text-[12px] md:text-[16px] hidden md:flex">
                  *** *** **** {lastThreeDigits}
                </p>
                <p className="text-secondOrange text-[12px] md:text-[16px] md:hidden">
                  * {lastThreeDigits}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-3xl w-full flex flex-row justify-center items-center">
            <table className=" border-slate-400 min-w-[375px] w-full md:max-w-[768px] md:w-full xl:max-w-[1440px] xl:w-full rounded-3xl overflow-hidden ">
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
                      className="cursor-pointer hover:bg-sixthGray"
                    >
                      <td className="text-center py-2 md:py-6 ">
                        {formattedDate}
                      </td>
                      <td className="text-center py-2 md:py-6 ">
                        {item.full_name}
                      </td>
                      <td className="text-center py-2 md:py-6 hidden md:table-cell">
                        {item.transaction_no}
                      </td>
                      <td className="text-center py-2 md:py-6 text-success-500 text-[#1ccd75]">
                        {item.total_amout} THB
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

export default withAuth(Payment);
