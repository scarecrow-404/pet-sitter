import dog from "@/asset/images/photoFrame.svg";
import locationIcon from "@/asset/images/location.svg";
import union from "@/asset/images/Union.svg";
import Image from "next/image";
import React, { useState } from "react";
import star from "@/asset/images/Star2.svg";
import PopupBooking from "./Popup";
import { supabase } from "@supabase/auth-ui-shared";
import { Avatar } from "@chakra-ui/react";
function SitterDetail(props) {
  const [rating, setRating] = useState("");
  const sitterRating = ["All Reviews", 5, 4, 3, 2, 1];

  function renderStar(starNumber) {
    let stars = [];
    for (let i = 0; i < starNumber; i++) {
      stars.push(<Image key={i} src={star} alt="star" className=" w-[12px]" />);
    }
    return stars;
  }
  return (
    <div className="mainDivDetailSitter lg:flex-row-reverse lg:flex md:flex-row-reverse md:flex ">
      <div className="p-[20px] gap-2 ">
        <div className="shadow-2xl rounded-lg">
          <div className=" p-[24px]  flex flex-col items-center text-center gap-2 rounded-t-lg w-full ">
            <Avatar
              src={props.imageUser}
              className="rounded-[50%]"
              alt=""
              width={250}
              height={250}
            />
            <p className="text-[30px]  font-bold "> {props.sitterName}</p>
            <div className="flex gap-3">
              <p className=" font-bold text-[17px]">{props.fullName}</p>
              <p className="text-[#1CCD83] text-[16px]">
                {props.exp} Years Exp.
              </p>
            </div>
            <div>
              <Image src={star} alt="" />
            </div>
            <div className="flex text-[#7B7E8F] text-[15px]">
              <Image src={locationIcon} alt="" />
              <p>
                {props.district}, {props.province}
              </p>
            </div>
            <div className=" flex gap-2 pt-2 ">
              <p className=" text-[14px]  border-solid border bg-secondGreen rounded-2xl  border-firstGreen pl-2 pr-2 text-firstGreen">
                Dog
              </p>
              <p className=" text-[14px]  border-solid border bg-secondPink rounded-2xl  border-firstPink pl-2 pr-2 text-firstPink">
                Cat
              </p>
              <p className=" text-[14px]  border-solid border bg-secondLigthBlue rounded-2xl  border-firstLigthBlue pl-2 pr-2 text-firstLigthBlue">
                Bird
              </p>
              <p className=" text-[14px]  border-solid border bg-secondYellow rounded-2xl  border-firstYellow pl-2 pr-2 text-firstYellow">
                Rabbit
              </p>
            </div>
          </div>
          <hr></hr>
          <PopupBooking />
        </div>
      </div>

      <div className="sisterDetail flex w-full ">
        <div className=" flex flex-col w-full">
          <div className="informationSister py-[24px] px-[30px]">
            <h1 className="text-[40px] pb-[48px] font-bold">
              {props.sitterName}
            </h1>
            <div className="introduction-box pb-[48px]">
              <p className=" font-bold text-[20px] pb-[12px]">Introduction</p>
              <p className="text-[15px] ">{props.introduction}</p>
            </div>
            <div className="service-box pb-[48px]">
              <p className=" font-bold text-[24px] pb-[12px]">Services</p>
              <p className="text-[15px]">
                {props.service}
                {/* 🐱 Cat Sitting: Lorem ipsum dolor sit amet consectetur,
                adipisicing elit. Saepe, cumque. Blanditiis non rerum hic quasi
                laboriosam nesciunt fugiat.<br></br>
                🐶 Dog Sitting: Lorem ipsum dolor sit amet consectetur
                adipisicing elit. Distinctio nam aliquid quidem sed assumenda,
                laboriosam rerum alias nulla doloremque quo?<br></br>
                🐇 Rabbit Sitting: Lorem, ipsum dolor sit amet consectetur
                adipisicing elit. Libero inventore asperiores neque ipsam atque. */}
              </p>
            </div>
            <div className="sitterPlace-box pb-[48px]">
              <p className=" font-bold text-[24px] pb-[12px]">My Place</p>
              <p>{props.place}</p>
            </div>
          </div>
          <div className="rating p-[24px] bg-fifthGray rounded-sm rounded-tl-[100px] rounded-tr-[20px] flex flex-col ">
            <div className="flex p-[24px] bg-white rounded-sm rounded-l-[100px] rounded-r-[20px] relative gap-[20px] items-start">
              <Image src={union} className="w-[100px]" alt="" />
              <p className=" absolute text-[26px]  text-white  left-[53px] top-[50px]">
                {/* avg star */}
                4.5
              </p>
              <p className=" absolute text-[13px]  text-white  left-[43px] top-[85px]">
                20 Reviews
              </p>
              <div className="flex flex-col">
                <h1 className="text-[24px] font-bold">Rating & Reviews</h1>
                <div className="flex">
                  <div className="flex  gap-2 flex-wrap">
                    {sitterRating.map((rating) => {
                      return (
                        <button
                          key={rating}
                          className="flex  items-center gap-1 border-[1px] p-1 rounded-md focus:border-orange-500 focus:text-firstOrange hover:bg-slate-100 px-2"
                        >
                          <input
                            className="sr-only"
                            type="checkbox"
                            value={rating}
                            onChange={(event) => setRating(event.target.value)}
                          />
                          {rating}
                          {renderStar(rating)}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col p-[24px]">
              <div className="flex gap-3 ">
                <Image src={dog} className="w-[60px]  rounded-[50%]" alt="" />
                <div>
                  <p>
                    {/* name of reviewer */}
                    John Dep
                  </p>
                  <p>
                    {/* date to created_at */}
                    Apr 23, 2024
                  </p>
                </div>
              </div>
              <div className="py-[20px]">
                <p>
                  ****
                  {/* star of review */}
                </p>
                <p>
                  {/* review comment */}
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Ipsum asperiores quas facilis deleniti repellendus, nisi saepe
                  temporibus sequi neque ex.
                </p>
              </div>
              <hr></hr>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default SitterDetail;
