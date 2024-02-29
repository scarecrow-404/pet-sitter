"use client";
import React, { useEffect, useState } from "react";
import { Sidebar, TopBar } from "@/components/Sidebar";
import { Input, Select } from "@chakra-ui/react";
import { useParams, useRouter } from "next/navigation";
import supabase from "@/lib/utils/db";
import { useUser } from "@/hooks/hooks";
import { SingleDatepicker } from "chakra-dayzed-datepicker";
import withAuth from "@/lib/utils/withAuth";
import { Skeleton, Box, SkeletonCircle, SkeletonText } from "@chakra-ui/react";
const BookingList = () => {
  const params = useParams();
  const router = useRouter();
  const { sitterId, user } = useUser();
  const [petData, setPetData] = useState([]);
  const [loading, setloading] = useState(false);
  const [keywords, setKeywords] = useState("");
  const [keywordsStatus, setKeywordsStatus] = useState("");
  const [petCount, setPetCount] = useState({});
  const [date, setDate] = useState(new Date());
  const [dateString, setDateString] = useState("");
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();
  //คลิกแล้วไปหน้า bookingของคนฝากเลี้ยง
  const handleClick = (item) => {
    const path = `/sitter_management/${sitterId}/booking_list/${item}`;
    router.push(path);
  };
  async function getBookingList() {
    setloading(true);
    let { data, error } = await supabase
      .from("booking_list_render")
      .select("*")
      .eq("pet_sitter_id", params.sitterId);
    if (error || !data) {
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

    // const start = cutSeconds(uniqueData.start_time);
    // setStartTime(start);
    // const end = cutSeconds(uniqueData.end_time);
    // setEndTime(end);

    setPetData(uniqueData);
    setPetCount(idCount);
    setloading(false);
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
    if (user?.user_type === "sitter") {
      getBookingList();
      const filteredData = getKeywords();
      setPetData(filteredData);
    }
  }, [keywords, keywordsStatus, dateString]);
  useEffect(() => {
    let isMounted = true;
    const fetchDataAsync = async () => {
      try {
        if (!user) {
          throw new Error("User data not available");
        }
        if (
          params.sitterId !== undefined &&
          sitterId !== undefined &&
          params.sitterId !== null &&
          sitterId !== null &&
          params.sitterId != sitterId
        ) {
          router.push("/");
        } else if (user.user_type === "sitter" && params.sitterId == sitterId) {
          await Promise.all([getBookingList(), getKeywords()]);
          if (isMounted) {
            const filteredData = getKeywords();
            setPetData(filteredData);
          }
        }
      } catch (error) {}
    };

    fetchDataAsync();

    return () => {
      isMounted = false;
    };
  }, [user]);
  //แปลงข้อมูลวันที่ ที่แสดงออกมาเป็น dd/mm, time-time
  petData.forEach((item) => {
    const startTime = item.start_time.split(":");
    const endTime = item.end_time.split(":");
    const bookingDate = new Date(item.booking_date);
    const formattedDate = bookingDate.toLocaleDateString("en-Uk", {
      day: "numeric",
      month: "short",
    });

    item.formatted_booking_date = `${formattedDate}, ${startTime} - ${endTime}`;
    item.formatted_formattedDate = `${formattedDate}`;
  });
  function formatTime(startTime, endTime) {
    const startTimeWithoutSeconds = startTime.slice(0, -3);
    const endTimeWithoutSeconds = endTime.slice(0, -3);

    const startTimeHours = parseInt(startTimeWithoutSeconds.split(":")[0]);
    const endTimeHours = parseInt(endTimeWithoutSeconds.split(":")[0]);
    if (startTimeHours < 12 && endTimeHours < 12) {
      return `${startTimeWithoutSeconds} AM - ${endTimeWithoutSeconds} AM`;
    } else if (startTimeHours >= 12 && endTimeHours >= 12) {
      return `${startTimeWithoutSeconds} PM - ${endTimeWithoutSeconds} PM`;
    } else if (startTimeHours >= 12 && endTimeHours < 12) {
      return `${startTimeWithoutSeconds} PM - ${endTimeWithoutSeconds} AM`;
    } else if (startTimeHours < 12 && endTimeHours >= 12) {
      return `${startTimeWithoutSeconds} AM - ${endTimeWithoutSeconds} PM`;
    }
  }
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

  function formatDate(inputDate) {
    const dateObject = new Date(inputDate);
    const formattedDate = dateObject.toLocaleDateString("en-UK", {
      day: "numeric",
      month: "short",
    });
    return formattedDate;
  }

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
    })
    .filter((item) => {
      return item.formatted_formattedDate
        .toLowerCase()
        .includes(dateString.toLowerCase());
    });
  return (
    <div className="flex bg-sixthGray justify-center">
      <div className="hidden bg-sixthGray lg:block relative">
        <Sidebar active={2} />
      </div>
      <div className="flex-1 min-w-[320px] md:w-auto md:mx-3 bg-sixthGray max-w-[1200px] lg:ml-60">
        <TopBar />
        <div className="Title flex flex-col xl:flex-row justify-between items-center py-3">
          <div className="nameTitle pl-5 text-[16px] md:flex lg:text-[22px] font-semibold">
            Booking List
          </div>
          <div className="grid grid-cols-2 md:flex gap-[12px] mt-[12px] xl:mt-0 md:max-w-[800px] mx-[10px]">
            <div className="">
              <Input
                placeholder="Search name..."
                value={keywords}
                onChange={(event) => {
                  setKeywords(event.target.value);
                }}
              />
            </div>
            <div>
              <SingleDatepicker
                propsConfigs={{
                  dayOfMonthBtnProps: {
                    defaultBtnProps: { _hover: { bg: "#FF7037" } },
                    selectedBtnProps: {
                      bg: "#FF7037",
                      color: "black",
                      _hover: {
                        bg: "#FF7037.100",
                      },
                    },
                  },
                }}
                name="date-input"
                date={date}
                onDateChange={(newDate) => {
                  setDate(newDate);
                  setDateString(formatDate(newDate));
                }}
              />
            </div>
            <div className="col-span-2">
              <Select
                htmlSize={2}
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
        </div>
        {loading ? (
          <Box padding="6" boxShadow="lg" bg="white">
            <SkeletonCircle size="10" />
            <SkeletonText
              mt="10"
              noOfLines={15}
              spacing="4"
              skeletonHeight="2"
            />
          </Box>
        ) : (
          <div className="Title flex justify-center items-start  bg-white rounded-3xl lg:h-screen">
            <table className=" border-slate-400 min-w-[320px] w-full  md:w-full xl:max-w-[1440px] xl:w-full rounded-3xl overflow-hidden ">
              <thead className="text-white bg-black text-[13px] md:text-[14px]">
                <tr>
                  <th className="text-center w-[200px] py-4 md:py-6">Name</th>
                  <th className="text-center w-[50px] py-4 md:py-6 hidden md:table-cell ">
                    Pet(s)
                  </th>
                  <th className="text-center w-[150px] py-4 md:py-6 hidden md:table-cell">
                    Duration
                  </th>
                  <th className="text-center w-[200px] py-4 md:py-6">
                    Booked Date
                  </th>
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
                        {item.formatted_formattedDate} ,{" "}
                        {formatTime(item.start_time, item.end_time)}
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
        )}
      </div>
    </div>
  );
};

export default withAuth(BookingList);
