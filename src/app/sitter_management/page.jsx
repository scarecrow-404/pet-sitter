"use client";
import React, { useState, useRef, useEffect } from "react";

import { CreateInput } from "thai-address-autocomplete-react";
import Image from "next/image";
import { Sidebar, TopBar } from "@/components/Sidebar";
import { Select } from "chakra-react-select";
import {
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Avatar,
  FormErrorMessage,
  Spinner,
  useToast,
  Skeleton,
  Box,
  SkeletonCircle,
  SkeletonText,
} from "@chakra-ui/react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import supabase from "@/lib/utils/db";
import deleteButton from "@/asset/images/delete.svg";
import deleteButtonHover from "@/asset/images/deleteHover.svg";
import frameFray from "@/asset/images/photoFrameOutlineRounded.svg";
import upload from "@/asset/images/uploadMin10.svg";
import uploadDisable from "@/asset/images/uploadMin10disable.svg";
import withAuth from "@/lib/utils/withAuth";
const InputThaiAddress = CreateInput();
import { useUser } from "@/hooks/hooks";
import previewImg from "@/asset/images/Frame427321094.svg";
import { set } from "date-fns";
import MapPage from "@/components/MapPage";
const SitterManagement = () => {
  const [optionPetType, setOptionPetType] = useState([]);
  const { userId, user, setSitterId } = useUser();
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
  const [photoSitter, setPhotoSitter] = useState({});
  const [imageUrl, setImageUrl] = useState();
  const [imageUrlSitter, setImageUrlSitter] = useState();
  const [previewUrl, setPreviewUrl] = useState(previewImg);
  const [previewUrlPet, setPreviewUrlPet] = useState();
  const [petImage, setPetImage] = useState([]);
  const [oldPetImage, setOldPetImage] = useState([]);
  const [petSitterID, setPetSitterID] = useState("");
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
  //loading and toast start
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  //loading and toast end
  const [getMarkers, setGetMarkers] = useState([]);
  //validate start
  //email validate
  const [isValidEmail, setIsValidEmail] = useState(true);
  const handleEmailChange = (event) => {
    const enteredEmail = event.target.value;
    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(enteredEmail); // Basic email validation
    setIsValidEmail(isEmailValid);
    setEmail(enteredEmail);
  };
  //validate end
  //validate full name start
  const [isValidFullName, setIsValidFullName] = useState(true);
  const handleFullNameChange = (event) => {
    const enteredFullName = event.target.value;
    const isFullNameValid = enteredFullName.length <= 60; // Check if length is within 60 characters
    setIsValidFullName(isFullNameValid);
    if (isFullNameValid) {
      setFullName(enteredFullName);
    }
  };
  console.log(userId);
  //validate full name end

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
    setDistrict(address.district);
    setSubDistrict(address.amphoe);
    setPostCode(address.zipcode);
  };

  //fetch data
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await fetchUserData();
      const petSitterData = await fetchPetSitterData(); // Wait for petSitterData to be fetched
      if (petSitterData) {
        await fetchDataPetTypesPrefer(petSitterData.id); // Pass petSitterID to fetchDataPetTypesPrefer
      }
      fetchImageUrlData();
      fetchPetTypes();
      fetchMarkersFromSupabase();
      setLoading(false);
    };
    fetchData();
  }, [userId]);
  console.log("getMarkers typeof", typeof petSitterID);
  console.log("getMarkers 152", getMarkers);
  const fetchMarkersFromSupabase = async () => {
    try {
      console.log("getMarkers typeof 156", typeof petSitterID);
      const { data, error } = await supabase
        .from("markers")
        .select("*")
        .eq("user_id", userId);
      if (error) {
        throw error;
      }
      console.log("dddddddd", data);
      if (data && data.length > 0) {
        setGetMarkers(data);
      }
    } catch (error) {
      console.error("Error fetching markers from Supabase:", error.message);
    }
  };
  console.log("getMarkers 169", getMarkers);
  //fetch data start
  const fetchUserData = async () => {
    if (!userId) {
      console.error("User ID is null or user object is missing");
      return;
    }
    const { data, error } = await supabase
      .from("users")
      .select(`*,pet_sitter(image_url)`)
      .eq("id", userId);

    if (error) {
      toast({
        title: "Error",
        position: "top",
        description: `Error fetching user data: ${error.message}`,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    } else {
      
      setImageUrlSitter(data[0].pet_sitter[0].image_url)
      setFullName(data[0].full_name);
      setEmail(data[0].email);
      setPhoneNumber(data[0].phone_number);
      setImageUrl(data[0].image_url || previewImg);
    }
  };
  const fetchImageUrlData = async () => {
    if (!userId) {
      console.error("User is null or user object is missing");
      return;
    }

    const petSitterData = await fetchPetSitterData();

    if (!petSitterData || !petSitterData.id) {
      console.error("PetSitterData is null or missing id");
      return;
    }

    const petSitterID = parseInt(petSitterData.id);

    if (isNaN(petSitterID)) {
      console.error("Invalid PetSitterID");
      return;
    }

    const { data, error } = await supabase
      .from("gallery_sitter")
      .select("*")
      .eq("pet_sitter_id", petSitterID);
    console.log(data);
    if (error) {
      toast({
        title: "Error",
        position: "top",
        description: `Error fetching gellery sitter data: ${error.message}`,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    } else {
      // ตรวจสอบว่ามีข้อมูลใน data หรือไม่
      if (data && data.length > 0) {
        const ImageUrlData = data[0];
        setPetImage(ImageUrlData.image_url);
        setOldPetImage(ImageUrlData.image_url);
      } else {
        console.error("No data found in the column");
        // ทำอะไรก็ตามที่คุณต้องการทำเมื่อไม่พบข้อมูลในคอลัมน์
      }
    }
  };

  const fetchPetSitterData = async () => {
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
      toast({
        title: "Error",
        position: "top",
        description: `Error fetching pet_sitter data: ${error.message}`,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    } else if (data[0].experience !== null) {
      const existingExperienceOption = options.find(
        (option) => option.value == data[0].experience
      );
      console.log(data[0].experience);
      setExperience(existingExperienceOption);
      console.log("exp", existingExperienceOption);
    } else {
    }
    const petSitterData = data[0];
    setPetSitterID(petSitterData.id);
    setSitterId(petSitterData.id);
    setIntroduction(petSitterData.introduction);
    setAddressDetail(petSitterData.address_detail);
    setSubDistrict(petSitterData.sub_district);
    setDistrict(petSitterData.district);
    setBankName(petSitterData.bank_name);
    setAccountNumber(petSitterData.bank_acc_number);
    setProvince(petSitterData.province);
    setPostCode(petSitterData.post_code);
    setTradeName(petSitterData.sitter_name);
    setServices(petSitterData.service);
    setMyPlace(petSitterData.place);
    setAccountName(petSitterData.account_name);
    setAccountType(petSitterData.account_type);
    setEtcs(petSitterData.etcs);

    setAddress({
      district: petSitterData.district,
      amphoe: petSitterData.sub_district,
      province: petSitterData.province,
      zipcode: petSitterData.post_code,
    });
    console.log("petSitterData", petSitterData);
    return petSitterData;
  };
  console.log("petSitterID", petSitterID);
  const fetchDataPetTypesPrefer = async (petSitterID) => {
    if (!petSitterID) {
      console.error("petSitterID is undefined");
      return;
    }

    const { data, error } = await supabase
      .from("pet_prefer")
      .select("*")
      .eq("pet_sitter_id", petSitterID);
    if (error) {
      toast({
        title: "Error",
        position: "top",
        description: `Error fetching pet type prefer data: ${error.message}`,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    } else {
      const petTypeOptions = data.map((item) => {
        if (item.pet_type_master_id == "1") {
          return { value: item.pet_type_master_id, label: "Dog" };
        } else if (item.pet_type_master_id == "2") {
          return { value: item.pet_type_master_id, label: "Cat" };
        } else if (item.pet_type_master_id == "3") {
          return { value: item.pet_type_master_id, label: "Bird" };
        } else if (item.pet_type_master_id == "4") {
          return { value: item.pet_type_master_id, label: "Rabbit" };
        } else {
          null;
        }
      });
      setPetType(petTypeOptions);
    }
  };

  //upload Avatar
  const handleUploadPhoto = (event) => {
    console.log("hereeeeeeeeeeeeee1")
    const file = event.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      if (url) {
        const uniqueFileName = generateUniqueFileName(file.name);
        console.log("Generated unique filename:", uniqueFileName); // Log the generated filename
        setPhoto({ [uniqueFileName]: file });
        setImageUrl(url);
      }
    }
  };

  const handleUploadSitterPhoto = (event) => {
    console.log("hereeeeeeeeeeeeee")
    const file = event.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      if (url) {
        const uniqueFileName = generateUniqueFileName(file.name);
        console.log("Generated unique filename:", uniqueFileName); // Log the generated filename
        setPhotoSitter({ [uniqueFileName]: file });
        setImageUrlSitter(url);
      }
    }
  };




  // Function to generate a unique filename
  const generateUniqueFileName = (fileName) => {
    const timestamp = new Date().getTime(); // Get current timestamp
    const randomString = Math.random().toString(36).substring(7); // Generate random string
    const fileExtension = fileName.split(".").pop(); // Get file extension
    return `${timestamp}_${randomString}.${fileExtension}`;
  };

  const updatesAvatarSitter = async () => {
    let updatedImageUrl = imageUrl ?? "";
    if (Object.keys(photoSitter).length > 0) {
      const file = Object.values(photoSitter)[0];
      const filePath = `public/${userId}/${file.name}`;
      let { data, error: uploadError } = await supabase.storage
        .from("images")
        .upload(filePath, file);
      console.log(data);
      if (uploadError) {
        toast({
          title: "Error",
          position: "top",
          description: `Error uploading photo: ${uploadError.message}`,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
        return;
      }

      // Get URL of uploaded photo
      let url = supabase.storage.from("images").getPublicUrl(data.path);
      console.log(url.data.publicUrl);
      if (!url.data.publicUrl) {
        toast({
          title: "Error",
          position: "top",
          description: `Error getting photo URL: File does not exist or bucket is not public: ${url.data.publicUrl}`,
          status: "error",
          duration: 9000,
          isClosable: true,
        });

        return;
      }

      updatedImageUrl = url.data.publicUrl;
    }
    const updatesData = {
      image_url: updatedImageUrl,
      updated_at: new Date(),
    };
    const { error } = await supabase
      .from("pet_sitter")
      .update(updatesData)
      .eq("user_id", userId);
    if (error) {
      console.error("Error updating sitter:", error);
    } else {
      console.log("Sitter updated successfully");
    }
  };




  const updatesAvatarUser = async () => {
    let updatedImageUrl = imageUrl ?? "";
    if (Object.keys(photo).length > 0) {
      const file = Object.values(photo)[0];
      const filePath = `public/${userId}/${file.name}`;
      let { data, error: uploadError } = await supabase.storage
        .from("images")
        .upload(filePath, file);
      console.log(data);
      if (uploadError) {
        toast({
          title: "Error",
          position: "top",
          description: `Error uploading photo: ${uploadError.message}`,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
        return;
      }

      // Get URL of uploaded photo
      let url = supabase.storage.from("images").getPublicUrl(data.path);
      console.log(url.data.publicUrl);
      if (!url.data.publicUrl) {
        toast({
          title: "Error",
          position: "top",
          description: `Error getting photo URL: File does not exist or bucket is not public: ${url.data.publicUrl}`,
          status: "error",
          duration: 9000,
          isClosable: true,
        });

        return;
      }

      updatedImageUrl = url.data.publicUrl;
    }
    const updatesData = {
      full_name: fullName,
      email: email,
      phone_number: phoneNumber,
      image_url: updatedImageUrl,
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
  console.log(experience);
  console.log(typeof experience);
  //update pet sitter
  const updatesPetSitter = async () => {
    try {
      console.log("inside function");
      let valueExperience;
      if (typeof experience === "string") {
        valueExperience = parseFloat(experience);
      } else {
        let dataExperience = JSON.parse(experience);
        valueExperience = parseFloat(dataExperience.value);
      }
      console.log("valueExperience", valueExperience);
      const updataPetSitterData = {
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
        experience: valueExperience,
        account_name: accountName,
        account_type: accountType,
        etcs: etcs,
        updated_at: new Date(),
      };
      console.log("updatesPets", updataPetSitterData);
      console.log("userId 425", userId);
      const { data, error } = await supabase
        .from("pet_sitter")
        .update(updataPetSitterData)
        .eq("user_id", userId);
      if (error) {
        console.error("Error updating user:", error);
      }
      console.log("after await");
      console.log(`User updated successfully ${data}`);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };
  //update petsitter end

  //update pet type start
  const dataPetType = async () => {
    // เตรียมข้อมูลใหม่ที่ต้องการ upsert หรือเพิ่มเข้าไปในฐานข้อมูล
    const newPetTypes = petType.map((item) => ({
      pet_sitter_id: petSitterID,
      pet_type_master_id: item.value,
    }));

    // ดึงข้อมูลเก่าที่มีอยู่ในฐานข้อมูล
    const { data: existingPetTypes, error } = await supabase
      .from("pet_prefer")
      .select("pet_type_master_id")
      .eq("pet_sitter_id", petSitterID);

    if (error) {
      console.error("Error fetching existing pet types:", error);
      return;
    }

    // สร้างเซ็ตของ pet type ids ที่มีอยู่ในฐานข้อมูลเก่า
    const existingPetTypeIds = new Set(
      existingPetTypes.map((item) => item.pet_type_master_id)
    );

    // กรองข้อมูลใหม่เพื่อเลือกเฉพาะข้อมูลที่ต้องการ upsert หรือเพิ่มเข้าไป
    const newDataForUpsert = newPetTypes.filter((item) => {
      return !existingPetTypeIds.has(item.pet_type_master_id);
    });

    // ทำการ upsert ข้อมูลใหม่หรือเพิ่มข้อมูลใหม่เข้าไปในฐานข้อมูล
    const { error: upsertError } = await supabase
      .from("pet_prefer")
      .upsert(newDataForUpsert)
      .eq("pet_sitter_id", petSitterID);

    if (upsertError) {
      console.error("Error upserting pet types:", upsertError);
      return;
    }

    console.log("Pet types upserted successfully");

    // ลบข้อมูลที่ไม่มีในข้อมูลใหม่
    const dataToDelete = existingPetTypes.filter((item) => {
      return !newPetTypes.some(
        (newItem) => newItem.pet_type_master_id === item.pet_type_master_id
      );
    });

    // ทำการลบข้อมูลที่ไม่มีในข้อมูลใหม่ออกจากฐานข้อมูล
    if (dataToDelete.length > 0) {
      const { error: deleteError } = await supabase
        .from("pet_prefer")
        .delete()
        .in(
          "pet_type_master_id",
          dataToDelete.map((item) => item.pet_type_master_id)
        )
        .eq("pet_sitter_id", petSitterID);

      if (deleteError) {
        console.error("Error deleting old pet types:", deleteError);
        return;
      }

      console.log("Old pet types deleted successfully");
    }
  };

  const handleFormSubmit = async (event) => {
    // event.preventDefault();
    console.log("submit push");

    setLoading(true); // Show spinner

    try {
      console.log("start updatepetSitter");
      await updatesPetSitter();
      console.log("end updatepetSitter");
      console.log("start dataPetType");
      await dataPetType();
      console.log("end dataPetType");
      console.log("start UpdatesAvatarUser");
      await updatesAvatarSitter();
      console.log("end UpdatesAvatarsitter");
      console.log("start uploadAvatarUser");
      await updatesAvatarUser();
      console.log("end UpdatesAvatarUser");
      console.log("start uploadPetImages");
      await uploadPetImages();
      console.log("end uploadPetImages");
      console.log("after await");
      toast({
        title: "Success",
        position: "top",
        description: `Update successfully`,
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "error",
        position: "top",
        description: `Update failed ${error.message}  ${error}`,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    } finally {
      setLoading(false); // Hide spinner
    }
  };

  //upload petimage
  const fileNames = (i) => {
    const item = oldPetImage[i] + "";
    const publicIndex = item.split("/").findIndex((el) => el === "public");
    const data = item
      .split("/")
      .filter((el, i) => {
        if (i > publicIndex + 1) {
          return el;
        }
      })
      .join("/");
    return data;
  };

  const uploadPetImages = async () => {
    if (!petImage || typeof petImage !== "object") {
      console.error("Invalid petImage:", petImage);
      return;
    }

    const uploadedImageUrls = [];

    for (const key of Object.keys(petImage)) {
      const file = petImage[key];

      if (typeof file === "object") {
        try {
          // Remove old image if exists
          if (oldPetImage[key]) {
            await supabase.storage.from("images").remove([fileNames(key)]);
          }

          // Upload new image
          const { data, error: uploadError } = await supabase.storage
            .from("images")
            .upload(`public/${userId}/petsitter/${file.name}`, file, {
              cacheControl: "3600",
              upsert: true,
            });

          if (uploadError) {
            throw uploadError;
          }

          const url = supabase.storage.from("images").getPublicUrl(data.path);
          uploadedImageUrls.push(url.data.publicUrl);
        } catch (error) {
          console.error("Error uploading image:", error.message);
          // Handle error gracefully
        }
      } else {
        uploadedImageUrls.push(file);
      }
      console.log("uploadedImageUrls", uploadedImageUrls);
      console.log("petSitterID", petSitterID);
    }

    try {
      // Update data in Supabase database
      const { error } = await supabase
        .from("gallery_sitter")
        .upsert(
          { image_url: uploadedImageUrls, pet_sitter_id: petSitterID },
          { onConflict: "pet_sitter_id" }
        )
        .select();

      if (error) {
        throw error;
      }
      console.log("User updated successfully");
    } catch (error) {
      console.error("Error updating user:", error.message);
      // Handle error gracefully
    }
  };

  const handlePetImageChange = (event) => {
    const totalFiles = Object.keys(petImage).length + event.target.files.length;

    if (totalFiles > 10) {
      alert("You can only upload a maximum of 10 files");
      return;
    }

    for (let i = 0; i < event.target.files.length; i++) {
      const file = event.target.files[i];

      if (file && file.size <= 10 * 1024 * 1024) {
        const uniqueId = Date.now() + i;
        setPetImage((prevPetImage) => ({ ...prevPetImage, [uniqueId]: file }));
      }
    }
  };

  const handleRemoveImage = (petImageKey) => {
    const updatedPetImage = { ...petImage };
    delete updatedPetImage[petImageKey];
    setPetImage(updatedPetImage);
  };
  console.log("petImage", petImage);

  const renderPetImages = () => {
    if (!petImage) {
      return null;
    }

    const totalImages = Object.keys(petImage).length;
    const maxRenderedImages = Math.min(totalImages, 10); // Ensure we render no more than 10 images
    const imagesToRender = Object.keys(petImage).slice(0, maxRenderedImages); // Get up to 10 images from petImage

    return imagesToRender.map((petImageKey) => {
      let src;
      if (petImage[petImageKey] instanceof Blob) {
        src = URL.createObjectURL(petImage[petImageKey]);
      } else {
        src = petImage[petImageKey];
      }

      return (
        <div key={petImageKey} className="relative flex flex-row">
          <div className="bg-fifthGray rounded-lg w-[167px] h-[167px] flex justify-center items-center">
            <img src={src} alt={`Pet ${petImageKey}`} />
          </div>
          <button
            className="absolute text-sm right-1 top-1 cursor-pointer bg-secondOrange p-1 rounded-full hover:bg-fifthOrange hover:text-white w-6 h-6"
            onClick={() => handleRemoveImage(petImageKey)}
          >
            X
          </button>
        </div>
      );
    });
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
      return { value: item.id, label: item.name };
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
    setExperience(selectedOption.value);
    console.log(selectedOption.value);
  };

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
        {/* //Skeleton */}
        {loading ? (
          <Box padding="6" boxShadow="lg" bg="white">
            <SkeletonCircle size="10" />
            <SkeletonText
              mt="10"
              noOfLines={15}
              spacing="4"
              skeletonHeight="2"
            />
          </Box>
        ) : (
          <div className="bg-white rounded-xl p-5 mb-5">
            <div className="pb-6 font-bold">Basic Information</div>
            <div className="flex flex-col gap-2 mt-2 w-80">
              <label htmlFor="profile">
                {imageUrl && (
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
            <div className=" md:items-end md:flex md:gap-9 md:justify-between">
              <div className="fullname mt-5 md:w-80 lg:w-[474px] xl:w-[560px]">
                <FormControl isRequired isInvalid={isError}>
                  <FormLabel>Your full name</FormLabel>
                  <Input
                    type="text"
                    minLength="6"
                    maxLength="61"
                    pattern="^[a-zA-Z\s]*$"
                    value={fullName}
                    onChange={handleFullNameChange}
                  />
                  {!isValidFullName && (
                    <p className="text-red-600">
                      Full name cannot exceed 60 characters.
                    </p>
                  )}
                </FormControl>
              </div>
              <div className="Experience  md:w-80 lg:w-[474px] xl:w-[560px]">
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
              <div className="email md:w-80 lg:w-[474px] xl:w-[560px] ">
                <FormControl isRequired>
                  <FormLabel>Email</FormLabel>
                  <Input
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                  />
                  {!isValidEmail && (
                    <p className=" text-red-600">
                      The email format is incorrect.
                    </p>
                  )}
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
        )}
        {loading ? (
          <Box padding="6" boxShadow="lg" bg="white">
            <SkeletonCircle size="10" />
            <SkeletonText
              mt="10"
              noOfLines={15}
              spacing="4"
              skeletonHeight="2"
            />
          </Box>
        ) : (
          <div className="petSitter p-5 bg-white rounded-xl mb-5">
            <p className="pb-6 font-bold">Pet Sitter</p>
             
            <div className="flex flex-col gap-2 mt-2 w-80">
            <p className=" pb-5">Pet Sitter Profile</p>
              <label htmlFor="profilesitter">
                {imageUrl && (
                  <div className="photo">
                    <Avatar
                      className="cursor-pointer"
                      src={imageUrlSitter}
                      width={200}
                      height={200}
                      alt="Preview"
                    />
                  </div>
                )}
                <input
                  type="file"
                  id="profilesitter"
                  name="profilesitter"
                  accept="image/*"
                  onChange={handleUploadSitterPhoto}
                  className="sr-only"
                />
              </label>
            </div>

            <div className="md:flex md:gap-9 md:justify-between pt-5  ">
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
                  <Textarea
                    rows={10}
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
                  {/* <Input
                    value={myPlace}
                    onChange={(event) => {
                      setMyPlace(event.target.value);
                    }}
                  /> */}
                  <MapPage
                    petSitterId={petSitterID}
                    getMarkers={getMarkers}
                    setGetMarkers={setGetMarkers}
                    user_id={userId}
                  />
                </FormControl>
                {/* <MapContainer
                center={position}
                zoom={10}
                markers={markers}
                onClick={handleMapClick}
              /> */}
              </div>
            </div>
            <div className="pt-6">
              <p>Image Gallery (Maximum 10 images)</p>
              <div className="flex flex-row my-4 gap-4 flex-wrap justify-center items-center">
                <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-5">
                  {renderPetImages()}
                  <label htmlFor="imagespet">
                    {petImage && Object.keys(petImage).length > 9 ? (
                      <>
                        <Image
                          className="pt-4 flex justify-center items-center cursor-not-allowed"
                          src={uploadDisable}
                          width={150}
                          height={150}
                          alt="Frame427321094"
                        />
                        <input
                          disabled
                          type="file"
                          id="imagespet"
                          name="imagespet"
                          accept="image/*"
                          onChange={handlePetImageChange}
                          className="sr-only"
                          multiple
                          max="10"
                        />
                      </>
                    ) : (
                      <>
                        <Image
                          className="cursor-pointer"
                          src={upload}
                          width={150}
                          height={150}
                          alt="Frame427321094"
                        />
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
                      </>
                    )}
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}
        {loading ? (
          <Box padding="6" boxShadow="lg" bg="white">
            <SkeletonCircle size="10" />
            <SkeletonText
              mt="10"
              noOfLines={15}
              spacing="4"
              skeletonHeight="2"
            />
          </Box>
        ) : (
          <div className="Address p-5 bg-white rounded-xl mb-5">
            <div className="bg-white rounded-xl p-5 mb-5">
              <p className="pb-6 font-bold">Address</p>
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
          </div>
        )}
        {loading ? (
          <Box padding="6" boxShadow="lg" bg="white">
            <SkeletonCircle size="10" />
            <SkeletonText
              mt="10"
              noOfLines={15}
              spacing="4"
              skeletonHeight="2"
            />
          </Box>
        ) : (
          <div className="bank account p-5 bg-white rounded-xl mb-5">
            <div className="bg-white rounded-xl p-5 mb-5">
              <p className="pb-6 font-bold">Bank</p>
              <div>
                <FormControl isRequired>
                  <FormLabel>Account Number</FormLabel>
                  <Input
                    type="tel"
                    maxLength={13}
                    value={
                      accountNumber
                        ? accountNumber
                            .replace(/\D/g, "")
                            .replace(
                              /^(\d{3,3})(\d{3,3})(\d{4,4})(\d{3,3}).*$/,
                              "$1 $2 $3 $4"
                            )
                            .trim()
                        : ""
                    }
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
            <div className="flex justify-center pb-7">
              <button
                onClick={handleFormSubmit}
                className="bg-secondOrange rounded-3xl w-80 h-10"
              >
                Update
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default withAuth(SitterManagement);
