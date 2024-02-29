"use client";
import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
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
import star from "@/asset/images/Star2.svg";

function BookingHistoryList(props) {
  const [isOpenReview, setIsOpenReview] = useState(null);
  const [isOpenYourReview, setIsOpenYourReview] = useState(null);
  const [isOpenHistory, setIsOpenHistory] = useState(null);
  const [hoverStar, setHoverStar] = useState(null);
  //supabase db
  const [pet, setPet] = useState([]);
  const [petSitterFullname, setPetSitterFullname] = useState([]);
  const [petSitterImage, setPetSitterImage] = useState([]);
  const [petSitterPhoneNumber, setPetSitterPhoneNumber] = useState([]);
  const [description, setDescription] = useState();
  const [rating, setRating] = useState();
  //input value
  const [writeRating, setWriteRating] = useState(null);
  const [writeDescription, setWriteDescription] = useState();
  //
  const [checkStatus, setCheckStatus] = useState(props.process_status);

  function petName(arr) {
    let allPetName = [];
    arr.map((item) => {
      allPetName.push(`${item.pet.name} `);
    });
    setPet(allPetName);
  }

  const cleanedPetArray = pet.map((item) => item.trim());

  function duration(start, end) {
    const startTime = start ? moment(start, "HH:mm:ss") : null;
    const endTime = end ? moment(end, "HH:mm:ss") : null;

    let duration = null;
    if (startTime && endTime) {
      duration = Math.floor(moment.duration(endTime.diff(startTime)).asHours());
    } else {
    }

    return (
      <div className="text-sm font-medium lg:text-base">{duration} hours</div>
    );
  }

  function createDay(timeCreated) {
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

  function bookDay(bookDate) {
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

  function changeTime(time) {
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

  const openReview = (event) => {
    setWriteRating(null); // Reset rating when opening the modal
    setIsOpenReview(event);
  };

  const openYourReview = (event) => {
    setIsOpenYourReview(event);
  };

  const openHistory = (event) => {
    setIsOpenHistory(event);
  };

  const submitReview = (event) => {
    event.preventDefault();
    insertReview(
      writeRating,
      writeDescription,
      props.booking_id,
      props.user_id
    );
    setDescription(writeDescription);
    setCheckStatus("Success");

    setIsOpenReview(null);
  };

  async function insertReview(
    writeRating,
    writeDescription,
    booking_id,
    user_id
  ) {
    const { data, error } = await supabase
      .from("review")
      .insert([
        {
          booking_id: booking_id,
          rating: writeRating,
          description: writeDescription,
          created_at: new Date(),
          user_id: user_id,
        },
      ])
      .eq("booking_id", booking_id);

    if (error) {
      return false;
    }
    return true;
  }

  useEffect(() => {
    if (props.id && props.booking_id) {
      fetchData(props.id, props.booking_id);
    }
  }, []);

  async function fetchData(sitterId, bookingId) {
    let { data: sitter, error: sitterError } = await supabase
      .from("pet_sitter")
      .select(`users(full_name, image_url, phone_number)`)
      .eq("id", sitterId);
    if (sitter) {
      setPetSitterFullname([...petSitterFullname, sitter[0].users.full_name]);
      setPetSitterImage([...petSitterFullname, sitter[0].users.image_url]);
      setPetSitterPhoneNumber([
        ...petSitterPhoneNumber,
        sitter[0].users.phone_number,
      ]);

      let { data: bookPet, error: petError } = await supabase
        .from("booking_pet")
        .select(`*, pet(name)`)
        .eq("booking_id", bookingId);
      if (bookPet) {
        petName(bookPet);
      } else if (petError || !bookPet) {
      }
    } else if (sitterError || !sitterError) {
    }
    let { data: review, error: reviewError } = await supabase
      .from("review")
      .select(`*`)
      .eq("booking_id", bookingId);
    if (review) {
      setDescription(review[0]?.description);
      setRating(review[0]?.rating);
    } else if (reviewError || !review) {
    }
  }

  return (
    <div className="flex flex-col justify-center items-center gap-5 max-w-[1440px] mx-auto lg:gap-10">
      <div className="flex flex-col justify-center items-center w-[95%] py-5 gap-5">
        <div className="border-2 border-fifthGray w-[90%] flex flex-col p-3 gap-3 rounded-2xl md:p-4 md:w-[95%] lg:w-[90%] cursor-pointer">
          <div onClick={(event) => openHistory(event)}>
            <div className="one flex flex-col gap-2 pb-2 border-b md:flex-row md:justify-between">
              <div className="flex md:items-center md:justify-start md:gap-1">
                <div className="photo flex justify-center items-center w-[80px] h-[80px] md:w-[65px] md:h-[65px]">
                  <Avatar
                    width={14}
                    height={14}
                    // width="auto"
                    // height="auto"
                    src={petSitterImage}
                    alt="preview-pet"
                    className="rounded-full w-[80px] h-[80px] md:w-[65px] md:h-[65px]"
                  />
                </div>
                <div className="w-[200px] flex flex-col justify-center gap-2">
                  <div className="text-base font-bold md:text-lg lg:text-xl">
                    {props.sitter_name}
                  </div>
                  <div className="text-sm font-semibold md:text-base lg:text-lg">
                    By {petSitterFullname}
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-1 md:text-right md:gap-3 md:justify-center">
                <div className="sm:flex flex-row md:flex-col xl:flex-row  text-fourthGray text-[13px] font-medium md:text-[15px] lg:text-[17px]">
                  <span className="mr-[5px]">Transaction date:</span>
                  {createDay(props.created_at)}
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

            <div className="two flex flex-col gap-2 mt-2 justify-center md:flex-row">
              <div className="w-full md:w-[500px] lg:w-[620px] flex flex-col gap-1">
                <div className="text-thirdGray text-[13px] font-medium lg:text-[15px]">
                  Date & Time:
                </div>
                <div className="flex w-[220px] gap-[5px] text-sm font-medium lg:text-sm">
                  {bookDay(props.booking_date)}|{changeTime(props.start_time)}-
                  {changeTime(props.end_time)}
                </div>
              </div>
              <hr className="w-full md:hidden" />
              <Image
                width="auto"
                height="auto"
                src={verticalLine}
                alt="vertical-line"
                className="hidden md:block"
              />
              <div className="w-[200px] lg:w-[400px] flex flex-col gap-1">
                <div className="text-thirdGray text-[13px] font-medium lg:text-[15px]">
                  Duration:
                </div>

                <div className="text-sm font-medium lg:text-base">
                  {duration(props.start_time, props.end_time)}
                </div>
              </div>
              <hr className="w-full md:hidden" />
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
                <div className="text-sm font-medium lg:text-base">
                  {cleanedPetArray.length > 0
                    ? cleanedPetArray.map(
                        (eachPet, index) =>
                          `${eachPet}${index !== pet.length - 1 ? ", " : ""}`
                      )
                    : "-"}
                </div>
              </div>
            </div>
          </div>

          {checkStatus === "Waiting for confirm" ? (
            <div className="three flex justify-center bg-sixthGray rounded-lg py-3 md:py-4 md:justify-start md:px-6 lg:py-6">
              <div className="text-thirdGray text-[13px] font-medium md:text-[15px] lg:text-[17px]">
                Waiting Pet Sitter for confirm booking
              </div>
            </div>
          ) : checkStatus === "In service" ? (
            <div className="three flex justify-evenly items-center bg-sixthGray rounded-lg py-3 gap-3 md:py-4 md:justify-between md:px-6 lg:py-6">
              <div className="text-thirdGray text-[13px] font-medium md:text-[15px] lg:text-[17px]">
                <div className="flex flex-col sm:flex-row">
                  <span>Your pet is already</span>
                  <span>in Pet Sitter care!</span>
                </div>
              </div>
              <div className="sm:w-[150px] flex justify-end">
                <button className="bg-sixthOrange p-2 rounded-full md:p-3">
                  <a href={`tel:${petSitterPhoneNumber}`}>
                    <Image
                      width="auto"
                      height="auto"
                      src={callIcon}
                      alt="call-icon"
                      className="w-[10px] md:w-[15px]"
                    />
                  </a>
                </button>
              </div>
            </div>
          ) : checkStatus === "Success" && description ? (
            <div className="three flex justify-evenly items-center gap-2 bg-secondGreen rounded-lg py-3 md:py-4 md:justify-between md:px-6 lg:py-6 ">
              <div className="text-firstGreen text-[13px] font-medium md:text-[15px] lg:text-[17px] lg:gap-2">
                <div>Success date:</div>
                <div>{createDay(props.booking_date)}</div>
              </div>
              <button
                onClick={() => openYourReview(event)}
                className="bg-sixthOrange p-2 rounded-full text-xs font-medium text-secondOrange md:text-sm md:px-5 md:py-3"
              >
                Your Review
              </button>
            </div>
          ) : checkStatus === "Success" && !description ? (
            <div className="three flex justify-evenly items-center gap-2 bg-secondGreen rounded-lg py-3 md:py-4 md:justify-between md:px-6 lg:py-6">
              <div className="text-firstGreen text-[13px] font-medium md:text-[15px] lg:text-[17px] lg:gap-2">
                <div>Success date:</div>
                <div>{createDay(props.booking_date)}</div>
              </div>
              <button
                onClick={() => openReview(event)}
                className="bg-secondOrange p-2 rounded-full text-xs font-medium text-white md:text-sm md:px-5 md:py-3"
              >
                Review
              </button>
            </div>
          ) : checkStatus === "Canceled" ? (
            <div className="three flex justify-center bg-sixthGray rounded-lg py-3 md:py-4 md:justify-start md:px-6 lg:py-6">
              <div className="text-thirdGray text-[13px] font-medium md:text-[15px] lg:text-[17px]">
                {props.description}
              </div>
            </div>
          ) : checkStatus === "Waiting for service" ? (
            <div className="three flex justify-center bg-sixthGray rounded-lg py-3 md:py-4 md:justify-start md:px-6 lg:py-6">
              <div className="text-thirdGray text-[13px] font-medium md:text-[15px] lg:text-[17px]">
                {props.description}
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
                              value={currentRating}
                              onClick={() => setWriteRating(currentRating)}
                              hidden
                            />
                            <FaStar
                              className="cursor-pointer"
                              size={40}
                              color={
                                currentRating <= (hoverStar || writeRating)
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
                        value={writeDescription}
                        onChange={(event) => {
                          setWriteDescription(event.target.value);
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
                          src={props.image_url}
                          width={70}
                          height={70}
                          alt="preview-pet"
                          className="rounded-full w-[70px] h-[70px] md:w-[65px] md:h-[65px]"
                        />
                      </div>
                      <div className="w-[200px] flex flex-col justify-center gap-2 md:w-[170px]">
                        <div className="text-lg font-bold md:text-base">
                          {props.full_name}
                        </div>
                        <div className="text-sm font-semibold text-thirdGray md:text-xs">
                          {reviewDate(props.created_at)}
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
                    <Link
                      href={`/search/${props.pet_sitter_id}`}
                      className="bg-sixthOrange p-2 px-4 rounded-full text-xs font-medium text-secondOrange md:text-sm md:px-5 md:py-3"
                    >
                      View Pet Sitter
                    </Link>
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
                    } text-sm font-medium md:text-base`}
                  >
                    • {props.process_status}
                  </div>

                  <div className="w-full flex flex-col gap-1">
                    <div className="text-fourthGray text-[13px] font-medium md:text-[15px]">
                      <div className="flex gap-[5px]">
                        Transaction date: {createDay(props.created_at)}
                      </div>
                    </div>
                    <div className="text-fourthGray text-[13px] font-medium md:text-[15px]">
                      Transaction No.: {props.transaction_no}
                    </div>
                  </div>

                  <div className="w-full flex flex-col gap-1">
                    <div className="text-thirdGray text-[13px] font-medium md:text-[14px]">
                      Pet Sitter:
                    </div>
                    <div className="text-sm font-medium md:text-[15px]">
                      {props.sitter_name} By {props.full_name}
                    </div>
                  </div>

                  <div className="flex flex-col gap-3 md:flex-row md:gap-0 justify-between">
                    <div className="w-full flex flex-col gap-1 md:w-[48%]">
                      <div className="text-thirdGray text-[13px] font-medium md:text-[14px]">
                        Date & Time:
                      </div>
                      <div className="flex gap-[5px] text-sm font-medium md:text-[15px]">
                        {bookDay(props.booking_date)} |{" "}
                        {changeTime(props.start_time)} -
                        {changeTime(props.end_time)}
                      </div>
                    </div>
                    <div className="w-full flex flex-col gap-1 md:w-[48%]">
                      <div className="text-thirdGray text-[13px] font-medium md:text-[14px]">
                        Duration:
                      </div>
                      <div className="text-sm font-medium md:text-[15px]">
                        {duration(props.start_time, props.end_time)}
                      </div>
                    </div>
                  </div>

                  <div className="w-full flex flex-col gap-1">
                    <div className="text-thirdGray text-[13px] font-medium md:text-[14px]">
                      Pet:
                    </div>
                    <div className="text-sm font-medium md:text-[15px]">
                      {cleanedPetArray.length > 0
                        ? cleanedPetArray.map(
                            (eachPet, index) =>
                              `${eachPet}${
                                index !== pet.length - 1 ? ", " : ""
                              }`
                          )
                        : "-"}
                    </div>
                  </div>
                  <hr />
                  <div className="font-bold text-base flex justify-between">
                    <div>Total</div>
                    <div>{props.total_amount}</div>
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
