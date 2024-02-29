import React, { useState, useRef } from "react";
import Image from "next/image";
import {
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
  useDisclosure,
  Avatar,
  useToast,
} from "@chakra-ui/react";
import supabase from "@/lib/utils/db";
import previewImg from "@/asset/images/Frame427321094.svg";
import Link from "next/link";
import backIcon from "@/asset/images/backIcon.svg";
import { useUser } from "@/hooks/hooks";
import { useRouter } from "next/navigation";

function CreatePetModal({ onClose, fetchPets }) {
  // const { onClose } = useDisclosure();
  const { userId } = useUser();
  const router = useRouter();
  const [photo, setPhoto] = useState({});
  const [petName, setPetName] = useState("");
  const [petType, setPetType] = useState("");
  const [breed, setBreed] = useState("");
  const [sex, setSex] = useState("");
  const [age, setAge] = useState("");
  const [color, setColor] = useState("");
  const [weight, setWeight] = useState("");
  const [about, setAbout] = useState("");
  const imageUrlRef = useRef(previewImg);
  const toast = useToast();
  const handleUploadPhoto = (event) => {
    const file = event.target.files[0];
    const timestamp = new Date().getTime(); // Generate unique timestamp
    const fileName = `${timestamp}_${file.name}`; // Append timestamp to file name
    const url = URL.createObjectURL(file);
    setPhoto({ [fileName]: file });
    imageUrlRef.current = url;
  };
  const handleSubmit = async () => {
    if (!petName || !petType || !breed || !sex || !age || !color || !weight) {
      toast({
        title: "Error",
        position: "top",
        description: "Please fill in all required fields",
        status: "warning",
        duration: 9000,
        isClosable: true,
      });
      return;
    }

    try {
      await createNewPet(imageUrlRef.current);
      toast({
        title: "Success",
        position: "top",
        description: `Pet created successfully`,
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      fetchPets();
      onClose(); // ปิด Modal เมื่อสร้างสัตว์เลี้ยงสำเร็จ
    } catch (error) {
      toast({
        title: "Error",
        position: "top",
        description: `Error creating pet: ${error.message}`,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  const createNewPet = async (imageUrl) => {
    let imageUrlToUse = imageUrl;

    // Upload photo
    if (Object.keys(photo).length > 0) {
      const file = Object.values(photo)[0];
      const filePath = `public/${userId}/pet/${file.name}`;
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

    const petData = {
      name: petName,
      breed: breed,
      petType: petType,
      sex: sex,
      age: age,
      color: color,
      weight: weight,
      about: about,
      image_url: imageUrlToUse,
      user_id: userId,
    };

    const { error } = await supabase.from("pet").insert([petData]);

    if (error) {
      return null;
    } else {
    }
  };

  return (
    <div className="flex flex-col justify-center items-center py-6 gap-5 max-w-[1440px] mx-auto lg:gap-10 lg:py-14">
      <div className="lg:w-[83%]">
        <label htmlFor="profile">
          {imageUrlRef.current && (
            <div className="photo">
              <Avatar
                className="cursor-pointer"
                src={imageUrlRef.current}
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
              maxLength={40}
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
                value={petType}
                onChange={(event) => {
                  setPetType(event.target.value);
                }}
                required
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
                required
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
                required
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
                required
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
        <div className="py-2 w-11/12 flex justify-evenly lg:justify-between lg:w-full">
          <button
            onClick={onClose}
            className="bg-sixthOrange p-2 px-5 text-sm font-medium rounded-3xl text-secondOrange md:text-xl"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="bg-secondOrange p-2 text-sm font-medium rounded-3xl text-white md:text-xl"
          >
            Create Pet
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreatePetModal;
