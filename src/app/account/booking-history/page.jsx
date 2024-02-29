"use client";
import React, { useState, useEffect } from "react";
import Navbar from "@/components/common/Navbar";
import { AccountBar } from "@/components/AccountBar";
import supabase from "@/lib/utils/db";
import { useUser } from "@/hooks/hooks";
import BookingHistoryList from "@/components/BookingHistory";

const BookingHistory = () => {
  const [bookingDetail, setBookingDetail] = useState([]);
  const [rating, setRating] = useState();
  const [pet, setPet] = useState();
  const [data, setData] = useState([]);
  const { userId } = useUser();

  ///////
  const [sortOrder, setSortOrder] = useState("desc");
  const handleSort = (order) => {
    setSortOrder(order);

    // Sort the bookingDetail array based on created_at
    const sortedBookingDetail = [...bookingDetail].sort((a, b) => {
      const dateA = new Date(a.created_at).getTime();
      const dateB = new Date(b.created_at).getTime();

      return order === "desc" ? dateB - dateA : dateA - dateB;
    });

    setBookingDetail(sortedBookingDetail);
  };
  ///////

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
  async function fetchData(userId) {
    try {
      let { data: bookDetail, error: bookDetailError } = await supabase
        .from("booking_detail")
        .select(`*`)
        .eq("user_id", userId)
        .order("created_at", { ascending: sortOrder === "asc" });
      if (bookDetail) {
        setBookingDetail(bookDetail);
      } else if (bookDetailError || !bookDetailError) {
      }
    } catch (error) {}
  }
  return (
    <div className="max-w-[1440px] mx-auto bg-sixthGray gap-9">
      <Navbar />
      <div className="flex mt-5 ">
        <div className="mx-5 hidden lg:block bg-white max-w-[250px] h-fit rounded-xl">
          <AccountBar active={3} />
        </div>
        <div className="min-w-[320px] w-full bg-white rounded-xl md:ml-5 md:mr-5 md:mb-5 lg:ml-0">
          <div className=" mt-[40px] ml-[40px] flex flex-row justify-between md:w-[85%] lg:w-[83%]">
            <div className="font-bold text-lg pb-5">Booking History</div>
          </div>
          <div className="text-[16px] leading-[24px] font-[500] flex items-center justify-end gap-2 mr-[40px] md:mr-[50px] lg:mr-[60px] ">
            Sort by
            <select
              className="rounded-lg "
              onChange={(e) => handleSort(e.target.value)}
              value={sortOrder}
            >
              <option className="" value="desc">
                Newest
              </option>
              <option className="" value="asc">
                Oldest
              </option>
            </select>
          </div>
          {bookingDetail.map((item) => (
            <BookingHistoryList
              key={item.booking_id}
              sitter_name={item.sitter_name}
              pet_sitter_id={item.pet_sitter_id}
              full_name={item.full_name}
              created_at={item.created_at}
              process_status={item.process_status}
              booking_date={item.booking_date}
              start_time={item.start_time}
              end_time={item.end_time}
              total_amount={item.total_amount}
              image_url={item.image_url}
              transaction_no={item.transaction_no}
              booking_id={item.booking_id}
              id={item.id}
              user_id={item.user_id}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookingHistory;
