"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import supabase from "@/lib/utils/db";
import Image from "next/image";
import starpic from "@/asset/images/Star1.svg";
import squarepic from "@/asset/images/Ellipse15(butblue).svg";
import cathand from "@/asset/images/Vector(butorange).svg";
import Link from "next/link";
import { useToast } from "@chakra-ui/react";
function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [access_token, setAccess_token] = useState(null);
  const [error, setError] = useState(null);
  const router = useRouter();
  const toast = useToast();
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    setAccess_token(code);
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    const { error } = await supabase.auth.updateUser({ password: password });
    if (error) {     
      toast({
        title: "Error",
        position: "top",
        description: "Error resetting password",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Successfully reset",
        position: "top",
        description: "Password reset successfully",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      router.push("/login");
    }
  }
  return (
    <div className="flex items-center justify-center">
      <div className="h-screen xl:w-[1440px] flex items-center justify-center relative">
        <div className="grid sm:gap-[24px] z-10">
          <div className="pb-[24px] mb-[20px] text-center">
            <h1 className="text-[56px] font-[700] leading-[64px] sm:text-[56px] sm:leading-[64px] ">
              Forget Your Password?
            </h1>
            <p className="text-[16px] font-[700] leading-[32px] sm:text-[24px] text-[#7B7E8F] ">
              Set a new password for your account
            </p>
          </div>

          <div className="">
            <form
              onSubmit={handleSubmit}
              className="grid gap-[8px] sm:gap-[16px]"
            >
              <div className="w-[100%] p-3">
                <label
                  className="text-[22px] font-[500] leading-[24px]"
                  htmlFor="password"
                >
                  New Password
                </label>
                <br />
                <input
                  className="text-[16px] sm:text-[16px] font-[400] leading-[24px] w-full sm:w-[100%] mt-[4px] px-[16px] py-[5px] sm:py-[12px] border-[1px] border-[#DCDFED] rounded-[8px] focus:border-[#FF7037] focus:ring-[#FF7037]"
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Your new password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
              </div>
              {error && <p className="text-red-500">{error}</p>}
              <div className="text-center my-[10px]">
                <button
                  className="bg-[#FF7037] text-[14px] sm:text-[16px] font-[700] leading-[24px] text-[#FFFFFF] rounded-[99px] sm:px-[24px] py-[5px] sm:py-[12px] w-[200px] sm:w-[60%]"
                  type="submit"
                >
                  Reset Password
                </button>
              </div>

              <div className="text-center mt-[10px] ">
                <p className="text-[14px] sm:text-[16px] font-[700] leading-[24px]">
                  Don&apos;t have any account?{" "}
                  <Link href="/register">
                    <span className="text-secondOrange">Register</span>
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>

        <div className="-left-[70px] -bottom-[100px] 2xl:bottom-[10px] fixed 2xl:absolute ">
          <Image
            className="w-[318px] h-[310px] rotate-90"
            src={starpic}
            alt="green_star"
          />
        </div>

        <div className="left-[38px] bottom-[240px] 2xl:bottom-[350px] fixed 2xl:absolute ">
          <Image
            className="w-[118px] h-[118px] rotate-45"
            src={squarepic}
            alt="square_pic"
          />
        </div>

        <div className="-right-[30px] top-[0px] fixed 2xl:absolute ">
          <Image className="w-[239px] h-[350]" src={cathand} alt="cat_hand" />
        </div>
      </div>
    </div>
  );
}

export default ResetPasswordPage;
