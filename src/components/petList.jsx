"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import previewPet from "@/asset/images/catforsitterlist.jpg";
function petList() {
  // pls edit when sfetch data
  // // useState for rendering pet list
  // const [petList, setPetList] = useState([]);
  // // function for get pet list from db
  // const getPEtList = async () => {
  //   const result = await axios.get("");
  //   setPetList(result.data.data);
  // };

  // useEffect(() => {
  //   getPEtList(), [];
  // });
  // for change type
  // if (petList.type === Cat) {
  //   return (
  //     <div className="border-2 border-firstPink bg-secondPink text-firstPink px-5 py-1 rounded-3xl font-medium">
  //       Cat
  //     </div>
  //   );
  // } else if (petList.type === Dog) {
  //   return (
  //     <div className="border-2 border-firstGreen bg-secondGreen text-firstGreen px-5 py-1 rounded-3xl font-medium">
  //       Dog
  //     </div>
  //   );
  // } else if (petList.type === Bird) {
  //   return (
  //     <div className="border-2 border-firstLigthBlue bg-secondLigthBlue text-firstLigthBlue px-5 py-1 rounded-3xl font-medium">
  //       Bird
  //     </div>
  //   );
  // } else if (petList.type === Rabbit) {
  //   return (
  //     <div className="border-2 border-thirdOrange bg-secondYellow text-thirdOrange px-5 py-1 rounded-3xl font-medium">
  //       Rabbit
  //     </div>
  //   );
  // } else {
  //   return (
  //     <div className="border-2 border-firstGray bg-fifthGray text-firstGray px-5 py-1 rounded-3xl font-medium">
  //       {petList.type}
  //     </div>
  //   );
  // }
  return (
    <div className="flex flex-col justify-center items-center py-4 gap-5 max-w-[1440px] mx-auto">
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
      <div className="flex flex-col justify-center items-center w-11/12 py-5 gap-5 md:flex-row md:flex-wrap md:gap-3 md:justify-start md:px-5">
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
          <div className="border-2 border-thirdOrange bg-secondYellow text-thirdOrange px-4 py-1 rounded-3xl font-medium">
            Rabbit
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
