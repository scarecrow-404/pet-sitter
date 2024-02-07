"use client";
import React, { useState, useRef } from "react";
import Image from "next/image";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Select,
  Textarea,
  Avatar,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  useDisclosure,
  Button,
} from "@chakra-ui/react";
import previewPet from "@/asset/images/catforsitterlist.jpg";

function bookingHistory() {
  return (
    <div className="flex flex-col justify-center items-center py-6 gap-5 max-w-[1440px] mx-auto lg:gap-10 lg:py-14">
      {/* topic */}
      <div className="w-[90%] flex flex-row justify-between md:w-[85%] lg:w-[83%]">
        <div className="font-bold text-lg flex flex-row justify-start items-center gap-1">
          Booking History
        </div>
      </div>
      {/* area to map booking history */}
      <div className="border-2 border-orange-400 flex flex-col justify-center items-center w-[95%] py-5 gap-5 md:flex-row md:flex-wrap md:gap-3 md:justify-start md:px-5">
        {/* map here */}
        <div className="border-2 border-fifthGray w-[90%] flex flex-col p-3 gap-3 rounded-2xl">
          <div className="one border-2 border-green-500 flex flex-col gap-2">
            <div className="border-yellow-400 border-2 flex gap-2">
              <div className="photo border-2 w-[80px] h-[80px] md:w-fit">
                <Image
                  src={previewPet}
                  alt="preview-pet"
                  className="rounded-full w-[80px] h-[80px]"
                />
              </div>
              <div className="border-2 w-[200px] md:w-full">
                <div className="text-base font-bold">
                  We love cat and your cat
                </div>
                <div className="text-sm font-semibold">By Jane Maison</div>
              </div>
            </div>
            <div>
              <div>Transaction date: Tue, 16 Aug 2023</div>
              <div>• Waiting for confirm</div>
            </div>
          </div>
          <div className="two border-2 border-cyan-400">
            <div>
              <div>Date&Time:</div>
              <div>25 Aug,2023 | 7 AM - 10 AM</div>
            </div>
            <div>
              <div>Duration:</div>
              <div>3 hours</div>
            </div>
            <div>
              <div>Pet:</div>
              <div>Bubba, Daisy</div>
            </div>
          </div>
          <div className="three border-2 border-orange-400">
            Waiting Pet Sitter for confirm booking
          </div>
        </div>
      </div>
    </div>
  );
}
export default bookingHistory;
