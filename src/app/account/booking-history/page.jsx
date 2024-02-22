"use client";
import React, { useState, useEffect } from "react";
import Navbar from "@/components/common/Navbar";
import { AccountBar } from "@/components/AccountBar";
import supabase from "@/lib/utils/db";
import { useUser } from "@/hooks/hooks";
import BookingHistoryList from "@/components/bookingHistory";

const BookingHistory = () => {
  const [bookingDetail, setBookingDetail] = useState([]);
  const [petSitterFullname, setPetSitterFullname] = useState([]);
  const [petSitterImage, setPetSitterImage] = useState([]);
  const [rating, setRating] = useState();
  const [description, setDescription] = useState();
  const [pet, setPet] = useState();
  const [data, setData] = useState([]);
  const { userId } = useUser();

  let sitterId;
  let bookingId;

  function petName(arr) {
    let allPetName = [];
    arr.map((item) => {
      allPetName.push(`${item.pet.name} `);
    });
    setPet(allPetName);
  }

  console.log(bookingDetail, "mmm");

  async function fetchData() {
    try {
      let { data: bookDetail, error: bookDetailError } = await supabase
        .from("booking_detail")
        .select(`*`)
        .eq("user_id", userId);
      if (bookDetail) {
        console.log(bookDetail, "123");
        setBookingDetail(bookDetail);
      } else if (bookDetailError || !bookDetailError) {
        console.log(bookDetailError);
      }
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  }

  return (
    <div className="max-w-[1440px] mx-auto bg-sixthGray gap-9">
      <Navbar />
      <div className="flex mt-5 ">
        <div className="mx-5 hidden lg:block bg-white max-w-[250px] h-fit rounded-xl">
          <AccountBar active={3} />
        </div>
        <div className="min-w-[375px] w-full bg-white rounded-xl md:ml-5 md:mr-5 md:mb-5 lg:ml-0">
          <BookingHistoryList userId={userId} />;
        </div>
      </div>
    </div>
  );
};

export default BookingHistory;
