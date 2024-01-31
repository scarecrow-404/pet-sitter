"use client";

import React, { useEffect, useState } from "react";
import star from "@/asset/images/star2.svg";
import Image from "next/image";
import { Checkbox } from "@chakra-ui/react";
import { usePathname } from "next/navigation";
const SearchBar = () => {
  const [experianceQuery, setExperianceQuery] = useState("");
  const [type, setType] = useState([]);
  const [searchRating, setSearchRating] = useState("");
  const [inputType, setInputType] = useState([]);
  const petType = ["Dog", "Cat", "Bird", "Rabbit"];
  const sitterRating = [5, 4, 3, 2, 1];
  useEffect(() => {
    console.log(type);
    console.log(searchRating);
  }, [type, searchRating]);
  function renderStar(starNumber) {
    let stars = [];
    for (let i = 0; i < starNumber; i++) {
      stars.push(<Image key={i} src={star} alt="star" className=" w-[15px]" />);
    }
    return stars;
  }
  return (
    <div className=" flex flex-col md:flex-wrap justify-center items-center m-2 gap-2 text-secondGray">
      <div className="flex flex-col gap-2 flex-wrap max-w-4xl flex-grow rounded-lg border-[1px] overflow-hidden shadow-lg">
        <div className="flex items-center gap-4 flex-wrap p-4 text-sm w-[100%] bg-fifthGray">
          Pet Type :
          {petType.map((type) => {
            return (
              <div key={type} className="flex items-center gap-1 z-10">
                <Checkbox
                  background="white"
                  size="sm"
                  colorScheme="orange"
                  value={type}
                  key={type}
                  zIndex={1}
                  onChange={(event) => {
                    if (event.target.checked) {
                      inputType.push(event.target.value);
                      setType([...inputType]);
                    }
                    if (!event.target.checked) {
                      inputType.splice(
                        inputType.indexOf(event.target.value),
                        1
                      );
                      setType([...inputType]);
                    }
                  }}
                ></Checkbox>
                <p>{type}</p>
              </div>
            );
          })}
        </div>
        <div className="flex flex-col md:flex-row flex-wrap md:items-center ">
          <div className="flex flex-col md:flex-row flex-wrap w-[100%]">
            <div className="flex items-center gap-2 flex-wrap text-sm p-4">
              Rating:
              <div className="flex gap-1 flex-wrap">
                {sitterRating.map((rating) => {
                  return (
                    <label
                      key={rating}
                      className={`flex items-center gap-1 border-[1px] p-1 rounded-md cursor-pointer   ${
                        searchRating == rating
                          ? "border-secondOrange text-secondOrange"
                          : "text-secondGray"
                      }`}
                    >
                      <input
                        className="sr-only"
                        type="checkbox"
                        value={rating}
                        onChange={(event) => {
                          setSearchRating(event.target.value);
                        }}
                      />
                      {rating}
                      {renderStar(rating)}
                    </label>
                  );
                })}
              </div>
            </div>
            {/* <div className="flex flex-col md:flex-row md:justify-around md:gap-5 p-2 w-[100%]"> */}
            <lebel className="flex items-center text-sm p-2 ">
              Experience :
              <select
                id="experiance"
                className="border-[1px] p-1 rounded-md ml-2 text-sm"
                onChange={(event) => {
                  setExperianceQuery(event.target.value);
                }}
              >
                <option value="0-2">0-2 Years</option>
                <option value="3-5">3-5 Years</option>
                <option value="5+">5+ years</option>
              </select>
            </lebel>
            <div className="flex text-sm justify-end m-2 ">
              <button className="bg-secondOrange rounded-full p-3 max-h-12 text-white mr-3">
                Search
              </button>
            </div>
            {/* </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
