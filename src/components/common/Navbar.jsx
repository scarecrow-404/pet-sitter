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
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { useUser } from "@/hooks/hooks";
import { signOut } from "@/app/services/auth";
import { useRouter } from "next/navigation";
import supabase from "@/lib/utils/db";
import LoadingImage from "@/asset/images/paw-1.1s-200px.svg";
import ReactModal from "react-modal";
import PopUpSitterConfirm from "../PopupSitterConfirm";
const Navbar = () => {
  const { user, setUser, userId, setUserId } = useUser();
  const [isLoading, setIsLoading] = useState(true);
  const [profileImage, setProfileImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPetSitter, setIsPetSitter] = useState(false);
  async function getUser(session) {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", session.user.id);
    setUser(data[0]);
    setIsLoading(false);
    return data[0]; // return the user data
  }

  useEffect(() => {
    const session = supabase.auth.session;

    if (session) {
      setIsLoading(true);
      setUserId(session.user.id);
      getUser(session);
    }

    supabase.auth.onAuthStateChange(async (event, session) => {
      console.log(`Supabase auth event: ${event}`);

      if (event === "SIGNED_IN" || event === "INITIAL_SESSION") {
        if (session) {
          setIsLoading(true);
          setUserId(session.user.id);
          const user = await getUser(session);
          const image = user?.profile_image;
          setProfileImage(image ?? mockPhoto);
          if (user?.user_type === "sitter") {
            console.log(user?.user_type);
            setIsPetSitter(true);
          }
          setIsLoading(false);
        } else {
          setIsLoading(false);
        }
      } else if (event === "SIGNED_OUT") {
        setIsLoading(false);
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
    router.push("/sitter_management");
  };

  const handleSignOut = () => {
    signOut();
    router.push("/");
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex items-center justify-between bg-white p-4 sticky top-0 z-20">
      <Link href="/">
        <Image src={blackLogo} alt="logo" className=" w-fit md:w-52" />
      </Link>

      <div className="flex items-center">
        {isLoading ? (
          <div className="flex justify-center items-center w-[40px] animate-pulse">
            <Image
              width={60}
              height={60}
              src={LoadingImage}
              alt="paw loading"
              className=" animate-spin"
            />
          </div>
        ) : user ? (
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
                <MenuItem>History </MenuItem>
                <MenuDivider />
                {isPetSitter ? (
                  <MenuItem onClick={handleSitterClick}>
                    Sitter Management
                  </MenuItem>
                ) : (
                  <PopUpSitterConfirm />
                )}

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
