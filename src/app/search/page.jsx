"use client";
import React from "react";
import { useState, useEffect } from "react";
import CardSitter from "@/app/search/cardsitterlist.jsx";
import SearchBar from "@/components/common/SearchBar";
import { supabase } from "@/lib/db";
import { useUser } from "@/hooks/hooks";

import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";

const Search = () => {
  const { search, setSearch } = useUser();
  const [sitterData, setSitterData] = useState([]);
  const [idSitter, setIdSitter] = useState("");
  const [pages, setPage] = useState(1);
  const [expStart, setExpStart] = useState();
  const [expEnd, setExpEnd] = useState();

  console.log("searchhhhhhhhh", search);

  const expQuery = search.exp;

  const petQuery = search.pet;

  const ratingQuery = search.rating;

  const splitExpNum = (num) => {
    if (num?.length == 3) {
      const split = num.split("-");
      setExpStart(split[0]);
      setExpEnd(split[1]);
    }
    if (num?.length == 2) {
      const split = num.split("+");
      setExpStart(split[0]);
      setExpEnd("");
    }
  };
  console.log("expppppppp", expStart, expEnd);

  console.log(idSitter);

  async function getSitterData(expStart, expEnd, petQuery, ratingQuery) {
    console.log("fetchhhhhhhhhhhh");
    console.log("expppppppp", expStart, expEnd);
    console.log("petttttt", petQuery);
    console.log("ratingggggg", ratingQuery);
    if (!expStart && !expEnd && !petQuery && !ratingQuery) {
      console.log("1if");
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
    setSitterData(data)
    console.log("1eapppppppppppp",data)}

 else if(expStart && expEnd && petQuery.length==0 && !ratingQuery){
console.log("2if")
    let { data, error } = await supabase.from("pet_sitter")
    .select(`
    id,
    sitter_name,
    district,
    province,
    experience,
    users( full_name )
  `).gt( "experience" , expStart).lte("experience" , expEnd)

    if (error || !data) {
      console.log(error);
    }
    setSitterData(data)
    console.log("2eapppppppppppp",data)
  }
}

// console.log(sitterData)
  

useEffect(()=>{
  splitExpNum(expQuery)
  getSitterData(expStart,expEnd, petQuery,ratingQuery) 

},[search])
 
  function splitPage(numpage) {
    const pageArr = [];

    for (let i = 1; i <= numpage; i++) {
      pageArr.push(i);
    }
    return pageArr;
  }

  return (
    <>
      <section className=" max-w-[1440]">
        <Navbar />

        <section className=" flex flex-col  lg:flex-row p-3">
          <div className=" w-[100%] lg:w-[30%]">
            <SearchBar />
          </div>
          <div className="  lg:w-[70%] w-[100%] flex flex-col gap-2">
            {sitterData.map((item) => (
              <CardSitter
                key={item.id}
                sittername={item.sitter_name}
                district={item.district}
                province={item.province}
                fullname={item.users?.full_name}
                id={item.id}
              />
            ))}
          </div>
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
      </section>
      <Footer />
    </>
  );
};

export default Search;
