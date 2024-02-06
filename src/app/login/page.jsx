"use client";
import React, { useEffect, useState } from "react";

import Image from "next/image";
import { useRouter } from "next/navigation";
import starpic from "@/asset/images/Star1.svg";
import squarepic from "@/asset/images/Ellipse15(butblue).svg";
import cathand from "@/asset/images/Vector(butorange).svg";
import Facebookicon from "@/asset/images/Facebookicon.svg";
import Googleicon from "@/asset/images/Googleicon.svg";
import { user, useUser } from "@/hooks/hooks";
import { signIn } from "@/app/services/auth";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { data } from "jquery";

const LoginPage = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const supabase = createClientComponentClient();
  const [errors, setErrors] = useState({});
  const { user, setUser } = useUser();
  const router = useRouter();
  function handleInput(event) {
    const newObj = { ...values, [event.target.name]: event.target.value };
    setValues(newObj);
  }

  function validation() {
    const errors = {};

    if (values.email === "") {
      errors.email = "*กรุณากรอกอีเมลล์";
    }

    if (values.password === "") {
      errors.password = "*กรุณากรอกรหัสผ่าน";
    }

    return errors;
  }

  // useEffect(() => {
  //   async function getUser() {
  //     const {
  //       data: { user },
  //     } = await supabase.auth.api.getUser();
  //     setUser(user);
  //   }

  //   getUser();
  //   if (user) {
  //     router.push("/");
  //   }
  // }, []);
  // const [prevPath, setPrevPath] = useState("");

  // useEffect(() => {
  //   setPrevPath(document.referrer);
  // }, []);
  async function handleValidation(event) {
    event.preventDefault();
    setErrors(validation(values));
    if (Object.keys(errors).length === 0) {
      let result = await signIn(values.email, values.password);
      setUser(result.user);
      // const { data, insertError } = await supabase.from("users").insert([
      //   {
      //     email: values.email,
      //     phone_number: values.phone,
      //     user_type: "user",

      //     full_name: values.name,
      //   },
      // ]);
      // console.log(data);

      
      if (user) {
        router.push("/");
      }
    }
  }

  return (
    <div className="flex items-center justify-center">
      <div className="h-screen xl:w-[1440px] flex items-center justify-center relative">
        <div className="grid sm:gap-[24px] z-10">
          <div className="pb-[24px] mb-[20px] text-center">
            <h1 className="text-[44px] sm:text-[56px] sm:leading-[64px] ">
              Welcome back!
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

              <div className="flex justify-between">
                <div>
                  <input type="checkbox" />
                  <span> Remember?</span>
                </div>
                <div>Forget Password?</div>
              </div>

              <div className="text-center my-[10px]">
                <button
                  className="bg-[#FF7037] text-[#FFFFFF] rounded-[99px] sm:px-[24px] py-[5px] sm:py-[12px] w-[200px] sm:w-full"
                  type="submit"
                >
                  Login
                </button>
              </div>

              <h3 className="flex items-center w-full mb-[10px]">
                <span className="flex-grow bg-gray-200 rounded h-1"></span>
                <span className="mx-3 text-lg font-medium">
                  Or Countinue With
                </span>
                <span className="flex-grow bg-gray-200 rounded h-1"></span>
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

              <div className="text-center mt-[10px] ">
                <p> Don't have any account? Register</p>
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

export default LoginPage;
