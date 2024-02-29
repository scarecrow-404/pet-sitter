import React from "react";
import Image from "next/image";
import xicon from "@/asset/images/iconX.svg";
import { useUser } from "@/hooks/hooks";
import { useParams } from "next/navigation";
import supabase from "@/lib/utils/db";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
function PopupBooking(props) {
  const router = useRouter();
  const params = useParams();
  const [disable, setDisable] = useState(false);

  const { bookingData, setBookingData, user, setUser } = useUser();
  const sitterId = params.sitterId;
  const values = props.values;
  let bookingId = "";
  let countConfirm = 0;

  function generateTransactionNo(paytype) {
    let prefix = "";
    if (paytype === "creditcard") {
      prefix = "CD";
    } else if (paytype === "cash") {
      prefix = "CH";
    }
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, "0");
    const day = today.getDate().toString().padStart(2, "0");
    const randomPart = Math.floor(Math.random() * 100000)
      .toString()
      .padStart(5, "0");
    return `${prefix}-${year}${month}${day}-${randomPart}`;
  }
  const transactionNo = generateTransactionNo(values.payment_type);

  function deleteAmPm(formatTime) {
    let timeformat;

    if (formatTime.includes("AM")) {
      timeformat = formatTime.replace("AM", "");
    } else {
      timeformat = formatTime.replace("PM", "");
    }
    return timeformat;
  }

  const timeStart = deleteAmPm(bookingData.startTime);
  const timeEnd = deleteAmPm(bookingData.endTime);

  const insert = {
    pet_sitter_id: sitterId,
    user_id: user?.id,
    booking_date: bookingData.date,
    start_time: timeStart,
    end_time: timeEnd,
    process_status: "Waiting for confirm",
    payment_status: "pending",
    payment_type: values.payment_type,
    total_amount: bookingData.price,
    duration: bookingData.duration,
    transaction_no: transactionNo,
    additional_message: bookingData.additionMessage,
  };

  useEffect(() => {}, []);

  async function insertpet(bookingId, eachPet) {
    try {
      const { data: petresult, error } = await supabase
        .from("booking_pet")
        .insert([{ booking_id: bookingId, pet_id: eachPet.id }])
        .select();

      if (petresult) {
      } else if (!data || error) {
      }
    } catch (error) {}
  }

  async function handlesubmit() {
    setDisable(true);

    try {
      const { error, data: resultinsert } = await supabase
        .from("booking")
        .insert(insert)
        .select();

      if (!error) {
        const path = `/search/${sitterId}/booking/confirmBooking`;
        const url = String(path);
        router.push(url);
      }
      if (error) {
      }

      setBookingData({ ...bookingData, bookid: resultinsert[0]?.id });
      bookingId = resultinsert[0]?.id;
      bookingData.petselect.map((eachPet) => {
        insertpet(bookingId, eachPet);
      });
    } catch (error) {}
  }

  if (props.trigger && values.payment_type) {
    return (
      <div className="bg-black bg-opacity-60 flex justify-center w-screen h-screen fixed z-20">
        <div className="bg-white w-[400px] h-[208px] mt-[250px] rounded-[16px]">
          <div
            className="flex justify-between py-[16px] px-[24px] border-[
#E4E6ED] border-b-[1px]"
          >
            <h1 className="text-[20px] font-[700] leading-[28px]">
              Booking Confirmation
            </h1>
            <button>
              <Image
                src={xicon}
                alt="cancle"
                width={24}
                height={24}
                onClick={props.closePopup}
              />
            </button>
          </div>

          <div className="p-[24px] h-auto flex flex-col justify-center ">
            <p className="text-[#7B7E8F] text-[16px] font-[500] leading-[28px]">
              Are you sure to booking this pet sitter?
            </p>
            <div className="flex justify-between mt-[24px] ">
              <button
                className="text-[16px] font-[700] leading-[24px] py-[12px] px-[24px] rounded-[99px] gap-[8px] text-[#FF7037] bg-[#FFF1EC]"
                onClick={props.closePopup}
              >
                close
              </button>
              <button
                disabled={disable}
                className="text-[16px] font-[700] leading-[24px] py-[12px] px-[24px] rounded-[99px] gap-[8px] text-white bg-[#FF7037] disabled:bg-gray-400 "
                onClick={handlesubmit}
              >
                Yes, I&apos;m sure
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  } else if (
    props.trigger === "Payment Type is required" &&
    !values.payment_type
  ) {
    return (
      <div className="bg-black bg-opacity-60 flex justify-center w-screen h-screen fixed z-20">
        <div className="bg-white w-[400px] h-[208px] mt-[250px] rounded-[16px]">
          <div
            className="flex justify-between py-[16px] px-[24px] border-[
  #E4E6ED] border-b-[1px]"
          >
            <h1 className="text-[20px] font-[700] leading-[28px] flex justify-center">
              Payment Require
            </h1>
            <button>
              <Image
                src={xicon}
                alt="cancle"
                width={24}
                height={24}
                onClick={props.closePopup}
              />
            </button>
          </div>

          <div className="p-[24px] h-auto flex flex-col justify-center ">
            <p className="text-[#7B7E8F] text-[16px] font-[500] leading-[28px]">
              Please select payment method.
            </p>
            <div className="flex justify-center mt-[24px] ">
              <button
                className="text-[16px] font-[700] leading-[24px] py-[12px] px-[24px] rounded-[99px] gap-[8px] text-[#FF7037] bg-[#FFF1EC]"
                onClick={props.closePopup}
              >
                close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PopupBooking;
