import React, { useState } from "react";
import logo from "@/asset/images/logoInBlack.svg";
import Image from "next/image";
import Link from "next/link";
import petSittetProfile from "@/asset/images/petSitterProfile.svg";
import bookingList from "@/asset/images/bookingList.svg";
import payoutOption from "@/asset/images/payoutOption.svg";
import petSittetProfileHover from "@/asset/images/petSitterProfileHover.svg";
import bookingListHover from "@/asset/images/bookingListHover.svg";
import payoutOptionHover from "@/asset/images/payoutOptionHover.svg";
import logOut from "@/asset/images/logOut.svg";
import logOutHover from "@/asset/images/logOutHover.svg";
import profile from "@/asset/images/Frame427321006.svg";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  MenuOptionGroup,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
export function Sidebar({ active }) {
  const [imageSrcPetSittetProfile, setImageSrcPetSittetProfile] =
    useState(petSittetProfile);
  const [imageSrcBookingList, setImageSrcBookingList] = useState(bookingList);
  const [imageSrcPayoutOption, setImageSrcPayoutOption] =
    useState(payoutOption);
  const [imageSrcLogOut, setImageSrcLogOut] = useState(logOut);
  const handleMouseEnterPetSittetProfile = () => {
    setImageSrcPetSittetProfile(petSittetProfileHover);
  };
  const handleMouseEnterLogOut = () => {
    setImageSrcLogOut(logOutHover);
  };
  const handleMouseEnterBookingList = () => {
    setImageSrcBookingList(bookingListHover);
  };
  const handleMouseEnterPayoutOption = () => {
    setImageSrcPayoutOption(payoutOptionHover);
  };
  const handleMouseLeavePetSittetProfile = () => {
    setImageSrcPetSittetProfile(petSittetProfile);
  };
  const handleMouseLeaveBookingList = () => {
    setImageSrcBookingList(bookingList);
  };
  const handleMouseLeavePayoutOption = () => {
    setImageSrcPayoutOption(payoutOption);
  };
  const handleMouseLeavelogOut = () => {
    setImageSrcLogOut(logOut);
  };
  return (
    <div className="w-60 h-[91vh] bg-sixthGray fixed">
      <div className="logo mx-6 my-6">
        <Image src={logo} alt="logoInBlack" />
      </div>
      <div className="flex flex-col justify-between h-full">
        <div>
          <Link href="/sitter_management">
            <div
              onMouseEnter={handleMouseEnterPetSittetProfile}
              onMouseLeave={handleMouseLeavePetSittetProfile}
              className={`flex flex-row cursor-pointer items-center px-6 py-3 gap-4 text-secondGray font-[16px] w-full  hover:text-secondOrange hover:bg-orange-100 ${
                active === 1 ? "text-secondOrange bg-orange-100" : ""
              }`}
            >
              <Image
                src={
                  active === 1
                    ? petSittetProfileHover
                    : imageSrcPetSittetProfile
                }
                alt="petSitterProfile"
              />
              <p>Pet Sitter Profile</p>
            </div>
          </Link>
          <Link href="/sitter_management/booking_list">
            <div
              onMouseEnter={handleMouseEnterBookingList}
              onMouseLeave={handleMouseLeaveBookingList}
              className={`flex flex-row cursor-pointer items-center px-6 py-3 gap-4 text-secondGray font-[16px] w-full  hover:text-secondOrange hover:bg-orange-100 ${
                active === 2 ? "text-secondOrange bg-orange-100" : ""
              }`}
            >
              <Image
                src={active === 2 ? bookingListHover : imageSrcBookingList}
                alt="bookingList"
              />
              <p>Booking List</p>
            </div>
          </Link>
          <Link href="/sitter_management/payment">
            <div
              onMouseEnter={handleMouseEnterPayoutOption}
              onMouseLeave={handleMouseLeavePayoutOption}
              className={`flex flex-row cursor-pointer items-center px-6 py-3 gap-4 text-secondGray font-[16px] w-full  hover:text-secondOrange hover:bg-orange-100 ${
                active === 3 ? "text-secondOrange bg-orange-100" : ""
              }`}
            >
              <Image
                src={active === 3 ? payoutOptionHover : imageSrcPayoutOption}
                alt="payoutOption"
              />
              <p>Payout Option</p>
            </div>
          </Link>
        </div>

        <div
          onMouseEnter={handleMouseEnterLogOut}
          onMouseLeave={handleMouseLeavelogOut}
          className="flex flex-row cursor-pointer items-center px-6 py-3 gap-4 text-secondGray font-[16px] w-full hover:text-secondOrange hover:bg-orange-100"
        >
          <Image src={imageSrcLogOut} alt="logOut" />
          <p>Log Out</p>
        </div>
      </div>
    </div>
  );
}

export function TopBar({}) {
  return (
    <div className="headBar flex items-center gap-5 p-5 bg-white justify-between">
      <div className="flex flex-col items-center md:flex-row md:gap-5">
        <Image src={profile} width={40} height={40} alt="profile" />
        <p>Jane Maison</p>
      </div>
      <div className="lg:hidden">
        <Menu>
          <MenuButton
            as={IconButton}
            aria-label="Options"
            icon={<HamburgerIcon />}
            variant="outline"
          />
          <MenuList>
            <Link href="/sitter_management">
              <MenuItem>Pet Sitter Profile</MenuItem>
            </Link>
            <Link href="/sitter_management/booking_list">
              <MenuItem>Booking List</MenuItem>
            </Link>
            <Link href="/sitter_management/payment">
              <MenuItem>Payout Option</MenuItem>
            </Link>
            <MenuItem>Log Out</MenuItem>
          </MenuList>
        </Menu>
      </div>
    </div>
  );
}
