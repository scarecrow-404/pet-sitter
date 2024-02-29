"use client";
import React, { useState, useEffect } from "react";
import { Sidebar, TopBar } from "@/components/Sidebar";
import {
  Input,
  Button,
  Avatar,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Lorem,
  Box,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
} from "@chakra-ui/react";
import withAuth from "@/lib/utils/withAuth";
import { ChevronLeftIcon, ViewIcon, CloseIcon } from "@chakra-ui/icons";
// import { useRouter } from "next/router";
import Link from "next/link";
import { useParams } from "next/navigation";
import supabase from "@/lib/utils/db";
// import { tr } from "date-fns/locale";

const OrderDetails = () => {
  const params = useParams();
  const [ownPet, setOwnPet] = useState([]);
  const [petData, setPetData] = useState([]);
  const [loading, setloading] = useState(false);
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();
  const [status, setStatus] = useState("");
  async function getOwnPetData() {
    setloading(true);
    let { data, error } = await supabase
      .from("booking_list_render")
      .select(
        "pet_sitter_id,booking_date,process_status,total_amout,start_time,end_time,user_id,full_name,phone_number,email,date_of_birth,image_url,additional_message,personal_id,transaction_no,transaction_date,duration"
      )
      .eq("pet_sitter_id", params.sitterId)
      .eq("id", params.booking_id);
    if (error) {
    }
    let uniqueData = Array.from(new Set(data.map((item) => item.id))).map(
      (id) => {
        return data.find((item) => item.id === id);
      }
    );
    const start = cutSeconds(uniqueData[0].start_time);
    setStartTime(start);
    const end = cutSeconds(uniqueData[0].end_time);
    setEndTime(end);
    setOwnPet(uniqueData[0]);
    setStatus(uniqueData[0].process_status);
    setloading(false);
  }

  async function getPetDataBooking() {
    setloading(true);
    let { data, error } = await supabase
      .from("booking_list_render")
      .select("pet_id,name,sex,breed,age,color,weight,pet_image,petType")
      .eq("pet_sitter_id", params.sitterId)
      .eq("id", params.booking_id);
    if (error) {
    }
    setPetData(data);
    setloading(false);
  }

  const currentDate = new Date();
  const currentDateString = `${currentDate.getDate()} ${currentDate.toLocaleString(
    "en",
    { month: "short" }
  )} ${currentDate.getFullYear()}`;
  const currentTime = currentDate.toTimeString().slice(0, 8);
  const bookingDate = new Date(ownPet.booking_date);
  const formattedBookingDate = bookingDate.toLocaleString("en-Uk", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
  const formattedDateTimeRange = `${formattedBookingDate} | ${startTime} - ${endTime}`;
  function cutSeconds(time) {
    // Split the time string into hours, minutes, and seconds
    const [hours, minutes, seconds] = time.split(":");

    // Return the time string with seconds removed
    if (hours < 12) {
      return `${hours}:${minutes} AM`;
    } else if (hours > 12) {
      return `${hours}:${minutes} PM`;
    }
  }

  useEffect(() => {
    getPetDataBooking();
    getOwnPetData();
  }, [status]);
  let processStatus = [
    "Waiting for confirm",
    "Waiting for service",
    "In service",
    "Success",
  ];
  async function updateBookingStatus() {
    try {
      if (status !== "") {
        let index = processStatus.indexOf(status);
        await supabase
          .from("booking")
          .update({ process_status: processStatus[index + 1] })
          .eq("id", params.booking_id);
        setStatus(processStatus[index + 1]);
      } else {
      }
    } catch (error) {}
  }

  function changeTransactionDate(transaction) {
    let removeTAndAfterT = transaction?.replaceAll("-", "").replace(/T.*/, "");
    return removeTAndAfterT;
  }

  return (
    <>
      <div className="flex  bg-sixthGray justify-center overflow-hidden">
        <div className="hidden bg-sixthGray lg:block relative">
          <Sidebar active={2} />
        </div>
        <div className="flex-1 min-w-[375px] mx-auto md:w-auto md:mx-3 bg-yellow max-w-[1200px] lg:ml-60">
          <TopBar />
          <div className="Title flex justify-between items-center py-3 w-full">
            <div className="pl-5 flex flex-row justify-between min-w-[350px] w-full md:flex md:justify-start md:gap-5">
              <div className="flex flex-row items-center">
                <Link
                  href={`/sitter_management/${params.sitterId}/booking_list`}
                >
                  <ChevronLeftIcon w={8} h={8} />
                </Link>
                <p className="font-bold text-[24px]">{ownPet.full_name}</p>
              </div>
              <div
                className={`${
                  ownPet.process_status === "Waiting for confirm"
                    ? "text-pink-500"
                    : ownPet.process_status === "Waiting for service"
                    ? "text-orange-300"
                    : ownPet.process_status === "In service"
                    ? "text-blue-500"
                    : ownPet.process_status === "Success"
                    ? "text-green-400"
                    : ownPet.process_status === "Canceled"
                    ? "text-red-400"
                    : null
                } items-center flex`}
              >
                {status}
              </div>
            </div>
            <div className="flex pr-5 gap-4">
              {ownPet.process_status === "Waiting for confirm" && (
                <div className={`max-md:hidden flex gap-5`}>
                  <AlertButton buttonName="Cancel Booking" />
                  <button
                    className="bg-secondOrange text-white rounded-3xl min-w-36 h-10 hover:text-secondOrange hover:bg-fifthOrange "
                    onClick={() => {
                      updateBookingStatus();
                    }}
                  >
                    Confirm Booking
                  </button>
                </div>
              )}

              {ownPet.process_status === "Waiting for service" && (
                <div className={`max-md:hidden`}>
                  <button
                    className="bg-secondOrange text-white rounded-3xl min-w-36 h-10 hover:text-secondOrange hover:bg-fifthOrange "
                    onClick={() => {
                      updateBookingStatus();
                    }}
                  >
                    In Service
                  </button>
                </div>
              )}

              {ownPet.process_status === "In service" && (
                <div className={`max-md:hidden`}>
                  <button
                    className="bg-secondOrange text-white rounded-3xl min-w-36 h-10 hover:text-secondOrange hover:bg-fifthOrange disabled:bg-fifthGray disabled:text-white"
                    onClick={() => {
                      updateBookingStatus();
                    }}
                    disabled={
                      currentDateString < formattedBookingDate || // ถ้าวันที่ปัจจุบันน้อยกว่าวันที่จอง
                      (currentDateString === formattedBookingDate &&
                        currentTime < ownPet.end_time) // ถ้าวันที่ปัจจุบันเท่ากับวันที่จองและเวลาปัจจุบันน้อยกว่าเวลาจอง
                    }
                  >
                    Success
                  </button>
                </div>
              )}
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
            <div className="flex flex-col justify-start items-start py-3 px-4  bg-white rounded-2xl lg:h-fit lg:pl-[70px] lg:mx-[30px]">
              <div className="flex justify-between min-w-[340px] py-3 w-full">
                <div className="">
                  <h1 className=" text-fourthGray font-semibold">
                    Pet Owner Name
                  </h1>
                  <div>{ownPet.full_name}</div>
                </div>
                <PopUpOwnerData
                  index={ownPet.id}
                  name={ownPet.full_name}
                  Email={ownPet.email}
                  Image={ownPet.image_url}
                  Phone={ownPet.phone_number}
                  IDNumber={ownPet.personal_id}
                  DateOfBirth={ownPet.date_of_birth}
                />
              </div>
              <div className="flex flex-col w-[340px]">
                <h1 className="text-fourthGray font-semibold">Pet(s)</h1>
                <div>{petData.length}</div>
              </div>
              <div className="flex flex-col min-w-[340px] w-full  lg:w-full">
                <h1 className="text-fourthGray pb-4  font-semibold">
                  Pet Detail
                </h1>
                <div className="flex flex-col flex-wrap justify-center items-center md:w-fit md:flex-row md:justify-start md:gap-6 lg:w-[740px] lg:justify-start xl:w-full">
                  {petData.map((item, index) => {
                    return (
                      <PopUpPetData
                        key={index}
                        name={item.name}
                        image={item.pet_image}
                        petType={item.petType}
                        index={index}
                        pet_id={item.pet_id}
                        Breed={item.breed}
                        Sex={item.sex}
                        Age={item.age}
                        Color={item.color}
                        Weight={item.weight}
                        About={item.about}
                      />
                    );
                  })}
                </div>
                <div className="md:grid md:grid-cols-3 md:gap-4  lg:grid-cols-4 lg:gap-4 lg:flex lg:flex-col">
                  <div className="flex flex-col w-[340px] pb-3 md:w-fit">
                    <h1 className="text-fourthGray font-semibold">Duration</h1>
                    <div>{ownPet.duration} hours</div>
                  </div>
                  <div className="flex flex-col w-[340px] pb-3 md:w-fit">
                    <h1 className="text-fourthGray font-semibold">
                      Total Paid
                    </h1>
                    <div>{ownPet.total_amout} THB</div>
                  </div>
                  <div className="flex flex-col w-[340px] pb-3 md:w-fit">
                    <h1 className="text-fourthGray font-semibold">
                      Booking Date
                    </h1>
                    <div>{formattedDateTimeRange}</div>
                  </div>
                  <div className="flex flex-col w-[340px] pb-3 md:w-fit">
                    <h1 className="text-fourthGray font-semibold">
                      Transaction Date
                    </h1>
                    <div>{changeTransactionDate(ownPet.transaction_date)}</div>
                  </div>
                  <div className="flex flex-col w-[340px] pb-3 md:w-fit">
                    <h1 className="text-fourthGray font-semibold">
                      Transaction No.
                    </h1>
                    <div>{ownPet.transaction_no}</div>
                  </div>
                  <div className="flex flex-col w-[340px] pb-3 md:w-fit">
                    <h1 className="text-fourthGray font-semibold">
                      Additional Message
                    </h1>
                    <div>{ownPet.additional_message}</div>
                  </div>
                  <div className="flex pr-5 gap-4 justify-center mb-10">
                    {ownPet.process_status === "Waiting for confirm" && (
                      <div className={`md:hidden flex gap-5`}>
                        <AlertButton buttonName="Cancel Booking" />
                        <button
                          className="bg-secondOrange text-white rounded-3xl min-w-36 h-10 hover:text-secondOrange hover:bg-fifthOrange"
                          onClick={() => {
                            updateBookingStatus();
                          }}
                        >
                          Confirm Booking
                        </button>
                      </div>
                    )}

                    {ownPet.process_status === "Waiting for service" && (
                      <div className={`md:hidden`}>
                        <button
                          className="bg-secondOrange text-white rounded-3xl min-w-36 h-10 hover:text-secondOrange hover:bg-fifthOrange"
                          onClick={() => {
                            updateBookingStatus();
                          }}
                        >
                          In Service
                        </button>
                      </div>
                    )}

                    {ownPet.process_status === "In service" && (
                      <div className={`md:hidden`}>
                        <button
                          onClick={() => {
                            updateBookingStatus();
                          }}
                          className="bg-secondOrange text-white rounded-3xl min-w-36 h-10 hover:text-secondOrange hover:bg-fifthOrange disabled:bg-fifthGray disabled:text-fifthGray"
                          disabled={
                            currentDateString < formattedBookingDate ||
                            (currentDateString === formattedBookingDate &&
                              currentTime < ownPet.end_time)
                          }
                        >
                          Success
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default withAuth(OrderDetails);

function AlertButton({ buttonName }) {
  const params = useParams();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();
  const finalRef = React.useRef(null);
  const [isUpdated, setIsUpdated] = useState(false);
  async function rejectBookingStatus() {
    try {
      await supabase
        .from("booking")
        .update({ process_status: "Canceled" })
        .eq("id", params.booking_id);
      setIsUpdated(true);
    } catch (error) {}
  }

  return (
    <>
      <button
        onClick={onOpen}
        className="bg-fifthOrange text-secondOrange rounded-3xl min-w-36 h-10 hover:text-white hover:bg-secondOrange"
      >
        {buttonName}
      </button>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Cancel Booking
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure to cancel this booking?
            </AlertDialogBody>

            <AlertDialogFooter>
              <div className="flex gap-5">
                <button
                  ref={cancelRef}
                  onClick={onClose}
                  className="bg-fifthOrange text-secondOrange rounded-3xl min-w-36 h-10 hover:text-white hover:bg-secondOrange"
                >
                  Cancel
                </button>
                <button
                  className="bg-secondOrange text-white rounded-3xl min-w-36 h-10 hover:text-secondOrange hover:bg-fifthOrange"
                  onClick={() => {
                    onClose();
                    rejectBookingStatus();
                  }}
                >
                  Yes
                </button>
              </div>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}
function PopUpPetData({
  name,
  image,
  petType,
  index,
  pet_id,
  Breed,
  Sex,
  Age,
  Color,
  Weight,
  About,
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div key={index}>
      <div
        onClick={onOpen}
        className=" mb-5 border-2 rounded-2xl w-[210px] h-[240px] flex flex-col justify-center items-center gap-6 cursor-pointer"
      >
        <Avatar size="xl" name={name} src={image} className="" />
        <div className="flex flex-col justify-center items-center">
          <p className="mx-auto pb-[10px] font-bold text-[20px]">{name}</p>
          <p
            className={` border rounded-xl w-fit px-3 text-[16px] ${
              petType === "Dog"
                ? "border-firstGreen text-firstGreen bg-secondGreen"
                : petType === "Cat"
                ? "bg-secondPink text-firstPink border-firstPink"
                : petType === "Bird"
                ? "bg-secondLigthBlue text-firstLigthBlue border-firstLigthBlue"
                : petType === "Rabbit"
                ? " bg-secondYellow text-thirdOrange border-thirdOrange"
                : null
            } `}
          >
            {petType}
          </p>
        </div>
      </div>

      <Modal isOpen={isOpen} onClose={onClose} size="2xl" h="100vh">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{name}</ModalHeader>
          <ModalCloseButton />
          <hr />
          <ModalBody>
            <div className="max-w-[800px]  h-full p-1 flex flex-col justify-center items-center my-4 md:flex-row">
              <div className="flex flex-col items-center w-[250px] h-2/4 ">
                <div className="block md:hidden">
                  <Avatar size="xl" name={name} src={image} className="" />
                </div>
                <div className="hidden md:block px-[40px]">
                  <Avatar name={name} src={image} width={200} height={200} />
                </div>
                <p className=" hidden pt-[10px] md:flex font-bold text-[20px]">
                  {name}
                </p>
              </div>
              <div className="w-11/12 h-full bg-sixthGray p-5 my-5 rounded-2xl ">
                <div className="grid grid-cols-2 gap-4 pb-[15px]">
                  <div className=" justify-start">
                    <div className="text-fourthGray">Pet Type</div>
                    <div className="text-[15px]">{petType}</div>
                  </div>
                  <div className=" justify-end">
                    <div className="text-fourthGray">Breed</div>
                    <div className="text-[15px]">{Breed}</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 pb-[15px]">
                  <div>
                    <div className="text-fourthGray">Sex</div>
                    <div className="text-[15px]">{Sex}</div>
                  </div>
                  <div>
                    <div className="text-fourthGray">Age</div>
                    <div className="text-[15px]">{Age} Month</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 pb-[15px]">
                  <div>
                    <div className="text-fourthGray">Color</div>
                    <div className="text-[15px]">{Color}</div>
                  </div>
                  <div>
                    <div className="text-fourthGray">Weight</div>
                    <div className="text-[15px]">{Weight} Kilogram</div>
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-2 pb-[15px]">
                  <div className="text-fourthGray">About</div>
                  <div className="text-[15px]">{About}</div>
                </div>
              </div>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
}
function PopUpOwnerData({
  name,
  Email,
  Image,
  index,
  Phone,
  IDNumber,
  DateOfBirth,
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div key={index}>
      <div
        className="flex items-center gap-2 text-secondOrange cursor-pointer"
        onClick={onOpen}
      >
        <ViewIcon />
        <p>View Profile</p>
      </div>

      <Modal isOpen={isOpen} onClose={onClose} size="4xl" h="100vh">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{name}</ModalHeader>
          <ModalCloseButton />
          <hr />
          <ModalBody>
            <div className="max-w-[800px] w-full h-full p-1 flex flex-col justify-center items-center my-4 md:flex-row text-[15px]">
              <div className="flex flex-col items-center  w-11/12 ">
                <div className="block md:hidden">
                  <Avatar
                    name={name}
                    src={Image}
                    className=""
                    width={200}
                    height={200}
                  />
                </div>
                <div className="hidden md:block">
                  <Avatar
                    name={name}
                    src={Image}
                    className=""
                    width={200}
                    height={200}
                  />
                </div>
              </div>
              <div className="w-full h-full bg-sixthGray p-5 my-5 rounded-2xl ">
                <div className="grid grid-cols-2 gap-4 pb-[15px] md:flex md:flex-col">
                  <div className=" justify-start">
                    <div className="text-fourthGray font-semibold">
                      Pet Owner Name
                    </div>
                    <div className="text-[15px]">{name}</div>
                  </div>
                  <div className=" justify-end">
                    <div className="text-fourthGray font-semibold">Email</div>
                    <div className="text-[15px]">{Email}</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 pb-[15px] md:flex md:flex-col">
                  <div>
                    <div className="text-fourthGray font-semibold">Phone</div>
                    <div className="text-[15px]">{Phone}</div>
                  </div>
                  <div>
                    <div className="text-fourthGray font-semibold">
                      ID Number
                    </div>
                    <div className="text-[15px]">{IDNumber}</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 pb-[15px] md:flex md:flex-col">
                  <div>
                    <div className="text-fourthGray font-semibold">
                      Date Of Birth
                    </div>
                    <div className="text-[15px]">{DateOfBirth}</div>
                  </div>
                </div>
              </div>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
}
