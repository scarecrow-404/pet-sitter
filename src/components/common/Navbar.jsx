"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import blackLogo from "@/asset/images/logoInBlack.svg";
import mockPhoto from "@/asset/images/profileFrame.svg";
import Image from "next/image";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Avatar,
  WrapItem,
  Box,
} from "@chakra-ui/react";
import { useUser } from "@/hooks/hooks";
import { signOut } from "@/app/services/auth";
import { useRouter } from "next/navigation";
import supabase from "@/lib/utils/db";
import { set } from "date-fns";
const Navbar = () => {
  const { user, setUser, userId, setUserId } = useUser();

  const [profileImage, setProfileImage] = useState(null);
  async function getUser(session) {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", session.user.id);
    // console.log(session.user.id);
    // console.log(data);
    setUser(data[0]);
    // console.log(user);
  }
  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      console.log(`Supabase auth event: ${event}`);
      //console.log(session);

      if (event === "SIGNED_IN" || event === "INITIAL_SESSION") {
        if (session) {
          setUserId(session.user.id);
          getUser(session);
          const image = user?.profile_image;
          setProfileImage(image ?? mockPhoto);
        }
      } else if (event === "SIGNED_OUT") {
        setUser(null);
        setProfileImage(mockPhoto);
      }
    });
  }, []);

  const router = useRouter();
  const handleLogin = () => {
    user ? router.push("/") : router.push("/login");
  };
  const handleProfileClick = () => {
    router.push("/profile");
  };
  const handlePetClick = () => {
    router.push("/profile");
  };
  const handleSitterClick = () => {
    let sitterStatus = false;
    if (user?.user_type === "sitter") {
      sitterStatus = true;
    }
    if (sitterStatus) {
      router.push("/sitter_management");
    } else {
      popUpSitter();
    }
  };
  const handleSignOut = () => {
    signOut();
    router.push("/");
  };
  const popUpSitter = () => {
    console.log("popup");
    return alert("You are not a sitter yet");
  };

  return (
    <div className="flex items-center justify-between bg-white p-4 sticky top-0 z-20">
      <Link href="/">
        <Image src={blackLogo} alt="logo" className=" w-fit md:w-52" />
      </Link>

      <div className="flex items-center">
        {user ? (
          <>
            <Menu>
              <MenuButton as="button">
                <Box display="flex" justifyContent="center" alignItems="center">
                  <WrapItem>
                    <Avatar
                      size="md"
                      boxSize="40px"
                      name=""
                      src={profileImage}
                    />
                  </WrapItem>
                </Box>
              </MenuButton>
              <MenuList>
                <MenuItem onClick={handleProfileClick}>Profile</MenuItem>
                <MenuItem onClick={handlePetClick}>Yout Pet </MenuItem>

                <MenuDivider />

                <MenuItem onClick={handleSitterClick}>Sitter Mode</MenuItem>
                <MenuItem onClick={handleSignOut}>Log out</MenuItem>
              </MenuList>
            </Menu>
          </>
        ) : (
          <button onClick={handleLogin}>Login</button>
        )}
        <Link href="/search">
          <button className="bg-secondOrange rounded-full p-2 text-white ml-6 hidden md:block">
            Find A Pet Sitter
          </button>
        </Link>
      </div>
    </div>
  );
};
export default Navbar;
