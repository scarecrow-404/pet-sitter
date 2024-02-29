"use client";
import React, { useEffect, useState } from "react";

import Image from "next/image";
import supabase from "@/lib/utils/db";
import { useRouter } from "next/navigation";
import starpic from "@/asset/images/Star1.svg";
import squarepic from "@/asset/images/Ellipse15(butblue).svg";
import cathand from "@/asset/images/Vector(butorange).svg";
import { useToast } from "@chakra-ui/react";
import Link from "next/link";

function ForgetPassword() {
  const [errors, setErrors] = useState({});
  const router = useRouter();
  const toast = useToast();
  const [values, setValues] = useState({
    email: "",
  });
  function handleInput(event) {
    const newObj = { ...values, [event.target.name]: event.target.value };
    setValues(newObj);
  }

  function validation() {
    const errors = {};

    if (values.email === "") {
      errors.email = "*Plase enter your email address";
    }

    return errors;
  }

  async function handleValidation(event) {
    event.preventDefault();
    const validationErrors = validation(values);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      const { email } = values;
      try {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: "http://localhost:3000/login/reset_password",
        });
        if (error) {
          toast({
            title: "Error",
            position: "top",
            description: "Email is incorrect!",
            status: "error",
            duration: 9000,
            isClosable: true,
          });         
        } else {         
          toast({
            title: "Password reset email sent",
            position: "top",
            description: "Check Your email for reset link!",
            status: "success",
            duration: 9000,
            isClosable: true,
          });
        }
      } catch (error) {      
      }
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
              Send a reset link to your email
            </p>
          </div>

          <div className="">
            <form
              onSubmit={handleValidation}
              className="grid gap-[8px] sm:gap-[16px]"
            >
              <div className="w-[100%] p-3">
                <label
                  className="text-[22px] font-[500] leading-[24px]"
                  htmlFor="email"
                >
                  Email
                </label>
                <br />
                <input
                  className={
                    errors.email
                      ? "text-[16px] sm:text-[16px] font-[400] leading-[24px] w-full sm:w-[100%] mt-[4px] px-[16px] py-[5px] sm:py-[12px] border-[1px] border-[#e74c3c] rounded-[8px] focus:border-[#FF7037] focus:ring-[#FF7037]"
                      : "text-[16px] sm:text-[16px] font-[400] leading-[24px] w-full sm:w-[100%] mt-[4px] px-[16px] py-[5px] sm:py-[12px] border-[1px] border-[#DCDFED] rounded-[8px] focus:border-[#FF7037] focus:ring-[#FF7037]"
                  }
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email@company.com"
                  input
                  onChange={handleInput}
                />
              </div>
              {errors.email && (
                <small className="text-[#e74c3c]">{errors.email}</small>
              )}

              <div className="text-center my-[10px]">
                <button
                  className="bg-[#FF7037] text-[14px] sm:text-[16px] font-[700] leading-[24px] text-[#FFFFFF] rounded-[99px] sm:px-[24px] py-[5px] sm:py-[12px] w-[200px] sm:w-[60%]"
                  type="submit"
                >
                  Send Reset Link
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

export default ForgetPassword;
