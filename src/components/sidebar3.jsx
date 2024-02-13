import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useUser } from "@/hooks/hooks";
import { signOut } from "@/app/services/auth";
import { useRouter } from "next/navigation";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  MenuOptionGroup,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";

import logo from "@/asset/images/logoInBlack.svg";
import petSittetProfile from "@/asset/images/petSitterProfile.svg";
import bookingList from "@/asset/images/bookingList.svg";
import payoutOption from "@/asset/images/payoutOption.svg";
import logOut from "@/asset/images/logOut.svg";
import profile from "@/asset/images/Frame427321006.svg";

export function Sidebar({ active }) {
  const [imageSrc, setImageSrc] = useState({
    petSittetProfile,
    bookingList,
    payoutOption,
    logOut,
  });

  const handleMouseEnter = (key) => {
    setImageSrc((prevState) => ({
      ...prevState,
      [key]: `${key}Hover`,
    }));
  };

  const handleMouseLeave = (key) => {
    setImageSrc((prevState) => ({
      ...prevState,
      [key]: key,
    }));
  };

  return (
    <div className="w-60 h-[91vh] bg-sixthGray fixed">
      <div className="logo mx-6 my-6">
        <Image src={logo} alt="logoInBlack" />
      </div>
      <div className="flex flex-col justify-between h-full">
        <div>
          {["/", "booking_list", "payment"].map((item, index) => (
            <Link
              href={`/sitter_management${index === 0 ? "" : `/${item}`}`}
              key={index}
            >
              <div
                onMouseEnter={() => handleMouseEnter(item)}
                onMouseLeave={() => handleMouseLeave(item)}
                className={`flex flex-row cursor-pointer items-center px-6 py-3 gap-4 text-secondGray font-[16px] w-full  hover:text-secondOrange hover:bg-orange-100 ${
                  active === index + 1 ? "text-secondOrange bg-orange-100" : ""
                }`}
              >
                <Image src={imageSrc[item]} alt={item} width={20} height={20} />
                <p>
                  {item === "petSittetProfile"
                    ? "Pet Sitter Profile"
                    : item === "bookingList"
                    ? "Booking List"
                    : "Payout Option"}
                </p>
              </div>
            </Link>
          ))}
        </div>

        <div
          onClick={() => handleSignOut()}
          onMouseEnter={() => handleMouseEnter("logOut")}
          onMouseLeave={() => handleMouseLeave("logOut")}
          className="flex flex-row cursor-pointer items-center px-6 py-3 gap-4 text-secondGray font-[16px] w-full hover:text-secondOrange hover:bg-orange-100"
        >
          <Image src={imageSrc.logOut} alt="logOut" />
          <p>Log Out</p>
        </div>
      </div>
    </div>
  );
}

export function TopBar() {
  const { user } = useUser();
  const router = useRouter();

  const handleLogin = () => {
    user ? router.push("/") : router.push("/login");
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      router.push("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return user ? (
    <div className="headBar flex items-center gap-5 p-5 bg-white justify-between">
      <div className="flex flex-col items-center md:flex-row md:gap-5">
        <Image src={profile} width={40} height={40} alt="profile" />
        <p>{user?.user_metadata?.full_name}</p>
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
            {["Pet Sitter Profile", "Booking List", "Payout Option"].map(
              (item, index) => (
                <Link
                  href={`/sitter_management${
                    index === 0
                      ? ""
                      : `/${item.toLowerCase().replace(" ", "_")}`
                  }`}
                  key={index}
                >
                  <MenuItem>{item}</MenuItem>
                </Link>
              )
            )}
            <MenuItem onClick={handleSignOut}>Log Out</MenuItem>
          </MenuList>
        </Menu>
      </div>
    </div>
  ) : (
    <button onClick={handleLogin}>Login</button>
  );
}
