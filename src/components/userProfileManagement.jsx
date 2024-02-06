"use client";
import React, { useState } from "react";
import Image from "next/image";
import previewImg from "@/asset/images/Frame427321094.svg";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
} from "@chakra-ui/react";

function UserManagementProfile() {
  const [photo, setPhoto] = useState({});
  const [previewPhoto, setPreviewPhoto] = useState(previewImg);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [IdNumber, setIdNumber] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");

  // upload photo
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
        setPreviewPhoto(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  // use for check useState (if connected to db already ,pls delete)
  const handleSubmit = (event) => {
    event.preventDefault();
    alert(
      `Update name: ${name} email: ${email} phone: ${phone} ID number: ${IdNumber} date: ${dateOfBirth}`
    );
  };

  return (
    // form
    <div className="flex flex-col xl:items-start xl:pl-12 mx-auto py-6 lg:gap-10 min-w-[375px] w-full lg:max-w-[1440px]">
      <h1 className="w-5/6 text-xl font-semibold md:text-2xl lg:max-w-[740px] pl-5 ">
        Profile
      </h1>
      {/* profile pic */}
      <div className="flex justify-start items-start lg:max-w-[750px] pl-5 ">
        <label htmlFor="profile">
          <FormLabel></FormLabel>
          {previewPhoto && (
            <div className="photo">
              <Image
                className="block md:hidden lg:hidden cursor-pointer"
                src={previewPhoto}
                width={150}
                height={150}
                alt="Preview"
              />
              <Image
                className="hidden md:block lg:hidden cursor-pointer"
                src={previewPhoto}
                width={200}
                height={200}
                alt="Preview"
              />
              <Image
                className="hidden md:hidden lg:block cursor-pointer"
                src={previewPhoto}
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
      {/* all input */}
      <div className="w-full flex flex-col justify-between mx-auto items-center gap-4 py-4 md:w-full lg:gap-8  xl:items-start xl:justify-start">
        <div className="w-11/12">
          <FormControl isRequired>
            <FormLabel>Your name</FormLabel>
            <Input
              type="text"
              placeholder="Your name"
              value={name}
              minLength={6}
              maxLength={60}
              onChange={(event) => {
                setName(event.target.value);
              }}
            />
          </FormControl>
        </div>
        <div className="w-11/12 flex flex-col gap-4 lg:flex-row lg:gap-0 lg:justify-between">
          <div className="w-full lg:w-[48%]">
            <FormControl isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
              />
            </FormControl>
          </div>
          <div className="w-full lg:w-[48%]">
            <FormControl isRequired>
              <FormLabel>Phone</FormLabel>
              <Input
                type="tel"
                placeholder="Your phone"
                maxLength={10}
                value={phone
                  .replace(/\D/g, "")
                  .replace(/^(\d{3,3})(\d{3,3})(\d{4,4}).*$/, "$1 $2 $3")
                  .trim()}
                onChange={(event) => {
                  setPhone(event.target.value);
                }}
              />
            </FormControl>
          </div>
        </div>
        <div className="w-11/12 flex flex-col gap-4 lg:flex-row lg:gap-0 lg:justify-between">
          <div className="w-full lg:w-[48%]">
            <FormControl isRequired>
              <FormLabel>ID Number</FormLabel>
              <Input
                type="text"
                placeholder="Your ID number"
                maxLength={13}
                value={IdNumber.replace(/\D/g, "")
                  .replace(
                    /^(\d{1,1})(\d{4,4})(\d{5,5})(\d{2,2})(\d{1,1}).*$/,
                    "$1 $2 $3 $4 $5"
                  )
                  .trim()}
                onChange={(event) => {
                  setIdNumber(event.target.value);
                }}
              />
            </FormControl>
          </div>
          <div className="w-full lg:w-[48%]">
            <FormControl>
              <FormLabel>Date of Birth</FormLabel>
              <Input
                placeholder="Select your date of birth"
                size="md"
                type="date"
                value={dateOfBirth}
                onChange={(event) => {
                  setDateOfBirth(event.target.value);
                }}
              />
            </FormControl>
          </div>
        </div>
        <div className="lg:left-[310px]">
          <button
            className="bg-secondOrange p-2 text-sm rounded-3xl text-white md:text-xl"
            //for check useState (if connected to db already ,pls delete)
            onClick={handleSubmit}
          >
            Update Profile
          </button>
        </div>
      </div>
    </div>
  );
}
export default UserManagementProfile;
