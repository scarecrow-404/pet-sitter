"use client";
import React, { useState } from "react";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import Image from "next/legacy/image";
import union from "@/asset/images/Union.svg";
import star from "@/asset/images/Star2.svg";
import dog from "@/asset/images/photoFrame.svg";
import locationIcon from "@/asset/images/location.svg";
import avatar from "@/asset/images/secondSitterDetail.svg";
import avatar2 from "@/asset/images/firstSitterDetail.svg";
import avatar3 from "@/asset/images/thirdSitterDetail.svg";

const SitterProfile = () => {
  const [rating, setRating] = useState("");

  const sitterRating = ["All Reviews", 5, 4, 3, 2, 1];

  function renderStar(starNumber) {
    let stars = [];
    for (let i = 0; i < starNumber; i++) {
      stars.push(<Image key={i} src={star} alt="star" className=" w-[12px]" />);
    }
    return stars;
  }

  return (
    <div>
      <Navbar />
      <div
        id="controls-carousel"
        class="relative w-full"
        data-carousel="static"
      >
        <div class="relative h-56 overflow-hidden rounded-lg md:h-96">
          <div class=" duration-700 ease-in-out" data-carousel-item>
            <Image
              src={avatar}
              class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
              alt="..."
            />
          </div>

          <div class=" duration-700 ease-in-out" data-carousel-item="active">
            <Image
              src={avatar2}
              class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
              alt="..."
            />
          </div>

          <div class=" duration-700 ease-in-out" data-carousel-item>
            <Image
              src={avatar3}
              class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
              alt="..."
            />
          </div>
        </div>
        <button
          type="button"
          class="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
          data-carousel-prev
        >
          <span class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
            <svg
              class="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 1 1 5l4 4"
              />
            </svg>
            <span class="sr-only">Previous</span>
          </span>
        </button>
        <button
          type="button"
          class="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
          data-carousel-next
        >
          <span class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
            <svg
              class="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 9 4-4-4-4"
              />
            </svg>
            <span class="sr-only">Next</span>
          </span>
        </button>
      </div>
      <div className="p-[20px]">
        <div className=" p-[24px]  flex flex-col items-center text-center gap-2 border-2 rounded-lg shadow-2xl">
          <Image src={avatar} className="rounded-[50%]" />
          <p className="text-[36px]  font-bold "> Happy House!</p>
          <div className="flex gap-3">
            <p className=" font-bold text-[20px]">John Dep</p>
            <p className="text-[#1CCD83] text-[16px]">1.5 Years Exp.</p>
          </div>
          <div>
            <p>****</p>
          </div>
          <div className="flex text-[#7B7E8F] text-[15px]">
            <Image src={locationIcon} />
            <p>Senanikorn, Bangkok</p>
          </div>
          <div className=" flex gap-2 pt-2 ">
            <p className=" text-[14px]  border-solid border bg-secondGreen rounded-2xl  border-firstGreen pl-2 pr-2 text-firstGreen">
              Dog
            </p>
            <p className=" text-[14px]  border-solid border bg-secondPink rounded-2xl  border-firstPink pl-2 pr-2 text-firstPink">
              Cat
            </p>
            <p className=" text-[14px]  border-solid border bg-secondLigthBlue rounded-2xl  border-firstLigthBlue pl-2 pr-2 text-firstLigthBlue">
              Bird
            </p>
            <p className=" text-[14px]  border-solid border bg-secondYellow rounded-2xl  border-firstYellow pl-2 pr-2 text-firstYellow">
              Rabbit
            </p>
          </div>
        </div>
      </div>
      <div className="sisterDetail flex w-[100%] ">
        <div className=" flex flex-col w-[100%]">
          <div className="informationSister py-[24px] px-[30px]">
            <h1 className="text-[40px] pb-[48px] font-bold">Happy House!</h1>
            <div className="introduction-box pb-[48px]">
              <p className=" font-bold text-[20px] pb-[12px]">Introduction</p>
              <p className="text-[15px] ">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Saepe,
                cumque. Blanditiis non rerum hic quasi laboriosam nesciunt
                fugiat libero cupiditate provident explicabo, nemo veritatis
                accusantium inventore! Totam est modi vel.
              </p>
            </div>
            <div className="service-box pb-[48px]">
              <p className=" font-bold text-[24px] pb-[12px]">Services</p>
              <p className="text-[15px]">
                🐱 Cat Sitting: Lorem ipsum dolor sit amet consectetur,
                adipisicing elit. Saepe, cumque. Blanditiis non rerum hic quasi
                laboriosam nesciunt fugiat.<br></br>
                🐶 Dog Sitting: Lorem ipsum dolor sit amet consectetur
                adipisicing elit. Distinctio nam aliquid quidem sed assumenda,
                laboriosam rerum alias nulla doloremque quo?<br></br>
                🐇 Rabbit Sitting: Lorem, ipsum dolor sit amet consectetur
                adipisicing elit. Libero inventore asperiores neque ipsam atque.
              </p>
            </div>
            <div className="sitterPlace-box pb-[48px]">
              <p className=" font-bold text-[24px] pb-[12px]">My Place</p>
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Saepe,
                cumque. Blanditiis non rerum hic quasi laboriosam nesciunt
                fugiat libero cupiditate provident explicabo, nemo veritatis
                accusantium inventore! Totam est modi vel.
              </p>
            </div>
          </div>
          <div className="rating p-[24px] bg-fifthGray rounded-sm rounded-tl-[100px] rounded-tr-[20px] flex flex-col ">
            <div className="flex p-[24px] bg-white rounded-sm rounded-l-[100px] rounded-r-[20px] relative gap-[20px] items-start">
              <Image src={union} className="w-[100px]" />
              <p className=" absolute text-[26px]  text-orange-600  left-[53px] top-[50px]">
                4.5
              </p>
              <p className=" absolute text-[13px]  text-orange-600  left-[43px] top-[85px]">
                20 Reviews
              </p>
              <div className="flex flex-col">
                <h1 className="text-[24px] font-bold">Rating & Reviews</h1>
                <div className="flex">
                  {/* <button className="flex text-[16px]  rounded-[8px] border-orange-500 border-2 align-middle px-[12px]"> */}
                  <div className="flex  gap-2 flex-wrap">
                    {sitterRating.map((rating) => {
                      return (
                        <button
                          key={rating}
                          className="flex  items-center gap-1 border-[1px] p-1 rounded-md "
                        >
                          <input
                            className="sr-only"
                            type="checkbox"
                            value={rating}
                            onChange={(event) => setRating(event.target.value)}
                          />
                          {rating}
                          {renderStar(rating)}
                        </button>
                      );
                    })}
                  </div>
                  {/* </button> */}
                </div>
              </div>
            </div>
            <div className="personalReview flex flex-col p-[24px]">
              <div className="flex gap-3 ">
                <Image src={dog} className="w-[60px] rounded-[50%]" />
                <div>
                  <p>John Dep</p>
                  <p>Apr 23, 2024</p>
                </div>
              </div>
              <div className="py-[20px]">
                <p>{rating}****</p>
                <p>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Ipsum asperiores quas facilis deleniti repellendus, nisi saepe
                  temporibus sequi neque ex.
                </p>
              </div>
              <hr></hr>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SitterProfile;
