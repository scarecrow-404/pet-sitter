"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
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
import previewImg from "@/asset/images/Frame427321094.svg";
import backIcon from "@/asset/images/backIcon.svg";
import previewPet from "@/asset/images/previewPetPhoto.svg";
import deletePet from "@/asset/images/deletePetIcon.svg";
import { useUser } from "@/hooks/hooks";
import { useRouter } from "next/navigation";
import supabase from "@/lib/utils/db";

function updatePet({ searchParams }) {
  const { userId } = useUser();
  const router = useRouter();
  const [photo, setPhoto] = useState({});
  const [imageUrl, setImageUrl] = useState(previewImg);
  const inputRefLogo = useRef(null);
  const [petName, setPetName] = useState("");
  const [petType, setPetType] = useState(""); // เป็น selector มา edit ถ้าต้องเปลี่ยนแปลงอะไร
  const [breed, setBreed] = useState("");
  const [sex, setSex] = useState(""); // เป็น selector มา edit ถ้าต้องเปลี่ยนแปลงอะไร
  const [age, setAge] = useState("");
  const [color, setColor] = useState("");
  const [weight, setWeight] = useState("");
  const [about, setAbout] = useState("");
  useEffect(() => {
    const fetchPetData = async () => {
      const { data, error } = await supabase
        .from("pet")
        .select("*")
        .eq("id", searchParams.id)
        .single();

      if (error) {
        console.error("Error fetching pet data: ", error);
        return;
      }

      // Set the state with the fetched data
      setPetName(data.name);
      setPetType(data.petType);
      setBreed(data.breed);
      setSex(data.sex);
      setAge(data.age);
      setColor(data.color);
      setWeight(data.weight);
      setAbout(data.about);

      setImageUrl(data.image_url);
    };

    fetchPetData();
  }, [searchParams.id||userId]);

  const handleUploadPhoto = (event) => {
    const file = event.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      if (url) {
        setPhoto({ [file.name]: file });
        setImageUrl(url);
      }
    }
  };
  const handleSubmit = async (event) => {
    try {
      await updatePet(searchParams.id);
      router.push("/account/pet/");
    } catch (error) {
      alert("Error creating pet: " + error.message);
    }
  };
  const handleDelete = async (event) => {
    try {
      const { data, error } = await supabase
        .from("pet")
        .delete()
        .eq("id", searchParams.id);

      if (error) {
        console.error("Error: ", error);
      } else {
        console.log("Deleted data: ", data);
        onClose();
        router.push("/account/pet/");
      }
    } catch (error) {}
  };
  const updatePet = async (petId) => {
    let imageUrl = null;
    // Upload photo
    if (Object.keys(photo).length > 0) {
      const file = Object.values(photo)[0];
      const filePath = `public/${userId}/pet/${file.name}`;
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
    // if (!imageUrl) {
    //   console.error("Image URL is null");
    //   return;
    // }
    const petData = {
      name: petName,
      breed: breed,
      petType: petType,
      sex: sex,
      age: age,
      color: color,
      weight: weight,
      about: about,
      image_url: imageUrl, // assuming this is the URL of the image
      user_id: userId,
      updated_at: new Date(), // assuming userId is available in this scope
      // add other necessary fields
    };

    const { data, error } = await supabase
      .from("pet")
      .update(petData)
      .eq("id", petId);

    if (error) {
      console.error("Error creating pet: ", error);
      return null;
    } else {
      console.log("Pet created successfully", data);
    }
  };

  // modal to click delete pet
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();

  return (
    <div className="flex flex-col justify-center items-center py-6 gap-5 max-w-[1440px] mx-auto lg:gap-10 lg:py-14">
      {/* topic */}
      <div className="w-[90%] flex flex-row justify-between md:w-[85%] lg:w-[83%]">
        <div className="font-bold text-lg flex flex-row justify-start items-center gap-1">
          <Link href="/account/pet/">
            <button>
              <Image src={backIcon} alt="back" />
            </button>
          </Link>
          Your Pet
        </div>
      </div>
      {/* pet picture edit later */}
      <div className="lg:w-[83%]">
        <label htmlFor="profile">
          <FormLabel></FormLabel>
          {imageUrl ? (
            <div className="photo">
              <Avatar
                className="cursor-pointer"
                src={imageUrl}
                width={200}
                height={200}
                alt="Preview"
              />
            </div>
          ) : (
            <div className="photo">
              <Avatar
                className="cursor-pointer"
                src={imageUrl}
                width={200}
                height={200}
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
                type="text"
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
                type="text"
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
                      onClick={handleDelete}
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
          <Link href="/account/pet/">
            <button className="bg-sixthOrange p-2 px-5 text-sm font-medium rounded-3xl text-secondOrange md:text-xl">
              Cancel
            </button>
          </Link>
          <button
            onClick={handleSubmit}
            className="bg-secondOrange p-2 text-sm font-medium rounded-3xl text-white md:text-xl"
          >
            Update Pet
          </button>
        </div>
      </div>
    </div>
  );
}
export default updatePet;
