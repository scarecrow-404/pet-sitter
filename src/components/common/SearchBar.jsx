"use client";

import React, { useEffect, useState } from "react";
import star from "@/asset/images/Star2.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { SearchIcon } from "@chakra-ui/icons";
import {
  Checkbox,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { usePathname } from "next/navigation";
import { useUser } from "@/hooks/hooks";
import supabase from "@/lib/utils/db";
const SearchBar = () => {
  const { search, setSearch, setIsNewSearch } = useUser();
  const [experianceQuery, setExperianceQuery] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchRating, setSearchRating] = useState(0);
  const [inputType, setInputType] = useState([]);
  const [petType, setPettype] = useState([]);
  const sitterRating = [5, 4, 3, 2, 1];
  const pathname = usePathname();
  const [isLandingPage, setIsLandingPage] = useState(true);
  const [check, setCheck] = useState([false, false, false, false]);
  const router = useRouter();

  const HandleCheck = (index) => {
    setCheck((prevState) => {
      const newCheck = prevState.map((item, idx) =>
        idx === index ? !item : item
      );
      localStorage.setItem("check", JSON.stringify(newCheck));
      return newCheck;
    });
  };

  const handlePathname = () => {
    if (pathname === "/search") {
      return setIsLandingPage(false);
    }
  };

  const getPet = async () => {
    try {
      const { data, error } = await supabase
        .from("pet_type_master")
        .select("*");
      setPettype(data);
    } catch (error) {}
  };
  const handleSearch = async (event) => {
    event.preventDefault();
    const currentPath = pathname;
    await setIsNewSearch(true);
    await setSearch({
      exp: experianceQuery,
      rating: searchRating,
      pet: inputType,
      keyword: searchQuery,
    });

    if (!pathname.startsWith("/search")) {
      router.push("/search");
    }
  };
  useEffect(() => {
    if (search.exp) {
      setExperianceQuery(search.exp);
    }
    if (search.rating) {
      setSearchRating(search.rating);
    }
    if (search.pet) {
      setInputType(search.pet);
    }
    if (search.keyword) {
      setSearchQuery(search.keyword);
    }
    if (search.check) {
      setCheck(search.check);
    }
  }, [search]);
  useEffect(() => {
    window.onbeforeunload = () => {
      localStorage.removeItem("check");
    };

    getPet();
    handlePathname();
    const storedCheck = localStorage.getItem("check");
    if (storedCheck) {
      setCheck(JSON.parse(storedCheck));
    }
    return () => {
      window.onbeforeunload = null;
    };
  }, []);
  useEffect(() => {
  }, [inputType, searchRating]);

  function renderStar(starNumber) {
    let stars = [];
    for (let i = 0; i < starNumber; i++) {
      stars.push(<Image key={i} src={star} alt="star" className=" w-[15px]" />);
    }
    return stars;
  }
  const clearSearch = () => {
    setExperianceQuery("");
    setSearchQuery("");
    setSearchRating(0);
    setInputType([]);
    setCheck([false, false, false, false]);
    localStorage.setItem("check", JSON.stringify([false, false, false, false]));
  };
  return (
    <form onSubmit={handleSearch}>
      <div className=" flex flex-col md:flex-wrap justify-center items-center m-2 gap-2 text-secondGray ">
        <div className="flex flex-col gap-1 flex-wrap max-w-4xl flex-grow rounded-lg border-[1px] overflow-hidden shadow-lg">
          {isLandingPage ? null : (
            <div className="flex md:flex-row flex-wrap w-[100%] items-center p-4">
              Search
              <InputGroup>
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <InputRightElement
                  pointerEvents="none"
                  color="gray.300"
                  fontSize="1.2em"
                >
                  <SearchIcon />
                </InputRightElement>
              </InputGroup>
            </div>
          )}
          <div
            className={`flex items-center gap-4 flex-wrap p-4 text-sm w-[100%] ${
              isLandingPage ? "bg-fifthGray" : "bg-white"
            } `}
          >
            Pet Type:
            {petType.map((type, index) => {
              return (
                <div key={type.id} className="flex items-center gap-1 z-10">
                  <Checkbox
                    background="white"
                    isChecked={check[index]}
                    size="sm"
                    colorScheme="orange"
                    value={type.id}
                    zIndex={1}
                    onChange={(event) => {
                      if (event.target.checked) {
                        HandleCheck(index);
                        setInputType([...inputType, event.target.value]);
                      }
                      if (!event.target.checked) {
                        const newArr = [...inputType];
                        newArr.splice(inputType.indexOf(event.target.value), 1);
                        HandleCheck(index);
                        setInputType([...newArr]);
                      }
                    }}
                  ></Checkbox>
                  <p>{type.name}</p>
                </div>
              );
            })}
          </div>
          <div className="flex flex-col md:flex-row flex-wrap md:items-center md:justify-center">
            <div
              className={`flex flex-wrap w-[100%]${
                isLandingPage ? "md:flex-row" : "flex-col"
              }`}
            >
              <div className="flex items-center gap-2 flex-wrap text-sm p-4 md:px-1 lg:px-4">
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
              <lebel className="flex items-center text-sm p-4 ">
                Experience:
                <select
                  id="experiance"
                  className="border-[1px] p-1 rounded-md ml-2 text-sm"
                  value={experianceQuery}
                  onChange={(event) => {
                    setExperianceQuery(event.target.value);
                  }}
                >
                  <option disabled value="">
                    Select Experience
                  </option>
                  <option value="0-2">0-2 Years</option>
                  <option value="3-5">3-5 Years</option>
                  <option value="5+">5+ years</option>
                </select>
              </lebel>
              <div
                className={`flex text-sm  m-2 pb-3 ${
                  isLandingPage
                    ? "justify-end md:m-[2px] lg:items-center px-2"
                    : "justify-center  gap-2 w-[100%]"
                } `}
              >
                <button
                  className={`bg-fifthOrange rounded-full p-3 max-h-12 text-secondOrange mr-3 text-center font-medium ${
                    isLandingPage ? "hidden" : "w-[40%] md:w-[30%]"
                  }`}
                  onClick={clearSearch}
                >
                  Clear
                </button>
                <button
                  className={`bg-secondOrange rounded-full p-2 max-h-12 text-white font-medium ${
                    isLandingPage
                      ? " mr-3 md:mr-0 md:py-0 md:px-2 lg:p-3"
                      : "w-[40%] md:w-[30%]"
                  }`}
                  onClick={handleSearch}
                >
                  Search
                </button>
              </div>
              {/* </div> */}
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default SearchBar;
