"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import previewImg from "@/asset/images/Frame427321094.svg";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Avatar,
} from "@chakra-ui/react";
import supabase from "@/lib/utils/db";
import { useUser } from "@/hooks/hooks";

function UserManagementProfile() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [IdNumber, setIdNumber] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [photo, setPhoto] = useState({});
  const [imageUrl, setImageUrl] = useState(previewImg);
  const { userId } = useUser();

  useEffect(() => {
    const fetchUserData = async () => {
      if (!userId) {
        console.error("userId is null");
        return;
      }
      const { data: user, error } = await supabase
        .from("users")
        .select("*")
        .eq("id", userId);

      if (error) {
        console.error("Error fetching user data:", error);
      } else {
        setName(user[0].full_name);
        setEmail(user[0].email);
        setPhone(user[0].phone_number);
        setIdNumber(user[0].personal_id);
        setDateOfBirth(user[0].date_of_birth);
        setImageUrl(user[0].image_url || previewImg);
      }
    };
    fetchUserData();
  }, [userId]);

  const handleUploadPhoto = (event) => {
    const file = event.target.files[0];
    const url = URL.createObjectURL(file);
    setPhoto({ [file.name]: file });
    setImageUrl(url);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    let imageUrlToUse = imageUrl; // Initialize with the existing imageUrl

    // Upload photo only if a new photo is selected
    if (Object.keys(photo).length > 0) {
      const file = Object.values(photo)[0];
      const filePath = `public/${userId}/${file.name}`;
      let { data, error: uploadError } = await supabase.storage
        .from("images")
        .upload(filePath, file);
      console.log(data);
      if (uploadError) {
        console.error("Error uploading photo:", uploadError);
        return;
      }

      // Get URL of uploaded photo
      let url = supabase.storage.from("images").getPublicUrl(data.path);
      console.log(url.data.publicUrl);
      if (!url.data.publicUrl) {
        console.error(
          "Error getting photo URL: File does not exist or bucket is not public",
          url.data.publicUrl
        );
        return;
      }

      imageUrl = url.data.publicUrl;
    }

    // Update user data
    const updates = {
      full_name: name,
      email: email,
      phone_number: phone,
      personal_id: IdNumber,
      date_of_birth: dateOfBirth,
      image_url: imageUrl, // Use the updated or existing imageUrl
      updated_at: new Date(),
    };

    const { error } = await supabase
      .from("users")
      .update(updates)
      .eq("id", userId);

    if (error) {
      console.error("Error updating user:", error);
    } else {
      console.log("User updated successfully");
    }
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
          {imageUrl && (
            <div className="photo">
              <Avatar
                className="cursor-pointer"
                src={imageUrl}
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
                value={
                  phone &&
                  phone
                    .replace(/\D/g, "")
                    .replace(/^(\d{3,3})(\d{3,3})(\d{4,4}).*$/, "$1 $2 $3")
                    .trim()
                }
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
                value={
                  IdNumber &&
                  IdNumber.replace(/\D/g, "")
                    .replace(
                      /^(\d{1,1})(\d{4,4})(\d{5,5})(\d{2,2})(\d{1,1}).*$/,
                      "$1 $2 $3 $4 $5"
                    )
                    .trim()
                }
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
