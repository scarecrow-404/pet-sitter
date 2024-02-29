"use client";
import React from "react";
import Image from "next/image";
import { useState, useEffect } from "react";
import CardSitter from "@/app/search/cardsitterlist.jsx";
import SearchBar from "@/components/common/SearchBar";
import supabase from "@/lib/utils/db";
import { useUser } from "@/hooks/hooks";
import iconNext from "@/asset/images/IconButtonNext.svg";
import iconPrev from "@/asset/images/IconButtonPrev.svg";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
const Search = () => {
  const { search, setSearch, isNewSearch, setIsNewSearch, isLoading } =
    useUser();
  const [sitterData, setSitterData] = useState([]);
  const [idSitter, setIdSitter] = useState("");
  const [loading, setloading] = useState();
  const [page, setPage] = useState(1);
  const [lengthReview, setLengthReview] = useState(1);

  const reviewsPerPage = 5;
  const nextPage = () => {
    setPage(page + 1);
  };
  const previousPage = () => {
    if (page <= 1) {
      setPage(1);
    }
    setPage(page - 1);
  };
  const expQuery = search.exp;
  const petQuery = search.pet.length ? [...search.pet] : [1, 2, 3, 4];
  const ratingStart = search.rating ? Number(search.rating) : 0;
  const ratingEnd = ratingStart ? ratingStart + 1 : 6;
  const keyword = search.keyword ? search.keyword : "";
  function splitPage(numpage) {
    const pageArr = [];
    for (let i = 1; i <= numpage; i++) {
      pageArr.push(i);
    }
    return pageArr;
  }
  async function getSitterData(
    expQuery,
    petQuery,
    ratingStart,
    ratingEnd,
    keyword,
    reviewsPerPage,
    page
  ) {
    let expStart;
    let expEnd;
    if (expQuery.length >= 3) {
      const split = expQuery.split("-");
      expStart = split[0];
      expEnd = split[1];
    }
    if (expQuery.length == 2) {
      const split = expQuery.split("+");
      expStart = split[0];
      expEnd = 100;
    }
    if (expQuery.length == 0) {
      expStart = 0;
      expEnd = 10;
    }
    try {
      let { data: pageData, error: errorPage } = await supabase.rpc(
        "fetch_page",
        {
          exp_end: expEnd,
          exp_start: expStart,
          key: keyword,
          pet: petQuery,
          rate_end: ratingEnd,
          rate_start: ratingStart,
        }
      );
      let { data: sitterData, error: errorSitter } = await supabase.rpc(
        "fetch_data",
        {
          exp_end: expEnd,
          exp_start: expStart,
          key: keyword,
          page: page,
          pet: petQuery,
          rate_end: ratingEnd,
          rate_start: ratingStart,
          reviews_perpage: reviewsPerPage,
        }
      );
      if (!sitterData || errorSitter || !pageData || errorPage) {
      }
      const totalPage = pageData.length ? pageData.length : 5;
      setLengthReview(Math.ceil(totalPage / reviewsPerPage));
      setSitterData(sitterData);
    } catch (error) {}
  }

  useEffect(() => {
    if (isNewSearch) {
      setPage(1);
      setIsNewSearch(false);
    }

    getSitterData(
      expQuery,
      petQuery,
      ratingStart,
      ratingEnd,
      keyword,
      reviewsPerPage,
      page
    );
  }, [search, page]);

  function splitPage(numpage) {
    const pageArr = [];

    for (let i = 1; i <= numpage; i++) {
      pageArr.push(i);
    }
    return pageArr;
  }

  return (
    <>
      <section className=" max-w-[1440px]  mx-auto">
        <Navbar />
        <section className=" flex flex-col  lg:flex-row p-3 ">
          <div className=" w-[100%] lg:w-[30%]">
            <SearchBar />
          </div>

          <div className="  lg:w-[70%] w-full flex flex-col gap-2 cursor-default ">
            {sitterData.map((item) => (
              <CardSitter
                key={item.id}
                sittername={item.sitter_name}
                district={item.district}
                province={item.province}
                experience={item.experience}
                fullname={item.full_name}
                id={item.id}
                image={item.image_url ? item.image_url : ""}
                rating={item.rating}
              />
            ))}
          </div>
        </section>

        <div className="pagination flex gap-4  text-center justify-center">
          <button
            className="previous-button pl-4 pt-2 pr-4 pb-2 hover:bg-sixthOrange  rounded-full  text-fourthGray  font-medium hover:text-firstOrange  disabled:hover:bg-white disabled:opacity-30"
            onClick={previousPage}
            disabled={page === 1 ? true : false} // ปิดปุ่มก่อนหน้าเมื่ออยู่ที่หน้าแรก
          >
            <Image
              objectFit="cover"
              className=" w-[15px] h-[15px] rounded-xl"
              src={iconPrev}
              alt="Prev icon"
            />
          </button>
          <div className="pages flex gap-2 ">
            {/* {page}/{lengthReview} */}
            {/* แสดงหน้าปัจจุบัน / จำนวนหน้าทั้งหมด */}
            {splitPage(lengthReview).map((item, index) => {
              return (
                <button
                  key={index}
                  onClick={(event) => setPage(event.target.value)}
                  value={item}
                  className={`pl-4 pt-2 pr-4 pb-2  hover:bg-sixthOrange  rounded-full   font-medium hover:text-firstOrange ${
                    page == item
                      ? "bg-sixthOrange text-firstOrange"
                      : "text-fourthGray"
                  }`}
                >
                  {item}
                </button>
              );
            })}
          </div>
          <button
            className="next-button pl-4 pt-2 pr-4 pb-2 hover:bg-sixthOrange  rounded-full  text-fourthGray  font-medium hover:text-firstOrange disabled:hover:bg-white disabled:opacity-30 "
            onClick={nextPage}
            disabled={page === lengthReview ? true : false} // ปิดปุ่มถัดไปเมื่ออยู่ที่หน้าสุดท้าย
          >
            <Image
              objectFit="cover"
              className=" w-[15px] h-[15px] rounded-xl"
              src={iconNext}
              alt="next icon"
            />
          </button>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Search;
