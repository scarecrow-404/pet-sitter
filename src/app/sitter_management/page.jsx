"use client";
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
import PetSitterProfile1 from "@/app/sitter_management/petsitterprofile";

function PetSitterProfile() {
  return (
    <>
      <PetSitterProfile1 />
    </>
  );
}

function BookingList() {
  return (
    <>
      <PetSitterProfile1 />
    </>
  );
}

function PayoutOption() {
  return (
    <>
      <PetSitterProfile1 />
    </>
  );
}

function Logout() {
  return (
    <>
      <PetSitterProfile1 />
    </>
  );
}

function Sidebar() {
  const [activeTab, setActiveTab] = useState("petSittetProfile");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const getTabClassName = (tab) => {
    return activeTab === tab
      ? "flex flex-row cursor-pointer items-center px-6 py-3 gap-4 text-secondOrange font-[16px] w-full bg-orange-100"
      : "flex flex-row cursor-pointer items-center px-6 py-3 gap-4 text-secondGray font-[16px] w-full hover:text-secondOrange hover:bg-orange-100";
  };

  const getTabImageSrc = (tab) => {
    switch (tab) {
      case "petSittetProfile":
        return activeTab === tab ? petSittetProfileHover : petSittetProfile;
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
      case "petSittetProfile":
        return <PetSitterProfile />;
      case "bookingList":
        return <BookingList />;
      case "payoutOption":
        return <PayoutOption />;
      case "logOut":
        return <Logout />;
      default:
        return null;
    }
  };

  return (
    <div className="h-[91vh] bg-sixthGray w-fit mx-auto">
      <div className="flex bg-sixthGray mx-auto max-w-[1440px]">
        <div className="hidden  bg-sixthGray lg:fixed lg:flex lg:flex-col lg:justify-between">
          <div>
            <div className="logo mx-6 my-6">
              <Image src={logo} alt="logoInBlack" />
            </div>
            <div
              onClick={() => handleTabClick("petSittetProfile")}
              className={getTabClassName("petSittetProfile")}
            >
              <Image
                src={getTabImageSrc("petSittetProfile")}
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
              <Image src={getTabImageSrc("payoutOption")} alt="payoutOption" />
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

        <div className="mx-auto">{renderTabContent()}</div>
      </div>
    </div>
  );
}

export default Sidebar;
