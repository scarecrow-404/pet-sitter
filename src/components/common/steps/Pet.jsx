"use client";
import React, { useState } from "react";
import Image from "next/image";
import previewPet from "@/asset/images/catforsitterlist.jpg";

const petData = [
  {
    id: 1,
    name: "boy",
    type: "dog",
    img: previewPet,
  },
  {
    id: 2,
    name: "joe",
    type: "cat",
    img: previewPet,
  },
  {
    id: 3,
    name: "hawk",
    type: "bird",
    img: previewPet,
  },
  {
    id: 4,
    name: "bill",
    type: "rabbit",
    img: previewPet,
  },
];

function Pet({ formData, handleInput }) {
  const [petLists, setPetLists] = useState(petData);

  const [isChecked, setChecked] = useState(false);

  const handleClick = () => {
    setChecked(!isChecked);
  };

  return (
    <div className="flex flex-col justify-center items-center md:items-start max-w-[1440px] mx-auto">
      {/* topic */}
      <div className="flex flex-row justify-center md:justify-start p-3">
        <div className="text-[16px] font-[500] leading-[24px] md:ml-[60px] ">
          Choose Your Pet
        </div>
      </div>
      {/* area for map petlist */}
      <div className="flex justify-center h-[480px] overflow-y-scroll w-full">
        <div className="grid grid-cols-2 xl:grid-cols-3 py-5 gap-5">
          {/* map here */}
          {petData.map((pet) => {
            return (
              <div key={pet.id}>
                <button
                  onClick={handleClick}
                  className={`border w-[140px] md:w-[200px] lg:w-[200px] xl:w-[240px] h-[240px] flex flex-col items-center gap-2 rounded-xl
                ${isChecked ? "border border-[#FF7037]" : ""}`}
                >
                  <div className="flex flex-row justify-end w-full mr-[20px]">
                    <input
                      type="checkbox"
                      name="price"
                      id="price"
                      checked={isChecked}
                      className="w-[20px] h-[20px] rounded-[6px] text-[#FF7037] border-gray-300 mt-[10px] focus:ring-0"
                    />
                  </div>
                  <div className="pet-photo">
                    <Image
                      src={pet.img}
                      alt="preview-pet"
                      className="rounded-full w-[110px] h-[110px]"
                    />
                  </div>
                  <div className="text-[20px] font-[700] leading-[28px] ">
                    {pet.name}
                  </div>
                  <div className="border-2 border-firstPink bg-secondPink text-firstPink mb-[15px] px-5 py-1 rounded-3xl font-medium">
                    {pet.type}
                  </div>
                </button>
              </div>
            );
          })}

          {/* map end here */}
          <div className="border w-[140px] md:w-[200px] lg:w-[220px] xl:w-[240px] h-[240px] flex flex-col items-center gap-2 rounded-xl"></div>
        </div>
      </div>
    </div>
  );
}

export default Pet;
