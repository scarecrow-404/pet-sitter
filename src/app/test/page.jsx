"use client";
import React from "react";
import Image from "next/image";
import previewPet from "@/asset/images/catforsitterlist.jpg";
function petList() {
  return (
    <div className="flex flex-col justify-center items-center py-4 gap-5 border-2 border-x-amber-950">
      {/* topic */}
      <div className="w-11/12 flex flex-row justify-between p-3">
        <div className="font-bold text-lg">Your Pet</div>
        <div>
          <button className="bg-secondOrange p-2 text-sm rounded-3xl text-white">
            Create Pet
          </button>
        </div>
      </div>
      {/* area for map petlist */}
      <div className="border-2 border-green-600 flex flex-col justify-center items-center w-11/12 py-5 gap-5 md:flex-row md:flex-wrap md:gap-3 md:justify-items-stretch">
        {/* map here */}
        <div className="border border-fifthGray w-[210px] flex flex-col items-center py-6 gap-2 rounded-xl">
          <div className="pet-photo">
            <Image
              src={previewPet}
              alt="preview-pet"
              className="rounded-full w-[110px] h-[110px]"
            />
          </div>
          <div className="text-lg font-semibold">Cat</div>
          <div className="border-2 border-firstPink bg-secondPink text-firstPink px-5 py-1 rounded-3xl font-medium">
            Cat
          </div>
        </div>

        <div className="border border-fifthGray w-[210px] flex flex-col items-center py-6 gap-2 rounded-xl">
          <div className="pet-photo">
            <Image
              src={previewPet}
              alt="preview-pet"
              className="rounded-full w-[110px] h-[110px]"
            />
          </div>
          <div className="text-lg font-semibold">Cat</div>
          <div className="border-2 border-firstGreen bg-secondGreen text-firstGreen px-5 py-1 rounded-3xl font-medium">
            Dog
          </div>
        </div>

        <div className="border border-fifthGray w-[210px] flex flex-col items-center py-6 gap-2 rounded-xl">
          <div className="pet-photo">
            <Image
              src={previewPet}
              alt="preview-pet"
              className="rounded-full w-[110px] h-[110px]"
            />
          </div>
          <div className="text-lg font-semibold">Cat</div>
          <div className="border-2 border-firstLigthBlue bg-secondLigthBlue text-firstLigthBlue px-5 py-1 rounded-3xl font-medium">
            Bird
          </div>
        </div>

        <div className="border border-fifthGray w-[210px] flex flex-col items-center py-6 gap-2 rounded-xl">
          <div className="pet-photo">
            <Image
              src={previewPet}
              alt="preview-pet"
              className="rounded-full w-[110px] h-[110px]"
            />
          </div>
          <div className="text-lg font-semibold">Cat</div>
          <div className="border-2 border-firstLigthBlue bg-secondLigthBlue text-firstLigthBlue px-5 py-1 rounded-3xl font-medium">
            Bird
          </div>
        </div>

        <div className="border border-fifthGray w-[210px] flex flex-col items-center py-6 gap-2 rounded-xl">
          <div className="pet-photo">
            <Image
              src={previewPet}
              alt="preview-pet"
              className="rounded-full w-[110px] h-[110px]"
            />
          </div>
          <div className="text-lg font-semibold">Cat</div>
          <div className="border-2 border-firstLigthBlue bg-secondLigthBlue text-firstLigthBlue px-5 py-1 rounded-3xl font-medium">
            Bird
          </div>
        </div>
      </div>
    </div>
  );
}
export default petList;
