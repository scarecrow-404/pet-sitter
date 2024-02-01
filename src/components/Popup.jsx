import React, { useState } from "react";
import Image from "next/image";
import iconCalenda from "@/asset/images/CalendaIcon.svg";
import iconClock from "@/asset/images/iconClock.svg";
import iconX from "@/asset/images/iconX.svg";
import ReactModal from "react-modal";
import { Datepicker } from "flowbite-react";
import TimePicker from "./TimePicker";

function PopupBooking() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [date, setDate] = useState("");

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const handleDate = (date) => {
    setDate(date);
  };
  const handleStartTimeChange = (time) => {
    setStartTime(time);
  };
  const handleEndTimeChange = (time) => {
    setEndTime(time);
    // Add any additional logic you need when the time changes
  };
  return (
    <>
      <div className="w-full h-auto p-[20px] border-2 rounded-lg shadow-2xl">
        <button
          onClick={openModal}
          className="bg-secondOrange w-full rounded-2xl p-[10px] text-white hover:bg-thirdOrange focus:bg-firstOrange-400  active:bg-fifthOrange"
        >
          Book Now
        </button>
      </div>
      <div className="w-full">
        <ReactModal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          className="flex top-1/2 left-1/2 items-center bg-white rounded-lg "
          overlayClassName="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex justify-center items-center"
        >
          <div className=" h-fit  rounded-lg bg-white max-sm:w-[320px]">
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
                <div className="flex gap-[16px]">
                  <Image src={iconCalenda} alt="" />

                  <Datepicker
                    class="w-[412px] h-[40px] pl-[25px] border border-gray-400/40 p-[12px] rounded-lg  max-sm:w-[200px] max-sm:text-[14px] "
                    onChange={(e) => {
                      handleDate(e.target.value);
                    }}
                  />
                  {/* <input
                    className=" placeholder:italic placeholder:text-slate-400 w-[412px] h-[40px] border border-gray-400/40 p-[12px] rounded-lg  max-sm:w-[200px] max-sm:text-[14px]"
                    placeholder="DD/MM/YY"
                  ></input> */}
                </div>
                <label className="flex gap-[16px] ">
                  <Image src={iconClock} alt="" />

                  <TimePicker
                    className="placeholder:italic placeholder:text-slate-400 w-[186px] h-[45px] border border-gray-400/40 p-[12px] rounded-lg max-sm:w-[80px] max-sm:text-[14px]"
                    onSelectTime={handleStartTimeChange}
                  />

                  <p className="flex items-center">-</p>
                  <TimePicker
                    onSelectTime={handleEndTimeChange}
                    className="placeholder:italic placeholder:text-slate-400 w-[186px] h-[45px] border border-gray-400/40 p-[12px] rounded-lg max-sm:w-[80px] max-sm:text-[14px]"
                  />
                  {/* <input
                    className=" placeholder:italic placeholder:text-slate-400 w-[186px] h-[40px] border border-gray-400/40 p-[12px] rounded-lg max-sm:w-[80px] max-sm:text-[14px]"
                    placeholder="--:-- --"
                  ></input>
                  <p className="flex items-center">-</p>
                  <input
                    className=" placeholder:italic placeholder:text-slate-400 w-[186px] h-[40px] border border-gray-400/40 p-[12px] rounded-lg max-sm:w-[80px] max-sm:text-[14px]"
                    placeholder="--:-- --"
                  ></input> */}
                </label>
                <div className="pt-[20px]">
                  <button className="bg-secondOrange w-full rounded-3xl p-[10px] hover:bg-thirdOrange focus:bg-firstOrange-400  active:bg-fifthOrange text-white ">
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
