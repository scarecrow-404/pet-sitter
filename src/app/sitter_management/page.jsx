"use client";
import React, { useState, useRef } from "react";
import { CreateInput } from "thai-address-autocomplete-react";
import Image from "next/image";
import { Sidebar, TopBar } from "@/components/sidebar";
import {
  AsyncCreatableSelect,
  AsyncSelect,
  CreatableSelect,
  Select,
} from "chakra-react-select";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Icon,
  Form,
  Input,
  Textarea,
  NumberInput,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  IconButton,
  Avatar,
} from "@chakra-ui/react";

import Frame427321094 from "@/asset/images/Frame427321094.svg";
import deleteButton from "@/asset/images/delete.svg";
import deleteButtonHover from "@/asset/images/deleteHover.svg";
import frameFray from "@/asset/images/photoFrameOutlineRounded.svg";
import upload from "@/asset/images/uploadMin10.svg";

const InputThaiAddress = CreateInput();
const SitterManagement = () => {
  //profile
  const [fullName, setFullName] = useState("");
  const [experience, setExperience] = useState("");
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
  const [previewUrl, setPreviewUrl] = useState(Frame427321094);
  const [previewUrlPet, setPreviewUrlPet] = useState();
  const [petImage, setPetImage] = useState({});
  const inputRefLogo = useRef(null);
  const inputRefPetImage = useRef(null);
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

  //upload logo
  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (Object.keys(logo).length > 1) {
      alert("Can't upload more than 1 image");
      return;
    }

    if (file && file.size <= 10 * 1024 * 1024) {
      const uniqueId = Date.now();
      setLogo({
        [uniqueId]: file,
      });

      const reader = new FileReader();
      reader.onload = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  //upload petimage
  const handlePetImageChange = (event) => {
    const file = event.target.files[0];

    if (Object.keys(petImage).length >= 10) {
      alert("Can't upload more than 10 images");
      return;
    }

    if (file && file.size <= 10 * 1024 * 1024) {
      const uniqueId = Date.now();
      setPetImage({ ...petImage, [uniqueId]: file });
    }
  };
  //click logo
  const handleClickImage = () => {
    inputRefLogo.current.click();
  };
  //click pet
  const handleClickImagePet = () => {
    inputRefPetImage.current.click();
  };
  const handleFormSubmit = (event) => {
    event.preventDefault();
    // TODO: Perform the upload logic here
  };

  const handleRemoveImage = (event, petImageKey) => {
    event.preventDefault();
    delete petImage[petImageKey];
    setPetImage({ ...petImage });
  };
  const handleExperience = (experience) => {
    setExperience(experience);
  };
  const handlePetType = (petType) => {
    setPetType(petType);
  };
  const optionPetType = [
    { value: "Dog", label: "Dog" },
    { value: "Cat", label: "Cat" },
    { value: "Bird", label: "Bird" },
    { value: "Rabbit", label: "Rabbit" },
  ];

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
            <button className="bg-secondOrange rounded-3xl min-w-20 h-10 hidden md:block">
              Update
            </button>
          </div>
        </div>
        <div className="bg-white rounded-xl p-5 mb-5">
          <div className="pb-6">Basic Information</div>
          <div className="flex flex-col gap-2 mt-2">
            <FormLabel>Profile Image</FormLabel>
            {previewUrl && (
              <div className="mb-6">
                <Avatar
                  src={previewUrl}
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
              onChange={handleImageChange}
              ref={inputRefLogo}
              hidden
            />
          </div>
          <div className="md:flex md:gap-9 md:justify-between">
            <div className="fullname md:w-80 lg:w-[474px] xl:w-[560px]">
              <FormControl isRequired>
                <FormLabel>Your full name</FormLabel>
                <Input
                  type="text"
                  minLength="6"
                  maxLength="60"
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
                <Select
                  name="experience"
                  options={options}
                  placeholder="Select Experience"
                  closeMenuOnSelect={true}
                  value={experience}
                  onChange={handleExperience}
                  id="experience"
                />
              </FormControl>
            </div>
          </div>
          <div className="md:flex md:gap-9 md:justify-between">
            <div className="phoneNumber md:w-80 lg:w-[474px] xl:w-[560px]">
              <FormControl isRequired>
                <FormLabel>Phone Number</FormLabel>
                <Input
                  type="tel"
                  minLength={1}
                  maxLength={12}
                  inputMode="numeric"
                  pattern="\d*"
                  value={phoneNumber}
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
                  value={petType}
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
                <Image
                  type="file"
                  accept="image/*"
                  src={upload}
                  width={150}
                  height={150}
                  alt="Frame427321094"
                  className="pt-4"
                  onClick={handleClickImagePet}
                />
                <input
                  type="file"
                  id="profile"
                  name="profile"
                  accept="image/*"
                  onChange={handlePetImageChange}
                  ref={inputRefPetImage}
                  hidden
                />
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
          <button className="bg-secondOrange rounded-3xl w-80 h-10">
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default SitterManagement;
