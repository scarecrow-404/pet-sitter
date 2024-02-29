"use client";
import React, { useState, useEffect } from "react";
import supabase from "@/lib/utils/db";
import { useUser } from "@/hooks/hooks";

import Image from "next/image";
import close from "@/asset/images/iconX.svg";
import profile from "@/asset/images/connect-with-sitter.svg";
import star from "@/asset/images/Star2.svg";

const ReviewPage = () => {
  const [dataReview, setDataReview] = useState([]);

  function CreateDay(timeCreated) {
    const date = timeCreated;
    const dateObject = new Date(date);

    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const daysOfWeek = ["Sun,", "Mon,", "Tue,", "Wed,", "Thu,", "Fri,", "Sat,"];

    const dayOfWeek = daysOfWeek[dateObject.getDay()];
    const day = String(dateObject.getDate()).padStart(2, "0");
    const month = months[dateObject.getMonth()];
    const year = dateObject.getFullYear();

    const formattedDate = `${dayOfWeek} ${day} ${month} ${year}`;

    return <div>{formattedDate}</div>;
  }

  async function getReviewData() {
    try {
      const { data, error } = await supabase.from("review_rating").select(`*`);

      if (!data || error) {
      } else {
        setDataReview(data);
      }
    } catch (error) {}
  }

  useEffect(() => {
    getReviewData();
  }, []);

  function renderStar(starNumber) {
    let stars = [];
    for (let i = 0; i < starNumber; i++) {
      stars.push(<Image key={i} src={star} alt="star" className=" w-[15px]" />);
    }
    return stars;
  }

  return (
    <></>
    // <div className="flex justify-center">
    //   <div className="flex flex-col w-full max-w-[800px] h-[600px] rounded-[16px] ">
    //     <div className="flex justify-between items-center py-[20px] sm:py-[24px] px-[20px] sm:px-[40px] border-[#DCDFED] border-b-[1px] ">
    //       <h1 className="text-[16px] font-[700] leading-[32px]">
    //         Your Rating and Review
    //       </h1>
    //       <div className="h-[24px] w-[24px]">
    //         <Image src={close} alt="close_icon" />
    //       </div>
    //     </div>
    //     <div className="h-[450px] mx-[5px] overflow-y-auto">
    //       {/* map */}
    //       {dataReview.map((item, index) => (
    //         <div
    //           key={index}
    //           className="flex pt-[24px] px-[4px] sm:px-[24px] pb-[40px] border-b-[1px]"
    //         >
    //           <div className="flex flex-col sm:flex-row justify-start sm:justfy-center ">
    //             <div className="flex justify-center items-start w-[80px] h-[80px] md:w-[65px] md:h-[65px]">
    //               <Image
    //                 width={56}
    //                 height={56}
    //                 src={profile}
    //                 alt="profile_pic"
    //                 className="rounded-[999px]"
    //               />
    //             </div>
    //             <div className="sm:ml-[16px]">
    //               <p className="w-[100px] text-[16px] font-[500] leading-[26px]">
    //                 {item.full_name}
    //               </p>
    //               <p className="w-[120px] text-[14px] font-[500] leading-[24px] text-[#7B7E8F] ">
    //                 {CreateDay(item.created_at)}
    //               </p>
    //             </div>
    //           </div>
    //           <div className="flex flex-col mt-[5px] ml-[16px]">
    //             <div className="flex">{renderStar(item.rating)}</div>
    //             <p className="text-[16px] font-[500] leading-[28px] w-[500px] min-w-[170px] max-w-[500px]">
    //               {item.description}
    //             </p>
    //           </div>
    //         </div>
    //       ))}
    //       {/* map end */}
    //     </div>
    //     <button className="flex justify-between mt-[40px] mx-auto text-[16px] font-[700] leading-[24px] text-[#FF7037] bg-[#FFF1EC] py-[12px] px-[24px] rounded-[99px]">
    //       View Pet Sitter
    //     </button>
    //   </div>
    // </div>
  );
};

export default ReviewPage;
