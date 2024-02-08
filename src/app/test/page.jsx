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
import callIcon from "@/asset/images/callIcon.svg";
import verticalLine from "@/asset/images/VerticalLine.svg";

function bookingHistory() {
  return (
    <div className="flex flex-col justify-center items-center py-6 gap-5 max-w-[1440px] mx-auto lg:gap-10 lg:py-14">
      {/* topic */}
      <div className="w-[90%] flex flex-row justify-between md:w-[85%] lg:w-[83%]">
        <div className="font-bold text-lg border">Booking History</div>
      </div>
      {/* area to map booking history */}
      <div className="flex flex-col justify-center items-center w-[95%] py-5 gap-5">
        {/* map here */}
        {/* waiting for confirm status */}
        <div className="border-2 border-fifthGray w-[90%] flex flex-col p-3 gap-3 rounded-2xl md:p-4 md:w-[95%] lg:w-[90%]">
          <div className="one flex flex-col gap-2 pb-2 border-b md:flex-row md:justify-between">
            <div className="flex justify-between md:justify-start md:gap-1">
              <div className="photo w-[80px] h-[80px] md:w-[65px] md:h-[65px]">
                <Image
                  src={previewPet}
                  alt="preview-pet"
                  className="rounded-full w-[80px] h-[80px] md:w-[65px] md:h-[65px]"
                />
              </div>
              <div className="w-[200px] flex flex-col justify-center gap-2 md:w-[250px] lg:w-[320px]">
                <div className="text-base font-bold md:text-lg lg:text-xl">
                  We love cat and your cat
                </div>
                <div className="text-sm font-semibold md:text-base lg:text-lg">
                  By Jane Maison
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-1 md:text-right md:gap-3 md:justify-center">
              <div className="text-fourthGray text-[13px] font-medium md:text-[15px] lg:text-[17px]">
                Transaction date: Tue, 16 Aug 2023
              </div>
              <div className="text-firstPink text-sm font-medium md:text-base lg:text-lg">
                • Waiting for confirm
              </div>
            </div>
          </div>
          <div className="two flex flex-col gap-2 justify-center items-center md:flex-row">
            <div className="w-full flex flex-col gap-1">
              <div className="text-thirdGray text-[13px] font-medium lg:text-[15px]">
                Date & Time:
              </div>
              <div className="text-sm font-medium lg:text-base">
                25 Aug,2023 | 7 AM - 10 AM
              </div>
            </div>
            <hr className="w-[80%] md:hidden" />
            <Image
              src={verticalLine}
              alt="vertical-line"
              className="hidden md:block"
            />
            <div className="w-full flex flex-col gap-1">
              <div className="text-thirdGray text-[13px] font-medium lg:text-[15px]">
                Duration:
              </div>
              <div className="text-sm font-medium lg:text-base">3 hours</div>
            </div>
            <hr className="w-[80%] md:hidden" />
            <Image
              src={verticalLine}
              alt="vertical-line"
              className="hidden md:block"
            />
            <div className="w-full flex flex-col gap-1">
              <div className="text-thirdGray text-[13px] font-medium lg:text-[15px]">
                Pet:
              </div>
              <div className="text-sm font-medium lg:text-base">
                Bubba, Daisy
              </div>
            </div>
          </div>
          <div className="three flex justify-center bg-sixthGray rounded-lg py-3 md:py-4 md:justify-start md:px-6 lg:py-6">
            <div className="text-thirdGray text-[13px] font-medium md:text-[15px] lg:text-[17px]">
              Waiting Pet Sitter for confirm booking
            </div>
          </div>
        </div>

        {/* in service status */}
        <div className="border-2 border-firstLigthBlue w-[90%] flex flex-col p-3 gap-3 rounded-2xl">
          <div className="one flex flex-col gap-2 pb-2 border-b">
            <div className="flex justify-between">
              <div className="photo w-[80px] h-[80px] md:w-fit">
                <Image
                  src={previewPet}
                  alt="preview-pet"
                  className="rounded-full w-[80px] h-[80px]"
                />
              </div>
              <div className="w-[200px] flex flex-col justify-center gap-2 md:w-full">
                <div className="text-base font-bold">
                  We love cat and your cat
                </div>
                <div className="text-sm font-semibold">By Jane Maison</div>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <div className="text-fourthGray text-[13px] font-medium">
                Transaction date: Tue, 16 Aug 2023
              </div>
              <div className="text-firstLigthBlue text-sm font-medium">
                • In service
              </div>
            </div>
          </div>
          <div className="two flex flex-col gap-2 justify-center items-center">
            <div className="w-full flex flex-col gap-1">
              <div className="text-thirdGray text-[13px] font-medium">
                Date & Time:
              </div>
              <div className="text-sm font-medium">
                25 Aug,2023 | 7 AM - 10 AM
              </div>
            </div>
            <hr className="w-[80%]" />
            <div className="w-full flex flex-col gap-1">
              <div className="text-thirdGray text-[13px] font-medium">
                Duration:
              </div>
              <div className="text-sm font-medium">3 hours</div>
            </div>
            <hr className="w-[80%]" />
            <div className="w-full flex flex-col gap-1">
              <div className="text-thirdGray text-[13px] font-medium">Pet:</div>
              <div className="text-sm font-medium">Bubba, Daisy</div>
            </div>
          </div>
          <div className="three flex justify-evenly items-center bg-sixthGray rounded-lg py-3 gap-3 md:py-4 md:justify-between md:px-6 lg:py-6">
            <div className="text-thirdGray text-[13px] font-medium md:text-[15px] lg:text-[17px]">
              Your pet is already in Pet Sitter care!
            </div>
            <button className="bg-sixthOrange p-2 rounded-full md:p-3">
              <Image src={callIcon} className="w-[10px] md:w-[15px]" />
            </button>
          </div>
        </div>

        {/* success status & click for review */}
        <div className="border-2 border-fifthGray w-[90%] flex flex-col p-3 gap-3 rounded-2xl">
          <div className="one flex flex-col gap-2 pb-2 border-b">
            <div className="flex justify-between">
              <div className="photo w-[80px] h-[80px] md:w-fit">
                <Image
                  src={previewPet}
                  alt="preview-pet"
                  className="rounded-full w-[80px] h-[80px]"
                />
              </div>
              <div className="w-[200px] flex flex-col justify-center gap-2 md:w-full">
                <div className="text-base font-bold">
                  We love cat and your cat
                </div>
                <div className="text-sm font-semibold">By Jane Maison</div>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <div className="text-fourthGray text-[13px] font-medium">
                Transaction date: Tue, 16 Aug 2023
              </div>
              <div className="text-firstGreen text-sm font-medium">
                • Success
              </div>
            </div>
          </div>
          <div className="two flex flex-col gap-2 justify-center items-center">
            <div className="w-full flex flex-col gap-1">
              <div className="text-thirdGray text-[13px] font-medium">
                Date & Time:
              </div>
              <div className="text-sm font-medium">
                25 Aug,2023 | 7 AM - 10 AM
              </div>
            </div>
            <hr className="w-[80%]" />
            <div className="w-full flex flex-col gap-1">
              <div className="text-thirdGray text-[13px] font-medium">
                Duration:
              </div>
              <div className="text-sm font-medium">3 hours</div>
            </div>
            <hr className="w-[80%]" />
            <div className="w-full flex flex-col gap-1">
              <div className="text-thirdGray text-[13px] font-medium">Pet:</div>
              <div className="text-sm font-medium">Bubba, Daisy</div>
            </div>
          </div>
          <div className="three flex justify-evenly items-center gap-2 bg-secondGreen rounded-lg py-3 md:py-4 md:justify-between md:px-6 lg:py-6">
            <div className="text-firstGreen text-[13px] font-medium md:text-[15px] lg:text-[17px] lg:gap-2">
              <div>Success date:</div>
              <div>Tue, 26 Apr 2023 | 11:03 AM</div>
            </div>
            <button className="bg-secondOrange p-2 rounded-full text-xs font-medium text-white md:text-sm md:px-5 md:py-3">
              Review
            </button>
          </div>
        </div>
        {/* success status & click to see your review */}
        <div className="border-2 border-fifthGray w-[90%] flex flex-col p-3 gap-3 rounded-2xl">
          <div className="one flex flex-col gap-2 pb-2 border-b">
            <div className="flex justify-between">
              <div className="photo w-[80px] h-[80px] md:w-fit">
                <Image
                  src={previewPet}
                  alt="preview-pet"
                  className="rounded-full w-[80px] h-[80px]"
                />
              </div>
              <div className="w-[200px] flex flex-col justify-center gap-2 md:w-full">
                <div className="text-base font-bold">
                  We love cat and your cat
                </div>
                <div className="text-sm font-semibold">By Jane Maison</div>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <div className="text-fourthGray text-[13px] font-medium">
                Transaction date: Tue, 16 Aug 2023
              </div>
              <div className="text-firstGreen text-sm font-medium">
                • Success
              </div>
            </div>
          </div>
          <div className="two flex flex-col gap-2 justify-center items-center">
            <div className="w-full flex flex-col gap-1">
              <div className="text-thirdGray text-[13px] font-medium">
                Date & Time:
              </div>
              <div className="text-sm font-medium">
                25 Aug,2023 | 7 AM - 10 AM
              </div>
            </div>
            <hr className="w-[80%]" />
            <div className="w-full flex flex-col gap-1">
              <div className="text-thirdGray text-[13px] font-medium">
                Duration:
              </div>
              <div className="text-sm font-medium">3 hours</div>
            </div>
            <hr className="w-[80%]" />
            <div className="w-full flex flex-col gap-1">
              <div className="text-thirdGray text-[13px] font-medium">Pet:</div>
              <div className="text-sm font-medium">Bubba, Daisy</div>
            </div>
          </div>
          <div className="three flex justify-evenly items-center gap-2 bg-secondGreen rounded-lg py-3 md:py-4 md:justify-between md:px-6 lg:py-6">
            <div className="text-firstGreen text-[13px] font-medium flex flex-col md:text-[15px] lg:text-[17px] lg:gap-2">
              <div>Success date:</div>
              <div>Tue, 26 Apr 2023 | 11:03 AM</div>
            </div>
            <button className="bg-sixthOrange p-2 rounded-full text-xs font-medium text-secondOrange md:text-sm md:px-5 md:py-3">
              Your Review
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default bookingHistory;
