"use client";
import React from "react";
import Image from "next/image";
import Navbar from "@/components/common/Navbar";
import { useUser } from "@/hooks/hooks";
import supabase from "@/lib/utils/db";
import left from "@/asset/images/left_cat_meow_meow.svg";
import right from "@/asset/images/right_cat_meow_meow.svg";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
function Page() {
  const { bookingData, setBookingData } = useUser();
  const [tranDate, setTranDate] = useState("");
  const [tranNo, setTranNo] = useState("");
  const [dateBook, setDateBook] = useState("");
  const [sitterName, setSitterName] = useState("");
  const [fullName, setFullName] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [duration, setDuration] = useState("");
  const [total, setTotal] = useState("");
  const [pet, setPet] = useState([]);
  const idBook = bookingData.bookid;
  const router = useRouter();
  async function getBooking(id) {
    try {
      let { data: booking, error: bookError } = await supabase.rpc(
        "fetch_book_detail",
        { idbook: id }
      );

      let { data: bookPet, error: petError } = await supabase
        .from("booking_pet")
        .select(`*, pet(name)`)
        .eq("booking_id", id);

      if (booking && bookPet) {
        petName(bookPet);
        const datebook = formatDate(booking[0].booking_date);
        setDateBook(datebook);
        setSitterName(booking[0].sitter_name);
        setFullName(booking[0].full_name);
        const start = cutSeconds(booking[0].start_time);
        setStartTime(start);
        const end = cutSeconds(booking[0].end_time);
        setEndTime(end);
        setTotal(booking[0].total_amount);
        setDuration(booking[0].duration);
        setTranNo(booking[0].transaction_no);
        const dateTranSactionBook = formatDate(booking[0].transaction_date);
        setTranDate(dateTranSactionBook);
      } else {
      }
    } catch (error) {}
  }
  function HandleClickHome() {
    const path = `/`;
    const url = String(path);
    router.push(url);
  }

  function HandleClickBookHistory() {
    const path = `/account/booking-history`;
    const url = String(path);
    router.push(url);
  }

  function cutSeconds(timeString) {
    // Split the time string into hours, minutes, and seconds
    const [hours, minutes, seconds] = timeString.split(":");

    // Return the time string with seconds removed
    if (hours < 12) {
      return `${hours}:${minutes} AM`;
    } else if (hours > 12) {
      return `${hours}:${minutes} PM`;
    }
  }

  function petName(arr) {
    let allPetName = [];
    arr.map((item) => {
      allPetName.push(item.pet.name);
    });
    setPet(allPetName);
  }

  useEffect(() => {
    getBooking(idBook);
  }, []);

  function formatDate(date) {
    const bookingDate = new Date(date);

    const formattedBookingDate = bookingDate.toLocaleString("en-Uk", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
    return `${formattedBookingDate}`;
  }

  return (
    <>
      <div className=" max-w-[1440px] mx-auto">
        <Navbar />
      </div>

      <div className="bg-[#FAFAFB] flex flex-col justify-center">
        <div className="flex justify-center h-full">
          <div className="lg:w-[1440px] lg:h-[1024px] h-screen flex justify-center">
            <div className="hidden lg:block pr-[40px] ">
              <div className="">
                <Image src={left} alt="left_pic" />
              </div>
            </div>
            <div className=" flex flex-col items-center pt-[40px] lg:pt-[88px] ">
              <div className=" w-[318px] sm:w-[420px] md:w-[600px] lg:w-[632px] flex flex-col  ">
                <div className="text-center bg-black text-white gap-[40px] p-[24px] rounded-t-[16px] ">
                  <h1 className="text-[24px] lg:text-[36px] font-[700] leading-[36px] ">
                    Thank You For Booking
                  </h1>
                  <div className="lg:flex justify-center text-[16px] text-center text-[#AEB1C3] font-[500] leading-[28px]">
                    <p>We will send your booking </p>
                    <p>information to Pet Sitter.</p>
                  </div>
                </div>
                <div className="p-[20px] sm:p-[40px] gap-[24px] bg-white ">
                  <div className="text-[16px] text-[#AEB1C3] font-[500] leading-[28px]">
                    <p>Transaction Date: {tranDate}</p>
                    <p>Transaction No. : {tranNo}</p>
                  </div>
                  <div className="mt-[24px]">
                    <p className="text-[14px] text-[#7B7E8F] font-[500] leading-[24px]">
                      Pet Sitter:
                    </p>
                    <p className="text-[16px] font-[500] leading-[24px]">
                      {sitterName} By {fullName}
                    </p>
                  </div>
                  <div className="lg:flex flex-row">
                    <div className="mt-[10px] sm:mt-[24px] w-full">
                      <p className="text-[14px] text-[#7B7E8F] font-[500] leading-[24px]">
                        Date & Time:
                      </p>
                      <p className="text-[16px] font-[500] leading-[24px]">
                        {dateBook}| {startTime}-{endTime}
                      </p>
                    </div>
                    <div className="mt-[10px] sm:mt-[24px] lg:ml-[24px] w-full">
                      <p className="text-[14px] text-[#7B7E8F] font-[500] leading-[24px]">
                        Duration:
                      </p>
                      <p className="text-[16px] font-[500] leading-[24px]">
                        {duration} hours
                      </p>
                    </div>
                  </div>
                  <div className="my-[10px] sm:my-[24px]">
                    <p className="text-[14px] text-[#7B7E8F] font-[500] leading-[24px]">
                      Pet:
                    </p>
                    <div className="flex  gap-2 text-[16px] font-[500] leading-[24px]">
                      {pet.length > 0
                        ? pet.map(
                            (eachPet, index) =>
                              `${eachPet}${
                                index !== pet.length - 1 ? ", " : ""
                              }`
                          )
                        : "-"}
                    </div>
                  </div>
                  <hr />
                  <div className="flex flex-row justify-between mt-[10px] sm:mt-[24px]">
                    <p className="text-[16px] font-[500] leading-[28px]">
                      Total
                    </p>
                    <p className="text-[18px] font-[500] leading-[26px]">
                      {total}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex justify-center items-end w-full mt-[20px] sm:mt-[24px] gap-[5px] sm:gap-[16px]  h-[48px]">
                <button
                  className="text-[14px] md:text-[16px] font-[700] leading-[24px] w-[157px] sm:w-[165px] md:w-[180px] h-[48] py-[12px] sm:px-[24px] rounded-[99px] text-[#FF7037] bg-[#FFF1EC]"
                  onClick={HandleClickBookHistory}
                >
                  Booking History
                </button>
                <button
                  className="text-[14px] md:text-[16px] font-[700] leading-[24px] w-[157px] sm:w-[165px] md:w-[180px] h-[48] py-[12px] sm:px-[24px] rounded-[99px] text-white bg-[#FF7037]"
                  onClick={HandleClickHome}
                >
                  Back to Home
                </button>
              </div>
            </div>
            <div className="hidden h-[900px] lg:flex flex-col items-end justify-end pl-[40px] ">
              <div className="">
                <Image src={right} alt="right_pic" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Page;
