"use client";
import React from "react";
import Image from "next/image";
import catpic from "@/asset/images/dog-house.svg";
import iconLocation from "@/asset/images/icon=map-marker.svg";
import Footer from "@/components/common/Footer";
import { useState, useEffect } from "react";
import star from "@/asset/images/Star2.svg";
import supabase from "@/lib/utils/db";
import { useRouter } from "next/navigation";
import { Avatar } from "@chakra-ui/react";
import { useUser } from "@/hooks/hooks";

function CardSitter(props) {
  const { bookingData, setBookingData } = useUser();
  const [petId, setPetId] = useState([]);
  const [gallery, setGallery] = useState();
  let id = props.id;

  const router = useRouter();

  function HandleClick(props, sittername, fullname) {
    const path = `/search/${props}`;
    const url = String(path);
    router.push(url);
    setBookingData({
      ...bookingData,
      sittername: sittername,
      fullname: fullname,
      sitterId: id,
    });
  }
  function renderStar(starNumber) {
    let stars = [];
    for (let i = 0; i < starNumber; i++) {
      stars.push(<Image key={i} src={star} alt="star" className=" w-[12px]" />);
    }
    return stars;
  }

  async function getPetprefer(id) {
    let { data: petPrefer, error: petPreferError } = await supabase
      .from("pet_prefer")
      .select("pet_type_master_id")
      .eq("pet_sitter_id", id);
    if (petPreferError || !petPrefer) {
    }
    setPetId(petPrefer);
    let { data: gallery, error: galleryError } = await supabase
      .from("pet_sitter")
      .select("image_url")
      .eq("id", id);
    if (!gallery || galleryError) {
    }
    setGallery(gallery[0].image_url);
  }

  useEffect(() => {
    getPetprefer(id);
  }, []);

  const sitterRating = [5, 4, 3, 2, 1];
  function renderStar(starNumber) {
    let stars = [];
    for (let i = 0; i < starNumber; i++) {
      stars.push(
        <Image key={i} src={star} alt="star" className=" w-[10px] lg:w-[15px]" />
      );
    }
    return stars;
  }
  return (
    <div className=" w-full flex justify-center" key={props.key}>
      <section
        className="flex  items-center p-3 rounded-xl  shadow-md md:w-[90%]    hover:bg-sixthOrange cursor-pointer"
        direction={{ base: "column", sm: "row" }}
        overflow="hidden"
        variant="outline"
        onClick={() => {
          HandleClick(props.id, props.sittername, props.fullname);
        }}
      >
        <div className=" flex  gap-3 w-[100%] h-[100%]">
          <div className="">
            <Image
              width={300}
              height={120}
              objectFit="cover"
              src={gallery ? gallery : catpic}
              alt="sitter pic"
              className=" mt-5 w-[150px] h-[100px]  rounded-xl md:w-[250px] md:h-[180px]  lg:w-[300px] "
            />
          </div>

          <section className=" flex  min-w-[220px] flex-row gap-6 w-[100%]   relative p-2 ">
            <div className="  w-[100%] flex flex-col  justify-around">
              <div className="flex gap-2">
                <Avatar
                  width={50}
                  height={50}
                  objectFit="cover"
                  className=" mt-5 w-[40px] h-[40px] rounded-[50%] lg:w-[70px] lg:h-[70px]"
                  src={props.image ? props.image : catpic}
                  alt="sitter pic"
                />

                <div className="flex flex-col  ">
                  <p className=" font-extrabold  text-md pt-5 md:text-xl">{props.sittername}</p>
                
                    <p className=" font-bold text-xs md:text-lg">By {props.fullname}</p>
                    <p className="  text-[10px] md:text-[14px] text-[#1CCD83]">
                       {props.experience}  Years Exp.
                    </p>
                 
                </div>
                <div className="flex items-center gap-1  absolute right-2 top-1 ">
                  {renderStar(props.rating)}
                </div>
              </div>
              <div className=" flex  items-center text-center pt-2 justify-start gap-1">
                <Image
                  objectFit="cover"
                  className=" w-[15px] h-[15px] rounded-xl"
                  src={iconLocation}
                  alt="location icon"
                />
                <p className=" text-xs text-gray-500 md:text-[14px]">
                  {props.district}, {props.province}
                </p>
              </div>
              <div className=" flex   gap-2 pt-2">
                {petId.map((eachId, index) => {
                  if (eachId.pet_type_master_id === 1) {
                    return (
                      <p
                        key={index}
                        className="md:text-[14px] text-[10px]  border-solid border bg-secondGreen rounded-2xl  border-firstGreen pl-2 pr-2 text-firstGreen"
                      >
                        Dog
                      </p>
                    );
                  } else if (eachId.pet_type_master_id === 2) {
                    return (
                      <p
                        key={index}
                        className=" md:text-[14px] text-[10px]  border-solid border bg-secondPink rounded-2xl  border-firstPink pl-2 pr-2 text-firstPink"
                      >
                        Cat
                      </p>
                    );
                  } else if (eachId.pet_type_master_id === 3) {
                    return (
                      <p
                        key={index}
                        className=" md:text-[14px] text-[10px]  border-solid border bg-secondLigthBlue rounded-2xl  border-firstLigthBlue pl-2 pr-2 text-firstLigthBlue"
                      >
                        Bird
                      </p>
                    );
                  } else if (eachId.pet_type_master_id === 4) {
                    return (
                      <p
                        key={index}
                        className=" md:text-[14px] text-[10px]  border-solid border bg-secondYellow rounded-2xl  border-firstYellow pl-2 pr-2 text-firstYellow"
                      >
                        Rabbit
                      </p>
                    );
                  }
                })}
              </div>
            </div>
          </section>
        </div>
      </section>
    </div>
  );
}

export default CardSitter;
