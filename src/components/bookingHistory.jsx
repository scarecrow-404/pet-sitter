"use client";
import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import Image from "next/image";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import previewPet from "@/asset/images/catforsitterlist.jpg";
import callIcon from "@/asset/images/callIcon.svg";
import verticalLine from "@/asset/images/VerticalLine.svg";

function BookingHistory() {
  const [isOpenReview, setIsOpenReview] = useState(null);
  const [isOpenYourReview, setIsOpenYourReview] = useState(null);
  const [isOpenHistory, setIsOpenHistory] = useState(null);
  const [rating, setRating] = useState(null);
  const [hoverStar, setHoverStar] = useState(null);
  const [writeRating, setWriteRating] = useState("");

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

  const data = [
    {
      id: 1,
      Status: "Waiting for confirm",
      Date: "Tue, 16 Aug 2023",
      SitterName: "Happy House",
      by: "Jane Maison",
      DateAndTime: "25 Aug,2023 | 7 AM - 10 AM",
      Duration: "3 hours",
      Pet: "Bubba, Daisy",
      discription: "Waiting Pet Sitter for confirm booking",
      Image: previewPet,
      transtionid: "122312",
      total: "800 THB",
      review: "good",
    },
    {
      id: 2,
      Status: "In service",
      Date: "Tue, 16 Aug 2023",
      SitterName: "Happy House",
      by: "Jane Maison",
      DateAndTime: "25 Aug,2023 | 7 AM - 10 AM",
      Duration: "3 hours",
      Pet: "Bubba, Daisy",
      discription: "Your pet is already in Pet Sitter care!",
      Image: previewPet,
      transtionid: "122312",
      total: "550 THB",
      review: "aaaaaaaaaa",
    },
    {
      id: 3,
      Status: "Success",
      Date: "Tue, 16 Aug 2023",
      SitterName: "Happy House",
      by: "Jane Maison",
      DateAndTime: "25 Aug,2023 | 7 AM - 10 AM",
      Duration: "3 hours",
      Pet: "Bubba, Daisy",
      discription: "Success date: Tue, 26 Apr 2023 | 11:03 AM",
      Image: previewPet,
      transtionid: "122312",
      total: "930 THB",
      review: "goodaaa",
    },
    {
      id: 4,
      Status: "Success",
      Date: "Tue, 16 Aug 2023",
      SitterName: "Happy House",
      by: "Jane Maison",
      DateAndTime: "25 Aug,2023 | 7 AM - 10 AM",
      Duration: "3 hours",
      Pet: "Bubba, Daisy",
      discription: "Success date: Tue, 26 Apr 2023 | 11:03 AM",
      Image: previewPet,
      transtionid: "122312",
      total: "9450 THB",
      review: "",
    },
    {
      id: 5,
      Status: "Canceled",
      Date: "Tue, 16 Aug 2023",
      SitterName: "Happy House",
      by: "Jane Maison",
      DateAndTime: "25 Aug,2023 | 7 AM - 10 AM",
      Duration: "3 hours",
      Pet: "Bubba, Daisy",
      discription: "Waiting Pet Sitter for confirm booking",
      Image: previewPet,
      transtionid: "122312",
      total: "900 THB",
      review: "",
    },
  ];

  return (
    <div className="flex flex-col justify-center items-center py-6 gap-5 max-w-[1440px] mx-auto lg:gap-10 lg:py-14">
      <div className="w-[90%] flex flex-row justify-between md:w-[85%] lg:w-[83%]">
        <div className="font-bold text-lg">Booking History</div>
      </div>

      <div className="flex flex-col justify-center items-center w-[95%] py-5 gap-5">
        {data.map((item) => (
          <div
            key={item.id}
            className="border-2 border-fifthGray w-[90%] flex flex-col p-3 gap-3 rounded-2xl md:p-4 md:w-[95%] lg:w-[90%] cursor-pointer"
          >
            <div onClick={() => openHistory(item)}>
              <div className="one flex flex-col gap-2 pb-2 border-b md:flex-row md:justify-between">
                <div className="flex justify-between md:justify-start md:gap-1">
                  <div className="photo w-[80px] h-[80px] md:w-[65px] md:h-[65px]">
                    <Image
                      src={item.Image}
                      alt="preview-pet"
                      className="rounded-full w-[80px] h-[80px] md:w-[65px] md:h-[65px]"
                    />
                  </div>
                  <div className="w-[200px] flex flex-col justify-center gap-2 md:w-[250px] lg:w-[320px]">
                    <div className="text-base font-bold md:text-lg lg:text-xl">
                      {item.SitterName}
                    </div>
                    <div className="text-sm font-semibold md:text-base lg:text-lg">
                      By {item.by}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-1 md:text-right md:gap-3 md:justify-center">
                  <div className="text-fourthGray text-[13px] font-medium md:text-[15px] lg:text-[17px]">
                    Transaction date: {item.Date}
                  </div>
                  <div
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
                    } text-sm font-medium md:text-base lg:text-lg`}
                  >
                    • {item.Status}
                  </div>
                </div>
              </div>
              <div className="two flex flex-col gap-2 justify-center items-center md:flex-row">
                <div className="w-full flex flex-col gap-1">
                  <div className="text-thirdGray text-[13px] font-medium lg:text-[15px]">
                    Date & Time:
                  </div>
                  <div className="text-sm font-medium lg:text-base">
                    {item.DateAndTime}
                  </div>
                </div>
                <hr className="w-[80%] md:hidden" />
                <Image
                  src={verticalLine}
                  alt="vertical-line"
                  className="hidden md:block"
                />
                <div className="w-full flex flex-col gap-1">
                  <div className="text-thirdGray text-[13px] font-medium lg:text-[15px]">
                    Duration:
                  </div>
                  <div className="text-sm font-medium lg:text-base">
                    {item.Duration}
                  </div>
                </div>
                <hr className="w-[80%] md:hidden" />
                <Image
                  src={verticalLine}
                  alt="vertical-line"
                  className="hidden md:block"
                />
                <div className="w-full flex flex-col gap-1">
                  <div className="text-thirdGray text-[13px] font-medium lg:text-[15px]">
                    Pet:
                  </div>
                  <div className="text-sm font-medium lg:text-base">
                    {item.Pet}
                  </div>
                </div>
              </div>
            </div>

            {item.Status === "Waiting for confirm" ? (
              <div className="three flex justify-center bg-sixthGray rounded-lg py-3 md:py-4 md:justify-start md:px-6 lg:py-6">
                <div className="text-thirdGray text-[13px] font-medium md:text-[15px] lg:text-[17px]">
                  {item.discription}
                </div>
              </div>
            ) : item.Status === "In service" ? (
              <div className="three flex justify-evenly items-center bg-sixthGray rounded-lg py-3 gap-3 md:py-4 md:justify-between md:px-6 lg:py-6">
                <div className="text-thirdGray text-[13px] font-medium md:text-[15px] lg:text-[17px]">
                  {item.discription}
                </div>
                <button className="bg-sixthOrange p-2 rounded-full md:p-3">
                  <Image
                    src={callIcon}
                    alt="call-icon"
                    className="w-[10px] md:w-[15px]"
                  />
                </button>
              </div>
            ) : item.Status === "Success" && item.review === "" ? (
              <div className="three flex justify-evenly items-center gap-2 bg-secondGreen rounded-lg py-3 md:py-4 md:justify-between md:px-6 lg:py-6">
                <div className="text-firstGreen text-[13px] font-medium flex flex-col md:text-[15px] lg:text-[17px] lg:gap-2">
                  <div>Success date:</div>
                  <div>{item.Date}</div>
                </div>
                <button
                  onClick={() => openYourReview(item)}
                  className="bg-sixthOrange p-2 rounded-full text-xs font-medium text-secondOrange md:text-sm md:px-5 md:py-3"
                >
                  Your Review
                </button>
              </div>
            ) : item.Status === "Success" && item.review !== "" ? (
              <div className="three flex justify-evenly items-center gap-2 bg-secondGreen rounded-lg py-3 md:py-4 md:justify-between md:px-6 lg:py-6">
                <div className="text-firstGreen text-[13px] font-medium md:text-[15px] lg:text-[17px] lg:gap-2">
                  <div>Success date:</div>
                  <div>{item.Date}</div>
                </div>
                <button
                  onClick={() => openReview(item)}
                  className="bg-secondOrange p-2 rounded-full text-xs font-medium text-white md:text-sm md:px-5 md:py-3"
                >
                  Review
                </button>
              </div>
            ) : item.Status === "Canceled" ? (
              <div className="three flex justify-center bg-sixthGray rounded-lg py-3 md:py-4 md:justify-start md:px-6 lg:py-6">
                <div className="text-thirdGray text-[13px] font-medium md:text-[15px] lg:text-[17px]">
                  {item.discription}
                </div>
              </div>
            ) : null}
          </div>
        ))}
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
                          <label>
                            <input
                              type="radio"
                              name="rating"
                              value={currentRating}
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
                        id="yourReview"
                        name="yourReview"
                        rows="8"
                        placeholder="Your Review..."
                        className="w-full border-fifthGray text-sm rounded-md"
                        value={writeRating}
                        onChange={(event) => {
                          setWriteRating(event.target.value);
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
                  <div className="flex flex-col gap-3 border-b pb-3 md:flex-row md:gap-0">
                    <div className="flex justify-start gap-2 md:w-[48%]">
                      <div className="photo w-[70px] h-[70px] md:w-[65px] md:h-[65px]">
                        <Image
                          src={previewPet}
                          alt="preview-pet"
                          className="rounded-full w-[70px] h-[70px] md:w-[65px] md:h-[65px]"
                        />
                      </div>
                      <div className="w-[200px] flex flex-col justify-center gap-2 md:w-[170px]">
                        <div className="text-lg font-bold md:text-base">
                          John Wick
                        </div>
                        <div className="text-sm font-semibold text-thirdGray md:text-xs">
                          Tue, 13 Apr 2023
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-3 md:w-[48%] justify-center">
                      <div className="flex">
                        {[...Array(5)].map((star, index) => {
                          return (
                            <FaStar
                              className="cursor-pointer"
                              size={20}
                              color={"#1CCD83"}
                            />
                          );
                        })}
                      </div>
                      <div className="text-secondGray font-medium text-sm">
                        Thanks for I Som
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
                      isOpenHistory.Status === "Waiting for confirm"
                        ? "text-pink-500"
                        : isOpenHistory.Status === "Waiting for service"
                        ? "text-orange-300"
                        : isOpenHistory.Status === "In service"
                        ? "text-blue-500"
                        : isOpenHistory.Status === "Success"
                        ? "text-green-400"
                        : isOpenHistory.Status === "Canceled"
                        ? "text-red-400"
                        : null
                    } text-sm font-medium md:text-base`}
                  >
                    • {isOpenHistory.Status}
                  </div>

                  <div className="w-full flex flex-col gap-1">
                    <div className="text-fourthGray text-[13px] font-medium md:text-[15px]">
                      Transaction date: {isOpenHistory.DateAndTime}
                    </div>
                    <div className="text-fourthGray text-[13px] font-medium md:text-[15px]">
                      Transaction No.: {isOpenHistory.transtionid}
                    </div>
                  </div>

                  <div className="w-full flex flex-col gap-1">
                    <div className="text-thirdGray text-[13px] font-medium md:text-[14px]">
                      Pet Sitter:
                    </div>
                    <div className="text-sm font-medium md:text-[15px]">
                      {isOpenHistory.SitterName}
                    </div>
                  </div>

                  <div className="flex flex-col gap-3 md:flex-row md:gap-0 justify-between">
                    <div className="w-full flex flex-col gap-1 md:w-[48%]">
                      <div className="text-thirdGray text-[13px] font-medium md:text-[14px]">
                        Date & Time:
                      </div>
                      <div className="text-sm font-medium md:text-[15px]">
                        {isOpenHistory.DateAndTime}
                      </div>
                    </div>
                    <div className="w-full flex flex-col gap-1 md:w-[48%]">
                      <div className="text-thirdGray text-[13px] font-medium md:text-[14px]">
                        Duration:
                      </div>
                      <div className="text-sm font-medium md:text-[15px]">
                        {isOpenHistory.Duration}
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
                    <div>{isOpenHistory.total}</div>
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

export default BookingHistory;
