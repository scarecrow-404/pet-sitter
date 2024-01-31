import React, { useState } from "react";
import logo from "@/asset/images/logoInBlack.svg";
import Image from "next/image";
import petSittetProfile from "@/asset/images/petSitterProfile.svg";
import bookingList from "@/asset/images/bookingList.svg";
import payoutOption from "@/asset/images/payoutOption.svg";
import petSittetProfileHover from "@/asset/images/petSitterProfileHover.svg";
import bookingListHover from "@/asset/images/bookingListHover.svg";
import payoutOptionHover from "@/asset/images/payoutOptionHover.svg";
import logOut from "@/asset/images/logOut.svg";
import logOutHover from "@/asset/images/logOutHover.svg";
function Sidebar() {
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
    <div className="w-60 h-[800px] bg-sixthGray">
      <div className="logo mx-6 my-6">
        <Image src={logo} alt="logoInBlack" />
      </div>
      <div className="flex flex-col justify-between h-full">
        <div>
          <div
            onMouseEnter={handleMouseEnterPetSittetProfile}
            onMouseLeave={handleMouseLeavePetSittetProfile}
            className="flex flex-row cursor-pointer items-center px-6 py-3 gap-4 text-secondGray font-[16px] w-full hover:text-secondOrange hover:bg-orange-100"
          >
            <Image src={imageSrcPetSittetProfile} alt="petSitterProfile" />

            <p>Pet Sitter Profile</p>
          </div>
          <div
            onMouseEnter={handleMouseEnterBookingList}
            onMouseLeave={handleMouseLeaveBookingList}
            className="flex flex-row cursor-pointer items-center px-6 py-3 gap-4 text-secondGray font-[16px] w-full hover:text-secondOrange hover:bg-orange-100"
          >
            <Image src={imageSrcBookingList} alt="bookingList" />
            <p>Booking List</p>
          </div>
          <div
            onMouseEnter={handleMouseEnterPayoutOption}
            onMouseLeave={handleMouseLeavePayoutOption}
            className="flex flex-row cursor-pointer items-center px-6 py-3 gap-4 text-secondGray font-[16px] w-full hover:text-secondOrange hover:bg-orange-100"
          >
            <Image src={imageSrcPayoutOption} alt="payoutOption" />
            <p>Payout Option</p>
          </div>
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

export default Sidebar;
