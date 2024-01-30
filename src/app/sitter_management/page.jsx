"use client";
import React from "react";
import Image from "next/image";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Icon,
  Form,
  Input,
} from "@chakra-ui/react";

import Frame427321094 from "@/asset/images/Frame427321094.svg";
import deleteButton from "@/asset/images/delete.svg";
import frameFray from "@/asset/images/photoFrameOutlineRounded.svg";
import upload from "@/asset/images/uploadMin10.svg";
const SitterManagement = () => {
  return (
    <div className="w-[375px] mx-auto">
      <div className="headBar">
        <Image src="/profile.png" width={40} height={40} alt="profile" />
        <div>Jane Maison</div>
      </div>
      <div className="Title flex justify-between">
        <div className="nameTitle">Pet Sitter Profile</div>
        <div>
          <button className="bg-secondOrange rounded-3xl min-w-32 h-12">
            Update
          </button>
        </div>
      </div>
      <div className="bg-purple-300 rounded-xl p-5 mb-5">
        <div>Basic Information</div>
        <div>
          <p>Profile Image</p>
          <Image src={Frame427321094} width={100} height={100} alt="profile" />
        </div>
        <div className="">
          <div className="fullname flex flex-col">
            <label htmlFor="fullname">Your full name*</label>
            <input type="text" className="fullname" />
          </div>
          <div className="Experience flex flex-col">
            <label htmlFor="fullname">Experience*</label>
            <input type="text" className="Experience" />
          </div>
        </div>
        <div className="">
          <div className="PhoneNumber flex flex-col">
            <label htmlFor="PhoneNumber">Phone Number*</label>
            <input type="text" className="PhoneNumber" />
          </div>
          <div className="Email flex flex-col">
            <label htmlFor="Email">Email*</label>
            <input type="text" className="Email" />
          </div>
        </div>
        <div>
          <div className="Introduction flex flex-col">
            <label htmlFor="Introduction">
              Introduction (Describe about yourself as pet sitter)
            </label>
            <input type="text" className="Introduction" />
          </div>
        </div>
      </div>
      <div className="petSitter p-5 bg-orange-200 rounded-xl mb-5">
        <p>Pet Sitter</p>
        <div>
          <div className="TradeName flex flex-col">
            <label htmlFor="TradeName">Pet sitter name (Trade Name)*</label>
            <input type="text" className="TradeName" />
          </div>
        </div>
        <div>
          <div className="petType flex flex-col">
            <label htmlFor="petType">Pet type</label>
            <input type="text" className="petType" />
          </div>
        </div>
        <div>
          <div className="services flex flex-col">
            <label htmlFor="services">
              Services (Describe all of your service for pet sitting)
            </label>
            <input type="text" className="services" />
          </div>
        </div>
        <div>
          <div className="myPlace flex flex-col">
            <label htmlFor="myPlace">My Place (Describe you place)</label>
            <input type="text" className="myPlace" />
          </div>
        </div>
        <div>
          <p>Image Gallery (Maximum 10 images)</p>

          <div className="flex relative mb-4 justify-center">
            <Image
              src={deleteButton}
              width={40}
              height={40}
              alt="deleteButton"
              className="absolute right-7 pt-4"
            />
            <Image
              src={frameFray}
              width={280}
              height={280}
              alt="Frame427321094"
              className="pt-4"
            />
          </div>
          {/* ............ข้อมูลรอ MAP............ */}
          <div className="flex relative mb-4 justify-center">
            <Image
              src={deleteButton}
              width={40}
              height={40}
              alt="deleteButton"
              className="absolute right-7 pt-4"
            />
            <Image
              src={frameFray}
              width={280}
              height={280}
              alt="Frame427321094"
              className="pt-4"
            />
          </div>
          <div className="flex relative mb-4 justify-center">
            <Image
              src={deleteButton}
              width={40}
              height={40}
              alt="deleteButton"
              className="absolute right-7 pt-4"
            />
            <Image
              src={frameFray}
              width={280}
              height={280}
              alt="Frame427321094"
              className="pt-4"
            />
          </div>
          {/* ..ปุ่มเพิ่มรูป... */}
          <div className="flex relative mb-4 justify-center">
            <Image
              src={upload}
              width={280}
              height={280}
              alt="Frame427321094"
              className="pt-4"
            />
          </div>
        </div>
      </div>
      <div className="bg-green-200 rounded-xl p-5 mb-5">
        <p>Address</p>
        <div>
          <FormControl isRequired>
            <FormLabel>Address detail</FormLabel>
            <Input />
          </FormControl>
        </div>
        <div>
          <FormControl isRequired>
            <FormLabel>Province</FormLabel>
            <Input />
          </FormControl>
        </div>
        <div>
          <FormControl isRequired>
            <FormLabel>District</FormLabel>
            <Input />
          </FormControl>
        </div>
        <div>
          <FormControl isRequired>
            <FormLabel>Sub-district</FormLabel>
            <Input />
          </FormControl>
        </div>
        <div>
          <FormControl isRequired>
            <FormLabel>Post code</FormLabel>
            <Input />
          </FormControl>
        </div>
      </div>
    </div>
  );
};

export default SitterManagement;
