"use client";
import React, { useEffect, useState } from "react";
import { Sidebar, TopBar } from "@/components/Sidebar";
import { Input, Select } from "@chakra-ui/react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { event } from "jquery";
import { createClient } from "@/lib/utils/client";

import { useUser } from "@/hooks/hooks";

const BookingList = () => {
  const supabase = createClient();
  const params = useParams();
  const router = useRouter();
  const { sitterId } = useUser();
  const [petData, setPetData] = useState([]);
  const [keywords, setKeywords] = useState("");
  const [keywordsStatus, setKeywordsStatus] = useState("");
  const [petCount, setPetCount] = useState({});

  //คลิกแล้วไปหน้า bookingของคนฝากเลี้ยง
  const handleClick = (item) => {
    const path = `/sitter_management/${sitterId}/booking_list/${item}`;

    // const queryString = new URLSearchParams(item).toString();

    // const url = String(path);

    router.push(path);
  };

  async function getBookingList() {
    let { data, error } = await supabase
      .from("booking_list_render")
      .select("*")
      .eq("pet_sitter_id", params.sitterId);
    if (error || !data) {
      console.log(error);
    }

    // สร้างเซตเพื่อเก็บ id ที่เป็น unique
    let idSet = new Set();
    let uniqueData = [];
    data?.forEach((item) => {
      if (!idSet.has(item.id)) {
        uniqueData.push(item);
        idSet.add(item.id);
      }
    });

    let idCount = {};
    data?.forEach((item) => {
      idSet.add(item.id);
      if (idCount[item.id]) {
        idCount[item.id]++;
      } else {
        idCount[item.id] = 1;
      }
    });

    // นับจำนวนข้อมูลทั้งหมดที่มี id ซ้ำกัน
    let totalCount = 0;
    for (const id in idCount) {
      totalCount += idCount[id];
    }

    console.log("Total number of unique IDs:", idSet.size);
    console.log("ID count map:", idCount);
    console.log("Total count of data with duplicate IDs:", totalCount);
    console.log("dataa", data);
    setPetData(uniqueData);
    setPetCount(idCount);
  }

  //เอาไว้คำนวนความต่างของเวลา
  function calculator(start_time, end_time) {
    const [startHour, startMinute] = start_time
      .split(":")
      .map((part) => parseInt(part));
    const [endHour, endMinute] = end_time
      .split(":")
      .map((part) => parseInt(part));
    let hourDifference = endHour - startHour;
    let minuteDifference = endMinute - startMinute;
    if (minuteDifference < 0) {
      minuteDifference += 60;
      hourDifference--;
    }
    const sum = hourDifference + "." + minuteDifference;

    return sum;
  }

  useEffect(() => {
    getBookingList();
    const filteredData = getKeywords();
    setPetData(filteredData);
  }, [keywords, keywordsStatus]);

  //แปลงข้อมูลวันที่ ที่แสดงออกมาเป็น dd/mm, time-time
  petData.forEach((item) => {
    const startTime = item.start_time.slice(0, 5);
    const endTime = item.end_time.slice(0, 5);
    const bookingDate = new Date(item.booking_date);
    const formattedDate = bookingDate.toLocaleDateString("en-Uk", {
      day: "numeric",
      month: "short",
    });

    item.formatted_booking_date = `${formattedDate}, ${startTime} - ${endTime}`;
  });

  //search หาแค่ชื่อของเจ้าของสัตว์เลี้ยง
  const getKeywords = () => {
    const regexKeywords = keywords.split(" ").join("|");
    const regex = new RegExp(regexKeywords, "ig");
    const results = petData.filter((item) => {
      return item.full_name.match(regex);
    });
    if (keywordsStatus) {
      const statusRegex = new RegExp(keywordsStatus, "ig");
      return results.filter((item) => item.process_status.match(statusRegex));
    }
    return results;
  };

  //รับ statusเข้ามา เอามาเทียบค่า
  const getStatusCount = (status) => {
    const count = petData.filter(
      (item) => item.process_status === status
    ).length;
    return count;
  };

  const filteredData = petData
    .filter((item) => {
      return (
        item.full_name.toLowerCase().includes(keywords.toLowerCase()) ||
        item.process_status.toLowerCase().includes(keywords.toLowerCase()) ||
        item.booking_date.toLowerCase().includes(keywords.toLowerCase())
      );
    })
    .filter((item) => {
      return (
        keywordsStatus === "" ||
        item.process_status.toLowerCase().includes(keywordsStatus.toLowerCase())
      );
    });

  return (
    <div className="flex bg-sixthGray justify-center">
      <div className="hidden bg-sixthGray lg:block relative">
        <Sidebar active={2} />
      </div>
      <div className="flex-1 min-w-[375px] mx-auto md:w-auto md:mx-3 bg-sixthGray max-w-[1200px] lg:ml-60">
        <TopBar />
        <div className="Title flex  ml-3 flex-col md:flex-row justify-between items-center py-3">
          <div className="nameTitle pl-5 text-[16px]  hidden md:flex lg:text-[22px] font-semibold">Booking List</div>
          <div className="flex pr-5 gap-4">
            <Input
              size="md"
              htmlSize={20}
              width="auto"
              placeholder="Search name..."
              value={keywords}
              onChange={(event) => {
                setKeywords(event.target.value);
              }}
            />
            <Select
              size="md"
              htmlSize={4}
              placeholder="All status"
              value={keywordsStatus}
              onChange={(event) => {
                setKeywordsStatus(event.target.value);
              }}
            >
              <option value="Waiting for confirm">
                Waiting for confirm ({getStatusCount("Waiting for confirm")})
              </option>
              <option value="Waiting for service">
                Waiting for service ({getStatusCount("Waiting for service")})
              </option>
              <option value="In service">
                In service ({getStatusCount("In service")})
              </option>
              <option value="Success">
                Success ({getStatusCount("Success")})
              </option>
              <option value="Canceled">
                Canceled ({getStatusCount("Canceled")})
              </option>
            </Select>
          </div>
        </div>
        <div className="Title flex justify-center items-start  bg-white rounded-3xl lg:h-screen">
          <table className=" border-slate-400 min-w-[375px] w-full  md:w-full xl:max-w-[1440px] xl:w-full rounded-3xl overflow-hidden ">
            <thead className="text-white bg-black text-[13px] md:text-[14px]">
              <tr>
                <th className="text-center w-[200px] py-4 md:py-6">Name</th>
                <th className="text-center w-[50px] py-4 md:py-6 hidden md:table-cell ">
                  Pet(s)
                </th>
                <th className="text-center w-[150px] py-4 md:py-6 hidden md:table-cell">
                  Duration
                </th>
                <th className="text-center w-[200px] py-4 md:py-6">Booked Date</th>
                <th className="text-center w-[200px] py-4 md:py-6">Status</th>
              </tr>
            </thead>
            <tbody className="text-[13px] md:text-[16px]">
              {filteredData.map((item) => {
                return (
                  <tr
                    key={item.id}
                    onClick={() => handleClick(item.id)}
                    className="cursor-pointer hover:bg-sixthGray"
                  >
                    <td className="text-center py-2 md:py-6 ">
                      {item.full_name}
                    </td>
                    <td className="text-center py-2 md:py-6 hidden md:table-cell">
                      {petCount[item.id] || 1}
                    </td>
                    <td className="text-center py-2 md:py-6 hidden md:table-cell">
                      {calculator(item.start_time, item.end_time)} hours
                    </td>
                    <td className="text-center py-2 md:py-6">
                      {item.formatted_booking_date}
                    </td>
                    <td
                      className={`${
                        item.process_status === "Waiting for confirm"
                          ? "text-pink-500"
                          : item.process_status === "Waiting for service"
                          ? "text-orange-300"
                          : item.process_status === "In service"
                          ? "text-blue-500"
                          : item.process_status === "Success"
                          ? "text-green-400"
                          : item.process_status === "Canceled"
                          ? "text-red-400"
                          : null
                      } text-center py-2 md:py-6`}
                    >
                      • {item.process_status}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BookingList;
