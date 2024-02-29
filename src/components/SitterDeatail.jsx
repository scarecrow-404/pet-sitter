import locationIcon from "@/asset/images/location.svg";
import union from "@/asset/images/Union.svg";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import star from "@/asset/images/Star2.svg";
import PopupBooking from "./Popup";
import { Avatar } from "@chakra-ui/react";
import { useParams } from "next/navigation";
import supabase from "@/lib/utils/db";
import iconNext from "@/asset/images/IconButtonNext.svg";
import iconPrev from "@/asset/images/IconButtonPrev.svg";
import MapPageOnSitterDeatail from "./MapPageOnSitterDeatail";
function SitterDetail(props) {
  const [rating, setRating] = useState("");
  const [review, setReview] = useState([]);
  const [page, setPage] = useState(1);
  const [lengthReview, setLengthReview] = useState(1);
  const [totalPage, setTotalpage] = useState(1);
  const params = useParams();
  const sitterRating = ["All Reviews", 5, 4, 3, 2, 1];
  const [ratingStart, setRatingStart] = useState(1);
  const [ratingEnd, setRatingEnd] = useState(5);

  const nextPage = () => {
    setPage(page + 1);
  };
  const previousPage = () => {
    if (page <= 1) {
      setPage(1);
    }
    setPage(page - 1);
  };
  const reviewsPerPage = 5;

  function splitPage(numpage) {
    const pageArr = [];

    for (let i = 1; i <= numpage; i++) {
      pageArr.push(i);
    }
    return pageArr;
  }
 
  async function getReviewData(
    ratingStart,
    ratingEnd,
    page,
    reviewsPerPage,
    sitterId
  ) {
 
    try {
      //.range
      let { data: pageOfReview, error: errorPageOfReview } = await supabase.rpc(
        "fetch_review_page",
        {
          page: page,
          rate_end: ratingEnd,
          rate_start: ratingStart,
          reviews_perpage: reviewsPerPage,
          sitterid: sitterId,
        }
      );
      //get all review
      let { data: reviewAll, error: errorReviewAll } = await supabase.rpc(
        "fetch_review",
        {
          rate_end: ratingEnd,
          rate_start: ratingStart,
          sitterid: sitterId,
        }
      );
      if (!reviewAll || errorReviewAll || !pageOfReview || errorPageOfReview) {
      
      }

     
      const totalPage = reviewAll.length ? reviewAll.length : 5;
      setLengthReview(Math.ceil(totalPage / reviewsPerPage));
      setReview(pageOfReview);
      setTotalpage(reviewAll.length);
    } catch (error) {

    }
  }

  //เอาไว้ตัดทศนิยม
  function ratingPrepare(rating) {
    let PlacedFloat = parseFloat(rating).toFixed(1);
    setRating(PlacedFloat);
  }

  useEffect(() => {
    getReviewData(
      ratingStart,
      ratingEnd,
      page,
      reviewsPerPage,
      params.sitterId
    );
    ratingPrepare(props.rating);
  }, [page, ratingStart]);

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
  function handleClickStar(number) {
 
    if (number == "All Reviews") {
      setRatingEnd(5);
      setRatingStart(1);
    } else {
      setRatingStart(number);
      setRatingEnd(number);
    }
    setPage(1);
  }

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
              {props.typePet.map((number, index) => {
                if (number === 1) {
                  return (
                    <p
                      key={index}
                      className=" text-[14px]  border-solid border bg-secondGreen rounded-2xl  border-firstGreen pl-2 pr-2 text-firstGreen"
                    >
                      Dog
                    </p>
                  );
                }
                if (number === 2) {
                  return (
                    <p
                      key={index}
                      className=" text-[14px]  border-solid border bg-secondPink rounded-2xl  border-firstPink pl-2 pr-2 text-firstPink"
                    >
                      Cat
                    </p>
                  );
                }
                if (number === 3) {
                  return (
                    <p
                      key={index}
                      className=" text-[14px]  border-solid border bg-secondLigthBlue rounded-2xl  border-firstLigthBlue pl-2 pr-2 text-firstLigthBlue"
                    >
                      Bird
                    </p>
                  );
                }
                if (number === 4) {
                  return (
                    <p
                      key={index}
                      className=" text-[14px]  border-solid border bg-secondYellow rounded-2xl  border-firstYellow pl-2 pr-2 text-firstYellow"
                    >
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
              <p>
                <MapPageOnSitterDeatail petsitterid={params.sitterId} />
              </p>
            </div>
          </div>

          <div className="rating bg-fifthGray rounded-sm rounded-tl-[100px] rounded-tr-[20px] flex flex-col p-[20px]">
            <div className="flex p-[24px]  bg-white rounded-sm rounded-l-[100px] rounded-r-[20px] relative gap-[20px] items-start">
              <Image src={union} className="w-[100px]" alt="" />
              <p className=" absolute text-[26px]  text-white  left-[54px] top-[50px]">
                {rating}
              </p>
              <p className=" absolute text-[11px]  text-white  left-[43px] top-[85px]">
                {totalPage} Reviews
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
            <div className="reviewer flex flex-col">
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
                  <div
                    key={index}
                    className="flex flex-col p-[24px] lg:flex-row lg:gap-[50px]  gap-3  border-b-sixthGray border-b-[1px] "
                  >
                    <div className="flex gap-3 w-[200px]">
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
                        <p className="text-gray-500 text-[13px]">
                          {/* date to created_at */}
                          {formattedDate}
                        </p>
                      </div>
                    </div>
                    <div className="lg:w-[50%]">
                      <p className="flex pb-[15px]">
                        {renderStar(item.rating)}
                        {/* star of review */}
                      </p>
                      <p>
                        {/* review comment */}
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="pagination flex gap-4  text-center justify-center p-[10px]">
              <button
                className="previous-button pl-4 pt-2 pr-4 pb-2 hover:bg-sixthOrange  rounded-full  text-fourthGray  font-medium hover:text-firstOrange disabled:hover:bg-white disabled:opacity-30"
                onClick={previousPage}
                disabled={page === 1} // ปิดปุ่มก่อนหน้าเมื่ออยู่ที่หน้าแรก
              >
                <Image
                  objectFit="cover"
                  className=" w-[15px] h-[15px] rounded-xl"
                  src={iconPrev}
                  alt="Prev icon"
                />
              </button>
              <div className="pages flex gap-2 ">
                {/* แสดงหน้าปัจจุบัน / จำนวนหน้าทั้งหมด */}
                {splitPage(lengthReview).map((item, index) => {
                  return (
                    <button
                      key={index}
                      onClick={(e) => setPage(e.target.value)}
                      value={item}
                      className={`pl-4 pt-2 pr-4 pb-2  hover:bg-sixthOrange  rounded-full  text-fourthGray  font-medium hover:text-firstOrange ${
                        page == item ? "bg-sixthOrange text-firstOrange" : ""
                      }`}
                    >
                      {item}
                    </button>
                  );
                })}
              </div>
              <button
                className="next-button pl-4 pt-2 pr-4 pb-2 hover:bg-sixthOrange  rounded-full  text-fourthGray  font-medium hover:text-firstOrange"
                onClick={nextPage}
                disabled={page === lengthReview} // ปิดปุ่มถัดไปเมื่ออยู่ที่หน้าสุดท้าย
              >
                <Image
                  objectFit="cover"
                  className=" w-[15px] h-[15px] rounded-xl"
                  src={iconNext}
                  alt="next icon"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SitterDetail;
