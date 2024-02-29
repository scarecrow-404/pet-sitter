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
import prev from "@/asset/images/IconButtonPrev.svg";
import next from "@/asset/images/IconButtonNext.svg";
export default function PetList() {
  const router = useRouter();
  const [dataPets, setDataPets] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [petsPerPage] = useState(8);
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
    } else {
      setDataPets(pets);
    }
  };

  const handleClick = (item) => {
    const path = `/account/pet/${item.id}`;

    const queryString = new URLSearchParams({
      id: item.id,
    }).toString();

    const url = String(path) + "?" + queryString;

    router.push(url);
  };
  const indexOfLastPet = currentPage * petsPerPage;
  const indexOfFirstPet = indexOfLastPet - petsPerPage;
  const currentPets = dataPets.slice(indexOfFirstPet, indexOfLastPet);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const nextPage = () => {
    if (currentPage < Math.ceil(dataPets.length / petsPerPage)) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };
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
        {currentPets.length > 0 ? (
          currentPets.map((item) => (
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
                <p className="mx-auto pb-2">{item.name}</p>
                <p
                  className={` border rounded-xl w-fit px-3 ${
                    item.petType === "Dog"
                      ? "border-firstGreen text-firstGreen bg-secondGreen"
                      : item.petType === "Cat"
                      ? "bg-secondPink text-firstPink border-firstPink"
                      : item.petType === "Bird"
                      ? "bg-secondLigthBlue text-firstLigthBlue border-firstLigthBlue"
                      : item.petType === "Rabbit"
                      ? " bg-secondYellow text-thirdOrange border-thirdOrange"
                      : null
                  } `}
                >
                  {item.petType}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div>There is no pet</div>
        )}
      </div>
      {/* Pagination */}
      {dataPets.length > petsPerPage && (
        <div className="flex justify-center items-center gap-2  px-2 py-1 rounded-xl ">
          <button
            className="hover:text-firstOrange disabled:hover:bg-white disabled:opacity-30"
            disabled={currentPage === 1}
            onClick={prevPage}
          >
            <Image
              objectFit="cover"
              className=" w-[15px] h-[15px] rounded-xl"
              src={prev}
              alt="Prev-icon"
            />
          </button>
          {Array.from({ length: Math.ceil(dataPets.length / petsPerPage) }).map(
            (_, index) => (
              <div
                key={index}
                className={` cursor-pointer pl-4 pt-2 pr-4 pb-2  hover:bg-sixthOrange  rounded-full  text-fourthGray  font-medium hover:text-firstOrange ${
                  index + 1 === currentPage
                    ? "bg-sixthOrange text-firstOrange"
                    : ""
                }`}
                onClick={() => paginate(index + 1)}
              >
                {index + 1}
              </div>
            )
          )}
          <button className="hover:text-firstOrange" onClick={nextPage}>
            <Image
              objectFit="cover"
              className=" w-[15px] h-[15px] rounded-xl"
              src={next}
              alt="Next-icon"
            />
          </button>
        </div>
      )}
    </div>
  );
}
