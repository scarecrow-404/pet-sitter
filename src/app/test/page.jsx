"use client";
import React, { useState } from "react";
import Image from "next/image";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Select,
  Textarea,
} from "@chakra-ui/react";
import backIcon from "@/asset/images/backIcon.svg";
import previewPet from "@/asset/images/previewPetPhoto.svg";

function createPet() {
  const [photo, setPhoto] = useState({});
  const [previewPetPhoto, setPreviewPetPhoto] = useState(previewPet);
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
  return (
    <div className="flex flex-col justify-center items-center py-4 gap-5 max-w-[1440px] mx-auto border-2 lg:gap-8">
      {/* topic */}
      <div className="border-2 w-[90%] flex flex-row justify-between py-3 md:w-[85%] lg:w-[850px]">
        <div className="font-bold text-lg flex flex-row justify-start items-center gap-1">
          <button>
            <Image src={backIcon} />
          </button>
          Your Pet
        </div>
      </div>
      {/* pet picture edit later */}
      <div className="border-2 lg:w-[850px]">
        <label htmlFor="profile">
          <FormLabel></FormLabel>
          {previewPetPhoto && (
            <div className="photo">
              <Image
                className="block md:hidden lg:hidden cursor-pointer"
                src={previewPetPhoto}
                width={150}
                height={150}
                alt="Preview"
              />
              <Image
                className="hidden md:block lg:hidden cursor-pointer"
                src={previewPetPhoto}
                width={200}
                height={200}
                alt="Preview"
              />
              <Image
                className="hidden md:hidden lg:block cursor-pointer"
                src={previewPetPhoto}
                width={220}
                height={220}
                alt="Preview"
              />
            </div>
          )}
          <input
            type="file"
            id="profile"
            name="profile"
            accept="image/*"
            onChange={handleUploadPhoto}
            className="sr-only"
          />
        </label>
      </div>
      {/* input for create pet profile */}
      <div className="border-2 w-[90%] flex flex-col justify-between items-center gap-4 py-4 md:w-[85%] lg:gap-8 lg:w-[850px]">
        <div className="w-11/12">
          <FormControl isRequired>
            <FormLabel>Pet name</FormLabel>
            <Input
              type="text"
              placeholder="Your pet name"
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
        <div className="w-11/12 flex flex-col gap-4 lg:flex-row lg:gap-0 lg:justify-between">
          <div className="w-full lg:w-[48%]">
            <FormControl isRequired>
              <FormLabel>Pet type</FormLabel>
              <Select
                placeholder="Select your pet type"
                // edit later
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
        <div className="w-11/12 flex flex-col gap-4 lg:flex-row lg:gap-0 lg:justify-between">
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
        <div className="w-11/12 flex flex-col gap-4 lg:flex-row lg:gap-0 lg:justify-between">
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
              <Input type="number" placeholder="Weight of your pet" />
            </FormControl>
          </div>
        </div>
        <div className="w-11/12">
          <FormControl>
            <FormLabel>About</FormLabel>
            <Textarea
              type="text"
              size="md"
              placeholder="Describe more about your pet..."
              maxLength={100}
            />
          </FormControl>
        </div>
        <div className="border-2 py-2 w-11/12 flex justify-evenly lg:justify-between">
          <button className="bg-sixthOrange p-2 px-5 text-sm rounded-3xl text-secondOrange md:text-xl">
            Cancel
          </button>
          <button className="bg-secondOrange p-2 text-sm rounded-3xl text-white md:text-xl">
            Create Pet
          </button>
        </div>
      </div>
    </div>
  );
}
export default createPet;
