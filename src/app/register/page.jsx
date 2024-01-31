"use client";
import React from "react";
import { useState } from "react";
import Image from "next/image";

import starpic from "@/asset/images/Star1.svg";
import squarepic from "@/asset/images/Ellipse15(butblue).svg";
import cathand from "@/asset/images/Vector(butorange).svg";
import Facebookicon from "@/asset/images/Facebookicon.svg";
import Googleicon from "@/asset/images/Googleicon.svg";

const RegisterPage = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

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
      errors.name = "*กรุณากรอกชื่อ";
    } else if (values.name.length < 6) {
      errors.name = "*ชื่อผู้ใช้ต้องมีตัวอักษรมากกว่า 6 และไม่เกิน 20 ตัว";
    } else if (values.name.length > 20) {
      errors.name = "*ชื่อผู้ใช้ต้องมีตัวอักษรมากกว่า 6 และไม่เกิน 20 ตัว";
    }

    if (values.email === "") {
      errors.email = "*กรุณากรอกอีเมลล์";
    } else if (!email_pattern.test(values.email)) {
      errors.email = "*กรุณากรอกฟอร์มอีเมลล์ให้ถูกต้อง .com";
    }

    if (values.phone === "") {
      errors.phone = "*กรุณากรอกเบอร์โทร";
    } else if (!phone_pattern.test(values.phone)) {
      errors.phone = "*กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง";
    }

    if (values.password === "") {
      errors.password = "*กรุณากรอกรหัสผ่าน";
    } else if (values.password.length < 12) {
      errors.password = "*รหัสผ่านต้องมีตัวอักษร 12ตัวขึ้นไป";
    }

    // } else if (!password_pattern.test(values.password)) {
    //   errors.password =
    //     "-มีตัวพิมพ์ใหญ่ 1 ตัว -มีตัวพิมพ์เล็กอย่างน้อย 1 ตัว -มีตัวเลขอย่างน้อย 1 ตัว -มีตัวอักษรพิเศษอย่างน้อย 1 ตัว (!@#$%^&*_=+-) -รหัสผ่านต้องมีอย่างน้อย 8 และไม่เกิน 12 ตัว";

    return errors;
  }

  function handleValidation(event) {
    event.preventDefault();
    setErrors(validation(values));
  }

  return (
    <div className="flex items-center justify-center">
      <div className="h-screen xl:w-[1440px] flex items-center justify-center relative">
        <div className="grid sm:gap-[24px] z-10">
          <div className="pb-[24px] gap-[8px] text-center">
            <h1 className="text-[44px] sm:text-[56px] sm:leading-[64px] ">
              Join Us!
            </h1>
            <p className="text-[18px] sm:text-[24px]">
              Find your perfect pet sitter with us
            </p>
          </div>

          <div className="">
            <form
              onSubmit={handleValidation}
              className="grid gap-[8px] sm:gap-[16px]"
            >
              <div>
                <label className="text-[16px]">Your Name</label>
                <br />
                <input
                  className="w-full sm:w-[440px] mt-[4px] px-[16px] py-[5px] sm:py-[12px] border-[1px] rounded-[8px]  "
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
                <label className="text-[16px]" htmlFor="email">
                  Email
                </label>
                <br />
                <input
                  className="w-full sm:w-[440px] mt-[4px] px-[16px] py-[5px] sm:py-[12px] border-[1px] rounded-[8px]  "
                  type="email"
                  id="email"
                  name="email"
                  placeholder="email@company.com"
                  input
                  onChange={handleInput}
                />
              </div>
              {errors.email && (
                <small className="text-[#e74c3c]">{errors.email}</small>
              )}

              <div>
                <label className="text-[16px]" htmlFor="phone">
                  Phone
                </label>
                <br />
                <input
                  className="w-full sm:w-[440px] mt-[4px] px-[16px] py-[5px] sm:py-[12px] border-[1px] rounded-[8px]  "
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder="Your phone number"
                  input
                  onChange={handleInput}
                />
              </div>
              {errors.phone && (
                <small className="text-[#e74c3c]">{errors.phone}</small>
              )}

              <div>
                <label className="text-[16px]" htmlFor="password">
                  Password
                </label>
                <br />
                <input
                  className="w-full sm:w-[440px] mt-[4px] px-[16px] py-[5px] sm:py-[12px] border-[1px] rounded-[8px]  "
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
                  className="bg-[#FF7037] text-[#FFFFFF] rounded-[99px] sm:px-[24px] py-[5px] sm:py-[12px] w-[200px] sm:w-full"
                  type="submit"
                >
                  Register
                </button>
              </div>

              <h3 className="flex items-center w-full">
                <span class="flex-grow bg-gray-200 rounded h-1"></span>
                <span class="mx-3 text-lg font-medium">Or Countinue With</span>
                <span class="flex-grow bg-gray-200 rounded h-1"></span>
              </h3>

              <div className="text-center">
                <div className="flex gap-[12px] justify-between">
                  <div className="flex justify-center gap-[10px] bg-[#F6F6F9] text-black w-1/2 rounded-[99px] px-[24px] py-[12px] h-[34px] sm:h-[48px]">
                    <span className="flex items-center">
                      <Image src={Facebookicon} alt="Facebook_icon" />
                    </span>
                    <span className="sm:block hidden">Facebook</span>
                  </div>
                  <div className="flex justify-center gap-[10px] bg-[#F6F6F9] text-black w-1/2 rounded-[99px] px-[24px] py-[6px] sm:py-[12px] h-[34px] sm:h-[48px]">
                    <span>
                      <Image src={Googleicon} alt="Google_icon" />
                    </span>
                    <span className="sm:block hidden">Gmail</span>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <p>Already have an account? Login</p>
              </div>
            </form>
          </div>
        </div>

        <div className="-left-[70px] -bottom-[100px] fixed">
          <Image
            className="w-[318px] h-[310px] rotate-90"
            src={starpic}
            alt="green_star"
          />
        </div>

        <div className="left-[38px] bottom-[240px] fixed">
          <Image
            className="w-[118px] h-[118px] rotate-45"
            src={squarepic}
            alt="square_pic"
          />
        </div>

        <div className="-right-[30px] top-[0px] fixed">
          <Image className="w-[239px] h-[350]" src={cathand} alt="cat_hand" />
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
