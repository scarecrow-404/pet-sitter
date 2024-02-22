"use client";
import React, { useState, useEffect } from "react";
import Navbar from "@/components/common/Navbar";
import { AccountBar } from "@/components/AccountBar";
import supabase from "@/lib/utils/db";
import { useUser } from "@/hooks/hooks";
import BookingHistoryList from "@/components/bookingHistory";

const BookingHistory = () => {
  const [bookingDetail, setBookingDetail] = useState([]);

  const [rating, setRating] = useState();

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

  useEffect(() => {
    if (userId) {
      fetchData(userId);
    }
  }, [userId]);

  console.log(bookingDetail, "mmm");

  async function fetchData(userId) {
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

  console.log(bookingDetail, "fgh");

  return (
    <div className="max-w-[1440px] mx-auto bg-sixthGray gap-9">
      <Navbar />
      <div className="flex mt-5 ">
        <div className="mx-5 hidden lg:block bg-white max-w-[250px] h-fit rounded-xl">
          <AccountBar active={3} />
        </div>
        <div className="min-w-[375px] w-full bg-white rounded-xl md:ml-5 md:mr-5 md:mb-5 lg:ml-0">
          <div className=" mt-[40px] ml-[40px] w-[90%] flex flex-row justify-between md:w-[85%] lg:w-[83%]">
            <div className="font-bold text-lg pb-5">Booking History</div>
          </div>
          {bookingDetail.map((item) => (
            <BookingHistoryList
              key={item.booking_id}
              sitter_name={item.sitter_name}
              full_name={item.full_name}
              created_at={item.created_at}
              process_status={item.process_status}
              booking_date={item.booking_date}
              start_time={item.start_time}
              end_time={item.end_time}
              total_amount={item.total_amount}
              img_url={item.img_url}
              transaction_no={item.transaction_no}
              booking_id={item.booking_id}
              id={item.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookingHistory;
