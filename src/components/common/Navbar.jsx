"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import blackLogo from "@/asset/images/logoInBlack.svg";
import mockPhoto from "@/asset/images/profileFrame.svg";
import logoutIcon from "@/asset/images/logoutIcon.svg";
import profileIcon from "@/asset/images/profileIcon.svg";
import yourPetIcon from "@/asset/images/yourPetIcon.svg";
import historyIcon from "@/asset/images/historyIcon.svg";
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
import { set } from "date-fns";
import { is } from "date-fns/locale";
import { Player, Controls } from "@lottiefiles/react-lottie-player";
const Navbar = () => {
  const {
    user,
    setUser,
    userId,
    setUserId,
    isLoading,
    setIsLoading,
    setSitterId,
  } = useUser();
  const router = useRouter();
  const [profileImage, setProfileImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPetSitter, setIsPetSitter] = useState(false);
  async function getUser(session) {
    if (!session) {
      setIsLoading(false);
      return null;
    }
    if (!session.user) {
      setIsLoading(false);
      return null;
    }
    if (user) {
      setIsLoading(false);
      return user;
    }
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", session.user.id);
    setUser(data[0]);
    setIsLoading(false);
    return data[0];
  }

  useEffect(() => {
    const fetchSession = async () => {
      const session = supabase.auth.getSession();

      if (session && session.user) {
        setUserId(session.user.id);
        await getUser(session);
        setIsLoading(false);
      } else {
        const storedSession = localStorage.getItem("session");
        if (storedSession) {
          const session = JSON.parse(storedSession);
          setUserId(session.user.id);
          await getUser(session);
          setIsLoading(false);
        }
      }
    };
    fetchSession();
    supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_IN" || event === "INITIAL_SESSION") {
        if (session) {
          localStorage.setItem("session", JSON.stringify(session));
          setUserId(session.user.id);
          const user = await getUser(session);

          setIsLoading(false);
          const image = user?.image_url;
          setProfileImage(image ?? mockPhoto);
          if (user?.user_type === "sitter") {
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
        localStorage.removeItem("session");
      }
    });
  }, []);

  const handleLogin = () => {
    user ? router.push("/") : router.push("/login");
  };
  const handleProfileClick = () => {
    router.push("/account");
  };
  const handlePetClick = () => {
    router.push("/account/pet");
  };
  const handleSitterClick = () => {
    router.push("/sitter_management");
  };

  const handleSignOut = () => {
    signOut();
    router.push("/");
  };

  const handleHistoryClick = () => {
    router.push("/account/booking-history");
  };

  return (
    <div className="flex items-center justify-between bg-white p-4 sticky top-0 z-20 max-w-[1440px] mx-auto">
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
                <MenuItem onClick={handleProfileClick}>
                  <Image
                    src={profileIcon}
                    alt="profile icon"
                    height={16}
                    width={16}
                  />
                  <p className="ml-2">Profile</p>
                </MenuItem>
                <MenuItem onClick={handlePetClick}>
                  <Image
                    src={yourPetIcon}
                    alt="pet icon"
                    height={16}
                    width={16}
                  />
                  <p className="ml-2">Yout Pet</p>
                </MenuItem>
                <MenuItem onClick={handleHistoryClick}>
                  <Image
                    src={historyIcon}
                    alt="profile icon"
                    height={16}
                    width={16}
                  />
                  <p className="ml-2">Booking History</p>
                </MenuItem>
                <MenuDivider />
                {isPetSitter ? (
                  <MenuItem onClick={handleSitterClick}>
                    <Image
                      src={profileIcon}
                      alt="pet sitter component icon 1"
                      height={8}
                      width={8}
                    />
                    <Image
                      src={profileIcon}
                      alt="petsitter component icon 2 "
                      height={8}
                      width={8}
                    />
                    <p className="ml-2">Sitter Mode</p>
                  </MenuItem>
                ) : (
                  <PopUpSitterConfirm />
                )}

                <MenuItem onClick={handleSignOut}>
                  <Image
                    src={logoutIcon}
                    alt="log out icon"
                    height={16}
                    width={16}
                  />
                  <p className="ml-2">Log out</p>
                </MenuItem>
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
