"use client";

import React, { useEffect, useState } from "react";
import star from "@/asset/images/star2.svg";
import Image from "next/image";
import { Checkbox } from "@chakra-ui/react";
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
      stars.push(<Image key={i} src={star} alt="star" className=" w-[12px]" />);
    }
    return stars;
  }
  return (
    <div className=" flex flex-col md:flex-wrap justify-center m-2 gap-2">
      <div className="flex items-center gap-1 flex-wrap text-sm">
        Pet Type :
        {petType.map((type) => {
          return (
            <Checkbox
              size="sm"
              colorScheme="orange"
              value={type}
              key={type}
              onChange={(event) => {
                if (event.target.checked) {
                  inputType.push(event.target.value);
                  setType([...inputType]);
                }
                if (!event.target.checked) {
                  inputType.splice(inputType.indexOf(event.target.value), 1);
                  setType([...inputType]);
                }
              }}
            >
              {type}
            </Checkbox>
          );
        })}
      </div>
      <div className="flex items-center gap-2 flex-wrap text-sm">
        Rating:
        <div className="flex gap-1 flex-wrap">
          {sitterRating.map((rating) => {
            return (
              <label
                key={rating}
                className={`flex items-center gap-1 border-[1px] p-1 rounded-md cursor-pointer text-secondGray  ${
                  searchRating == rating
                    ? "border-secondOrange text-secondOrange"
                    : ""
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
      <div>
        <lebel className="flex items-center text-sm">
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
        <div className="flex items-center gap-2 flex-wrap text-sm justify-end ml-2">
          <button className="bg-secondOrange rounded-full p-3 w-24 text-white mr-3">
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
