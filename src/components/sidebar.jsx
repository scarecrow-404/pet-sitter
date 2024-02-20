import React, { useEffect, useState } from "react";
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
import { useUser } from "@/hooks/hooks";
import { signOut } from "@/app/services/auth";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  MenuOptionGroup,
  Avatar,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import supabase from "@/lib/utils/db";
import { error } from "jquery";

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

  const params = useParams();
  const { user, setUser, userId } = useUser();
  const [sitterId, setSitterId] = useState();
  async function getSitterId() {
    let { data, error } = await supabase
      .from("pet_sitter")
      .select("*")
      .eq("user_id", userId);
    console.log("data", data);
    setSitterId(data[0].id);
    if (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getSitterId();
  }, []);

  const router = useRouter();
  const handleSignOut = () => {
    signOut();
    router.push("/");
  };
  return (
    <div className="w-60 h-[91vh] bg-sixthGray fixed">
      <div className="logo mx-6 my-6">
        <Link href="/">
          <Image src={logo} alt="logoInBlack" />
        </Link>
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
          <Link href={`/sitter_management/${sitterId}/booking_list`}>
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
          <Link href={`/sitter_management/${sitterId}/payment`}>
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
          onClick={handleSignOut}
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

export function TopBar() {
  const router = useRouter();
  const { user, setUser, userId } = useUser();
  const [sitterId, setSitterId] = useState();
  async function getSitterId() {
    let { data, error } = await supabase
      .from("pet_sitter")
      .select("id")
      .eq("user_id", userId);
    setSitterId(data[0].id);
    if (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    getSitterId();
  }, []);
  const handleLogin = () => {
    user ? router.push("/") : router.push("/login");
  };

  const handleSignOut = () => {
    signOut();
    router.push("/");
  };

  return user ? (
    <div className="headBar flex items-center gap-5 p-5 bg-white justify-between">
      <div className="flex flex-col items-center md:flex-row md:gap-5">
        <Avatar src={user.image_url} width={10} height={10} alt="profile" />
        <p>{user.full_name}</p>
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
            <Link href={`/sitter_management/${sitterId}/booking_list`}>
              <MenuItem>Booking List</MenuItem>
            </Link>
            <Link href={`/sitter_management/${sitterId}/payment`}>
              <MenuItem>Payout Option</MenuItem>
            </Link>
            <MenuItem onClick={handleSignOut}>Log Out</MenuItem>
          </MenuList>
        </Menu>
      </div>
    </div>
  ) : (
    <button onClick={handleLogin}>Login</button>
  );
}
