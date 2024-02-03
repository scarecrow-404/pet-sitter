"use client";
import React, { useState, useEffect } from "react";
import { Sidebar, TopBar } from "@/components/sidebar";
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
} from "@chakra-ui/react";
import { ChevronLeftIcon, ViewIcon, CloseIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";
import Link from "next/link";

const OrderDetails = ({ searchParams }) => {
  const handleClick = (item) => {
    const path = `/sitter_management/booking_list/${item.id}`;

    const queryString = new URLSearchParams({
      id: item.pet_id,
      name: item.name,
      petType: item.petType,
      Breed: item.Breed,
      Sex: item.Sex,
      Age: item.Age,
      Color: item.Color,
      Weight: item.TransactionDate,
      About: item.TransactionNo,
      Image: item.AdditionalMessage,
    }).toString();

    const url = String(path) + "?" + queryString;

    window.location.href = url;
  };

  const dataPets = [
    {
      pet_id: 1,
      name: "Daisy",
      petType: "Dog",
      Breed: "Beagle",
      Sex: "Female",
      Age: "0.6 Month",
      Color: "White,black and brown",
      Weight: "2 Kg",
      About: "Woof Woof",
      Image: "https://bit.ly/code-beast",
    },
    {
      pet_id: 2,
      name: "Max",
      petType: "Rabbit",
      Breed: "Labrador Retriever",
      Sex: "Male",
      Age: "2 years",
      Color: "Yellow",
      Weight: "30 kg",
      About: "A friendly and playful dog. Loves to swim!",
      Image: "https://example.com/max.jpg",
    },
    {
      pet_id: 3,
      name: "Luna",
      petType: "Cat",
      Breed: "Siamese",
      Sex: "Female",
      Age: "1.5 years",
      Color: "Brown",
      Weight: "4 kg",
      About: "An elegant and independent cat.",
      Image: "https://example.com/luna.jpg",
    },
    {
      pet_id: 4,
      name: "Rocky",
      petType: "Bird",
      Breed: "German Shepherd",
      Sex: "Male",
      Age: "3 years",
      Color: "Black and tan",
      Weight: "35 kg",
      About: "A loyal and protective dog. Great for families!",
      Image: "https://example.com/rocky.jpg",
    },

    {
      pet_id: 5,
      name: "Milo",
      petType: "Cat",
      Breed: "Maine Coon",
      Sex: "Male",
      Age: "1 year",
      Color: "Orange and white",
      Weight: "6 kg",
      About: "A large and friendly cat with a fluffy coat.",
      Image: "https://example.com/milo.jpg",
    },
    {
      pet_id: 6,
      name: "Bella",
      petType: "Dog",
      Breed: "Poodle",
      Sex: "Female",
      Age: "4 years",
      Color: "White",
      Weight: "8 kg",
      About: "An intelligent and energetic dog.",
      Image: "https://example.com/bella.jpg",
    },
    // { pet_id: 7,
    //   name: "Simba",
    //   petType: "Cat",
    //   Breed: "Bengal",
    //   Sex: "Male",
    //   Age: "6 months",
    //   Color: "Spotted",
    //   Weight: "3 kg",
    //   About: "A playful and adventurous cat.",
    //   Image: "https://example.com/simba.jpg",
    // },
    // { pet_id: 8,
    //   name: "Charlie",
    //   petType: "Rabbit",
    //   Breed: "Golden Retriever",
    //   Sex: "Male",
    //   Age: "2 years",
    //   Color: "Golden",
    //   Weight: "25 kg",
    //   About: "A friendly and gentle dog. Loves to fetch!",
    //   Image: "https://example.com/charlie.jpg",
    // },
    // { pet_id: 9,
    //   name: "Lily",
    //   petType: "Cat",
    //   Breed: "Persian",
    //   Sex: "Female",
    //   Age: "3 years",
    //   Color: "White",
    //   Weight: "5 kg",
    //   About: "A calm and luxurious cat with long fur.",
    //   Image: "https://example.com/lily.jpg",
    // },
    // { pet_id: 10,
    //   name: "Oscar",
    //   petType: "Bird",
    //   Breed: "Dachshund",
    //   Sex: "Male",
    //   Age: "1.5 years",
    //   Color: "Brown",
    //   Weight: "6 kg",
    //   About: "A small and lively dog with a long body.",
    //   Image: "https://example.com/oscar.jpg",
    // },
    // { pet_id: 11,
    //   name: "Mia",
    //   petType: "Cat",
    //   Breed: "Ragdoll",
    //   Sex: "Female",
    //   Age: "2 years",
    //   Color: "Blue point",
    //   Weight: "4 kg",
    //   About: "A gentle and affectionate cat.",
    //   Image: "https://example.com/mia.jpg",
    // },
  ];
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const isHidden = windowWidth < 768;
  const isNotHidden = windowWidth >= 768;
  return (
    <div className="flex bg-sixthGray justify-center">
      <div className="hidden bg-sixthGray lg:block relative">
        <Sidebar active={2} />
      </div>
      <div className="flex-1 min-w-[375px] mx-auto md:w-auto md:mx-3 bg-sixthGray max-w-[1200px] lg:ml-60">
        <TopBar />
        <div className="Title flex justify-between items-center py-3 w-full">
          <div className="pl-5 flex flex-row justify-between min-w-[350px] w-full md:flex md:justify-start md:gap-5">
            <div className="flex flex-row items-center">
              <div>
                <Link href="/sitter_management/booking_list">
                  <ChevronLeftIcon />
                </Link>
              </div>
              <div className="">{searchParams.name}</div>
            </div>
            <div
              className={`${
                searchParams.Status === "Waiting for confirm"
                  ? "text-pink-500"
                  : searchParams.Status === "Waiting for service"
                  ? "text-orange-300"
                  : searchParams.Status === "In service"
                  ? "text-blue-500"
                  : searchParams.Status === "Success"
                  ? "text-green-400"
                  : searchParams.Status === "Canceled"
                  ? "text-red-400"
                  : null
              }`}
            >
              {searchParams.Status}
            </div>
          </div>
          <div className="flex pr-5 gap-4">
            {searchParams.Status === "Waiting for confirm" && (
              <div className={`${isHidden ? "hidden" : ""} flex gap-5`}>
                <AlertButton buttonName="Reject Booking" />
                <button className="bg-secondOrange text-white rounded-3xl min-w-36 h-10 hover:text-secondOrange hover:bg-fifthOrange">
                  Confirm Booking
                </button>
              </div>
            )}

            {searchParams.Status === "Waiting for service" && (
              <div className={`${isHidden ? "hidden" : ""}`}>
                <button className="bg-secondOrange text-white rounded-3xl min-w-36 h-10 hover:text-secondOrange hover:bg-fifthOrange">
                  In Service
                </button>
              </div>
            )}

            {searchParams.Status === "In service" && (
              <div className={`${isHidden ? "hidden" : ""}`}>
                <button className="bg-secondOrange text-white rounded-3xl min-w-36 h-10 hover:text-secondOrange hover:bg-fifthOrange">
                  Success
                </button>
              </div>
            )}

            {searchParams.Status === "Success" && (
              <div className={`${isHidden ? "hidden" : ""}`}>
                <button className="bg-secondOrange text-white rounded-3xl min-w-36 h-10 hover:text-secondOrange hover:bg-fifthOrange">
                  Review
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col justify-start items-start py-3 px-4 bg-white rounded-2xl lg:h-screen lg:max-h-screen">
          <div className="flex justify-between min-w-[340px] py-3 w-full">
            <div className="">
              <h1 className=" text-fourthGray">Pet Owner Name</h1>
              <div>{searchParams.name}</div>
            </div>
            <div className="flex items-center gap-2 text-secondOrange cursor-pointer">
              <ViewIcon />
              <p>View Profile</p>
            </div>
          </div>
          <div className="flex flex-col w-[340px]">
            <h1 className="text-fourthGray">Pet(s)</h1>
            <div>{searchParams.amountPet}</div>
          </div>
          <div className="flex flex-col min-w-[340px] w-full md:w-[740px] lg:w-full">
            <h1 className="text-fourthGray pb-4">Pet Detail</h1>
            <div className="flex flex-col flex-wrap justify-center items-center md:w-fit md:flex-row md:justify-start md:gap-6 lg:w-[740px] lg:justify-start xl:w-[1168px]">
              {dataPets.map((item, index) => {
                return (
                  <PopUpPetData
                    name={item.name}
                    image={item.Image}
                    petType={item.petType}
                    index={index}
                    pet_id={item.pet_id}
                    Breed={item.Breed}
                    Sex={item.Sex}
                    Age={item.Age}
                    Color={item.Color}
                    Weight={item.Weight}
                    About={item.About}
                  />
                );
              })}
            </div>
            <div className="md:grid md:grid-cols-3 md:gap-4 lg:grid lg:grid-cols-4 lg:gap-4">
              <div className="flex flex-col w-[340px] pb-3 md:w-fit">
                <h1 className="text-fourthGray">Duration</h1>
                <div>{searchParams.Duration} hours</div>
              </div>
              <div className="flex flex-col w-[340px] pb-3 md:w-fit">
                <h1 className="text-fourthGray">Total Paid</h1>
                <div>{searchParams.TotalPaid} THB</div>
              </div>
              <div className="flex flex-col w-[340px] pb-3 md:w-fit">
                <h1 className="text-fourthGray">Booking Date</h1>
                <div>{searchParams.BookedDate}</div>
              </div>
              <div className="flex flex-col w-[340px] pb-3 md:w-fit">
                <h1 className="text-fourthGray">Transaction Date</h1>
                <div>{searchParams.TransactionDate}</div>
              </div>
              <div className="flex flex-col w-[340px] pb-3 md:w-fit">
                <h1 className="text-fourthGray">Transaction No.</h1>
                <div>{searchParams.TransactionNo}</div>
              </div>
              <div className="flex flex-col w-[340px] pb-3 md:w-fit">
                <h1 className="text-fourthGray">Additional Message</h1>
                <div>{searchParams.AdditionalMessage}</div>
              </div>
              <div className="flex pr-5 gap-4 justify-center mb-10">
                {searchParams.Status === "Waiting for confirm" && (
                  <div className={`${isNotHidden ? "hidden" : ""} flex gap-5`}>
                    <AlertButton buttonName="Reject Booking" />
                    <button className="bg-secondOrange text-white rounded-3xl min-w-36 h-10 hover:text-secondOrange hover:bg-fifthOrange">
                      Confirm Booking
                    </button>
                  </div>
                )}

                {searchParams.Status === "Waiting for service" && (
                  <div className={`${isNotHidden ? "hidden" : ""}`}>
                    <button className="bg-secondOrange text-white rounded-3xl min-w-36 h-10 hover:text-secondOrange hover:bg-fifthOrange">
                      In Service
                    </button>
                  </div>
                )}

                {searchParams.Status === "In service" && (
                  <div className={`${isNotHidden ? "hidden" : ""}`}>
                    <button className="bg-secondOrange text-white rounded-3xl min-w-36 h-10 hover:text-secondOrange hover:bg-fifthOrange">
                      Success
                    </button>
                  </div>
                )}

                {searchParams.Status === "Success" && (
                  <div className={`${isNotHidden ? "hidden" : ""}`}>
                    <button className="bg-secondOrange text-white rounded-3xl min-w-36 h-10 hover:text-secondOrange hover:bg-fifthOrange">
                      Review
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;

function AlertButton({ buttonName }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();
  const finalRef = React.useRef(null);
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
              Reject Confirmation
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure to reject this booking?
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
                  onClick={onClose}
                >
                  Reject Booking
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
        className=" mb-5 border rounded-lg w-[210px] h-[240px] flex flex-col justify-center items-center gap-6 cursor-pointer"
      >
        <Avatar size="xl" name={name} src={image} className="" />
        <div className="flex flex-col justify-center">
          <p className="mx-auto">{name}</p>
          <p
            className={` border rounded-xl w-fit px-3 ${
              petType === "Dog"
                ? "border-firstGreen text-firstGreen bg-secondGreen"
                : petType === "Cat"
                ? "bg-secondPink text-firstPink border-firstPink"
                : petType === "Bird"
                ? "bg-secondLigthBlue text-firstLigthBlue border-firstLigthBlue"
                : petType === "Rabbit"
                ? " bg-fifthOrange text-thirdOrange border-thirdOrange"
                : null
            } `}
          >
            {petType}
          </p>
        </div>
      </div>

      <Modal isOpen={isOpen} onClose={onClose} size="6xl" h="100vh">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{name}</ModalHeader>
          <ModalCloseButton />
          <hr />
          <ModalBody>
            <div className="w-full h-full p-1 flex flex-col justify-center items-center gap-5">
              <div className="flex flex-col items-center w-11/12 h-2/4">
                <Avatar size="xl" name={name} src={image} className="" />
                <p className=" hidden">{name}</p>
              </div>
              <div className="w-11/12 h-2/4 flex flex-col bg-slate-200">
                <div className="flex flex-row">
                  <div className=" justify-start">
                    <div className="text-fourthGray">Pet Type</div>
                    <div>{petType}</div>
                  </div>
                  <div className=" justify-end">
                    <div className="text-fourthGray">Breed</div>
                    <div>{Breed}</div>
                  </div>
                </div>
                <div className="flex flex-row justify-around">
                  <div>
                    <div className="text-fourthGray">Sex</div>
                    <div>{Sex}</div>
                  </div>
                  <div>
                    <div className="text-fourthGray">Age</div>
                    <div>{Age}</div>
                  </div>
                </div>
                <div className="flex flex-row justify-around">
                  <div>
                    <div className="text-fourthGray">Color</div>
                    <div>{Color}</div>
                  </div>
                  <div>
                    <div className="text-fourthGray">Weight</div>
                    <div>{Weight}</div>
                  </div>
                </div>
                <div className="flex flex-row justify-around">
                  <div className="text-fourthGray">About</div>
                  <div>{About}</div>
                </div>
              </div>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
}
