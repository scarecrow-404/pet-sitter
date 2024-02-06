"use client";
import React from "react";
import Image from "next/image";
import catpic from "@/asset/images/catforsitterlist.jpg";
import iconLocation from "@/asset/images/icon=map-marker.svg";
import Footer from "@/components/common/Footer";
import { useState, useEffect } from "react";
import star from "@/asset/images/star1.svg";
import { supabase } from "@/lib/db";
import { useRouter } from "next/router";

function CardSitter(props) {
  const [petId, setPetId] = useState([]);
  let id = props.id;
  

  async function getPetprefer(id) {
    let { data, error } = await supabase
      .from("pet_prefer")
      .select("pet_type_master_id")
      .eq("pet_sitter_id", id);
    if (error || !data) {
      console.log(error);
    }
    setPetId(data);
    //console.log("Petidddd",data);
  }
 // console.log(Array.isArray(petId))
  useEffect(() => {
    getPetprefer(id);
  }, []);

  const sitterRating = [5, 4, 3, 2, 1];
  function renderStar(starNumber) {
    let stars = [];
    for (let i = 0; i < starNumber; i++) {
      stars.push(
        <Image key={i} src={star} alt="star" className=" w-[8px] lg:w-[12px]" />
      );
    }
    return stars;
  }
  return (
    <div className=" w-full" key={props.key}>
      <section
        className="flex  items-center p-2 rounded-xl   shadow-lg md:w-[80%]  h-52"
        direction={{ base: "column", sm: "row" }}
        overflow="hidden"
        variant="outline"
      >
        <div className=" flex  gap-3 w-[100%]">
          <Image
            objectFit="cover"
            className=" w-[100px] h-[100px] rounded-xl   md:w-[150px]"
            src={catpic}
            alt="sitter pic"
          />

          <section className=" flex gap-2 w-[100%] relative p-2">
            <div className=" w-[100%]">
              <div className="flex gap-2">
                <Image
                  objectFit="cover"
                  className=" w-[40px] h-[40px] rounded-[50%] lg:w-[50px] lg:h-[50px]"
                  src={catpic}
                  alt="sitter pic"
                />

                <div className="flex flex-col ">
                  <p className=" font-extrabold  text-lg">{props.sittername}</p>
                  <p className=" font-bold text-xs">By {props.fullname}</p>
                </div>
                <div className="flex items-center gap-1  absolute right-2 top-1 ">
                  {renderStar(5)}
                </div>
              </div>
              <div className=" flex  items-center text-center pt-2 justify-start gap-1">
                <Image
                  objectFit="cover"
                  className=" w-[15px] h-[15px] rounded-xl"
                  src={iconLocation}
                  alt="location icon"
                />
                <p className=" text-xs text-gray-500">
                  {props.district}, {props.province}
                </p>
              </div>
              <div className=" flex   gap-1 pt-2">
                {petId.map((eachId) => {
                  //console.log("eachid", eachId); 
                  if (eachId.pet_type_master_id=== 1) {
                    return (
                      <p className=" text-[10px]  border-solid border bg-secondGreen rounded-2xl  border-firstGreen pl-2 pr-2 text-firstGreen">
                        Dog
                      </p>
                    );
                  } else if (eachId.pet_type_master_id === 2) {
                    return (
                      <p className=" text-[10px]  border-solid border bg-secondPink rounded-2xl  border-firstPink pl-2 pr-2 text-firstPink">
                        Cat
                      </p>
                    );
                  } else if (eachId.pet_type_master_id === 3) {
                    return (
                      <p className=" text-[10px]  border-solid border bg-secondLigthBlue rounded-2xl  border-firstLigthBlue pl-2 pr-2 text-firstLigthBlue">
                        Bird
                      </p>
                    );
                  } else if (eachId.pet_type_master_id === 4) {
                    return (
                      <p className=" text-[10px]  border-solid border bg-secondYellow rounded-2xl  border-firstYellow pl-2 pr-2 text-firstYellow">
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
