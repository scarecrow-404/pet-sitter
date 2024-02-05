"use client";
import React, { useEffect, useState } from "react";
import { Sidebar, TopBar } from "@/components/sidebar";
import { Input, Select } from "@chakra-ui/react";

import { useRouter } from "next/navigation";
import { event } from "jquery";
const BookingList = () => {
  const router = useRouter();
  const data = [
    {
      id: 1,
      PetOwnerName: "John Wick",
      amountPet: 2,
      Duration: 3,
      BookedDate: "25 Aug, 7 AM - 10 AM",
      Status: "Waiting for confirm",
      TotalPaid: 150,
      TransactionDate: "2024-02-03",
      TransactionNo: "1234567",
      AdditionalMessage: "I love my pet",
      Email: "johnwick@example.com",
      Phone: "1234567890",
      IDNumber: "1234567890123",
      DateOfBirth: "1990-01-01",
    },
    {
      id: 2,
      PetOwnerName: "Aaron",
      amountPet: 2,
      Duration: 3,
      BookedDate: "25 Aug, 7 AM - 10 AM",
      Status: "Waiting for service",
      TotalPaid: 200,
      TransactionDate: "2024-02-03",
      TransactionNo: "2345678",
      AdditionalMessage: "I miss my pet",
      Email: "johnwick@example.com",
      Phone: "1234567890",
      IDNumber: "1234567890123",
      DateOfBirth: "1990-01-01",
    },
    {
      id: 3,
      PetOwnerName: "Alisha",
      amountPet: 2,
      Duration: 3,
      BookedDate: "25 Aug, 7 AM - 10 AM",
      Status: "In service",
      TotalPaid: 250,
      TransactionDate: "2024-02-03",
      TransactionNo: "3456789",
      AdditionalMessage: "My pet is happy",
      Email: "johnwick@example.com",
      Phone: "1234567890",
      IDNumber: "1234567890123",
      DateOfBirth: "1990-01-01",
    },
    {
      id: 4,
      PetOwnerName: "Benjamin",
      amountPet: 2,
      Duration: 3,
      BookedDate: "25 Aug, 7 AM - 10 AM",
      Status: "Success",
      TotalPaid: 300,
      TransactionDate: "2024-02-03",
      TransactionNo: "4567890",
      AdditionalMessage: "My pet is healthy",
      Email: "johnwick@example.com",
      Phone: "1234567890",
      IDNumber: "1234567890123",
      DateOfBirth: "1990-01-01",
    },
    {
      id: 5,
      PetOwnerName: "Camilla",
      amountPet: 2,
      Duration: 3,
      BookedDate: "25 Aug, 7 AM - 10 AM",
      Status: "Canceled",
      TotalPaid: 0,
      TransactionDate: "2024-02-03",
      TransactionNo: "5678901",
      AdditionalMessage: "Sorry for the inconvenience",
      Email: "johnwick@example.com",
      Phone: "1234567890",
      IDNumber: "1234567890123",
      DateOfBirth: "1990-01-01",
    },
    {
      id: 6,
      PetOwnerName: "Daisy",
      amountPet: 2,
      Duration: 3,
      BookedDate: "25 Aug, 7 AM - 10 AM",
      Status: "Canceled",
      TotalPaid: 0,
      TransactionDate: "2024-02-03",
      TransactionNo: "6789012",
      AdditionalMessage: "Looking forward to rebooking",
      Email: "johnwick@example.com",
      Phone: "1234567890",
      IDNumber: "1234567890123",
      DateOfBirth: "1990-01-01",
    },
    {
      id: 7,
      PetOwnerName: "Emmalee",
      amountPet: 2,
      Duration: 3,
      BookedDate: "25 Aug, 7 AM - 10 AM",
      Status: "Canceled",
      TotalPaid: 0,
      TransactionDate: "2024-02-03",
      TransactionNo: "7890123",
      AdditionalMessage: "Next time, please call in advance",
      Email: "johnwick@example.com",
      Phone: "1234567890",
      IDNumber: "1234567890123",
      DateOfBirth: "1990-01-01",
    },
    {
      id: 8,
      PetOwnerName: "Gavin",
      amountPet: 2,
      Duration: 3,
      BookedDate: "25 Aug, 7 AM - 10 AM",
      Status: "Canceled",
      TotalPaid: 0,
      TransactionDate: "2024-02-03",
      TransactionNo: "8901234",
      AdditionalMessage: "My pet is not feeling well",
      Email: "johnwick@example.com",
      Phone: "1234567890",
      IDNumber: "1234567890123",
      DateOfBirth: "1990-01-01",
    },
    {
      id: 9,
      PetOwnerName: "Isabella",
      amountPet: 2,
      Duration: 3,
      BookedDate: "25 Aug, 7 AM - 10 AM",
      Status: "Canceled",
      TotalPaid: 0,
      TransactionDate: "2024-02-03",
      TransactionNo: "9012345",
      AdditionalMessage: "Please refund my payment",
      Email: "johnwick@example.com",
      Phone: "1234567890",
      IDNumber: "1234567890123",
      DateOfBirth: "1990-01-01",
    },
    {
      id: 10,
      PetOwnerName: "Jennaleek",
      amountPet: 2,
      Duration: 3,
      BookedDate: "25 Aug, 7 AM - 10 AM",
      Status: "Canceled",
      TotalPaid: 0,
      TransactionDate: "2024-02-03",
      TransactionNo: "0123456",
      AdditionalMessage: "I have a scheduling conflict",
      Email: "johnwick@example.com",
      Phone: "1234567890",
      IDNumber: "1234567890123",
      DateOfBirth: "1990-01-01",
    },
    {
      id: 11,
      PetOwnerName: "Katharine",
      amountPet: 2,
      Duration: 3,
      BookedDate: "25 Aug, 7 AM - 10 AM",
      Status: "In service",
      TotalPaid: 350,
      TransactionDate: "2024-02-03",
      TransactionNo: "1234567",
      AdditionalMessage: "My pet is enjoying the service",
      Email: "johnwick@example.com",
      Phone: "1234567890",
      IDNumber: "1234567890123",
      DateOfBirth: "1990-01-01",
    },
    {
      id: 12,
      PetOwnerName: "Latisha",
      amountPet: 2,
      Duration: 3,
      BookedDate: "25 Aug, 7 AM - 10 AM",
      Status: "Success",
      TotalPaid: 400,
      TransactionDate: "2024-02-03",
      TransactionNo: "2345678",
      AdditionalMessage: "Highly recommend this service",
      Email: "johnwick@example.com",
      Phone: "1234567890",
      IDNumber: "1234567890123",
      DateOfBirth: "1990-01-01",
    },
    {
      id: 13,
      PetOwnerName: "Maglorix",
      amountPet: 2,
      Duration: 3,
      BookedDate: "25 Aug, 7 AM - 10 AM",
      Status: "In service",
      TotalPaid: 450,
      TransactionDate: "2024-02-03",
      TransactionNo: "3456789",
      AdditionalMessage: "My pet is so happy!",
      Email: "johnwick@example.com",
      Phone: "1234567890",
      IDNumber: "1234567890123",
      DateOfBirth: "1990-01-01",
    },
  ];
  const handleClick = (item) => {
    const path = `/sitter_management/booking_list/${item.id}`;

    const queryString = new URLSearchParams({
      id: item.id,
      name: item.PetOwnerName,
      amountPet: item.amountPet,
      Duration: item.Duration,
      BookedDate: item.BookedDate,
      Status: item.Status,
      TotalPaid: item.TotalPaid,
      TransactionDate: item.TransactionDate,
      TransactionNo: item.TransactionNo,
      AdditionalMessage: item.AdditionalMessage,
      Email: item.Email,
      Phone: item.Phone,
      IDNumber: item.IDNumber,
      DateOfBirth: item.DateOfBirth,
    }).toString();

    const url = String(path) + "?" + queryString;

    router.push(url);
  };
  const [petData, setPetData] = useState([...data]);
  const [keywords, setKeywords] = useState("");
  const [keywordsStatus, setKeywordsStatus] = useState("");
  useEffect(() => {
    const filteredData = getKeywords();
    setPetData(filteredData);
  }, [keywords, keywordsStatus]);
  const getKeywords = () => {
    const regexKeywords = keywords.split(" ").join("|");
    const regex = new RegExp(regexKeywords, "ig");
    const results = data.filter((item) => {
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
    const count = data.filter((item) => item.Status === status).length;
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
              htmlSize={4}
              width="auto"
              placeholder="Search..."
              value={keywords}
              onChange={(event) => {
                setKeywords(event.target.value);
              }}
            />
            <Select
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
                      {item.PetOwnerName}
                    </td>
                    <td className="text-center py-2 md:py-6 hidden md:table-cell">
                      {item.amountPet}
                    </td>
                    <td className="text-center py-2 md:py-6 hidden md:table-cell">
                      {item.Duration}
                    </td>
                    <td className="text-center py-2 md:py-6">
                      {item.BookedDate}
                    </td>
                    <td
                      className={`${
                        item.Status === "Waiting for confirm"
                          ? "text-pink-500"
                          : item.Status === "Waiting for service"
                          ? "text-orange-300"
                          : item.Status === "In service"
                          ? "text-blue-500"
                          : item.Status === "Success"
                          ? "text-green-400"
                          : item.Status === "Canceled"
                          ? "text-red-400"
                          : null
                      } text-center py-2 md:py-6`}
                    >
                      {item.Status}
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
