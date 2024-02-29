"use client";
import Footer from "@/components/common/Footer";
import Navbar from "@/components/common/Navbar";

import SearchBar from "@/components/common/SearchBar";
import Link from "next/link";
import Image from "next/image";
import catPortrait from "@/asset/images/cat-portrait.svg";
import topicStar1 from "@/asset/images/topic-star-1.svg";
import topicStar2 from "@/asset/images/topic-star-2.svg";
import topicStar3 from "@/asset/images/topic-star-3.svg";
import topicStar4 from "@/asset/images/topic-star-4.svg";
import connect from "@/asset/images/connect-with-sitter.svg";
import better from "@/asset/images/better-for-your-pet.svg";
import calling from "@/asset/images/calling-all-pet.svg";
import greenStar from "@/asset/images/greenStar.svg";
import blueEllipse from "@/asset/images/Ellipse17.svg";
import halfYellowEllipse from "@/asset/images/half-yellow-ellipse.svg";
import catAllElement from "@/asset/images/catAllElement.svg";
import dogAllElement from "@/asset/images/dogAllElement.svg";
import { Player, Controls } from "@lottiefiles/react-lottie-player";
import loadingPic from "@/lib/utils/loading.json";
import { useUser } from "@/hooks/hooks";
import { el } from "date-fns/locale";
import Lottie from "react-lottie";
import { useEffect } from "react";
import {
  redirect,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
export default function Home() {
  const searchParams = useSearchParams();

  const code = searchParams.get("code");
  const router = useRouter();

  useEffect(() => {
    if (code) {
      redirect("/");
    }
  }, []);
  const { user, setUser, isLoading, setIsLoading } = useUser();
  const options = {
    loop: true,
    autoplay: true,
    animationData: loadingPic,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <>
      <Navbar />
      {isLoading ? (
        <Lottie options={options} height="auto" width="auto" />
      ) : (
        <>
          <main className="flex min-h-4/6 flex-col items-center justify-between gap-10 my-3 max-w-[1440px] mx-auto lg:gap-20 lg:my-6 ">
            <div className="w-full flex flex-row justify-center items-center lg:w-11/12">
              <div className="w-[23%] relative top-7 md:top-0 md:w-[25%] lg:w-[25%]">
                <Image
                  src={catAllElement}
                  alt="cat-with-element"
                  className="w-full"
                />
              </div>
              <div className="text-center flex flex-col z-10 gap-5 w-[55%]  md:w-[40%] lg:w-[45%]">
                <div className="text-3xl font-extrabold md:text-[40px] lg:text-6xl">
                  Pet Sitter<span className="text-secondOrange">,</span>
                  <br />
                  Perfect<span className="text-firstLigthBlue">,</span>
                  <br />
                  For your pet<span className="text-firstYellow">.</span>
                </div>
                <p className="text-thirdGray text-[10px] font-semibold md:text-sm lg:text-base">
                  Find your perfect pet sitter with us.
                </p>
              </div>
              <div className="w-[23%] relative top-7 md:top-0 md:w-[25%] lg:w-[25%]">
                <Image
                  src={dogAllElement}
                  alt="dog-with-element"
                  className="w-full"
                />
              </div>
            </div>
            <SearchBar />

            <p className="w-11/12 text-center text-base font-extrabold md:text-lg lg:text-2xl">
              &quot;Your Pets, Our Priority: Perfect Care, Anytime,
              Anywhere.&quot;
            </p>
            <div className="flex flex-col items-center gap-6 w-10/12 lg:flex-row-reverse lg:justify-between lg:gap-0 lg:w-10/12 lg:px-10">
              <div className="w-3/5 md:w-1/2 lg:w-2/5">
                <Image src={catPortrait} alt="cat-paw" className="w-full" />
              </div>
              <div className="flex flex-col gap-7 w-full md:w-11/12 lg:w-[55%]">
                <div className="flex flex-col gap-2 ">
                  <div className="flex gap-3">
                    <Image src={topicStar1} alt="topic-star-1" />
                    <h1 className="font-bold text-base md:text-lg">Boarding</h1>
                  </div>
                  <p className="text-secondGray text-sm pl-4 md:text-base lg:pl-9 lg:text-sm">
                    Your pets stay overnight in your sitter&apos;s home.
                    They&apos;ll be treated like part of the family in a
                    comfortable environment.
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex gap-3">
                    <Image src={topicStar2} alt="topic-star-2" />
                    <h1 className="font-bold text-base md:text-lg">
                      Safety First
                    </h1>
                  </div>
                  <p className="text-secondGray text-sm pl-4 md:text-base lg:pl-9 lg:text-sm">
                    Your pet&apos;s safety is our top priority. Our pet sitters
                    are trained in pet first aid and are equipped to handle any
                    unexpected situations. Rest easy knowing that your pets are
                    in capable and caring hands.
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex gap-3">
                    <Image src={topicStar3} alt="topic-star-3" />
                    <h1 className="font-bold text-base md:text-lg">
                      Dog Walking
                    </h1>
                  </div>
                  <p className="text-secondGray text-sm pl-4 md:text-base lg:pl-9 lg:text-sm">
                    Your dog gets a walk around your neighborhood. Perfect for
                    busy days and dogs with extra energy to burn.
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex gap-3">
                    <Image src={topicStar4} alt="topic-star-4" />
                    <h1 className="font-bold text-base md:text-lg">
                      Drop-In Visits
                    </h1>
                  </div>
                  <p className="text-secondGray text-sm pl-4 md:text-base lg:pl-9 lg:text-sm">
                    Your sitter drops by your home to play with your pets, offer
                    food, and give potty breaks or clean the litter box.
                  </p>
                </div>
              </div>
            </div>
            <div className="w-10/12 flex flex-col gap-12 lg:flex-row lg:justify-between lg:gap-0 lg:w-10/12">
              <div className="flex flex-col items-center gap-5 lg:w-[32%]">
                <Image
                  src={connect}
                  alt="connect-with-sitters"
                  className="w-3/5 md:w-1/2 lg:w-[70%]"
                />
                <div className="flex flex-col items-center gap-2">
                  <h1 className="font-bold text-base md:text-lg">
                    <span className="text-firstGreen">Connect</span> With
                    Sitters
                  </h1>
                  <p className="w-11/12 text-center text-secondGray text-sm md:text-base md:w-10/12 lg:w-11/12 lg:text-sm">
                    Find a verified and reviewed sitter who&apos;ll keep your
                    pets company and give time.
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-center gap-5 lg:w-[32%]">
                <Image
                  src={better}
                  alt="connect-with-sitters"
                  className="w-3/5 md:w-1/2 lg:w-[70%]"
                />
                <div className="flex flex-col items-center gap-2">
                  <div className="flex flex-col items-center gap-2">
                    <h1 className="font-bold text-base md:text-lg">
                      <span className="text-firstLigthBlue">Better</span> For
                      Your Pets
                    </h1>
                    <p className="w-11/12 text-center text-secondGray text-sm md:text-base md:w-10/12 lg:w-11/12 lg:text-sm">
                      Pets stay happy at home with a sitter who gives them
                      loving care and companionship.
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center gap-5 lg:w-[32%]">
                <Image
                  src={calling}
                  alt="connect-with-sitters"
                  className="w-3/5 md:w-1/2 lg:w-[70%]"
                />
                <div className="flex flex-col items-center gap-2">
                  <h1 className="font-bold text-base md:text-lg">
                    <span className="text-secondOrange">Calling</span> All Pets
                  </h1>
                  <p className="w-11/12 text-center text-secondGray text-sm md:text-base md:w-10/12 lg:w-11/12 lg:text-sm">
                    Stay for free with adorable animals in unique homes around
                    the world.
                  </p>
                </div>
              </div>
            </div>
            <div className="w-full flex flex-col items-center gap-2 bg-secondYellow py-10 relative md:py-14 lg:py-24 lg:w-5/6 lg:rounded-xl lg:gap-4">
              <h1 className="text-center font-bold text-lg z-10 md:text-2xl lg:text-3xl">
                Perfect Pet Sitter <br /> For Your Pet
              </h1>
              {!user ? (
                <Link href="/register">
                  <button className="border bg-secondOrange p-2 text-xs rounded-3xl text-white z-10 lg:text-base lg:p-3">
                    Register
                  </button>
                </Link>
              ) : (
                <Link href="/search">
                  <button className="border bg-secondOrange p-2 text-xs rounded-3xl text-white z-10 lg:text-base lg:p-3">
                    Find A Pet Sitter
                  </button>
                </Link>
              )}
              <Image
                src={halfYellowEllipse}
                alt="connect-with-sitters"
                className="w-[20%] absolute top-0 right-0 md:w-[15%] lg:rounded-tr-xl"
              />
              <Image
                src={greenStar}
                alt="connect-with-sitters"
                className="w-[15%] absolute right-[20%] md:w-[10%] md:right-[15%] lg:w-[13%]"
              />
              <Image
                src={blueEllipse}
                alt="connect-with-sitters"
                className="w-[30%] absolute bottom-0 left-0 md:w-[23%] lg:rounded-bl-xl"
              />
            </div>
          </main>
          <Footer />
        </>
      )}
    </>
  );
}
