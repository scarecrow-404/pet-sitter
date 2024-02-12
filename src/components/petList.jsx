"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import previewPet from "@/asset/images/catforsitterlist.jpg";
import {
  Input,
  Button,
  Avatar,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Lorem,
  Box,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useUser } from "@/hooks/hooks";
import supabase from "@/lib/utils/db";
export default function petList() {
  const router = useRouter();
  const [dataPets, setDataPets] = useState([]);
  const { userId } = useUser();
  useEffect(() => {
    if (userId) {
      fetchPets();
    }
  }, [userId]);
  const fetchPets = async () => {
    const { data: pets, error } = await supabase
      .from("pet")
      .select("*")
      .eq("user_id", userId);

    if (error) {
      console.error("Error fetching pets data:", error);
    } else {
      setDataPets(pets);
    }
  };
  console.log(dataPets);
  const handleClick = (item) => {
    const path = `/account/pet/${item.id}`;

    const queryString = new URLSearchParams({
      id: item.id,
    }).toString();

    const url = String(path) + "?" + queryString;

    router.push(url);
  };
  console.log(dataPets);
  return (
    <div className="flex flex-col justify-center items-center py-4 gap-5 max-w-[1440px] mx-auto">
      {/* topic */}
      <div className="w-11/12 flex flex-row justify-between p-3">
        <div className="font-bold text-lg">Your Pet</div>
        <div>
          <Link href="/account/pet/create_pet">
            <button className="bg-secondOrange p-2 text-sm rounded-3xl text-white">
              Create Pet
            </button>
          </Link>
        </div>
      </div>
      {/* area for map petlist */}
      <div className="flex flex-col justify-center items-center w-11/12 py-5 gap-5 md:flex-row md:flex-wrap md:gap-3 md:justify-start md:px-5">
        {/* map here */}

        {dataPets.length > 0 ? (
          dataPets.map((item) => {
            return (
              <div
                onClick={() => handleClick(item)}
                key={item.id}
                className=" mb-5 border rounded-lg w-[210px] h-[240px] flex flex-col justify-center items-center gap-6 cursor-pointer"
              >
                <Avatar
                  size="xl"
                  name={item.name}
                  src={item.image_url}
                  className=""
                />
                <div className="flex flex-col justify-center items-center">
                  <p className="mx-auto">{item.name}</p>
                  <p
                    className={` border rounded-xl w-fit px-3 ${
                      item.petType === "Dog"
                        ? "border-firstGreen text-firstGreen bg-secondGreen"
                        : item.petType === "Cat"
                        ? "bg-secondPink text-firstPink border-firstPink"
                        : item.petType === "Bird"
                        ? "bg-secondLigthBlue text-firstLigthBlue border-firstLigthBlue"
                        : item.petType === "Rabbit"
                        ? " bg-fifthOrange text-thirdOrange border-thirdOrange"
                        : null
                    } `}
                  >
                    {item.petType}
                  </p>
                </div>
              </div>
            );
          })
        ) : (
          <div>There is no pet</div>
        )}
      </div>
    </div>
  );
}
