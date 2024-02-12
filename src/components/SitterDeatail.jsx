import locationIcon from "@/asset/images/location.svg";
import union from "@/asset/images/Union.svg";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import star from "@/asset/images/Star2.svg";
import PopupBooking from "./Popup";
// import { supabase } from "@supabase/auth-ui-shared";
import { Avatar } from "@chakra-ui/react";
import { useParams } from "next/navigation";
import supabase from "@/lib/utils/db";

function SitterDetail(props) {
  const [rating, setRating] = useState("");
  const [review, setReview] = useState([]);
  // const [currentPage, setCurrentPage] = useState(1);
  // const [reviewsPerPage] = useState(5);
  const params = useParams();
  const sitterRating = ["All Reviews", 5, 4, 3, 2, 1];
  async function getReviewer() {
    let { data, error } = await supabase
      .from("review_render")
      .select("*")
      .eq("pet_sitter_id", params.sitterId);

    if (error || !data) {
      console.log(error);
    }
    console.log(data);
    setReview(data);
    // const filterData = filterSitterData(data);
    // setDetailUser(filterData);
  }

  //เอาไว้ตัดทศนิยม
  function ratingPrepare(rating) {
    let PlacedFloat = parseFloat(rating).toFixed(1);
    setRating(PlacedFloat);
  }
  console.log("lol", review);

  useEffect(() => {
    getReviewer();
    ratingPrepare(props.rating);
  }, []);

  //เอาไว้แสดงรูปภาพดาวrating
  function renderStar(starNumber) {
    let stars = [];
    for (let i = 0; i < starNumber; i++) {
      stars.push(<Image key={i} src={star} alt="star" className=" w-[12px]" />);
    }
    return stars;
  }
  function renderStarBigSize(starNumber) {
    let stars = [];
    for (let i = 0; i < starNumber; i++) {
      stars.push(<Image key={i} src={star} alt="star" className=" w-[20px]" />);
    }
    return stars;
  }

  async function handleClickStar(selectedRating) {
    try {
      let { data, error } = {};

      if (selectedRating === "All Reviews") {
        // Fetch all reviews
        ({ data, error } = await supabase
          .from("review_render")
          .select("*")
          .eq("pet_sitter_id", params.sitterId));
      } else {
        // Fetch reviews based on selected rating
        ({ data, error } = await supabase
          .from("review_render")
          .select("*")
          .eq("pet_sitter_id", params.sitterId)
          .eq("rating", selectedRating));
      }

      if (error) {
        throw error;
      }

      if (!data || data.length === 0) {
        setReview([]);
      } else {
        setReview(data);
      }
    } catch (error) {
      console.error("Error fetching reviews:", error.message);
    }
  }

  // const indexOfLastReview = currentPage * reviewsPerPage;
  // const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  // const currentReviews = review.slice(indexOfFirstReview, indexOfLastReview);

  // function paginate(pageNumber) {
  //   setCurrentPage(pageNumber);
  // }

  return (
    <div className="mainDivDetailSitter lg:flex-row-reverse lg:flex h-full">
      <div className="p-[20px] gap-2 w-full lg:w-[35%]">
        <div className="shadow-2xl rounded-lg sticky top-[100px] ">
          <div className=" p-[24px]  flex flex-col items-center text-center gap-2 rounded-t-lg  ">
            <Avatar
              src={props.imageUser}
              className="rounded-[50%]"
              alt=""
              width={200}
              height={200}
            />
            <p className="text-[30px]  font-bold "> {props.sitterName}</p>
            <div className="flex gap-3">
              <p className=" font-bold text-[17px]">{props.fullName}</p>
              <p className="text-[#1CCD83] text-[16px]">
                {props.exp} Years Exp.
              </p>
            </div>
            <div className="flex">
              {/* <Image src={star} alt="" /> */}
              {renderStarBigSize(props.rating)}
            </div>
            <div className="flex text-[#7B7E8F] text-[15px]">
              <Image src={locationIcon} alt="" />
              <p>
                {props.district}, {props.province}
              </p>
            </div>
            <div className=" flex gap-2 pt-2 ">
              {props.typePet.map((number) => {
                if (number === 1) {
                  return (
                    <p className=" text-[14px]  border-solid border bg-secondGreen rounded-2xl  border-firstGreen pl-2 pr-2 text-firstGreen">
                      Dog
                    </p>
                  );
                }
                if (number === 2) {
                  return (
                    <p className=" text-[14px]  border-solid border bg-secondPink rounded-2xl  border-firstPink pl-2 pr-2 text-firstPink">
                      Cat
                    </p>
                  );
                }
                if (number === 3) {
                  return (
                    <p className=" text-[14px]  border-solid border bg-secondLigthBlue rounded-2xl  border-firstLigthBlue pl-2 pr-2 text-firstLigthBlue">
                      Bird
                    </p>
                  );
                }
                if (number === 4) {
                  return (
                    <p className=" text-[14px]  border-solid border bg-secondYellow rounded-2xl  border-firstYellow pl-2 pr-2 text-firstYellow">
                      Rabbit
                    </p>
                  );
                }
              })}
            </div>
          </div>
          <hr></hr>
          <PopupBooking />
        </div>
      </div>

      <div className="sisterDetail flex w-full lg:w-[65%]">
        <div className=" flex flex-col w-full">
          <div className="informationSister py-[24px] px-[30px]">
            <h1 className="text-[40px] pb-[48px] font-bold">
              {props.sitterName}
            </h1>
            <div className="introduction-box pb-[48px]">
              <p className=" font-bold text-[20px] pb-[12px]">Introduction</p>
              <p className="text-[15px] ">{props.introduction}</p>
            </div>
            <div className="service-box pb-[48px]">
              <p className=" font-bold text-[24px] pb-[12px]">Services</p>
              <p className="text-[15px]">{props.service}</p>
            </div>
            <div className="sitterPlace-box pb-[48px]">
              <p className=" font-bold text-[24px] pb-[12px]">My Place</p>
              <p>{props.place}</p>
            </div>
          </div>

          <div className="rating bg-fifthGray rounded-sm rounded-tl-[100px] rounded-tr-[20px] flex flex-col p-[20px]">
            <div className="flex p-[24px]  bg-white rounded-sm rounded-l-[100px] rounded-r-[20px] relative gap-[20px] items-start">
              <Image src={union} className="w-[100px]" alt="" />
              <p className=" absolute text-[26px]  text-white  left-[54px] top-[50px]">
                {rating}
              </p>
              <p className=" absolute text-[13px]  text-white  left-[43px] top-[85px]">
                {review.length} Reviews
              </p>
              <div className="flex flex-col">
                <h1 className="text-[24px] font-bold">Rating & Reviews</h1>
                <div className="flex">
                  <div className="flex  gap-2 flex-wrap">
                    {sitterRating.map((rating) => {
                      return (
                        <button
                          key={rating}
                          className="flex  items-center gap-1 border-[1px] p-1 rounded-md focus:border-orange-500 focus:text-firstOrange hover:bg-slate-100 px-2"
                          onClick={() => {
                            handleClickStar(rating);
                          }}
                        >
                          <input
                            className="sr-only"
                            type="checkbox"
                            value={rating}
                          />
                          {rating}
                          {renderStar(rating)}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
            {review.map((item, index) => {
              const months = [
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December",
              ];
              const createdAtDate = new Date(item.created_at);
              const monthName = months[createdAtDate.getMonth()];
              const day = createdAtDate.getDate();
              const year = createdAtDate.getFullYear();
              const formattedDate = `${monthName} ${day}, ${year}`;

              return (
                <div key={index} className="flex flex-col p-[24px]">
                  <div className="flex gap-3 ">
                    <Avatar
                      src={item.image_url}
                      className="w-[60px]  rounded-[50%]"
                      alt=""
                    />
                    <div>
                      <p>
                        {/* name of reviewer */}
                        {item.full_name}
                      </p>
                      <p>
                        {/* date to created_at */}
                        {formattedDate}
                      </p>
                    </div>
                  </div>
                  <div className="py-[20px] ">
                    <p className="flex">
                      {renderStar(item.rating)}
                      {/* star of review */}
                    </p>
                    <p>
                      {/* review comment */}
                      {item.description}
                    </p>
                  </div>
                  <hr></hr>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {/* <div className="pagination ">
        <ul className="flex justify-center gap-2">
          {Array.from(
            { length: Math.ceil(review.length / reviewsPerPage) },
            (_, i) => i + 1
          ).map((number) => (
            <li key={number}>
              <button onClick={() => paginate(number)}>{number}1/2</button>
            </li>
          ))}
        </ul>
      </div> */}
    </div>
  );
}
export default SitterDetail;
