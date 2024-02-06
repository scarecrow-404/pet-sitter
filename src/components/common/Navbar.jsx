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

const Navbar = () => {
  const { user, setUser } = useUser();
  const [isLogin, setIslogin] = useState(false);

  // const Menu = () => {
  //   return;
  // };
  // useEffect(() => {
  //   const fetchSession = async () => {
  //     const session = supabase.auth.session();
  //     if (session) {
  //       setUser(session.user);
  //     } else {
  //       setUser(null);
  //     }
  //   };
  //   if (user) {
  //     setIslogin(true);
  //   }
  //   fetchSession();
  // }, [user]);

  const router = useRouter();
  const handleSignOut = () => {
    signOut();
    router.push("/");
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
                    <Avatar size="md" boxSize="40px" name="" src={mockPhoto} />
                  </WrapItem>
                </Box>
              </MenuButton>
              <MenuList>
                <MenuItem>Profile</MenuItem>
                <MenuItem>Yout Pet </MenuItem>

                <MenuDivider />

                <MenuItem>Sitter Mode</MenuItem>
                <MenuItem onClick={handleSignOut}>Log out</MenuItem>
              </MenuList>
            </Menu>
          </>
        ) : (
          <Link href="/login">Login</Link>
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
