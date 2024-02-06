"use client";
import React from "react";
import { useState, useEffect } from "react";
import CardSitter from "@/app/search/cardsitterlist.jsx";
import SearchBar from "@/components/common/SearchBar";
import { supabase } from "@/lib/db";

import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";

const Search = () => {
  const [sitterData, setSitterData] = useState([]);
  const [idSitter, setIdSitter] = useState("");
  const [pages, setPage] = useState(1);

  // const getSitterList = async () => {
  //   const result = await fetch("")
  //   setSitterData(result)
  // }

  console.log(idSitter);
  async function getSitterData() {
    let { data, error } = await supabase.from("pet_sitter").select(`
    id,
    sitter_name,
    district,
    province,
    users( full_name )
  `);
    if (error || !data) {
      console.log(error);
    }
    // setSitterData(data);
    // console.log(data)

    setSitterData(data);
    // console.log(sitterData)
  }

  useEffect(() => {
    getSitterData();
  }, []);

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
       key={item.id}
       sittername={item.sitter_name}
      district={item.district}
      province = {item.province}
      fullname={item.users?.full_name}
      id={item.id}
      
       />

      )})}
      </diV>
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
      </section>*/}
      </section>
    </section>
  );
};

export default Search;
