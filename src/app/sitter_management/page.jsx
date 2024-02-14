"use client";
import React, { useState, useRef, useEffect } from "react";

import { CreateInput } from "thai-address-autocomplete-react";
import Image from "next/image";
import { Sidebar, TopBar } from "@/components/sidebar";
import { Select } from "chakra-react-select";
import { FormControl, FormLabel, Input, Textarea } from "@chakra-ui/react";
import supabase from "@/lib/utils/db";
import deleteButton from "@/asset/images/delete.svg";
import deleteButtonHover from "@/asset/images/deleteHover.svg";
import frameFray from "@/asset/images/photoFrameOutlineRounded.svg";
import upload from "@/asset/images/uploadMin10.svg";
import withAuth from "@/lib/utils/withAuth";
const InputThaiAddress = CreateInput();
import { useUser } from "@/hooks/hooks";
import previewImg from "@/asset/images/Frame427321094.svg";
const SitterManagement = () => {
  const [optionPetType, setOptionPetType] = useState([]);
  const { userId, user } = useUser();
  //profile
  const [fullName, setFullName] = useState("");
  const [experience, setExperience] = useState(null);
  const [isError, setIsError] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [introduction, setIntroduction] = useState("");
  //pet sitter
  const [tradeName, setTradeName] = useState("");
  //pettype ต้องดึงค่าจาก DB มาแสดง แล้วกด แล้วโชว์ใน textbox ด้วย
  const [petType, setPetType] = useState([]);
  const [services, setServices] = useState("");
  const [myPlace, setMyPlace] = useState("");
  const [logo, setLogo] = useState({});
  const [photo, setPhoto] = useState({});
  const [imageUrl, setImageUrl] = useState(previewImg);
  const [previewUrl, setPreviewUrl] = useState(previewImg);
  const [previewUrlPet, setPreviewUrlPet] = useState();
  const [petImage, setPetImage] = useState({});

  //address
  const [addressDetail, setAddressDetail] = useState("");
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [subDistrict, setSubDistrict] = useState("");
  const [postCode, setPostCode] = useState("");
  //bank account
  const [accountNumber, setAccountNumber] = useState("");
  const [accountName, setAccountName] = useState("");
  const [accountType, setAccountType] = useState("");
  const [bankName, setBankName] = useState("");
  const [etcs, setEtcs] = useState("");
  // isError

  //set horver
  const [imageHoverStates, setImageHoverStates] = useState({});
  const handleMouseEnter = (petImageKey) => {
    setImageHoverStates((prevState) => ({
      ...prevState,
      [petImageKey]: true,
    }));
  };

  const handleMouseLeave = (petImageKey) => {
    setImageHoverStates((prevState) => ({
      ...prevState,
      [petImageKey]: false,
    }));
  };

  //ระบบกรอกที่อยู่
  const [address, setAddress] = useState({
    district: "", // ตำบล tambol
    amphoe: "", // อำเภอ amphoe
    province: "", // จังหวัด changwat
    zipcode: "", // รหัสไปรษณีย์ postal code
  });

  const handleChange = (scope) => (value) => {
    setAddress((oldAddr) => ({
      ...oldAddr,
      [scope]: value,
    }));
  };
  const handleSelect = (address) => {
    setAddress(address);
    setProvince(address.province);
    setDistrict(address.amphoe);
    setSubDistrict(address.district);
    setPostCode(address.zipcode);
  };

  //fetch data
  useEffect(() => {
    // console.log(user);
    const fetchUserData = async () => {
      if (!userId) {
        console.error("userId is null");
        return;
      }
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("id", userId);

      if (error) {
        console.error("Error fetching user data:", error);
      } else {
        setFullName(data[0].full_name);
        setEmail(data[0].email);
        setPhoneNumber(data[0].phone_number);
        setImageUrl(data[0].image_url || previewImg);
      }
    };
    const fetchPetSitterData = async (optionPetType) => {
      if (!userId) {
        console.error("userId is null");
        return;
      }
      const { data, error } = await supabase
        .from("pet_sitter")
        .select("*")
        .eq("user_id", userId);
      console.log(data);
      if (error) {
        console.error("Error fetching user data:", error);
      } else {
        const petTypes = data[0].pet_type.split(",").map((petType) => {
          petType = petType.trim().toLowerCase();
          const option = optionPetType.find(
            (option) => option.value.toLowerCase() === petType
          );
          return option;
        });
        setPetType(petTypes);
      }

      if (data[0].experience !== null) {
        const existingExperienceOption = options.find(
          (option) => option.value == data[0].experience
        );
        setExperience(existingExperienceOption);
        // console.log("exp", existingExperienceOption);
      } else {
        setExperience(null);
      }
      setIntroduction(data[0].introduction);
      setAddressDetail(data[0].address_detail);
      setDistrict(data[0].district);
      setBankName(data[0].bank_name);
      setAccountNumber(data[0].bank_acc_number);
      setProvince(data[0].province);
      setPostCode(data[0].post_code);
      setTradeName(data[0].sitter_name);
      setServices(data[0].service);
      setMyPlace(data[0].place);
      setAccountName(data[0].account_name);
      setAccountType(data[0].account_type);
      setEtcs(data[0].etcs);
    };

    const fetchData = async () => {
      const optionPetType = await fetchPetTypes();
      if (!optionPetType) {
        console.error("fetchPetTypes returned undefined");
        return;
      }
      await fetchUserData();
      await fetchPetSitterData(optionPetType);
    };
    fetchData();
  }, [userId]);
  const handleUploadPhoto = (event) => {
    const file = event.target.files[0];
    if (!file) {
      console.error("No file selected");
      return;
    }

    const url = URL.createObjectURL(file);
    setPhoto({ [file.name]: file });
    setImageUrl(url);
  };
  const updatesUser = async () => {
    let imageUrl = null;

    // Upload photo
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
    const updatesData = {
      full_name: fullName,
      email: email,
      phone_number: phoneNumber,
      image_url: imageUrl,
      updated_at: new Date(),
    };
    const { error } = await supabase
      .from("users")
      .update(updatesData)
      .eq("id", userId);
    if (error) {
      console.error("Error updating user:", error);
    } else {
      console.log("User updated successfully");
    }
  };
  const updatesPetSitter = async () => {
    // console.log("inside function");
    // const { data: existingPetSitter, error: fetchError } = await supabase
    //   .from("pet_sitter")
    //   .select("bank_acc_number")
    //   .eq("bank_acc_number", accountNumber);
    // console.log("inside function after await");
    // if (fetchError) {
    //   console.log("Error fetching pet sitter:", fetchError);
    //   return;
    // }

    // if (existingPetSitter.length > 0) {
    //   console.log("A pet sitter with this bank account number already exists.");
    //   return;
    // }
    console.log("inside function");
    const updatesPetSitter = {
      introduction: introduction,
      address_detail: addressDetail,
      sub_district: subDistrict,
      district: district,
      bank_name: bankName,
      bank_acc_number: accountNumber,
      province: province,
      post_code: postCode,
      sitter_name: tradeName,
      service: services,
      place: myPlace,
      experience: parseFloat(experience),
      pet_type: petType ? petType.map((item) => item.value).join(", ") : null,
      account_name: accountName,
      account_type: accountType,
      etcs: etcs,
      updated_at: new Date(),
    };

    const { error } = await supabase
      .from("pet_sitter")
      .update(updatesPetSitter)
      .eq("user_id", userId);
    console.log("after await");
    if (error) {
      console.error("Error updating user:", error);
    } else {
      console.log("User updated successfully");
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log("summit push");
    try {
      console.log("before await");
      await updatesPetSitter();
      console.log("after await");
      alert("Update successfully");
    } catch (error) {
      alert("Update failed" + error.message);
    }
    // await updatesUser();
  };
  //upload petimage
  const handlePetImageChange = (event) => {
    const totalFiles = Object.keys(petImage).length + event.target.files.length;

    if (totalFiles > 10) {
      alert("You can only upload a maximum of 10 files");
      return;
    }

    // Process each file
    for (let i = 0; i < event.target.files.length; i++) {
      const file = event.target.files[i];

      if (file && file.size <= 10 * 1024 * 1024) {
        const uniqueId = Date.now() + i; // add 'i' to ensure unique id for each file
        setPetImage((prevPetImage) => ({ ...prevPetImage, [uniqueId]: file }));
      }
    }
  };

  const handleRemoveImage = (event, petImageKey) => {
    event.preventDefault();
    delete petImage[petImageKey];
    setPetImage({ ...petImage });
  };

  const handlePetType = (selectedOptions) => {
    console.log("Selected options:", selectedOptions);
    setPetType(selectedOptions);
  };

  // Read records pet_type_master
  async function fetchPetTypes() {
    let { data: pet_type_master, error } = await supabase
      .from("pet_type_master")
      .select("*");

    if (error) {
      console.error("Error reading records:", error);
      return;
    }

    const options = pet_type_master.map((item) => {
      return { value: item.name, label: item.name };
    });

    setOptionPetType(options);
    return options; // return the options array
  }

  const options = [
    { value: "0", label: "0" },
    { value: "1", label: "1" },
    { value: "1.5", label: "1.5" },
    { value: "2", label: "2" },
    { value: "2.5", label: "2.5" },
    { value: "3", label: "3" },
    { value: "3.5", label: "3.5" },
    { value: "4", label: "4" },
    { value: "4.5", label: "4.5" },
    { value: "5", label: "5++" },
  ];
  const handleExperience = (value) => {
    const selectedOption = options.find((option) => option.value === value);
    setExperience(selectedOption);
  };
  const selectedExperience = experience
    ? options.find((option) => option.value === experience)
    : null;
  return (
    <div className="flex bg-sixthGray justify-center">
      <div className="hidden bg-sixthGray lg:block relative">
        <Sidebar active={1} />
      </div>
      <div className="flex-1 min-w-[375px] mx-auto md:w-auto md:mx-3 bg-sixthGray max-w-[1200px] lg:ml-60">
        <TopBar />
        <div className="Title flex justify-between items-center py-3">
          <div className="nameTitle pl-5">Pet Sitter Profile</div>
          <div className="pr-5">
            <button
              className="bg-secondOrange rounded-3xl min-w-20 h-10 hidden md:block"
              onClick={handleFormSubmit}
            >
              Update
            </button>
          </div>
        </div>
        <div className="bg-white rounded-xl p-5 mb-5">
          <div className="pb-6">Basic Information</div>
          <div className="flex flex-col gap-2 mt-2 w-80">
            <label htmlFor="profile">
              {imageUrl && (
                <div className="photo">
                  <Image
                    className="block md:hidden lg:hidden cursor-pointer rounded-full w-[150px] h-[150px]"
                    src={imageUrl}
                    width={150}
                    height={150}
                    alt="Preview"
                  />
                  <Image
                    className="hidden md:block lg:hidden cursor-pointer rounded-full w-[200px] h-[200px]"
                    src={imageUrl}
                    width={200}
                    height={200}
                    alt="Preview"
                  />
                  <Image
                    className="hidden md:hidden lg:block cursor-pointer rounded-full w-[220px] h-[220px]"
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
          <div className="md:flex md:gap-9 md:justify-between">
            <div className="fullname md:w-80 lg:w-[474px] xl:w-[560px]">
              <FormControl isRequired isInvalid={isError}>
                <FormLabel>Your full name</FormLabel>
                <Input
                  type="text"
                  minLength="6"
                  maxLength="60"
                  pattern="^[a-zA-Z\s]*$"
                  value={fullName}
                  onChange={(event) => {
                    setFullName(event.target.value);
                  }}
                />
              </FormControl>
            </div>
            <div className="Experience md:w-80 lg:w-[474px] xl:w-[560px]">
              <FormControl isRequired>
                <FormLabel>Experience</FormLabel>
                <select
                  name="experience"
                  id="experience"
                  value={experience ? experience.value : ""}
                  onChange={(e) => handleExperience(e.target.value)}
                  className="w-full h-10 px-3 py-2 border border-gray-300 rounded-lg "
                >
                  <option value="" disabled>
                    Select Experience
                  </option>
                  {options.map((option, index) => (
                    <option key={index} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </FormControl>
            </div>
          </div>
          <div className="md:flex md:gap-9 md:justify-between">
            <div className="phoneNumber md:w-80 lg:w-[474px] xl:w-[560px]">
              <FormControl isRequired>
                <FormLabel>Phone Number</FormLabel>
                <Input
                  type="tel"
                  maxLength={10}
                  value={
                    phoneNumber
                      ? phoneNumber
                          .replace(/\D/g, "")
                          .replace(
                            /^(\d{3,3})(\d{3,3})(\d{4,4}).*$/,
                            "$1 $2 $3"
                          )
                          .trim()
                      : ""
                  }
                  onChange={(event) => {
                    setPhoneNumber(event.target.value);
                  }}
                />
              </FormControl>
            </div>
            <div className="email md:w-80 lg:w-[474px] xl:w-[560px]">
              <FormControl isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                  }}
                />
              </FormControl>
            </div>
          </div>
          <div>
            <div className="Introduction">
              <FormControl isRequired>
                <FormLabel>
                  Introduction (Describe about yourself as pet sitter)
                </FormLabel>
                <Textarea
                  value={introduction}
                  onChange={(event) => {
                    setIntroduction(event.target.value);
                  }}
                />
              </FormControl>
            </div>
          </div>
        </div>
        <div className="petSitter p-5 bg-white rounded-xl mb-5">
          <p className="pb-6">Pet Sitter</p>
          <div className="md:flex md:gap-9 md:justify-between">
            <div className="TradeName md:w-80 lg:w-[474px] xl:w-[560px]">
              <FormControl isRequired>
                <FormLabel>Pet sitter name (Trade Name)</FormLabel>
                <Input
                  value={tradeName}
                  onChange={(event) => {
                    setTradeName(event.target.value);
                  }}
                />
              </FormControl>
            </div>
            <div className="petType md:w-80 lg:w-[474px] xl:w-[560px]">
              <FormControl isRequired>
                <FormLabel>Pet type</FormLabel>
                <Select
                  isMulti
                  name="petType"
                  id="petType"
                  options={optionPetType}
                  placeholder="Select type"
                  colorScheme="orange"
                  closeMenuOnSelect={false}
                  value={petType || []}
                  onChange={handlePetType}
                />
              </FormControl>
            </div>
          </div>
          <div className="md:flex md:gap-9 md:justify-between">
            <div className="services md:w-80 lg:w-[474px] xl:w-[560px]">
              <FormControl isRequired>
                <FormLabel>
                  Services (Describe all of your service for pet sitting)
                </FormLabel>
                <Input
                  value={services}
                  onChange={(event) => {
                    setServices(event.target.value);
                  }}
                />
              </FormControl>
            </div>

            <div className="myPlace md:w-80 md:pt-6 lg:w-[474px] lg:pt-0 xl:w-[560px]">
              <FormControl isRequired>
                <FormLabel>My Place (Describe you place)</FormLabel>
                <Input
                  value={myPlace}
                  onChange={(event) => {
                    setMyPlace(event.target.value);
                  }}
                />
              </FormControl>
            </div>
          </div>
          <div className=" pt-6">
            <p>Image Gallery (Maximum 10 images)</p>

            <div className="flex my-4 gap-4 flex-wrap items-center">
              {Object.keys(petImage).map((petImageKey) => {
                const file = petImage[petImageKey];
                const isHovered = imageHoverStates[petImageKey] || false;
                const imageSrc = isHovered ? deleteButtonHover : deleteButton;
                return (
                  <div
                    key={petImageKey}
                    className="relative flex justify-center"
                  >
                    <Image
                      src={imageSrc}
                      width={30}
                      height={30}
                      alt="deleteButton"
                      className="absolute right-0 top-0 cursor-pointer"
                      onClick={(event) => handleRemoveImage(event, petImageKey)}
                      onMouseEnter={() => handleMouseEnter(petImageKey)}
                      onMouseLeave={() => handleMouseLeave(petImageKey)}
                    />
                    <div className="bg-fifthGray rounded-lg w-[167px] h-[167px] flex justify-center items-center">
                      <Image
                        src={URL.createObjectURL(file)}
                        width={150}
                        height={150}
                        alt={file.name}
                      />
                    </div>
                  </div>
                );
              })}

              <div className="flex relative mb-4 justify-center">
                <label htmlFor="imagespet">
                  {upload && (
                    <Image
                      className="cursor-pointer pt-4"
                      src={upload}
                      width={150}
                      height={150}
                      alt="Frame427321094"
                    />
                  )}
                  <input
                    type="file"
                    id="imagespet"
                    name="imagespet"
                    accept="image/*"
                    onChange={handlePetImageChange}
                    className="sr-only"
                    multiple
                    max="10"
                  />
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-5 mb-5">
          <p className="pb-6">Address</p>
          <div>
            <FormControl isRequired>
              <FormLabel>Address detail</FormLabel>
              <Input
                value={addressDetail}
                onChange={(event) => {
                  setAddressDetail(event.target.value);
                }}
              />
            </FormControl>
          </div>
          <div className="md:flex md:gap-9 md:justify-between">
            <FormControl isRequired>
              <FormLabel>Province</FormLabel>
              <InputThaiAddress.Province
                value={address["province"]}
                onChange={handleChange("province")}
                onSelect={handleSelect}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>District</FormLabel>
              <InputThaiAddress.Amphoe
                value={address["amphoe"]}
                onChange={handleChange("amphoe")}
                onSelect={handleSelect}
              />
            </FormControl>
          </div>
          <div className="md:flex md:gap-9 md:justify-between">
            <FormControl isRequired>
              <FormLabel>Sub-district</FormLabel>
              <InputThaiAddress.District
                value={address["district"]}
                onChange={handleChange("district")}
                onSelect={handleSelect}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Post code</FormLabel>
              <InputThaiAddress.Zipcode
                value={address["zipcode"]}
                onChange={handleChange("zipcode")}
                onSelect={handleSelect}
              />
            </FormControl>
          </div>
        </div>
        {/* //bank account  */}
        <div className="bg-white rounded-xl p-5 mb-5">
          <p className="pb-6">Bank</p>
          <div>
            <FormControl isRequired>
              <FormLabel>Account Number</FormLabel>
              <Input
                value={accountNumber}
                onChange={(event) => {
                  setAccountNumber(event.target.value);
                }}
              />
            </FormControl>
          </div>
          <div className="md:flex md:gap-9 md:justify-between">
            <FormControl isRequired>
              <FormLabel>Account Name</FormLabel>
              <Input
                value={accountName}
                onChange={(event) => {
                  setAccountName(event.target.value);
                }}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Bank Name</FormLabel>
              <Input
                value={bankName}
                onChange={(event) => {
                  setBankName(event.target.value);
                }}
              />
            </FormControl>
          </div>
          <div className="md:flex md:gap-9 md:justify-between">
            <FormControl isRequired>
              <FormLabel>Account Type</FormLabel>
              <Input
                value={accountType}
                onChange={(event) => {
                  setAccountType(event.target.value);
                }}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Etc.</FormLabel>
              <Input
                value={etcs}
                onChange={(event) => {
                  setEtcs(event.target.value);
                }}
              />
            </FormControl>
          </div>
        </div>
        <div className="flex justify-center pb-7 md:hidden">
          <button
            onClick={handleFormSubmit}
            className="bg-secondOrange rounded-3xl w-80 h-10"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default withAuth(SitterManagement);
