"use client";
import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import Image from "next/image";
import moment from "moment";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Avatar,
} from "@chakra-ui/react";
import previewPet from "@/asset/images/catforsitterlist.jpg";
import callIcon from "@/asset/images/callIcon.svg";
import verticalLine from "@/asset/images/VerticalLine.svg";
import supabase from "@/lib/utils/db";
import { useUser } from "@/hooks/hooks";
import star from "@/asset/images/star2.svg";

function BookingHistoryList({ bookingDetail }, props) {
  const [isOpenReview, setIsOpenReview] = useState(null);
  const [isOpenYourReview, setIsOpenYourReview] = useState(null);
  const [isOpenHistory, setIsOpenHistory] = useState(null);
  const [hoverStar, setHoverStar] = useState(null);
  const [writeRating, setWriteRating] = useState("");

  console.log(props, "poi");
  console.log(bookingDetail, "pois");

  function Duration(start, end) {
    const startTime = start ? moment(start, "HH:mm:ss") : null;
    const endTime = end ? moment(end, "HH:mm:ss") : null;

    let duration = null;
    if (startTime && endTime) {
      duration = Math.floor(moment.duration(endTime.diff(startTime)).asHours());
    } else {
      console.error("Invalid start_time or end_time");
    }

    return (
      <div className="text-sm font-medium lg:text-base">{duration} hours</div>
    );
  }

  function CreateDay(timeCreated) {
    const date = timeCreated;
    const dateObject = new Date(date);

    const daysOfWeek = ["Sun,", "Mon,", "Tue,", "Wed,", "Thu,", "Fri,", "Sat,"];

    const dayOfWeek = daysOfWeek[dateObject.getDay()];
    const day = String(dateObject.getDate()).padStart(2, "0");
    const month = dateObject.toLocaleString("en-US", { month: "long" });
    const year = dateObject.getFullYear();

    const formattedDate = `${dayOfWeek} ${day} ${month} ${year}`;

    return <div>{formattedDate}</div>;
  }

  function BookDay(bookDate) {
    const date = bookDate;
    const dateObject = new Date(date);

    const day = String(dateObject.getDate()).padStart(2, "0");

    const monthNames = [
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
    const monthIndex = dateObject.getMonth();
    const month = monthNames[monthIndex];

    const year = dateObject.getFullYear();
    const formattedDate = `${day} ${month}, ${year}`;

    return (
      <div className="text-sm font-medium lg:text-base">{formattedDate}</div>
    );
  }

  function ChangeTime(time) {
    const startTimeString = time;
    const dateObject = new Date(`2000-01-01T${startTimeString}`);
    // The date '2000-01-01' is arbitrary; it's only used to set the time part

    const hours = dateObject.getHours();
    const amOrPm = hours >= 12 ? "PM" : "AM";

    // Convert to 12-hour clock format
    const formattedHours = hours % 12 || 12;

    return (
      <div className="text-sm font-medium lg:text-base">{`${formattedHours} ${amOrPm}`}</div>
    );
  }

  function reviewDate(reviewDate) {
    const date = reviewDate;
    const dateObject = new Date(date);

    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    const monthNames = [
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

    const dayOfWeek = daysOfWeek[dateObject.getDay()];
    const day = String(dateObject.getDate()).padStart(2, "0");
    const monthIndex = dateObject.getMonth();
    const month = monthNames[monthIndex];
    const year = dateObject.getFullYear();

    const formattedDate = `${dayOfWeek} ${day} ${month} ${year}`;

    return <div>{formattedDate}</div>;
  }

  function renderStar(starNumber) {
    let stars = [];
    for (let i = 0; i < starNumber; i++) {
      stars.push(<Image key={i} src={star} alt="star" className=" w-[15px]" />);
    }
    return stars;
  }

  //////////////////

  const openReview = (item) => {
    setRating(null); // Reset rating when opening the modal
    setIsOpenReview(item);
  };

  const openYourReview = (item) => {
    setIsOpenYourReview(item);
  };

  const openHistory = (item) => {
    setIsOpenHistory(item);
  };

  const submitReview = (event) => {
    event.preventDefault();
    alert(`Rating: ${rating}, Review: ${writeRating}`);
  };

  async function insertReview(reviewData) {
    const rating = reviewData.get("rating");
    const description = reviewData.get("description");

    const { data, error } = await supabase
      .from("review")
      .insert([
        {
          rating,
          description,
        },
      ])
      .select();
    if (error) {
      console.log("found some error", error);
      return false;
    }
    console.log("Review inserted successfully:", data);
    return true;
  }

  // useEffect(() => {
  //   if (props.id && props.booking_id) {
  //     fetchData(props.id, props.booking_id);
  //   }
  // }, []);

  async function fetchData(sitterId, bookingId) {
    let { data: sitter, error: sitterError } = await supabase
      .from("pet_sitter")
      .select(`users(full_name, image_url)`)
      .eq("id", sitterId);
    if (sitter) {
      console.log(sitter, "1234");
      setBookingDetail([...bookingDetail, sitter]);
      console.log(sitter[0].users.full_name, "aaaaaaaaaaaaaaa");
      setPetSitterFullname([...petSitterFullname, sitter[0].users.full_name]);
      setPetSitterImage([...petSitterFullname, sitter[0].users.image_url]);
      let { data: review, error: reviewError } = await supabase
        .from("review")
        .select(`*`)
        .eq("booking_id", bookingId);
      if (review) {
        console.log(review, "12345");
        setDescription(review[0].description);
        setRating(review[0].rating);
        console.log(review, "aaaaaaaaaaaaaaah");
      } else if (reviewError || !review) {
        console.log(reviewError);
      }
      let { data: bookPet, error: petError } = await supabase
        .from("booking_pet")
        .select(`*, pet(name)`)
        .eq("booking_id", bookingId);
      if (bookPet) {
        console.log(bookPet, "123456");
        petName(bookPet);
      } else if (petError || !bookPet) {
        console.log(petError);
      }
    } else if (sitterError || !sitterError) {
      console.log(sitterError);
    }
  }

  return (
    <div className="flex flex-col justify-center items-center py-6 gap-5 max-w-[1440px] mx-auto lg:gap-10 lg:py-14">
      <div className="w-[90%] flex flex-row justify-between md:w-[85%] lg:w-[83%]">
        <div className="font-bold text-lg">Booking History</div>
      </div>

      <div className="flex flex-col justify-center items-center w-[95%] py-5 gap-5">
        <div className="border-2 border-fifthGray w-[90%] flex flex-col p-3 gap-3 rounded-2xl md:p-4 md:w-[95%] lg:w-[90%] cursor-pointer">
          <div onClick={() => openHistory(item)}>
            <div className="one flex flex-col gap-2 pb-2 border-b md:flex-row md:justify-between">
              <div className="flex md:items-center md:justify-start md:gap-1">
                <div className="photo flex justify-center items-center w-[80px] h-[80px] md:w-[65px] md:h-[65px]">
                  <Avatar
                    width={14}
                    height={14}
                    // width="auto"
                    // height="auto"
                    // src={petSitterImage}
                    alt="preview-pet"
                    className="rounded-full w-[80px] h-[80px] md:w-[65px] md:h-[65px]"
                  />
                </div>
                <div className="w-[200px] flex flex-col justify-center gap-2 md:w-[250px] lg:w-[320px]">
                  <div className="text-base font-bold md:text-lg lg:text-xl">
                    {props.sitterName}
                  </div>
                  <div className="text-sm font-semibold md:text-base lg:text-lg">
                    By {props.petSitterFullname}
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-1 md:text-right md:gap-3 md:justify-center">
                <div className="text-fourthGray text-[13px] font-medium md:text-[15px] lg:text-[17px]">
                  Transaction date: {props.created_at}
                </div>
                <div
                  className={`${
                    props.process_status === "Waiting for confirm"
                      ? "text-pink-500"
                      : props.process_status === "Waiting for service"
                      ? "text-orange-300"
                      : props.process_status === "In service"
                      ? "text-blue-500"
                      : props.process_status === "Success"
                      ? "text-green-400"
                      : props.process_status === "Canceled"
                      ? "text-red-400"
                      : null
                  } text-sm font-medium md:text-base lg:text-lg`}
                >
                  • {props.process_status}
                </div>
              </div>
            </div>

            <div className="two flex flex-col gap-2 justify-center items-center md:flex-row">
              <div className="w-full flex flex-col gap-1">
                <div className="text-thirdGray text-[13px] font-medium lg:text-[15px]">
                  Date & Time:
                </div>
                <div className="flex gap-[5px] text-sm font-medium lg:text-base">
                  {BookDay(props.booking_date)} | {ChangeTime(props.start_time)}{" "}
                  -{ChangeTime(props.end_time)}
                </div>
              </div>
              <hr className="w-[80%] md:hidden" />
              <Image
                width="auto"
                height="auto"
                src={verticalLine}
                alt="vertical-line"
                className="hidden md:block"
              />
              <div className="w-full flex flex-col gap-1">
                <div className="text-thirdGray text-[13px] font-medium lg:text-[15px]">
                  Duration:
                </div>

                <div className="text-sm font-medium lg:text-base">
                  {Duration(props.start_time, props.end_time)}
                </div>
              </div>
              <hr className="w-[80%] md:hidden" />
              <Image
                width="auto"
                height="auto"
                src={verticalLine}
                alt="vertical-line"
                className="hidden md:block"
              />
              <div className="w-full flex flex-col gap-1">
                <div className="text-thirdGray text-[13px] font-medium lg:text-[15px]">
                  Pet:
                </div>
                <div className="text-sm font-medium lg:text-base">pet</div>
              </div>
            </div>
          </div>

          {props.process_status === "Waiting for confirm" ? (
            <div className="three flex justify-center bg-sixthGray rounded-lg py-3 md:py-4 md:justify-start md:px-6 lg:py-6">
              <div className="text-thirdGray text-[13px] font-medium md:text-[15px] lg:text-[17px]">
                Waiting Pet Sitter for confirm booking
              </div>
            </div>
          ) : props.process_status === "In service" ? (
            <div className="three flex justify-evenly items-center bg-sixthGray rounded-lg py-3 gap-3 md:py-4 md:justify-between md:px-6 lg:py-6">
              <div className="text-thirdGray text-[13px] font-medium md:text-[15px] lg:text-[17px]">
                Your pet is already in Pet Sitter care!
              </div>
              <button className="bg-sixthOrange p-2 rounded-full md:p-3">
                <Image
                  width="auto"
                  height="auto"
                  src={callIcon}
                  alt="call-icon"
                  className="w-[10px] md:w-[15px]"
                />
              </button>
            </div>
          ) : props.process_status === "Success" && props.description !== "" ? (
            <div className="three flex justify-evenly items-center gap-2 bg-secondGreen rounded-lg py-3 md:py-4 md:justify-between md:px-6 lg:py-6">
              <div className="text-firstGreen text-[13px] font-medium flex flex-col md:text-[15px] lg:text-[17px] lg:gap-2">
                <div>Success date:</div>
                <div>{CreateDay(props.booking_date)}</div>
              </div>
              <button
                onClick={() => openYourReview(item)}
                className="bg-sixthOrange p-2 rounded-full text-xs font-medium text-secondOrange md:text-sm md:px-5 md:py-3"
              >
                Your Review
              </button>
            </div>
          ) : props.process_status === "Success" && props.description === "" ? (
            <div className="three flex justify-evenly items-center gap-2 bg-secondGreen rounded-lg py-3 md:py-4 md:justify-between md:px-6 lg:py-6">
              <div className="text-firstGreen text-[13px] font-medium md:text-[15px] lg:text-[17px] lg:gap-2">
                <div>Success date:</div>
                <div>{props.Date}</div>
              </div>
              <button
                onClick={() => openReview(item)}
                className="bg-secondOrange p-2 rounded-full text-xs font-medium text-white md:text-sm md:px-5 md:py-3"
              >
                Review
              </button>
            </div>
          ) : props.process_status === "Canceled" ? (
            <div className="three flex justify-center bg-sixthGray rounded-lg py-3 md:py-4 md:justify-start md:px-6 lg:py-6">
              <div className="text-thirdGray text-[13px] font-medium md:text-[15px] lg:text-[17px]">
                {props.discription}
              </div>
            </div>
          ) : props.process_status === "Waiting for service" ? (
            <div className="three flex justify-center bg-sixthGray rounded-lg py-3 md:py-4 md:justify-start md:px-6 lg:py-6">
              <div className="text-thirdGray text-[13px] font-medium md:text-[15px] lg:text-[17px]">
                {props.discription}
              </div>
            </div>
          ) : null}
        </div>
      </div>

      {/* Review Modal */}
      <Modal
        isOpen={isOpenReview !== null}
        onClose={() => setIsOpenReview(null)}
        size="xl"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Review & Rating</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {isOpenReview && (
              <>
                <form action="">
                  <div className="flex flex-col gap-7 pb-3 md:gap-14">
                    <div className="flex flex-col justify-center items-center gap-3">
                      <div className="text-base font-semibold md:text-lg">
                        What is your rate?
                      </div>
                      <div className="flex gap-2 md:gap-3">
                        {[...Array(5)].map((star, index) => {
                          const currentRating = index + 1;
                          return (
                            <label key={index}>
                              <input
                                type="radio"
                                name="rating"
                                value={rating}
                                onClick={() => setRating(currentRating)}
                                hidden
                              />
                              <FaStar
                                className="cursor-pointer"
                                size={40}
                                color={
                                  currentRating <= (hoverStar || rating)
                                    ? "#1CCD83"
                                    : "#e4e5e9"
                                }
                                onMouseEnter={() => setHoverStar(currentRating)}
                                onMouseLeave={() => setHoverStar(null)}
                              />
                            </label>
                          );
                        })}
                      </div>
                    </div>
                    <div className="flex flex-col gap-3">
                      <div className="text-center text-base font-semibold md:text-lg">
                        Share more about your experience
                      </div>
                      <label>
                        <textarea
                          id="description"
                          name="description"
                          rows="8"
                          placeholder="Your Review..."
                          className="w-full border-fifthGray text-sm rounded-md"
                          value={description}
                          onChange={(event) => {
                            setDescription(event.target.value);
                          }}
                        ></textarea>
                      </label>
                    </div>
                    <div className="flex justify-between">
                      <button className="bg-sixthOrange p-2 rounded-full text-xs font-medium text-secondOrange md:text-sm md:px-5 md:py-3">
                        Cancel
                      </button>
                      <button
                        className="bg-secondOrange p-2 rounded-full text-xs font-medium text-white md:text-sm md:px-5 md:py-3"
                        onClick={submitReview}
                      >
                        Send Review&Rating
                      </button>
                    </div>
                  </div>
                </form>
              </>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* Your Review Modal */}
      <Modal
        isOpen={isOpenYourReview !== null}
        onClose={() => setIsOpenYourReview(null)}
        size="xl"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Your Rating and Review</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {isOpenYourReview && (
              <>
                <div className="flex flex-col gap-11 p-3">
                  <div className="flex flex-col sm:flex-row gap-3 border-b pb-3 md:flex-row md:gap-0">
                    <div className="flex justify-start gap-2 md:w-[48%]">
                      <div className="photo w-[70px] h-[70px] md:w-[65px] md:h-[65px]">
                        <Image
                          src={isOpenYourReview.image_url}
                          width={70}
                          height={70}
                          alt="preview-pet"
                          className="rounded-full w-[70px] h-[70px] md:w-[65px] md:h-[65px]"
                        />
                      </div>
                      <div className="w-[200px] flex flex-col justify-center gap-2 md:w-[170px]">
                        <div className="text-lg font-bold md:text-base">
                          {isOpenYourReview.full_name}
                        </div>
                        <div className="text-sm font-semibold text-thirdGray md:text-xs">
                          {reviewDate(isOpenYourReview.created_at)}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-3 md:w-[48%] justify-center">
                      <div className="flex">{renderStar(rating)}</div>
                      <div className="text-secondGray font-medium text-sm">
                        {description}
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-center">
                    <button className="bg-sixthOrange p-2 px-4 rounded-full text-xs font-medium text-secondOrange md:text-sm md:px-5 md:py-3">
                      View Pet Sitter
                    </button>
                  </div>
                </div>
              </>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* Booking Detail Modal */}
      <Modal
        isOpen={isOpenHistory !== null}
        onClose={() => setIsOpenHistory(null)}
        size="xl"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Booking Detail</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {isOpenHistory && (
              <>
                <div className="flex flex-col gap-3 pb-3 md:gap-6">
                  <div
                    className={`${
                      isOpenHistory.process_status === "Waiting for confirm"
                        ? "text-pink-500"
                        : isOpenHistory.process_status === "Waiting for service"
                        ? "text-orange-300"
                        : isOpenHistory.process_status === "In service"
                        ? "text-blue-500"
                        : isOpenHistory.process_status === "Success"
                        ? "text-green-400"
                        : isOpenHistory.process_status === "Canceled"
                        ? "text-red-400"
                        : null
                    } text-sm font-medium md:text-base`}
                  >
                    • {isOpenHistory.process_status}
                  </div>

                  <div className="w-full flex flex-col gap-1">
                    <div className="text-fourthGray text-[13px] font-medium md:text-[15px]">
                      <div className="flex gap-[5px]">
                        Transaction date: {CreateDay(isOpenHistory.created_at)}
                      </div>
                    </div>
                    <div className="text-fourthGray text-[13px] font-medium md:text-[15px]">
                      Transaction No.: {isOpenHistory.id}
                    </div>
                  </div>

                  <div className="w-full flex flex-col gap-1">
                    <div className="text-thirdGray text-[13px] font-medium md:text-[14px]">
                      Pet Sitter:
                    </div>
                    <div className="text-sm font-medium md:text-[15px]">
                      {isOpenHistory.pet_sitter_render?.sitter_name} By{" "}
                      {isOpenHistory.pet_sitter_render?.full_name}
                    </div>
                  </div>

                  <div className="flex flex-col gap-3 md:flex-row md:gap-0 justify-between">
                    <div className="w-full flex flex-col gap-1 md:w-[48%]">
                      <div className="text-thirdGray text-[13px] font-medium md:text-[14px]">
                        Date & Time:
                      </div>
                      <div className="flex gap-[5px] text-sm font-medium md:text-[15px]">
                        {BookDay(isOpenHistory.booking_date)} |{" "}
                        {ChangeTime(isOpenHistory.start_time)} -
                        {ChangeTime(isOpenHistory.end_time)}
                      </div>
                    </div>
                    <div className="w-full flex flex-col gap-1 md:w-[48%]">
                      <div className="text-thirdGray text-[13px] font-medium md:text-[14px]">
                        Duration:
                      </div>
                      <div className="text-sm font-medium md:text-[15px]">
                        {Duration(
                          isOpenHistory.start_time,
                          isOpenHistory.end_time
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="w-full flex flex-col gap-1">
                    <div className="text-thirdGray text-[13px] font-medium md:text-[14px]">
                      Pet:
                    </div>
                    <div className="text-sm font-medium md:text-[15px]">
                      {isOpenHistory.Pet}
                    </div>
                  </div>
                  <hr />
                  <div className="font-bold text-base flex justify-between">
                    <div>Total</div>
                    <div>{isOpenHistory.total_amout}</div>
                  </div>
                </div>
              </>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default BookingHistoryList;
