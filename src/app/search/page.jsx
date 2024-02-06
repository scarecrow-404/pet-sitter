"use client";
import React from "react";
import { useState } from "react";
import CardSitter from "@/app/search/cardsitterlist.jsx";
import SearchBar from "@/components/common/SearchBar";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";

const Search = () => {
  const [sitterdata, setSitterData] = useState("");
  const [pages, setPage] = useState(1);

  // const getSitterList = async () => {
  //   const result = await fetch("")
  //   setSitterData(result)
  // }

  function splitPage(numpage) {
    const pageArr = [];

    for (let i = 1; i <= numpage; i++) {
      pageArr.push(i);
    }
    return pageArr;
  }

  return (
    <section className=" w-full">
      <Navbar />

      <section className="  w-[100%] flex flex-col  gap-5 md:flex-row md:w-[80%] p-3">
        <SearchBar />
        <CardSitter />
        {/* {setSitterData.map((item,index)=>(
        <CardSitter
        key={index}
        item={item}/>
      ))} */}
      </section>

      <div className="flex gap-2">
        <a href="#">pevious</a>
        {splitPage(10).map((item, index) => {
          return (
            <a href="#" key={index}>
              {item}
            </a>
          );
        })}
        <a href="#">next</a>
      </div>

      <Footer />
    </section>
  );
};

export default Search;
