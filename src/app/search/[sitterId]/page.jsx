"use client";
import React, { useState, useEffect } from "react";
import avatar from "@/asset/images/secondSitterDetail.svg";
import avatar2 from "@/asset/images/firstSitterDetail.svg";
import avatar3 from "@/asset/images/thirdSitterDetail.svg";
import Carousel from "@/components/Carousel";
import SitterDetail from "@/components/SitterDeatail";
import withAuth from "@/lib/utils/withAuth";
import supabase from "@/lib/utils/db";
import { useParams } from "next/navigation";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";

const SitterProfile = () => {
  const images = [{ url: avatar }, { url: avatar2 }, { url: avatar3 }];
  const [gallery, setGallery] = useState([]);
  const [detailUser, setDetailUser] = useState([]);
  const params = useParams();
  const [petPrefer, setPrefer] = useState([]);
  async function getSitterData() {
    let { data, error } = await supabase
      .from("sitter_detail")
      .select("*")
      .eq("id", params.sitterId);
    if (error || !data) {
    }
    if (data) {
      const filterData = filterSitterData(data);
      setDetailUser(filterData);
      setGallery(data[0]?.carousel_image);
    }
  }
  function filterSitterData(array) {
    const petType = [];
    const arr = [];
    const sitterArr = [];

    array.filter((item) => {
      const index = arr.indexOf(item.sitterId);
      if (index == -1) {
        arr.push(item.sitterId);
        sitterArr.push(item);
        petType.push(item.pet_type_master_id);
      } else {
        petType.push(item.pet_type_master_id);
      }
    });
    setPrefer(petType);
    return sitterArr;
  }

  useEffect(() => {
    getSitterData();
  }, []);
  return (
    <>
      <Navbar />
      <div className=" max-w-[1440px] mx-auto">
        <div className="lg:hidden md:hidden  ">
          <Carousel images={gallery ? gallery : images} picNum={1} />
        </div>
        <div className="hidden md:block lg:hidden">
          <Carousel images={gallery ? gallery : images} picNum={2} />
        </div>
        <div className="hidden lg:block md:hidden ">
          <Carousel images={gallery ? gallery : images} picNum={3} />
        </div>

        <div>
          {detailUser.map((item) => (
            <SitterDetail
              key={item.sitterId}
              sitterName={item.sitter_name}
              exp={item.experience}
              place={item.place}
              service={item.service}
              province={item.province}
              introduction={item.introduction}
              district={item.district}
              imageUser={item.image_url}
              fullName={item.full_name}
              rating={item.rating}
              typePet={petPrefer}
            />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default withAuth(SitterProfile);
