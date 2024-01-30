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
  Wrap,
} from "@chakra-ui/react";

const Navbar = () => {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <div className="flex items-center justify-between bg-white p-4">
      <Image src={blackLogo} alt="logo" />
      <div>
        {isLogin ? (
          <Menu>
            <MenuButton as="Button">
              <WrapItem>
                <Avatar
                  size="md"
                  boxSize="2.5em"
                  name=""
                  src="https://bit.ly/broken-link"
                />
              </WrapItem>
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

        <button className="bg-secondOrange rounded-full p-2 text-white ml-6">
          Find A Pet Sitter
        </button>
      </div>
    </div>
  );
};

export default Navbar;
