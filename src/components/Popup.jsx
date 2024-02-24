import React, { useState } from "react";
import Image from "next/image";
import iconCalenda from "@/asset/images/CalendaIcon.svg";
import iconClock from "@/asset/images/iconClock.svg";
import iconX from "@/asset/images/iconX.svg";
import ReactModal from "react-modal";
import TimePicker from "./TimePicker";
import { useUser } from "@/hooks/hooks";
import { useRouter } from "next/navigation";
import { SingleDatepicker } from "chakra-dayzed-datepicker";
import { useParams } from "next/navigation";
function PopupBooking() {
  const { bookingData, setBookingData } = useUser();
  const router = useRouter();

  const params = useParams();

  const openModal = () => {
    setBookingData({ ...bookingData, isModalOpen: true });
  };

  const closeModal = () => {
    setBookingData({ ...bookingData, isModalOpen: false });
  };
  const handleDate = (selectDate) => {
    setBookingData({ ...bookingData, date: selectDate });
  };
  const handleStartTimeChange = (time) => {
    setBookingData({ ...bookingData, startTime: time });
  };
  const handleEndTimeChange = (time) => {
    if (!bookingData.endTime) {
      alert("Please select end time.");
      return;
    }
    setBookingData({ ...bookingData, endTime: time });
  };
  const date = new Date();
  return (
    <>
      <div className="w-full h-auto p-[20px]  rounded-b-lg shadow-2xl">
        <button
          onClick={openModal}
          className="bg-secondOrange w-full rounded-2xl p-[10px] text-white hover:bg-thirdOrange focus:bg-firstOrange-400  active:bg-fifthOrange"
        >
          Book Now
        </button>
      </div>
      <div className="w-full">
        <ReactModal
          isOpen={bookingData.isModalOpen}
          onRequestClose={closeModal}
          className="flex top-1/2 left-1/2 items-center bg-white rounded-lg "
          style={{
            overlay: {
              zIndex: 30, // กำหนด z-index ของ overlay ให้มีค่าสูงกว่า Navbar
            },
          }}
          overlayClassName="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex justify-center items-center"
        >
          <div className=" h-fit  rounded-lg bg-white max-sm:w-[350px]">
            <div className="flex font-bold h-[32px] items-center justify-between px-[40px] py-[27px]">
              <p className=" text-[18px] font-bold md:text-[24px]">Booking</p>
              <button onClick={closeModal}>
                <Image src={iconX} alt="" />
              </button>
            </div>
            <hr></hr>

            <div className="flex flex-col p-[40px] text-[17px]">
              <div className="flex flex-col gap-5">
                <p>Select date and time you want to schedule the service.</p>
                <div className="flex gap-[16px] ">
                  <Image src={iconCalenda} alt="" />

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
                    date={bookingData.date}
                    onDateChange={handleDate}
                    minDate={date.setDate(date.getDate() - 1)}
                  />
                </div>
                <label className="flex gap-[16px] ">
                  <Image src={iconClock} alt="" />

                  <TimePicker
                    className="placeholder:italic placeholder:text-slate-400 w-[186px] h-[45px] border border-gray-400/40 p-[12px] rounded-lg max-sm:w-[95px] max-sm:text-[14px]"
                    onSelectTime={handleStartTimeChange}
                  />

                  <p className="flex items-center">-</p>
                  <TimePicker
                    className="placeholder:italic placeholder:text-slate-400 w-[186px] h-[45px] border border-gray-400/40 p-[12px] rounded-lg max-sm:w-[95px] max-sm:text-[14px]"
                    onSelectTime={handleEndTimeChange}
                  />
                </label>
                <div className="pt-[20px]">
                  <button
                    className="bg-secondOrange w-full rounded-3xl p-[10px] hover:bg-thirdOrange focus:bg-firstOrange-400  active:bg-fifthOrange text-white "
                    onClick={() => {
                      router.push(`/search/${params.sitterId}/booking`);
                    }}
                  >
                    Continue
                  </button>
                </div>
              </div>
            </div>
          </div>
        </ReactModal>
      </div>
    </>
  );
}

export default PopupBooking;
