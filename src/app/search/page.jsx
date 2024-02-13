"use client";
import React from "react";
import { useState, useEffect } from "react";
import CardSitter from "@/app/search/cardsitterlist.jsx";
import SearchBar from "@/components/common/SearchBar";
import supabase  from "@/lib/utils/db";
import { useUser } from "@/hooks/hooks";

import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";



const Search = () => {
  const { search, setSearch } = useUser();
  const [sitterData, setSitterData] = useState([]);
  const [idSitter, setIdSitter] = useState("");
  const [expStart, setExpStart] = useState(0);
  const [expEnd, setExpEnd] = useState(10);
  const [loading,setloading] = useState()
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

  const expQuery = search.exp ? search.exp : '0-10';

  const petQuery = search.pet.length? [...search.pet] : [1,2,3,4];

  const ratingStart = search.rating ? Number(search.rating) : 0;

  const ratingEnd = ratingStart? ratingStart + 1: 6;

  const keyword = search.keyword? search.keyword : '';
  


 async function getTaotalPage(){
  try {
    let { data, error } = await supabase.from("pet_sitter_render").select("*")
    console.log("total",data)
    if(!data|| error){
      console.log("nodata",error)
    }
    setLengthReview(Math.ceil(data.length / reviewsPerPage))
 }catch(error){
  console.log(error,"error total page")
 }}

  const splitExpNum = (num) => {
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
  

  async function getSitterData(expStart, expEnd, petQuery, ratingStart,ratingEnd,keyword,reviewsPerPage,page) {
 

    try {
      let { data, error } = await supabase
  .rpc('fetch_data', {
    exp_end:expEnd,
    exp_start:expStart,
    key:keyword, 
    page:page, 
    pet:petQuery, 
    rate_end:ratingEnd, 
    rate_start:ratingStart, 
    reviews_perpage:reviewsPerPage,
  })
      if (!data || error) {
        console.log(error);
      }
   
      const fetchSitter = filterSitterData(data)
      console.log("data",fetchSitter)
      setSitterData(fetchSitter)
      
    } catch (error) {
      console.log(error);
    }
  }

 
  useEffect(() => {
getTaotalPage()
    splitExpNum(expQuery);
    getSitterData(expStart, expEnd, petQuery, ratingStart,ratingEnd,keyword,reviewsPerPage,page)
  }, [search,page]);

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
                rating={item.rating}
              />
            ))}
          </div>
        </section>
        {/* <div className="flex gap-2">
          <button href="#">pevious</button>
          {splitPage(10).map((item, index) => {
            return (
              <a href="#" key={index}>
                {item}
              </a>
            );
          })}
          <button href="#">next</button>
        </div> */}
        <div className="pagination flex gap-4">
              <button
                className="previous-button"
                onClick={previousPage}
                disabled={page === 1} // ปิดปุ่มก่อนหน้าเมื่ออยู่ที่หน้าแรก
              >
                Previous
              </button>
              <div className="pages">
                {page}/{lengthReview}
                {/* แสดงหน้าปัจจุบัน / จำนวนหน้าทั้งหมด */}
              </div>
              <button
                className="next-button"
                onClick={nextPage}
                disabled={page === lengthReview} // ปิดปุ่มถัดไปเมื่ออยู่ที่หน้าสุดท้าย
              >
                Next
              </button>
            </div>
      </section>
      <Footer />
    </>
  );
};

export default Search;
