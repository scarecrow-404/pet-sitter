"use client";
import React, { useState, useRef } from "react";
import Image from "next/image";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Select,
  Textarea,
  Avatar,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  useDisclosure,
  Button,
} from "@chakra-ui/react";
import backIcon from "@/asset/images/backIcon.svg";
import previewPet from "@/asset/images/previewPetPhoto.svg";
import deletePet from "@/asset/images/deletePetIcon.svg";

function updatePet() {
  const [photo, setPhoto] = useState({});
  const [previewPetPhoto, setPreviewPetPhoto] = useState(previewPet);
  const inputRefLogo = useRef(null);
  const [petName, setPetName] = useState("");
  const [petType, setPetType] = useState(""); // เป็น selector มา edit ถ้าต้องเปลี่ยนแปลงอะไร
  const [breed, setBreed] = useState("");
  const [sex, setSex] = useState(""); // เป็น selector มา edit ถ้าต้องเปลี่ยนแปลงอะไร
  const [age, setAge] = useState("");
  const [color, setColor] = useState("");
  const [weight, setWeight] = useState("");
  const [about, setAbout] = useState("");

  const handleUploadPhoto = (event) => {
    event.preventDefault();
    const file = event.target.files[0];

    if (Object.keys(photo).length > 1) {
      alert("Can't upload more than 1 image");
      return true;
    }

    if (file && file.size <= 10 * 1024 * 1024) {
      const uniqueId = Date.now();
      setPhoto({
        [uniqueId]: file,
      });

      const reader = new FileReader();
      reader.onload = () => {
        setPreviewPetPhoto(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleClickImage = () => {
    inputRefLogo.current.click();
  };
  // modal to click delete pet
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();

  return (
    <div className="flex flex-col justify-center items-center py-6 gap-5 max-w-[1440px] mx-auto lg:gap-10 lg:py-14">
      {/* topic */}
      <div className="w-[90%] flex flex-row justify-between md:w-[85%] lg:w-[83%]">
        <div className="font-bold text-lg flex flex-row justify-start items-center gap-1">
          <button>
            <Image src={backIcon} />
          </button>
          Your Pet
        </div>
      </div>
      {/* pet picture edit later */}
      <div className="lg:w-[83%]">
        <FormLabel></FormLabel>
        {previewPetPhoto && (
          <div className="photo">
            <Avatar
              src={previewPetPhoto}
              size="2xl"
              alt="Preview"
              onClick={handleClickImage}
            />
          </div>
        )}
        <Input
          type="file"
          id="profile"
          name="profile"
          accept="image/*"
          onChange={handleUploadPhoto}
          ref={inputRefLogo}
          hidden
        />
      </div>
      {/* input for create pet profile */}
      <div className="w-[90%] flex flex-col justify-between items-center gap-4 py-4 md:w-[85%] lg:gap-8 lg:w-[83%]">
        <div className="w-11/12 lg:w-full">
          <FormControl isRequired>
            <FormLabel>Pet name</FormLabel>
            <Input
              type="text"
              placeholder="Your pet name"
              pattern="^[a-zA-Z\s]*$"
              value={petName}
              minLength={6}
              maxLength={20}
              onChange={(event) => {
                setPetName(event.target.value);
              }}
              required
            />
          </FormControl>
        </div>
        <div className="w-11/12 flex flex-col gap-4 lg:flex-row lg:gap-0 lg:justify-between lg:w-full">
          <div className="w-full lg:w-[48%]">
            <FormControl isRequired>
              <FormLabel>Pet type</FormLabel>
              <Select
                placeholder="Select your pet type"
                // edit later if have change
                value={petType}
                onChange={(event) => {
                  setPetType(event.target.value);
                }}
              >
                <option>Dog</option>
                <option>Cat</option>
                <option>Bird</option>
                <option>Rabbit</option>
              </Select>
            </FormControl>
          </div>
          <div className="w-full lg:w-[48%]">
            <FormControl isRequired>
              <FormLabel>Breed</FormLabel>
              <Input
                type="text"
                placeholder="Breed of your pet"
                maxLength={60}
                value={breed}
                onChange={(event) => {
                  setBreed(event.target.value);
                }}
                required
              />
            </FormControl>
          </div>
        </div>
        <div className="w-11/12 flex flex-col gap-4 lg:flex-row lg:gap-0 lg:justify-between lg:w-full">
          <div className="w-full lg:w-[48%]">
            <FormControl isRequired>
              <FormLabel>Sex</FormLabel>
              <Select
                placeholder="Select sex of your pet"
                // edit later
                value={sex}
                onChange={(event) => {
                  setSex(event.target.value);
                }}
                required
              >
                <option>Male</option>
                <option>Female</option>
              </Select>
            </FormControl>
          </div>
          <div className="w-full lg:w-[48%]">
            <FormControl isRequired>
              <FormLabel>Age (Month)</FormLabel>
              <Input
                placeholder="Age of your pet"
                size="md"
                type="number"
                value={age}
                onChange={(event) => {
                  setAge(event.target.value);
                }}
              />
            </FormControl>
          </div>
        </div>
        <div className="w-11/12 flex flex-col gap-4 lg:flex-row lg:gap-0 lg:justify-between lg:w-full">
          <div className="w-full lg:w-[48%]">
            <FormControl isRequired>
              <FormLabel>Color</FormLabel>
              <Input
                type="text"
                placeholder="Describe color of your pet"
                maxLength={60}
                value={color}
                onChange={(event) => {
                  setColor(event.target.value);
                }}
              />
            </FormControl>
          </div>
          <div className="w-full lg:w-[48%]">
            <FormControl isRequired>
              <FormLabel>Weight (Kilogram)</FormLabel>
              <Input
                type="number"
                placeholder="Weight of your pet"
                value={weight}
                onChange={(event) => {
                  setWeight(event.target.value);
                }}
              />
            </FormControl>
          </div>
        </div>
        <div className="w-11/12 lg:w-full">
          <FormControl>
            <FormLabel>About</FormLabel>
            <Textarea
              type="text"
              size="md"
              placeholder="Describe more about your pet..."
              maxLength={200}
              value={about}
              onChange={(event) => {
                setAbout(event.target.value);
              }}
            />
          </FormControl>
        </div>
        <div className="w-11/12 py-2 lg:w-full">
          <button
            onClick={onOpen}
            className="text-secondOrange text-sm font-medium flex items-center gap-1 md:text-base"
          >
            <Image
              src={deletePet}
              alt="delete-button"
              className="inline-block"
            />{" "}
            Delete Pet
          </button>

          <AlertDialog
            isOpen={isOpen}
            leastDestructiveRef={cancelRef}
            onClose={onClose}
          >
            <AlertDialogOverlay>
              <AlertDialogContent>
                <AlertDialogHeader fontSize="lg" fontWeight="bold">
                  Delete Confirmation
                </AlertDialogHeader>

                <AlertDialogBody>
                  Are you sure to delete this pet?
                </AlertDialogBody>

                <AlertDialogFooter>
                  <div className="w-full flex justify-between ">
                    <button
                      ref={cancelRef}
                      onClick={onClose}
                      className="bg-sixthOrange py-3 px-5 text-sm font-medium rounded-3xl text-secondOrange"
                    >
                      Cancel
                    </button>
                    {/* add handleDelete later */}
                    <button
                      onClick={onClose}
                      className="bg-secondOrange py-3 px-5 text-sm font-medium rounded-3xl text-white"
                    >
                      Delete
                    </button>
                  </div>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialogOverlay>
          </AlertDialog>
        </div>
        <div className="py-2 w-11/12 flex justify-evenly lg:justify-between lg:w-full">
          <button className="bg-sixthOrange p-2 px-5 text-sm font-medium rounded-3xl text-secondOrange md:text-xl">
            Cancel
          </button>
          <button className="bg-secondOrange p-2 text-sm font-medium rounded-3xl text-white md:text-xl">
            Update Pet
          </button>
        </div>
      </div>
    </div>
  );
}
export default updatePet;
