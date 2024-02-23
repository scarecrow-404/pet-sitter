import React, { useState } from "react";
import Link from "next/link";

import petSittetProfileHover from "@/asset/images/petSitterProfileHover.svg";
import petSittetProfile from "@/asset/images/petSitterProfile.svg";
import footPets from "@/asset/images/footPets.svg";
import footPetsHover from "@/asset/images/footPetsHover.svg";
import BookingHistory from "@/asset/images/BookingHistory.svg";
import BookingHistoryHover from "@/asset/images/BookingHistoryHover.svg";
import Image from "next/image";
export const AccountBar = ({ active }) => {
  const [imageSrcPetSittetProfile, setImageSrcPetSittetProfile] =
    useState(petSittetProfile);
  const [imageSrcFootPets, setImageSrcFootPets] = useState(footPets);
  const [imageSrcBookingHistory, setImageSrcBookingHistory] =
    useState(BookingHistory);
  // onMouseEnter and onMouseLeave functions
  const handleMouseEnterProfile = () => {
    setImageSrcPetSittetProfile(petSittetProfileHover);
  };
  const handleMouseLeaveProfile = () => {
    setImageSrcPetSittetProfile(petSittetProfile);
  };

  const handleMouseEnterFootPets = () => {
    setImageSrcFootPets(footPetsHover);
  };
  const handleMouseLeaveFootPets = () => {
    setImageSrcFootPets(footPets);
  };
  const handleMouseEnterBookingHistory = () => {
    setImageSrcBookingHistory(BookingHistoryHover);
  };
  const handleMouseLeaveBookingHistory = () => {
    setImageSrcBookingHistory(BookingHistory);
  };
  return (
    <>
      <div className="flex flex-col w-[250px] h-[250px] py-5 gap-4">
        <h1 className="px-6 text-xl font-bold">Account</h1>
        <div>
          <Link href="/account">
            <div
              onMouseEnter={handleMouseEnterProfile}
              onMouseLeave={handleMouseLeaveProfile}
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
              <p>Profile</p>
            </div>
          </Link>
          <Link href="/account/pet">
            <div
              onMouseEnter={handleMouseEnterFootPets}
              onMouseLeave={handleMouseLeaveFootPets}
              className={`flex flex-row cursor-pointer items-center px-6 py-3 gap-4 text-secondGray font-[16px] w-full  hover:text-secondOrange hover:bg-orange-100 ${
                active === 2 ? "text-secondOrange bg-orange-100" : ""
              }`}
            >
              <Image
                src={active === 2 ? footPetsHover : imageSrcFootPets}
                alt="bookingList"
              />
              <p>Your Pet</p>
            </div>
          </Link>
          <Link href="/account/booking-history">
            <div
              onMouseEnter={handleMouseEnterBookingHistory}
              onMouseLeave={handleMouseLeaveBookingHistory}
              className={`flex flex-row cursor-pointer items-center px-6 py-3 gap-4 text-secondGray font-[16px] w-full  hover:text-secondOrange hover:bg-orange-100 ${
                active === 3 ? "text-secondOrange bg-orange-100" : ""
              }`}
            >
              <Image
                src={
                  active === 3 ? BookingHistoryHover : imageSrcBookingHistory
                }
                alt="payoutOption"
              />
              <p>Booking History</p>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};
