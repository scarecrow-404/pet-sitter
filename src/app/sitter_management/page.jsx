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
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import supabase from "@/lib/utils/db";
import upload from "@/asset/images/uploadMin10.svg";
import uploadDisable from "@/asset/images/uploadMin10disable.svg";
import withAuth from "@/lib/utils/withAuth";
const InputThaiAddress = CreateInput();
import { useUser } from "@/hooks/hooks";
import previewImg from "@/asset/images/Frame427321094.svg";
import MapPage from "@/components/MapPage";
import iconX from "@/asset/images/iconXwhite.svg";
import { set } from "date-fns";
import { ro } from "date-fns/locale";
import { useRouter, usePathname } from "next/navigation";
const SitterManagement = () => {
  const router = useRouter();
  const [optionPetType, setOptionPetType] = useState([]);
  const { userId, user, setSitterId } = useUser();
  //profile
  const [fullName, setFullName] = useState("");
  const [experience, setExperience] = useState("");
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
  const [imageUrlSitter, setImageUrlSitter] = useState(upload);
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
  // error message
  const [errorFullName, setErrorFullName] = useState("");
  const [errorPhoneNumber, setErrorPhoneNumber] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorTradeName, setErrorTradeName] = useState("");
  const [errorIntroduction, setErrorIntroduction] = useState("");
  const [errorServices, setErrorServices] = useState("");
  const [errorAddressDetail, setErrorAddressDetail] = useState("");
  const [errorAccountNumber, setErrorAccountNumber] = useState("");
  const [errorAccountName, setErrorAccountName] = useState("");
  const [errorAccountType, setErrorAccountType] = useState("");
  const [errorBankName, setErrorBankName] = useState("");
  //loading and toast start
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const [userDataLoaded, setUserDataLoaded] = useState(false);
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
  //modal check user

  //fetch data

  useEffect(() => {
    let isMounted = true;

    const fetchDataAsync = async () => {
      try {
        if (!user) {
          throw new Error("User data not available");
        }
        if (user?.user_type === "sitter") {
          await Promise.all([fetchData()]);
        } else {
          toast({
            title: "Error",
            position: "top",
            description: `Access denied: You are not a pet sitter`,
            status: "error",
            duration: 3000,
            isClosable: true,
          });
          setTimeout(() => {
            router.push("/login");
          }, 0);
        }
      } catch (error) {}
    };

    const fetchUser = async () => {
      try {
        await user;
      } catch (error) {}
    };

    fetchUser().then(() => {
      if (isMounted) {
        fetchDataAsync();
      }
    });

    return () => {
      isMounted = false;
    };
  }, [user]);

  const fetchData = async () => {
    setLoading(true);
    await fetchUserData();
    const petSitterData = await fetchPetSitterData(); // Wait for petSitterData to be fetched
    if (petSitterData) {
      await fetchDataPetTypesPrefer(petSitterData.id); // Pass petSitterID to fetchDataPetTypesPrefer
    }
    await fetchImageUrlData();
    await fetchPetTypes();
    await fetchMarkersFromSupabase();
    setLoading(false);
  };

  const fetchMarkersFromSupabase = async () => {
    try {
      const { data, error } = await supabase
        .from("markers")
        .select("*")
        .eq("user_id", userId);
      if (error) {
        throw error;
      }

      if (data && data.length > 0) {
        setGetMarkers(data);
      }
    } catch (error) {}
  };

  //fetch data start
  const fetchUserData = async () => {
    if (!userId) {
      return;
    }
    const { data, error } = await supabase
      .from("users")
      .select(`*`)
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
      setFullName(data[0].full_name);
      setEmail(data[0].email);
      setPhoneNumber(data[0].phone_number);
      setImageUrl(data[0].image_url || previewImg);
    }
  };
  const fetchImageUrlData = async () => {
    if (!userId) {
      return;
    }

    const petSitterData = await fetchPetSitterData();

    if (!petSitterData || !petSitterData.id) {
      return;
    }

    const petSitterID = parseInt(petSitterData.id);

    if (isNaN(petSitterID)) {
      return;
    }

    const { data, error } = await supabase
      .from("gallery_sitter")
      .select("*")
      .eq("pet_sitter_id", petSitterID);

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
      }
    }
  };

  const fetchPetSitterData = async () => {
    if (!userId) {
      return;
    }
    const { data, error } = await supabase
      .from("pet_sitter")
      .select("*")
      .eq("user_id", userId);

    if (error) {
      toast({
        title: "Error",
        position: "top",
        description: `Error fetching pet_sitter data: ${error.message}`,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
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
    setAccountName(petSitterData.account_name);
    setAccountType(petSitterData.account_type);
    setEtcs(petSitterData.etcs);
    setImageUrlSitter(petSitterData.image_url);
    setExperience(petSitterData.experience);
    setAddress({
      district: petSitterData.district,
      amphoe: petSitterData.sub_district,
      province: petSitterData.province,
      zipcode: petSitterData.post_code,
    });

    return petSitterData;
  };

  const fetchDataPetTypesPrefer = async (petSitterID) => {
    if (!petSitterID) {
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

  const handleUploadSitterPhoto = (event) => {
    const file = event.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      if (url) {
        const uniqueFileName = generateUniqueFileName(file.name);
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
    let updatedImageUrl = imageUrlSitter ?? "";
    if (Object.keys(photoSitter).length > 0) {
      const file = Object.values(photoSitter)[0];
      const filePath = `public/${userId}/petsitterprofile/${file.name}`;
      let { data, error: uploadError } = await supabase.storage
        .from("images")
        .upload(filePath, file);
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
    } else {
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
    } else {
    }
  };

  //update pet sitter
  const updatesPetSitter = async () => {
    try {
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

        experience: experience,
        account_name: accountName,
        account_type: accountType,
        user_id: userId,
        etcs: etcs,
        updated_at: new Date(),
      };
      const { data, error } = await supabase
        .from("pet_sitter")
        .upsert(updataPetSitterData, { onConflict: "user_id" });

      if (error) {
      }
    } catch (error) {}
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
      return;
    }
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
        return;
      }
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setLoading(true); // Show spinner
    try {
      await updatesPetSitter();
      await dataPetType();
      await updatesAvatarSitter();
      await updatesAvatarUser();
      await uploadPetImages();
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
          // Handle error gracefully
        }
      } else {
        uploadedImageUrls.push(file);
      }
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
    } catch (error) {
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
          <div className="bg-sixthGray rounded-lg w-[167px] h-[167px] flex justify-center items-center">
            <img src={src} alt={`Pet ${petImageKey}`} />
          </div>
          <button
            className="absolute text-sm right-[-10px] top-[-10px]  items-center justify-center flex cursor-pointer bg-thirdOrange p-1 rounded-full hover:bg-fifthOrange hover:text-white w-6 h-6"
            onClick={() => handleRemoveImage(petImageKey)}
          >
            <Image src={iconX} alt="icon X" />
          </button>
        </div>
      );
    });
  };

  const handlePetType = (selectedOptions) => {
    setPetType(selectedOptions);
  };

  // Read records pet_type_master
  async function fetchPetTypes() {
    let { data: pet_type_master, error } = await supabase
      .from("pet_type_master")
      .select("*");

    if (error) {
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
    { value: "2", label: "2" },
    { value: "3", label: "3" },
    { value: "4", label: "4" },
    { value: "5", label: "5++" },
  ];
  const handleExperience = (value) => {
    const selectedOption = options.find((option) => option.value === value);
    setExperience(selectedOption.value);
  };
  return (
    <div className="flex bg-sixthGray justify-center">
      <div className="hidden bg-sixthGray lg:block relative">
        <Sidebar active={1} />
      </div>
      <div className="flex-1 min-w-[375px] mx-auto md:w-auto md:mx-3 bg-sixthGray max-w-[1200px] lg:ml-60">
        <TopBar />
        <div className="Title flex justify-between items-center py-3">
          <div className="nameTitle pl-5 text-[22px] font-semibold">
            Pet Sitter Profile
          </div>
          <div className="pr-5">
            <button
              className="bg-secondOrange rounded-3xl min-w-20 h-10 hidden md:block text-white font-medium"
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
          <div className="rounded-xl p-5  mb-5 bg-white flex  flex-col gap-4 md:px-[80px] md:py-[40px]">
            <div className="pb-6 font-bold flex    ">User Information</div>
            <div className="flex flex-col  lg:items-center gap-2 mt-2 ">
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
            <div className=" md:items-end md:flex md:gap-9 md:justify-between ">
              <div className="fullname mt-5 md:w-80 lg:w-[474px] xl:w-[560px]">
                <FormControl isRequired isInvalid={errorFullName !== ""}>
                  <FormLabel>Your full name</FormLabel>
                  <Input
                    type="text"
                    minLength="6"
                    maxLength="61"
                    pattern="^[a-zA-Z\s]*$"
                    value={fullName}
                    onChange={handleFullNameChange}
                    onBlur={() => {
                      if (fullName.trim() === "") {
                        setErrorFullName("Please enter your name");
                      } else if (!isValidFullName) {
                        setErrorFullName(
                          "Full name cannot exceed 60 characters"
                        );
                      } else {
                        setErrorFullName("");
                      }
                    }}
                    errorBorderColor="red.400"
                  />
                  <FormErrorMessage>{errorFullName}</FormErrorMessage>
                </FormControl>
              </div>
              <div className="Experience  md:w-80 lg:w-[474px] xl:w-[560px]">
                <FormControl isRequired>
                  <FormLabel>Experience</FormLabel>
                  <select
                    name="experience"
                    id="experience"
                    value={experience}
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
                <FormControl isRequired isInvalid={errorPhoneNumber !== ""}>
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
                    onBlur={() => {
                      if (phoneNumber.trim() === "") {
                        setErrorPhoneNumber("Please enter your phone number");
                      } else {
                        setErrorPhoneNumber("");
                      }
                    }}
                    errorBorderColor="red.400"
                  />
                  <FormErrorMessage>{errorPhoneNumber}</FormErrorMessage>
                </FormControl>
              </div>
              <div className="email md:w-80 lg:w-[474px] xl:w-[560px] ">
                <FormControl isRequired isInvalid={errorEmail !== ""}>
                  <FormLabel>Email</FormLabel>
                  <Input
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                    onBlur={() => {
                      if (email.trim() === "") {
                        setErrorEmail("Please enter your email");
                      } else if (!isValidEmail) {
                        setErrorEmail("The email format is incorrect.");
                      } else {
                        setErrorEmail("");
                      }
                    }}
                    errorBorderColor="red.400"
                  />
                  <FormErrorMessage>{errorEmail}</FormErrorMessage>
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
          <div className="petSitter p-5  rounded-xl mb-1 flex flex-col gap-4 bg-white md:px-[80px] md:py-[40px]">
            <p className=" font-bold">Pet Sitter</p>

            <div className="flex flex-col gap-2 mt-2 ">
              <p className=" pb-5">Pet Sitter Profile</p>
              <label htmlFor="profilesitter">
                <div className="photo   lg:flex lg:justify-center">
                  <Image
                    className="cursor-pointer rounded-xl  w-[150px] h-[100px]   md:w-[250px] md:h-[180px]  lg:w-[300px]"
                    src={imageUrlSitter ?? upload}
                    width={300}
                    height={120}
                    alt="Preview"
                  />
                </div>

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
                <FormControl isRequired isInvalid={errorTradeName !== ""}>
                  <FormLabel>Pet sitter name (Trade Name)</FormLabel>
                  <Input
                    type="text"
                    value={tradeName}
                    onChange={(event) => {
                      setTradeName(event.target.value);
                    }}
                    onBlur={() => {
                      if (tradeName.trim() === "") {
                        setErrorTradeName("Please enter your pet sitter name");
                      } else {
                        setErrorTradeName("");
                      }
                    }}
                    errorBorderColor="red.400"
                  />
                  <FormErrorMessage>{errorTradeName}</FormErrorMessage>
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
            <div className="md:flex flex-col md:gap-9 ">
              <div>
                <div className="Introduction">
                  <FormControl isRequired isInvalid={errorIntroduction !== ""}>
                    <FormLabel>
                      Introduction (Describe about yourself as pet sitter)
                    </FormLabel>
                    <Textarea
                      rows={8}
                      value={introduction}
                      onChange={(event) => {
                        setIntroduction(event.target.value);
                      }}
                      onBlur={() => {
                        if (introduction.trim() === "") {
                          setErrorIntroduction(
                            "Please describe yourself as pet sitter"
                          );
                        } else {
                          setErrorIntroduction("");
                        }
                      }}
                      errorBorderColor="red.400"
                    />
                    <FormErrorMessage>{errorIntroduction}</FormErrorMessage>
                  </FormControl>
                </div>
              </div>
              <div className="services ">
                <FormControl isRequired isInvalid={errorServices !== ""}>
                  <FormLabel>
                    Services (Describe all of your service for pet sitting)
                  </FormLabel>
                  <Textarea
                    rows={8}
                    value={services}
                    onChange={(event) => {
                      setServices(event.target.value);
                    }}
                    onBlur={() => {
                      if (services.trim() === "") {
                        setErrorServices("Please describe your services");
                      } else {
                        setErrorServices("");
                      }
                    }}
                    errorBorderColor="red.400"
                  />
                  <FormErrorMessage>{errorServices}</FormErrorMessage>
                </FormControl>
              </div>
              <div className="bg-white rounded-xl  flex flex-col gap-4">
                <div>
                  <FormControl isRequired isInvalid={errorAddressDetail !== ""}>
                    <FormLabel>Address detail</FormLabel>
                    <Input
                      value={addressDetail}
                      onChange={(event) => {
                        setAddressDetail(event.target.value);
                      }}
                      onBlur={() => {
                        if (addressDetail === "") {
                          setErrorAddressDetail(
                            "Please enter your address detail"
                          );
                        } else {
                          setErrorAddressDetail("");
                        }
                      }}
                      errorBorderColor="red.400"
                    />
                    <FormErrorMessage>{errorAddressDetail}</FormErrorMessage>
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
              <div className="myPlace ">
                <FormControl isRequired>
                  <FormLabel>My Place (Pin your location)</FormLabel>
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
              </div>
            </div>
            <div className="pt-8">
              <p className=" font-semibold">Image Gallery</p>
              <p>
                Recommend adding at least 3 images, for addition adding image
                maximum at 10 images.
              </p>
              <div className="flex flex-row my-4 gap-4 flex-wrap justify-center items-center">
                <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-5 ">
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
          <div className="bank account mt-5 p-5 bg-white rounded-xl mb-5  md:px-[60px] md:py-[40px]">
            <div className="bg-white rounded-xl p-5 mb-5 flex flex-col gap-4">
              <p className="pb-6 font-bold">Bank</p>
              <div>
                <FormControl isRequired isInvalid={errorAccountNumber !== ""}>
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
                    onBlur={() => {
                      if (accountNumber.trim() === "") {
                        setErrorAccountNumber(
                          "Please enter your account number"
                        );
                      } else {
                        setErrorAccountNumber("");
                      }
                    }}
                    errorBorderColor="red.400"
                  />
                  <FormErrorMessage>{errorAccountNumber}</FormErrorMessage>
                </FormControl>
              </div>
              <div className="md:flex md:gap-9 md:justify-between">
                <FormControl isRequired isInvalid={errorAccountName !== ""}>
                  <FormLabel>Account Name</FormLabel>
                  <Input
                    value={accountName}
                    onChange={(event) => {
                      setAccountName(event.target.value);
                    }}
                    onBlur={() => {
                      if (accountName.trim() === "") {
                        setErrorAccountName("Please enter your account name");
                      } else {
                        setErrorAccountName("");
                      }
                    }}
                    errorBorderColor="red.400"
                  />
                  <FormErrorMessage>{errorAccountName}</FormErrorMessage>
                </FormControl>

                <FormControl isRequired isInvalid={errorBankName !== ""}>
                  <FormLabel>Bank Name</FormLabel>
                  <Input
                    value={bankName}
                    onChange={(event) => {
                      setBankName(event.target.value);
                    }}
                    onBlur={() => {
                      if (bankName.trim() === "") {
                        setErrorBankName("Please enter bank name");
                      } else {
                        setErrorBankName("");
                      }
                    }}
                    errorBorderColor="red.400"
                  />
                  <FormErrorMessage>{errorBankName}</FormErrorMessage>
                </FormControl>
              </div>
              <div className="md:flex md:gap-9 md:justify-between">
                <FormControl isRequired isInvalid={errorAccountType !== ""}>
                  <FormLabel>Account Type</FormLabel>
                  <Input
                    value={accountType}
                    onChange={(event) => {
                      setAccountType(event.target.value);
                    }}
                    onBlur={() => {
                      if (accountType.trim() === "") {
                        setErrorAccountType("Please enter your account type");
                      } else {
                        setErrorAccountType("");
                      }
                    }}
                    errorBorderColor="red.400"
                  />
                  <FormErrorMessage>{errorAccountType}</FormErrorMessage>
                </FormControl>

                <FormControl>
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
                className="bg-secondOrange text-white font-medium rounded-3xl w-80 h-10"
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
