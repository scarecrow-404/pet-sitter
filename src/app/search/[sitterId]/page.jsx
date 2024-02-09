"use client";
import React, { useState, useEffect } from "react";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import avatar from "@/asset/images/secondSitterDetail.svg";
import avatar2 from "@/asset/images/firstSitterDetail.svg";
import avatar3 from "@/asset/images/thirdSitterDetail.svg";
import Carousel from "@/components/Carousel";
import SitterDetail from "@/components/SitterDeatail";
import withAuth from "@/lib/utils/withAuth";
import { useUser } from "@/hooks/hooks";
import supabase from "@/lib/utils/db";

const SitterProfile = () => {
  const { user, userId } = useUser();
  const images = [{ url: avatar }, { url: avatar2 }, { url: avatar3 }];
  // const [rating, setRating] = useState("");
  const [detailUser, setDetailUser] = useState([]);

  // const sitterRating = ["All Reviews", 5, 4, 3, 2, 1];
  console.log(userId);
  async function getSitterData() {
    let { data, error } = await supabase
      .from("pet_sitter")
      .select("*")
      .eq("user_id", userId);
    // .select(`id, sitter_name, district, province, users(full_name)`);
    if (error || !data) {
      console.log(error);
    }
    setDetailUser(data);
  }

  console.log("ssss", detailUser);

  useEffect(() => {
    getSitterData();
  }, []);

  console.log(user);
  return (
    <div className=" overflow-x-hidden max-w-[1440px] mx-auto">
      <div className="lg:hidden md:hidden m-3 ">
        <Carousel images={images} picNum={1} />
      </div>
      <div className="hidden md:block lg:hidden">
        <Carousel images={images} picNum={2} />
      </div>
      <div className="hidden lg:block md:hidden ">
        <Carousel images={images} picNum={3} />
      </div>
      <div>
        {detailUser.map((item) => (
          <SitterDetail
            sitterName={item.sitter_name}
            exp={item.experience}
            place={item.place}
            service={item.service}
            province={item.province}
            introduction={item.introduction}
            district={item.district}
            imageUser={item.users.image_url}
            fullName={item.users.full_name}
          />
        ))}
      </div>
    </div>
  );
};

export default withAuth(SitterProfile);
