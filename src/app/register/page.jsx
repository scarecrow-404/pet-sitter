"use client";
import React from "react";
import { useState, useEffect } from "react";
import Image from "next/image";
import supabase from "@/lib/utils/db.js";
import starpic from "@/asset/images/Star1.svg";
import squarepic from "@/asset/images/Ellipse15(butblue).svg";
import cathand from "@/asset/images/Vector(butorange).svg";
import xIcon from "@/asset/images/icons8-twitter.svg";
import Facebookicon from "@/asset/images/Facebookicon.svg";
import Googleicon from "@/asset/images/Googleicon.svg";
import { signUp } from "@/app/services/auth";
import { useRouter } from "next/navigation";
import { signUpWithProvider } from "@/app/services/auth";
import Link from "next/link";
const RegisterPage = () => {
  const router = useRouter();
  const [values, setValues] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [isregister, setIsregister] = useState(false);
  function handleInput(event) {
    const newObj = { ...values, [event.target.name]: event.target.value };
    setValues(newObj);
  }

  function validation() {
    const errors = {};

    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const phone_pattern = /^0[0-9]\d{8}$/g;
    const password_pattern = /^[a-zA-Z0-9!@#\$%\^\&*_=+-]{8,12}$/g;

    if (values.name === "") {
      errors.name = "*Please enter your name";
    } else if (values.name.length < 6) {
      errors.name =
        "*Your name must contain minimum 4 characters and maximum 20 characters";
    } else if (values.name.length > 20) {
      errors.name =
        "*Your name must contain minimum 4 characters and maximum 20 characters";
    }

    if (values.email === "") {
      errors.email = "*Please enter your email";
    } else if (!email_pattern.test(values.email)) {
      errors.email = "*Invalid email address please try again";
    }

    if (values.phone === "") {
      errors.phone = "*Please enter your phone number";
    } else if (!phone_pattern.test(values.phone)) {
      errors.phone = "*Invalid phone number please try again";
    }

    if (values.password === "") {
      errors.password = "*Please enter your password";
    } else if (values.password.length < 12) {
      errors.password = "*Your password must be at least 12 characters long";
    }

    // } else if (!password_pattern.test(values.password)) {
    //   errors.password =
    //     "-มีตัวพิมพ์ใหญ่ 1 ตัว -มีตัวพิมพ์เล็กอย่างน้อย 1 ตัว -มีตัวเลขอย่างน้อย 1 ตัว -มีตัวอักษรพิเศษอย่างน้อย 1 ตัว (!@#$%^&*_=+-) -รหัสผ่านต้องมีอย่างน้อย 8 และไม่เกิน 12 ตัว";

    return errors;
  }

  function handleValidation(event) {
    event.preventDefault();
    const validationErrors = validation(values);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      const user = signUp(values.email, values.password, values);
      router.push("/login");
    }
  }
  async function handleOAuth(provider) {
    let result = await signUpWithProvider(provider);
  }

  return (
    <div className="flex items-center justify-center">
      <div className="h-screen xl:w-[1440px] flex items-center justify-center relative">
        <div className="grid sm:gap-[24px] z-10">
          <div className="pb-[24px] gap-[8px] text-center">
            <h1 className="text-[56px] font-[700] leading-[64px] sm:text-[56px] sm:leading-[64px] ">
              Join Us!
            </h1>
            <p className="text-[16px] font-[700] leading-[32px] sm:text-[24px] text-[#7B7E8F] ">
              Find your perfect pet sitter with us
            </p>
          </div>

          <div className="">
            <form
              onSubmit={handleValidation}
              className="grid gap-[8px] sm:gap-[16px]"
            >
              <div>
                <label
                  className="text-[16px] font-[500] leading-[24px]"
                  htmlFor="name"
                >
                  Your Name
                </label>
                <br />
                <input
                  className={
                    errors.name
                      ? "text-[14px] sm:text-[16px] font-[400] leading-[24px] w-full sm:w-[440px] mt-[4px] px-[16px] py-[5px] sm:py-[12px] border-[1px] border-[#e74c3c] rounded-[8px] outline-[#FF7037] focus:border-[#FF7037] focus:ring-[#FF7037]"
                      : "text-[14px] sm:text-[16px] font-[400] leading-[24px] w-full sm:w-[440px] mt-[4px] px-[16px] py-[5px] sm:py-[12px] border-[1px] border-[#DCDFED] rounded-[8px] outline-[#FF7037] focus:border-[#FF7037] focus:ring-[#FF7037]"
                  }
                  type="name"
                  id="name"
                  name="name"
                  placeholder="Enter your full name"
                  input
                  onChange={handleInput}
                />
              </div>
              {errors.name && (
                <small className="text-[#e74c3c]">{errors.name}</small>
              )}

              <div>
                <label
                  className="text-[16px] font-[500] leading-[24px]"
                  htmlFor="email"
                >
                  Email
                </label>
                <br />
                <input
                  className={
                    errors.email
                      ? "text-[14px] sm:text-[16px] font-[400] leading-[24px] w-full sm:w-[440px] mt-[4px] px-[16px] py-[5px] sm:py-[12px] border-[1px] border-[#e74c3c] rounded-[8px] outline-[#FF7037] focus:border-[#FF7037] focus:ring-[#FF7037]"
                      : "text-[14px] sm:text-[16px] font-[400] leading-[24px] w-full sm:w-[440px] mt-[4px] px-[16px] py-[5px] sm:py-[12px] border-[1px] border-[#DCDFED] rounded-[8px] outline-[#FF7037] focus:border-[#FF7037] focus:ring-[#FF7037]"
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

              <div>
                <label
                  className="text-[16px] font-[500] leading-[24px]"
                  htmlFor="phone"
                >
                  Phone
                </label>
                <br />
                <input
                  className={
                    errors.phone
                      ? "text-[14px] sm:text-[16px] font-[400] leading-[24px] w-full sm:w-[440px] mt-[4px] px-[16px] py-[5px] sm:py-[12px] border-[1px] border-[#e74c3c] rounded-[8px] outline-[#FF7037] focus:border-[#FF7037] focus:ring-[#FF7037]"
                      : "text-[14px] sm:text-[16px] font-[400] leading-[24px] w-full sm:w-[440px] mt-[4px] px-[16px] py-[5px] sm:py-[12px] border-[1px] border-[#DCDFED] rounded-[8px] outline-[#FF7037] focus:border-[#FF7037] focus:ring-[#FF7037]"
                  }
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder="Your phone number"
                  maxLength={10}
                  onChange={handleInput}
                />
              </div>
              {errors.phone && (
                <small className="text-[#e74c3c]">{errors.phone}</small>
              )}

              <div>
                <label
                  className="text-[16px] font-[500] leading-[24px]"
                  htmlFor="password"
                >
                  Password
                </label>
                <br />
                <input
                  className={
                    errors.password
                      ? "text-[14px] sm:text-[16px] font-[400] leading-[24px] w-full sm:w-[440px] mt-[4px] px-[16px] py-[5px] sm:py-[12px] border-[1px] border-[#e74c3c] rounded-[8px] outline-[#FF7037] focus:border-[#FF7037] focus:ring-[#FF7037]"
                      : "text-[14px] sm:text-[16px] font-[400] leading-[24px] w-full sm:w-[440px] mt-[4px] px-[16px] py-[5px] sm:py-[12px] border-[1px] border-[#DCDFED] rounded-[8px] outline-[#FF7037] focus:border-[#FF7037] focus:ring-[#FF7037]"
                  }
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Create your password"
                  input
                  onChange={handleInput}
                />
              </div>
              {errors.password && (
                <small className="text-[#e74c3c]">{errors.password}</small>
              )}

              <div className="text-center mt-[10px]">
                <button
                  className="bg-[#FF7037] text-[14px] sm:text-[16px] font-[700] leading-[24px] text-[#FFFFFF] rounded-[99px] sm:px-[24px] py-[5px] sm:py-[12px] w-[200px] sm:w-full"
                  type="submit"
                >
                  Register
                </button>
              </div>

              <h3 className="flex items-center w-full">
                <span class="flex-grow bg-gray-200 rounded h-[1px]"></span>
                <span class="text-[14px] sm:text-[18px] text-[#7B7E8F] font-[500] leading-[26px] mx-3">
                  Or Continue With
                </span>
                <span class="flex-grow bg-gray-200 rounded h-[1px]"></span>
              </h3>
            </form>
            <div className="text-center">
              <div className="flex gap-[12px] justify-between">
                {/* <button
                  value="twitter"
                  className="flex justify-center gap-[10px] bg-[#F6F6F9] text-black w-1/2 rounded-[99px] px-[24px] py-[6px] sm:py-[12px] h-[34px] sm:h-[48px]"
                  onClick={() => handleOAuth("twitter")}
                >
                  <span className="flex items-center">
                    <Image src={xIcon} alt="X icon" />
                  </span>
                  <span className="sm:block hidden text-[16px] font-[700] leading-[24px]">
                    X
                  </span>
                </button> */}
                <button
                  value="google"
                  className="flex justify-center gap-[10px] bg-[#F6F6F9] text-black w-[100%] rounded-[99px] px-[24px] py-[6px] sm:py-[12px] h-[34px] sm:h-[48px]"
                  onClick={() => handleOAuth("google")}
                >
                  <span>
                    <Image src={Googleicon} alt="Google_icon" />
                  </span>
                  <span className="sm:block hidden text-[16px] font-[700] leading-[24px]">
                    Gmail
                  </span>
                </button>
              </div>
            </div>

            <div className="text-center ">
              <p className="text-[14px] sm:text-[16px] font-[700] leading-[24px]">
                Already have an account?&nbsp;
                <Link href="/login">
                  <span className="text-secondOrange">Login</span>
                </Link>
              </p>
            </div>
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
};

export default RegisterPage;
