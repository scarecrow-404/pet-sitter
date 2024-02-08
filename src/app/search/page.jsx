"use client";
import React from "react";
import { useState, useEffect } from "react";
import CardSitter from "@/app/search/cardsitterlist.jsx";
import SearchBar from "@/components/common/SearchBar";
//import supabase  from "@/lib/utils/db";
import { useUser } from "@/hooks/hooks";
import {pool} from "@/lib/utils/pool"
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";

const Search = () => {
  const { search, setSearch } = useUser();
  const [sitterData, setSitterData] = useState([]);
  const [idSitter, setIdSitter] = useState("");
  const [pages, setPage] = useState(1);
  const [expStart, setExpStart] = useState(0);
  const [expEnd, setExpEnd] = useState(2);
  const [loading,setloading] = useState()


 

  const expQuery = search.exp ? search.exp : '0-2';

  const petQuery = search.pet ? [...search.pet] : ['1','2','3','4'];

  const ratingQuery = search.rating ? search.rating : "5";

  const splitExpNum = (num) => {
    console.log("nummmmmmmmm",num)
    if (num.length == 3) {
      const split = num.split("-");
      console.log("split1",split[0], split[1]);
      setExpStart(split[0]);
      setExpEnd(split[1]);

    }
    if (num.length == 2) {
      const split = num.split("+");
      console.log("split2",split[0], split[1]);
      setExpStart(split[0]);
      setExpEnd("");
    }
    
  };
  

  console.log(idSitter);

  

  async function getSitterData(expStart, expEnd, petQuery, ratingQuery) {
    console.log("fetchhhhhhhhhhhh");
    console.log("petttttt", petQuery);
    console.log("expppppppp inside", expStart, expEnd);



let query = `select pet_sitter.id,
      pet_sitter.sitter_name,
      pet_sitter.district,
      pet_sitter.province,
      pet_sitter.experience,
      users.full_name from pet_sitter`



    // let query = await sql
    //     SELECT 
    //       pet_sitter.id,
    //       pet_sitter.sitter_name,
    //       pet_sitter.district,
    //       pet_sitter.province,
    //       pet_sitter.experience,
    //       users.full_name
    //     FROM 
    //       pet_sitter
    //   `
    // });

  //   let query = await supabase
  // .from('pet_sitter')
  // .select(`
  //   id,
  //   sitter_name,
  //   district,
  //   province,
  //   experience,
  //   users(full_name),
  //   pet_prefer:pet_prefer(pet_type_master_id)
  // `).eq('pet_prefer.pet_type_master_id',4)

  //.eq('experience',1)
  //.eq('pet_prefer.pet_type_master_id',1)


    // if (expStart && expEnd) {
    //   query = query.gte("experience", expStart).lte("experience", expEnd);
    // }
    // if (expStart && !expEnd) {
    //   query = query.gte("experience", expStart);
    // }
    // if(petQuery) {query = query.in("users.full_name",['ying'])};
    try {
      const data = await pool.query(query)
      if (!query) {
        console.log("no data");
      }
      setSitterData(query.data);
      console.log("1eapppppppppppp", query.data);
    } catch (error) {
      console.log(error);
    }
  }

  console.log("expppppppp outside", expStart, expEnd);
  
  console.log("ratingggggg", ratingQuery);
  
  useEffect(() => {
    console.log("useeffect")
    splitExpNum(expQuery);

    getSitterData(expStart, expEnd, petQuery, ratingQuery)
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
