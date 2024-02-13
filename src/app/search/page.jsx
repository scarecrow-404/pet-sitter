"use client";
import React from "react";
import { useState, useEffect } from "react";
import CardSitter from "@/app/search/cardsitterlist.jsx";
import SearchBar from "@/components/common/SearchBar";
import supabase  from "@/lib/utils/db";
import { useUser } from "@/hooks/hooks";

import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import { set } from "date-fns";


const Search = () => {
  const { search, setSearch } = useUser();
  const [sitterData, setSitterData] = useState([]);
  const [idSitter, setIdSitter] = useState("");
  const [pages, setPage] = useState(1);
  const [expStart, setExpStart] = useState(0);
  const [expEnd, setExpEnd] = useState(10);
  const [loading,setloading] = useState()



 

  const expQuery = search.exp ? search.exp : '0-10';

  const petQuery = search.pet.length? [...search.pet] : [1,2,3,4];

  const ratingStart = search.rating ? Number(search.rating) : 0;

  const ratingEnd = ratingStart? ratingStart + 1: 6;

  const keyword = search.keyword? search.keyword : '';
  

  const splitExpNum = (num) => {
    console.log("nummmmmmmmm",num)
    if (num.length >= 3) {
      const split = num.split("-");
      console.log("split1",split[0], split[1]);
      setExpStart(split[0]);
      setExpEnd(split[1]);

    }
    if (num.length == 2) {
      const split = num.split("+");
      console.log("split2",split[0], split[1]);
      setExpStart(split[0]);
      setExpEnd(100);
    }
    
  };
  

  console.log(idSitter);
  function filterSitterData (array){
    const arr =[]
    const sitterArr =[]
    array.filter((item)=>{
      const index = arr.indexOf(item.id);
      if(index==-1){

       arr.push(item.id)
       sitterArr.push(item)
      }
    }
    )
    return sitterArr
  }
  

  async function getSitterData(expStart, expEnd, petQuery, ratingStart,ratingEnd,keyword) {
    console.log("fetchhhhhhhhhhhh", petQuery,expStart, expEnd,ratingStart,ratingEnd,keyword);

    try {
      let { data, error } = await supabase
      .rpc('fetch_data', {
        exp_end:expEnd,
        exp_start:expStart,
        key:keyword,
        pet:petQuery ,
        rate_end:ratingEnd,
        rate_start:ratingStart,
      })
      if (!data || error) {
        console.log("nodata",error);
      }
      console.log("1eapppppppppppp",data)
      const fetchSitter = filterSitterData(data)
      setSitterData(fetchSitter)
      
    } catch (error) {
      console.log(error);
    }
  }

 
  useEffect(() => {

    splitExpNum(expQuery);
    getSitterData(expStart, expEnd, petQuery, ratingStart,ratingEnd,keyword)
  }, [search]);

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
                fullname={item.full_name}
                id={item.id}
                image={item.image_url? item.image_url:""}
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
