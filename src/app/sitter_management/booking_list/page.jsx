"use client";
import React, { useEffect, useState } from "react";
import { Sidebar, TopBar } from "@/components/sidebar";
import { Input, Select } from "@chakra-ui/react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { event } from "jquery";
import supabase from "@/lib/utils/db";
import { useUser } from "@/hooks/hooks";

const BookingList = () => {
  const params = useParams();
  const router = useRouter();
  const dataMock = [
    {
      id: 1,
      PetOwnerName: "John Wick", //full_name //users
      amountPet: 2, //รับมา
      Duration: 3, //รับมา
      BookedDate: "25 Aug, 7 AM - 10 AM", //booking_data
      Status: "Waiting for confirm", //process_status
      TotalPaid: 150, //total_amout
      TransactionDate: "2024-02-03",
      TransactionNo: "1234567",
      AdditionalMessage: "I love my pet",
      Email: "johnwick@example.com", //email //users
      Phone: "1234567890", //phone_number //users
      IDNumber: "1234567890123", // ไม่มี
      DateOfBirth: "1990-01-01", //date_of_birth  //users
    },
  ];
  const [petData, setPetData] = useState([]);
  const [keywords, setKeywords] = useState("");
  const [keywordsStatus, setKeywordsStatus] = useState("");
  const [petCount, setPetCount] = useState({});
  const handleClick = (item) => {
    const path = `/sitter_management/booking_list/${item.id}`;

    const queryString = new URLSearchParams(item).toString();

    const url = String(path) + "?" + queryString;

    router.push(url);
  };

  async function getBookingList() {
    let { data, error } = await supabase
      .from("booking_list_render")
      .select("*")
      .eq("pet_sitter_id", 19);
    if (error || !data) {
      console.log(error);
    }

    // สร้างเซตเพื่อเก็บ id ที่เป็น unique
    let idSet = new Set();

    // นับจำนวน id แต่ละตัว

    let idCount = {};
    data.forEach((item) => {
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
    setPetData(data);
    setPetCount(idCount);
    console.log(petCount);
  }

  function filterSitterData(array) {
    const petType = [];
    const arr = [];
    const sitterArr = [];
    const idCount = [];
    let idSet = new Set();
    let totalCount = 0;
    array.filter((item) => {
      const index = arr.indexOf(item.sitterId);
      if (index == -1) {
        totalCount += 1;
        idCount.push(totalCount);
        arr.push(item.sitterId);
        sitterArr.push(item);
        petType.push(item.pet_type_master_id);
      } else {
        idCount[idCount.length - 1] += 1;

        petType.push(item.pet_type_master_id);
      }
    });
    setPrefer(petType);
    return sitterArr;
  }

  useEffect(() => {
    getBookingList();
    const filteredData = getKeywords();
    setPetData(filteredData);
  }, [keywords, keywordsStatus]);

  const getKeywords = () => {
    const regexKeywords = keywords.split(" ").join("|");
    const regex = new RegExp(regexKeywords, "ig");
    const results = petData.filter((item) => {
      return (
        item.PetOwnerName.match(regex) ||
        item.IDNumber.match(regex) ||
        item.Status.match(regex) ||
        item.BookedDate.match(regex)
      );
    });
    if (keywordsStatus) {
      const statusRegex = new RegExp(keywordsStatus, "ig");
      return results.filter((item) => item.Status.match(statusRegex));
    }
    return results;
  };
  const getStatusCount = (status) => {
    const count = petData.filter((item) => item.Status === status).length;
    return count;
  };
  return (
    <div className="flex bg-sixthGray justify-center">
      <div className="hidden bg-sixthGray lg:block relative">
        <Sidebar active={2} />
      </div>
      <div className="flex-1 min-w-[375px] mx-auto md:w-auto md:mx-3 bg-sixthGray max-w-[1200px] lg:ml-60">
        <TopBar />
        <div className="Title flex justify-between items-center py-3">
          <div className="nameTitle pl-5">Booking List</div>
          <div className="flex pr-5 gap-4">
            <Input
              size="md"
              htmlSize={4}
              width="auto"
              placeholder="Search..."
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
        <div className="Title flex justify-center items-start py-3 bg-white rounded-2xl lg:h-screen">
          <table className="border-separate border-slate-400 min-w-[375px] w-full md:max-w-[768px] md:w-full xl:max-w-[1440px] xl:w-full rounded-3xl overflow-hidden ">
            <thead className="text-white bg-black text-[13px] md:text-[14px]">
              <tr>
                <th className="text-center py-4 md:py-6">Name</th>
                <th className="text-center py-4 md:py-6 hidden md:table-cell ">
                  Pet(s)
                </th>
                <th className="text-center py-4 md:py-6 hidden md:table-cell">
                  Duration
                </th>
                <th className="text-center py-4 md:py-6">Booked Date</th>
                <th className="text-center py-4 md:py-6">Status</th>
              </tr>
            </thead>
            <tbody className="text-[13px] md:text-[16px]">
              {petData.map((item) => {
                return (
                  <tr
                    key={item.id}
                    onClick={() => handleClick(item)}
                    className="cursor-pointer hover:bg-fourthGray"
                  >
                    <td className="text-center py-2 md:py-6 ">
                      {item.full_name}
                    </td>
                    <td className="text-center py-2 md:py-6 hidden md:table-cell">
                      {petCount[item.id] || 1}
                    </td>
                    <td className="text-center py-2 md:py-6 hidden md:table-cell">
                      {item.Duration} hours
                    </td>
                    <td className="text-center py-2 md:py-6">
                      {item.booking_date}
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
