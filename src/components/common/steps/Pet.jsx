"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import supabase from "@/lib/utils/db";
import previewPet from "@/asset/images/catforsitterlist.jpg";
import newPet from "@/asset/images/createNewPet.svg";
import CreatePetModal from "@/components/CreatePetModal";
import { useUser } from "@/hooks/hooks";
import {
  Input,
  Avatar,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
function Pet({
  formData,
  handleInput,
  selectedPets,
  setSelectedPets,
  onClose,
  id,
}) {
  const { isOpen, onOpen, onClose: closeModal } = useDisclosure();
  const { userId } = useUser();
  const [petData, setPetData] = useState([]);
  const [petPrefer, setPetPrefer] = useState([]);
  useEffect(() => {
    if (userId) {
      fetchPets();
    }
    if (id) {
      fetchPetPerfer(id);
    }
  }, [userId, isOpen]);

  const fetchPets = async () => {
    const { data: pets, error } = await supabase
      .from("pet")
      .select("*")
      .eq("user_id", userId);

    if (error) {
      console.error("Error fetching pets data:", error);
    } else {
      setPetData(pets);
    }
  };

  const addPetTypeToArr = (arr) => {
    let newArr = [];
    arr.map((item) => newArr.push(item.pet_type_master.name));
    setPetPrefer(newArr);
  };

  const fetchPetPerfer = async (id) => {
    const { data: pets, error } = await supabase
      .from("pet_prefer")
      .select(`*, pet_type_master(name)`)
      .eq("pet_sitter_id", id);

    if (error) {
      console.error("Error fetching pets data:", error);
    } else {
      addPetTypeToArr(pets);
    }
  };
  console.log(petData, "petData");
  console.log(petPrefer, "petPrefer");
  // const [selectedPets, setSelectedPets] = useState([]);
  const handleClick = (item) => {
    const index = selectedPets.findIndex((pet) => pet.id === item.id);
    if (index === -1) {
      setSelectedPets([...selectedPets, item]);
    } else {
      const updatedPets = [...selectedPets];
      updatedPets.splice(index, 1);
      setSelectedPets(updatedPets);
    }
  };

  console.log(selectedPets);
  return (
    <div className="flex flex-col justify-center items-center md:items-start max-w-[1440px] mx-auto">
      {/* topic */}
      <div className="flex flex-row justify-center md:justify-start p-3">
        <div className="text-[16px] font-[500] leading-[24px] md:ml-[60px] ">
          Choose Your Pet
        </div>
      </div>
      {/* area for map petlist */}
      <div className="flex justify-center h-[480px] overflow-y-scroll w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 py-5 gap-5">
          {/* map here */}
          {petData.length > 0 ? (
            petData.map((item) => (
              <button
                disabled={petPrefer.includes(item.petType) ? false : true}
                onClick={() => handleClick(item)}
                key={item.id}
                className={`mb-5 border rounded-lg w-[210px] h-[240px] flex flex-col justify-center items-center gap-6 cursor-pointer  disabled:bg-fifthGray  disabled:opacity-50 ${
                  selectedPets.find((pet) => pet.id === item.id)
                    ? " border-thirdOrange border-[3px]"
                    : ""
                }`}
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
                        ? " bg-secondYellow  border-firstYellow  text-firstYellow"
                        : null
                    } `}
                  >
                    {item.petType}
                  </p>
                </div>
              </button>
            ))
          ) : (
            <div>There is no pet</div>
          )}

          {/* map end here */}
          <div className="mb-5 rounded-lg w-[210px] h-[240px] flex flex-col justify-center items-center gap-6 cursor-pointer">
            <Image src={newPet} onClick={onOpen} />
            <Modal isOpen={isOpen} onClose={closeModal} size="xl">
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Create Your Pet</ModalHeader>

                <ModalBody>
                  <CreatePetModal onClose={closeModal} fetchPets={fetchPets} />
                </ModalBody>
                <ModalFooter>
                  {/* You can add additional footer buttons here if needed */}
                </ModalFooter>
              </ModalContent>
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pet;
