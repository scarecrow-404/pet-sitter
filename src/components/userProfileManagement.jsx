"use client";
import React, { useState, useEffect, useRef } from "react";
import previewImg from "@/asset/images/Frame427321094.svg";
import {
  FormControl,
  FormLabel,
  Input,
  Avatar,
  useToast,
  FormErrorMessage,
} from "@chakra-ui/react";
import supabase from "@/lib/utils/db";
import { useUser } from "@/hooks/hooks";
import { useRouter } from "next/navigation";

function UserManagementProfile() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [IdNumber, setIdNumber] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [errorName, setErrorName] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPhone, setErrorPhone] = useState("");
  const [errorIdNumber, setErrorIdNumber] = useState("");
  const [photo, setPhoto] = useState({});
  const imageUrlRef = useRef(previewImg);
  const { user, userId } = useUser();
  const [imageUrl, setImageUrl] = useState();
  const router = useRouter();
  const toast = useToast();
  useEffect(() => {
    const fetchUserData = async () => {
      if (!user || !userId) {
        return;
      }
      const { data: userData, error } = await supabase
        .from("users")
        .select("*")
        .eq("id", userId);

      if (error) {
      } else if (userData && userData.length > 0) {
        const fetchedUser = userData[0];
        setName(fetchedUser.full_name);
        setEmail(fetchedUser.email);
        setPhone(fetchedUser.phone_number);
        setIdNumber(fetchedUser.personal_id);
        setDateOfBirth(fetchedUser.date_of_birth);
        setImageUrl(fetchedUser.image_url || previewImg);
      } else {
      }
    };

    fetchUserData();
  }, [user]);
  const generateUniqueFileName = (fileName) => {
    const timestamp = new Date().getTime(); // Get current timestamp
    const randomString = Math.random().toString(36).substring(7); // Generate random string
    const fileExtension = fileName.split(".").pop(); // Get file extension
    return `${timestamp}_${randomString}.${fileExtension}`;
  };
  const handleUploadPhoto = (event) => {
    const file = event.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      if (url) {
        const uniqueFileName = generateUniqueFileName(file.name);
        setPhoto({ [uniqueFileName]: file });
        setImageUrl(url);
      }
    }
  };

  const handleSubmit = async (imageUrl) => {
    let imageUrlToUse = imageUrl;
    // Upload photo
    if (Object.keys(photo).length > 0) {
      const file = Object.values(photo)[0];
      const timestamp = new Date().getTime();
      const fileName = `${timestamp}_${file.name}`;
      const filePath = `public/${user.id}/${fileName}`;
      let { data, error: uploadError } = await supabase.storage
        .from("images")
        .upload(filePath, file);

      if (uploadError) {
        return;
      }
      // Get URL of uploaded photo
      let url = supabase.storage.from("images").getPublicUrl(data.path);
      if (!url.data.publicUrl) {
        return;
      }
      imageUrlToUse = url.data.publicUrl;
    }

    // Update user data
    const updates = {
      full_name: name,
      email: email,
      phone_number: phone,
      personal_id: IdNumber,
      date_of_birth: dateOfBirth,
      image_url: imageUrlToUse,
      updated_at: new Date(),
    };

    const { error } = await supabase
      .from("users")
      .update(updates)
      .eq("id", userId);

    if (error) {
      toast({
        title: "error",
        position: "top",
        description: "Error updating user",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    } else {
      toast({
        title: "success",
        position: "top",
        description: "User updated successfully",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
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
          <FormControl isRequired isInvalid={errorName !== ""}>
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
              onBlur={() => {
                if (name.trim() === "") {
                  setErrorName("Please enter your name");
                } else {
                  setErrorName("");
                }
              }}
              errorBorderColor="red.400"
              required
            />
            <FormErrorMessage>{errorName}</FormErrorMessage>
          </FormControl>
        </div>
        <div className="w-11/12 flex flex-col gap-4 lg:flex-row lg:gap-0 lg:justify-between">
          <div className="w-full lg:w-[48%]">
            <FormControl isRequired isInvalid={errorEmail !== ""}>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
                onBlur={() => {
                  if (email.trim() === "") {
                    setErrorEmail("Please enter your email");
                  } else {
                    setErrorEmail("");
                  }
                }}
                errorBorderColor="red.400"
                required
              />
              <FormErrorMessage>{errorEmail}</FormErrorMessage>
            </FormControl>
          </div>
          <div className="w-full lg:w-[48%]">
            <FormControl isRequired isInvalid={errorPhone !== ""}>
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
                onBlur={() => {
                  if (phone.trim() === "") {
                    setErrorPhone("Please enter your phone");
                  } else {
                    setErrorPhone("");
                  }
                }}
                errorBorderColor="red.400"
                required
              />
              <FormErrorMessage>{errorPhone}</FormErrorMessage>
            </FormControl>
          </div>
        </div>
        <div className="w-11/12 flex flex-col gap-4 lg:flex-row lg:gap-0 lg:justify-between">
          <div className="w-full lg:w-[48%]">
            <FormControl isRequired isInvalid={errorIdNumber !== ""}>
              <FormLabel>ID Number</FormLabel>
              <Input
                type="text"
                placeholder="Your ID number"
                minLength={13}
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
                onBlur={() => {
                  if (IdNumber.trim() === "") {
                    setErrorIdNumber("Please enter your ID number");
                  } else if (IdNumber.length < 13) {
                    setErrorIdNumber(
                      "Please enter a valid 13-digit ID card number"
                    );
                  } else {
                    setErrorIdNumber("");
                  }
                }}
                errorBorderColor="red.400"
                required
              />
              <FormErrorMessage>{errorIdNumber}</FormErrorMessage>
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
            onClick={() => handleSubmit(imageUrl)}
          >
            Update Profile
          </button>
        </div>
      </div>
    </div>
  );
}
export default UserManagementProfile;
