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
export default function petList() {
  const dataPet = [
    {
      pet_id: 1,
      name: "Daisy",
      petType: "Dog",
      Breed: "Beagle",
      Sex: "Female",
      Age: "0.6 Month",
      Color: "White,black and brown",
      Weight: "2 Kg",
      About: "Woof Woof",
      Image: "https://bit.ly/code-beast",
    },
    {
      pet_id: 2,
      name: "Max",
      petType: "Rabbit",
      Breed: "Labrador Retriever",
      Sex: "Male",
      Age: "2 years",
      Color: "Yellow",
      Weight: "30 kg",
      About: "A friendly and playful dog. Loves to swim!",
      Image: "https://example.com/max.jpg",
    },
    {
      pet_id: 3,
      name: "Luna",
      petType: "Cat",
      Breed: "Siamese",
      Sex: "Female",
      Age: "1.5 years",
      Color: "Brown",
      Weight: "4 kg",
      About: "An elegant and independent cat.",
      Image: "https://example.com/luna.jpg",
    },
    {
      pet_id: 4,
      name: "Rocky",
      petType: "Bird",
      Breed: "German Shepherd",
      Sex: "Male",
      Age: "3 years",
      Color: "Black and tan",
      Weight: "35 kg",
      About: "A loyal and protective dog. Great for families!",
      Image: "https://example.com/rocky.jpg",
    },

    {
      pet_id: 5,
      name: "Milo",
      petType: "Cat",
      Breed: "Maine Coon",
      Sex: "Male",
      Age: "1 year",
      Color: "Orange and white",
      Weight: "6 kg",
      About: "A large and friendly cat with a fluffy coat.",
      Image: "https://example.com/milo.jpg",
    },
    {
      pet_id: 6,
      name: "Bella",
      petType: "Dog",
      Breed: "Poodle",
      Sex: "Female",
      Age: "4 years",
      Color: "White",
      Weight: "8 kg",
      About: "An intelligent and energetic dog.",
      Image: "https://example.com/bella.jpg",
    },
    {
      pet_id: 7,
      name: "Simba",
      petType: "Cat",
      Breed: "Bengal",
      Sex: "Male",
      Age: "6 months",
      Color: "Spotted",
      Weight: "3 kg",
      About: "A playful and adventurous cat.",
      Image: "https://example.com/simba.jpg",
    },
    {
      pet_id: 8,
      name: "Charlie",
      petType: "Rabbit",
      Breed: "Golden Retriever",
      Sex: "Male",
      Age: "2 years",
      Color: "Golden",
      Weight: "25 kg",
      About: "A friendly and gentle dog. Loves to fetch!",
      Image: "https://example.com/charlie.jpg",
    },
    {
      pet_id: 9,
      name: "Lily",
      petType: "Cat",
      Breed: "Persian",
      Sex: "Female",
      Age: "3 years",
      Color: "White",
      Weight: "5 kg",
      About: "A calm and luxurious cat with long fur.",
      Image: "https://example.com/lily.jpg",
    },
    {
      pet_id: 10,
      name: "Oscar",
      petType: "Bird",
      Breed: "Dachshund",
      Sex: "Male",
      Age: "1.5 years",
      Color: "Brown",
      Weight: "6 kg",
      About: "A small and lively dog with a long body.",
      Image: "https://example.com/oscar.jpg",
    },
    {
      pet_id: 11,
      name: "Mia",
      petType: "Cat",
      Breed: "Ragdoll",
      Sex: "Female",
      Age: "2 years",
      Color: "Blue point",
      Weight: "4 kg",
      About: "A gentle and affectionate cat.",
      Image: "https://example.com/mia.jpg",
    },
  ];
  const [isOpen, setIsOpen] = useState(false);
  const [dataPets,setDatapets]=useState(dataPet)
  return (
    <div className="flex flex-col justify-center items-center py-4 gap-5 max-w-[1440px] mx-auto">
      {/* topic */}
      <div className="w-11/12 flex flex-row justify-between p-3">
        <div className="font-bold text-lg">Your Pet</div>
        <div>
          <button className="bg-secondOrange p-2 text-sm rounded-3xl text-white">
            Create Pet
          </button>
        </div>
      </div>
      {/* area for map petlist */}
      <div className="flex flex-col justify-center items-center w-11/12 py-5 gap-5 md:flex-row md:flex-wrap md:gap-3 md:justify-start md:px-5">
        {/* map here */}

        {dataPets.map((pet) => {
          return (
            <div
              key={pet.pet_id}
              className=" mb-5 border rounded-lg w-[210px] h-[240px] flex flex-col justify-center items-center gap-6 cursor-pointer"
            >
              <Avatar size="xl" name={pet.name} src={pet.Image} className="" />
              <div className="flex flex-col justify-center">
                <p className="mx-auto">{pet.name}</p>
                <p
                  className={` border rounded-xl w-fit px-3 ${
                    pet.petType === "Dog"
                      ? "border-firstGreen text-firstGreen bg-secondGreen"
                      : pet.petType === "Cat"
                      ? "bg-secondPink text-firstPink border-firstPink"
                      : pet.petType === "Bird"
                      ? "bg-secondLigthBlue text-firstLigthBlue border-firstLigthBlue"
                      : pet.petType === "Rabbit"
                      ? " bg-fifthOrange text-thirdOrange border-thirdOrange"
                      : null
                  } `}
                >
                  {pet.petType}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
