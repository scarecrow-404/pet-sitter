"use client";
import React, { useState } from "react";
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

const Navbar = () => {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <div className="flex items-center justify-between bg-white p-4 sticky top-0 z-20">
      <Image src={blackLogo} alt="logo" className=" w-fit md:w-52" />
      <div className="flex items-center">
        {isLogin ? (
          <Menu>
            <MenuButton as="Button">
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
              <MenuItem>Log out</MenuItem>
            </MenuList>
          </Menu>
        ) : (
          <button>Login</button>
        )}

        <button className="bg-secondOrange rounded-full p-2 text-white ml-6 hidden md:block">
          Find A Pet Sitter
        </button>
      </div>
    </div>
  );
};

export default Navbar;
