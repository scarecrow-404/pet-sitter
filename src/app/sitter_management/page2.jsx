"use client";
import React, { useState, useCallback, useEffect } from "react";
import { CreateInput } from "thai-address-autocomplete-react";
import Image from "next/image";
import Sidebar from "@/app/sitter_management/page";
// import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import {
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
} from "@chakra-ui/react";
import { Select, CreatableSelect, AsyncSelect } from "chakra-react-select";
import { HamburgerIcon } from "@chakra-ui/icons";
import Frame427321094 from "@/asset/images/Frame427321094.svg";
import deleteButton from "@/asset/images/delete.svg";
import deleteButtonHover from "@/asset/images/deleteHover.svg";
import frameFray from "@/asset/images/photoFrameOutlineRounded.svg";
import upload from "@/asset/images/uploadMin10.svg";
import uploadGray from "@/asset/images/uploadMin10Gray.svg";
import profile from "@/asset/images/Frame427321006.svg";
import { flightRouterStateSchema } from "next/dist/server/app-render/types";
const InputThaiAddress = CreateInput();
const SitterManagement = () => {
  //superbase
  // const supabase = createClientComponentClient();
  // const [loading, setLoading] = useState(true);
  // const getSitter = useCallback(async () => {
  //   try {
  //     setLoading(true);

  //     const { data, error, status } = await supabase
  //       .from("pet_sitter")
  //       .insert([{ some_column: "someValue", other_column: "otherValue" }])
  //       .select();
  //     if (error && status !== 406) {
  //       throw error;
  //     }
  //   } catch (error) {}
  // });

  //เปลี่ยนสี ปุ่ม delete v2
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const handleMouseEnterDelete = (event, index) => {
    setHoveredIndex(index);
  };

  const handleMouseLeaveDelete = () => {
    setHoveredIndex(null);
  };
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

  //address
  const [addressDetail, setAddressDetail] = useState("");
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [subDistrict, setSubDistrict] = useState("");
  const [postCode, setPostCode] = useState("");

  const [isMoreThanTen, setIsMoreThanTen] = useState(false);
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
  const handleSelect = (address, event) => {
    setAddress(address);
    setProvince(address.province);
    setDistrict(address.amphoe);
    setSubDistrict(address.district);
    setPostCode(address.zipcode);
  };

  //upload logo
  const handleImageChange = (event) => {
    event.preventDefault();
    const file = event.target.files[0];

    if (Object.keys(logo).length > 1) {
      alert("Can't upload more than 1 image");
      return true;
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
  const handlePetImageChange = async (event) => {
    event.preventDefault();
    const file = event.target.files[0];

    if (Object.keys(petImage).length + 1 > 10) {
      setIsMoreThanTen(true);
      return true;
    }
    console.log(Object.keys(petImage).length);
    if (file && file.size <= 20 * 1024 * 1024) {
      const uniqueId = Date.now();
      setPetImage({ ...petImage, [uniqueId]: file });
    }
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    // TODO: Perform the upload logic here
  };

  const handleRemoveImage = (event, petImageKey) => {
    event.preventDefault();
    if (Object.keys(logo).length < 9) {
      setIsMoreThanTen(false);
    }

    delete petImage[petImageKey];
    setPetImage({ ...petImage });
  };
  //
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
    <div className="flex bg-sixthGray mx-auto max-w-[1440px]">
      <div className="hidden lg:block bg-sixthGray lg:fixed ">
        <Sidebar />
      </div>
      <div className="min-w-[375px] mx-auto md:w-auto md:mx-3 bg-sixthGray max-w-[1200px] lg:ml-60">
        <div className="headBar flex items-center gap-5 p-5 bg-white justify-between">
          <div className="flex flex-col items-center md:flex-row md:gap-5">
            <Image src={profile} width={40} height={40} alt="profile" />
            <p>Jane Maison</p>
          </div>
          <div className="lg:hidden">
            <Menu>
              <MenuButton
                as={IconButton}
                aria-label="Options"
                icon={<HamburgerIcon />}
                variant="outline"
              />
              <MenuList>
                <MenuItem>Pet Sitter Profile</MenuItem>
                <MenuItem>Booking List</MenuItem>
                <MenuItem>Payout Option</MenuItem>
                <MenuItem>Log Out</MenuItem>
              </MenuList>
            </Menu>
          </div>
        </div>
        <div className="Title flex justify-between items-center py-3">
          <div className="nameTitle pl-5">Pet Sitter Profile</div>
          <div className="pr-5">
            <button className="bg-secondOrange rounded-3xl min-w-20 h-10 hidden md:block">
              Update
            </button>
          </div>
        </div>
        <div className="bg-white rounded-xl p-5 mb-5">
          <div>Basic Information</div>
          <div className="flex flex-col gap-2 mt-2 w-60">
            <label htmlFor="profile">
              <FormLabel>Profile Image</FormLabel>
              {previewUrl && (
                <div className="pic ">
                  <Image
                    className="block md:hidden lg:hidden cursor-pointer"
                    src={previewUrl}
                    width={100}
                    height={100}
                    alt="Preview"
                  />
                  <Image
                    className="hidden md:block lg:hidden cursor-pointer"
                    src={previewUrl}
                    width={167}
                    height={167}
                    alt="Preview"
                  />
                  <Image
                    className="hidden md:hidden lg:block cursor-pointer"
                    src={previewUrl}
                    width={240}
                    height={240}
                    alt="Preview"
                  />
                </div>
              )}

              <input
                type="file"
                id="profile"
                name="profile"
                accept="image/*"
                onChange={handleImageChange}
                className="sr-only"
              />
            </label>
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
                  isMulti
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
          <p>Pet Sitter</p>
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

            <div className="myPlace md:w-80 md:pt-6 lg:w-[474px] lg:pt-6 xl:w-[560px] xl:pt-0">
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
          <div>
            <p>Image Gallery (Maximum 10 images)</p>

            <div className="flex mb-4 gap-4 flex-wrap ">
              {Object.keys(petImage).map((petImageKey, index) => {
                const file = petImage[petImageKey];
                const isHovered =
                  hoveredIndex !== null && index === hoveredIndex;
                return (
                  <div key={petImageKey} className="relative">
                    <Image
                      onMouseEnter={(event) =>
                        handleMouseEnterDelete(event, index)
                      }
                      onMouseLeave={handleMouseLeaveDelete}
                      src={isHovered ? deleteButtonHover : deleteButton}
                      width={20}
                      height={20}
                      alt="deleteButton"
                      className="absolute left-32 pt-4 cursor-pointer"
                      onClick={(event) => handleRemoveImage(event, petImageKey)}
                    />
                    <Image
                      src={URL.createObjectURL(file)}
                      width={150}
                      height={150}
                      alt={file.name}
                      className="pt-4 object-cover w-[150px] h-[150px]"
                    />
                  </div>
                );
              })}

              <div className="flex relative mb-4 justify-center">
                {isMoreThanTen ? (
                  <label htmlFor="sitterImageGallery">
                    <Image
                      type="file"
                      accept="image/*"
                      src={uploadGray}
                      width={150}
                      height={150}
                      alt="Frame427321094"
                      className="pt-4 cursor-pointer"
                    />

                    <input
                      type="file"
                      id="sitterImageGallery"
                      name="sitterImageGallery"
                      accept="image/*"
                      onChange={handlePetImageChange}
                      className="sr-only"
                      disabled
                    />
                  </label>
                ) : (
                  <label htmlFor="sitterImageGallery">
                    <Image
                      type="file"
                      accept="image/*"
                      src={upload}
                      width={150}
                      height={150}
                      alt="Frame427321094"
                      className="pt-4 cursor-pointer"
                    />

                    <input
                      type="file"
                      id="sitterImageGallery"
                      name="sitterImageGallery"
                      accept="image/*"
                      onChange={handlePetImageChange}
                      className="sr-only"
                    />
                  </label>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-5 mb-5">
          <p>Address</p>
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
              <InputThaiAddress.District
                value={address["district"]}
                onChange={handleChange("district")}
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
              <InputThaiAddress.Province
                value={address["province"]}
                onChange={handleChange("province")}
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
