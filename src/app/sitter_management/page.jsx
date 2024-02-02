"use client";
import React, { useState } from "react";
import logo from "@/asset/images/logoInBlack.svg";
import Image from "next/image";
import petSitterProfile from "@/asset/images/petSitterProfile.svg";
import bookingList from "@/asset/images/bookingList.svg";
import payoutOption from "@/asset/images/payoutOption.svg";
import petSitterProfileHover from "@/asset/images/petSitterProfileHover.svg";
import bookingListHover from "@/asset/images/bookingListHover.svg";
import payoutOptionHover from "@/asset/images/payoutOptionHover.svg";
import logOut from "@/asset/images/logOut.svg";
import logOutHover from "@/asset/images/logOutHover.svg";
import PetSitterProfilePage from "@/app/sitter_management/petsitterprofile";
import BookingListPage from "@/app/sitter_management/booking_list/bookinglist";
import profile from "@/asset/images/Frame427321006.svg";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
function PetSitterProfile() {
  return (
    <>
      <PetSitterProfilePage />
    </>
  );
}

function BookingList() {
  return (
    <>
      <BookingListPage />
    </>
  );
}

function PayoutOption() {
  return (
    <>
      <p>Payout Option</p>
    </>
  );
}

function Logout() {
  return (
    <>
      <p>Log Out</p>
    </>
  );
}

function HomePetSitter() {
  const [activeTab, setActiveTab] = useState("petSitterProfile");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const getTabClassName = (tab) => {
    const isActive = activeTab === tab;
    const baseClassName =
      "flex flex-row cursor-pointer items-center px-6 py-3 gap-4 font-[16px] w-full";

    if (isActive) {
      return `${baseClassName} bg-orange-100 text-secondOrange`;
    } else {
      return `${baseClassName} text-secondGray hover:text-secondOrange hover:bg-orange-100`;
    }
  };

  const getTabImageSrc = (tab) => {
    switch (tab) {
      case "petSitterProfile":
        return activeTab === tab ? petSitterProfileHover : petSitterProfile;
      case "bookingList":
        return activeTab === tab ? bookingListHover : bookingList;
      case "payoutOption":
        return activeTab === tab ? payoutOptionHover : payoutOption;
      case "logOut":
        return activeTab === tab ? logOutHover : logOut;
      default:
        return "";
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "petSitterProfile":
        return activeTab === "petSitterProfile" ? <PetSitterProfile /> : null;
      case "bookingList":
        return activeTab === "bookingList" ? <BookingList /> : null;
      case "payoutOption":
        return activeTab === "payoutOption" ? <PayoutOption /> : null;
      case "logOut":
        return activeTab === "logOut" ? <Logout /> : null;
      default:
        return null;
    }
  };
  function Rerunder() {
    return (
      <div className="flex">
        <div className="flex bg-sixthGray mx-auto">
          <div className="min-w-[375px] mx-auto md:w-auto md:mx-3 bg-sixthGray max-w-[1200px] lg:ml-60">
            <div className="headBar flex items-center gap-5 p-5 bg-white justify-between w-full">
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
                    <MenuItem
                      onClick={() => handleTabClick("petSitterProfile")}
                    >
                      Pet Sitter Profile
                    </MenuItem>
                    <MenuItem onClick={() => handleTabClick("bookingList")}>
                      Booking List
                    </MenuItem>
                    <MenuItem onClick={() => handleTabClick("payoutOption")}>
                      Payout Option
                    </MenuItem>
                    <MenuItem onClick={() => handleTabClick("logOut")}>
                      Log Out
                    </MenuItem>
                  </MenuList>
                </Menu>
              </div>
            </div>

            <div>{renderTabContent()}</div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <>
      {/* <div className="h-[91vh] bg-sixthGray mx-auto">*/}
      <div className="bg-sixthGray mx-auto max-w-[1440px]">
        <div className="h-[91vh] bg-sixthGray mx-auto hidden lg:block">
          <div className="hidden bg-sixthGray lg:fixed lg:flex lg:flex-col lg:justify-between">
            <div>
              <div className="logo mx-6 my-6">
                <Image src={logo} alt="logoInBlack" />
              </div>
              <div
                onClick={() => handleTabClick("petSitterProfile")}
                className={getTabClassName("petSitterProfile")}
              >
                <Image
                  src={getTabImageSrc("petSitterProfile")}
                  alt="petSitterProfile"
                />
                <p>Pet Sitter Profile</p>
              </div>
              <div
                onClick={() => handleTabClick("bookingList")}
                className={getTabClassName("bookingList")}
              >
                <Image src={getTabImageSrc("bookingList")} alt="bookingList" />
                <p>Booking List</p>
              </div>
              <div
                onClick={() => handleTabClick("payoutOption")}
                className={getTabClassName("payoutOption")}
              >
                <Image
                  src={getTabImageSrc("payoutOption")}
                  alt="payoutOption"
                />
                <p>Payout Option</p>
              </div>
            </div>

            <div
              onClick={() => handleTabClick("logOut")}
              className={getTabClassName("logOut")}
            >
              <Image src={getTabImageSrc("logOut")} alt="logOut" />
              <p>Log Out</p>
            </div>
          </div>
          {/* lg block */}
          <div className="hidden lg:block">
            <Rerunder />
          </div>
        </div>
        <div className="block lg:hidden">
          <Rerunder />
        </div>
        {/* </div>*/}
      </div>
    </>
  );
}

export default HomePetSitter;
