import React from "react";
import Image from "next/image";
import {
  FormControl,
  FormLabel,
 
  FormErrorMessage,
  FormHelperText,
} from "@chakra-ui/react";
import Frame427321094 from "@/asset/images/Frame427321094.svg";
const SitterManagement = () => {
  return (
    <div>
      <div className="headBar flex">
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
      <div>
        <div>Basic Information</div>
        <div>
          <p>Profile Image</p>
          <Image src={Frame427321094} width={240} height={240} alt="profile" />
        </div>
        <div className="flex">
          <div className="cl">
            <label htmlFor="fullname">Your full name*</label>
          <input type="text" className="fullname "/>
          </div>
          <div>
            <FormLabel>Experience</FormLabel>
            
          </div>
        </div>
        <div></div>
        <div></div>
      </div>
      <div></div>
      <div></div>
    </div>
  );
};

export default SitterManagement;
