import Footer from "@/components/common/Footer";
import Navbar from "@/components/common/Navbar";
import Image from "next/image";
import catPaw from "@/asset/images/Vector.svg";
import yellowEllipse1 from "@/asset/images/Ellipse15.svg";
import blueRing from "@/asset/images/Group25.svg";
import dot from "@/asset/images/dotdot.svg";
import threeCat from "@/asset/images/3cat.svg";
import orangeStar from "@/asset/images/orangeStar.svg";
import yellowEllipse2 from "@/asset/images/yellow-ellipse14.svg";
import bulldog from "@/asset/images/french-bulldog-wear-glasses.svg";
import grayEllipse from "@/asset/images/grayEllipse16.svg";
import greenEllipse from "@/asset/images/green-ellipse17.svg";
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

export default function Home() {
  return (
    <>

      <Navbar />
      <main className="flex min-h-4/6 flex-col items-center justify-between gap-10 my-3 border-2">
        <div className="w-full flex justify-items-center items-center border-2 border-cyan-500 lg:w-11/12">
          <div className="w-4/12 h-[110px] relative top-4 z-0 border-2 md:h-[280px] md:top-0 lg:h-[350px]">
            <Image
              src={catPaw}
              alt="cat-paw"
              className="absolute w-[45%] top-0 right-[5%]"
            />
            <Image
              src={yellowEllipse1}
              alt="yellow-ellipse"
              className="absolute w-[30%] top-[22%] left-[10%]"
            />
            <Image
              src={blueRing}
              alt="blue-ring"
              className="absolute w-[65%] bottom-0 right-[10%] z-0"
            />
            <Image
              src={dot}
              alt="dot"
              className="absolute z-1 w-[18%] top-[50%] left-[40%] md:top-[48%]"
            />
            <Image
              src={threeCat}
              alt="3-cat"
              className="absolute z-10 w-[60%] rounded-bl-[40%] bottom-0 right-[10%]"
            />
          </div>
          <div className="text-center flex flex-col z-10 gap-5 w-[85%] border-2 md:w-[50%]">
            <div className="text-3xl font-extrabold md:text-4xl lg:text-5xl">
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
          <div className="w-4/12 h-[110px] relative top-4 z-0 border-2 md:h-[280px] md:top-0 lg:h-[350px]">
            <Image
              src={orangeStar}
              alt="orange-star"
              className="absolute w-[43%] left-[3%]"
            />
            <Image
              src={yellowEllipse2}
              alt="yellow-ellipse2"
              className="absolute z-0 w-[58%] bottom-[18%] right-[7%]"
            />
            <Image
              src={bulldog}
              alt="french-bulldog-wear-glasses"
              className="absolute z-10 w-[65%] bottom-[18%] right-[10%] rounded-br-[40%]"
            />
            <Image
              src={grayEllipse}
              alt="gray-ellipse"
              className="absolute w-[20%] bottom-[20%] left-[13%]"
            />
            <Image
              src={greenEllipse}
              alt="green-ellipse"
              className="absolute w-[50%] bottom-0 left-[8%]"
            />
          </div>
        </div>

        <p className="w-11/12 text-center text-base font-extrabold md:text-lg">
          "Your Pets, Our Priority: Perfect Care, Anytime, Anywhere."
        </p>
        <div className="flex flex-col items-center gap-6 w-10/12">
          <div className="w-3/5 md:w-1/2">
            <Image src={catPortrait} alt="cat-paw" className="w-full" />
          </div>
          <div className="flex flex-col gap-7 w-full md:w-11/12">
            <div className="flex flex-col gap-2 ">
              <div className="flex gap-3">
                <Image src={topicStar1} alt="topic-star-1" />
                <h1 className="font-bold text-base md:text-lg">Boarding</h1>
              </div>
              <p className="text-secondGray text-sm pl-4 md:text-base lg:pl-9">
                Your pets stay overnight in your sitter's home. They'll be
                treated like part of the family in a comfortable environment.
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex gap-3">
                <Image src={topicStar2} alt="topic-star-2" />
                <h1 className="font-bold text-base md:text-lg">
                  House Sitting
                </h1>
              </div>
              <p className="text-secondGray text-sm pl-4 md:text-base">
                Your sitter takes care of your pets and your home. Your pets
                will get all the attention they need without leaving home.
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex gap-3">
                <Image src={topicStar3} alt="topic-star-3" />
                <h1 className="font-bold text-base md:text-lg">Dog Walking</h1>
              </div>
              <p className="text-secondGray text-sm pl-4 md:text-base">
                Your dog gets a walk around your neighborhood. Perfect for busy
                days and dogs with extra energy to burn.
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex gap-3">
                <Image src={topicStar4} alt="topic-star-4" />
                <h1 className="font-bold text-base md:text-lg">
                  Drop-In Visits
                </h1>
              </div>
              <p className="text-secondGray text-sm pl-4 md:text-base">
                Your sitter drops by your home to play with your pets, offer
                food, and give potty breaks or clean the litter box.
              </p>
            </div>
          </div>
        </div>
        <div className="w-10/12 flex flex-col gap-12">
          <div className="flex flex-col items-center gap-6">
            <Image
              src={connect}
              alt="connect-with-sitters"
              className="w-3/5 md:w-1/2"
            />
            <div className="flex flex-col items-center gap-2">
              <h1 className="font-bold text-base md:text-lg">
                <span className="text-firstGreen">Connect</span> With Sitters
              </h1>
              <p className="w-11/12 text-center text-secondGray text-sm md:text-base md:w-10/12">
                Find a verified and reviewed sitter who'll keep your pets
                company and give time.
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center gap-5">
            <Image
              src={better}
              alt="connect-with-sitters"
              className="w-3/5 md:w-1/2"
            />
            <div className="flex flex-col items-center gap-2">
              <div className="flex flex-col items-center gap-2">
                <h1 className="font-bold text-base md:text-lg">
                  <span className="text-firstLigthBlue">Better</span> For Your
                  Pets
                </h1>
                <p className="w-11/12 text-center text-secondGray text-sm md:text-base md:w-10/12">
                  Pets stay happy at home with a sitter who gives them loving
                  care and companionship.
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center gap-5">
            <Image
              src={calling}
              alt="connect-with-sitters"
              className="w-3/5 md:w-1/2"
            />
            <div className="flex flex-col items-center gap-2">
              <h1 className="font-bold text-base md:text-lg">
                <span className="text-secondOrange">Calling</span> All Pets
              </h1>
              <p className="w-11/12 text-center text-secondGray text-sm md:text-base md:w-10/12">
                Stay for free with adorable animals in unique homes around the
                world.
              </p>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col items-center gap-2 bg-secondYellow py-10 relative md:py-14">
          <h1 className="text-center font-bold text-lg z-10 md:text-2xl">
            Perfect Pet Sitter <br /> For Your Pet
          </h1>
          <button className="border bg-secondOrange p-2 text-xs rounded-3xl text-white z-10 ">
            Find A Pet Sitter
          </button>
          <Image
            src={halfYellowEllipse}
            alt="connect-with-sitters"
            className="w-[20%] absolute top-0 right-0 md:w-[15%]"
          />
          <Image
            src={greenStar}
            alt="connect-with-sitters"
            className="w-[15%] absolute right-[20%] md:w-[10%] md:right-[15%]"
          />
          <Image
            src={blueEllipse}
            alt="connect-with-sitters"
            className="w-[30%] absolute bottom-0 left-0 md:w-[23%]"
          />
        </div>
      </main>{" "}
      <Footer />
  
    </>
  );
}
