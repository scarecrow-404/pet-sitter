"use client";
import React, { useEffect, useState } from "react";

import Image from "next/image";
import supabase from "@/lib/utils/db";
import { useRouter } from "next/navigation";
import starpic from "@/asset/images/Star1.svg";
import squarepic from "@/asset/images/Ellipse15(butblue).svg";
import cathand from "@/asset/images/Vector(butorange).svg";
import Facebookicon from "@/asset/images/Facebookicon.svg";
import Googleicon from "@/asset/images/Googleicon.svg";
import { useUser } from "@/hooks/hooks";
import { signInWithProvider } from "@/app/services/auth";
import Link from "next/link";
import xIcon from "@/asset/images/icons8-twitter.svg";

import { useToast } from "@chakra-ui/react";
const LoginPage = () => {
  const toast = useToast();
  const [values, setValues] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [rememberMe, setRememberMe] = useState(false);
  const { user, setUser, userId } = useUser();
  const router = useRouter();
  function handleInput(event) {
    const newObj = { ...values, [event.target.name]: event.target.value };
    setValues(newObj);
  }

  function validation() {
    const errors = {};

    if (values.email === "") {
      errors.email = "*Plase enter your email address";
    }

    if (values.password === "") {
      errors.password = "*Please enter your password";
    }

    return errors;
  }
  async function handleOauthSignIn(provider) {
    try {
      const redirect_to = "/auth/callback";
      const user = await signInWithProvider(provider, redirect_to);
    } catch (error) {

    }
  }
  //   }
  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          router.push("/");
        }
      }
    );
  }, [router]);

  async function handleValidation(event) {
    event.preventDefault();
    setErrors(validation(values));
    if (Object.keys(errors).length === 0) {
      const { email, password } = values;
      try {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          toast({
            title: "Error",
            position: "top",
            description: "Email or password is incorrect!",
            status: "error",
            duration: 9000,
            isClosable: true,
          });
        } else if (rememberMe) {
          localStorage.setItem("session_token", session.access_token);
        } else {
          sessionStorage.setItem("session_token", session.access_token);
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
              Welcome
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
                  htmlFor="email"
                >
                  Email
                </label>
                <br />
                <input
                  className={
                    errors.email
                      ? "text-[14px] sm:text-[16px] font-[400] leading-[24px] w-full sm:w-[440px] mt-[4px] px-[16px] py-[5px] sm:py-[12px] border-[1px] border-[#e74c3c] rounded-[8px] focus:border-[#FF7037] focus:ring-[#FF7037]"
                      : "text-[14px] sm:text-[16px] font-[400] leading-[24px] w-full sm:w-[440px] mt-[4px] px-[16px] py-[5px] sm:py-[12px] border-[1px] border-[#DCDFED] rounded-[8px] focus:border-[#FF7037] focus:ring-[#FF7037]"
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
                  htmlFor="password"
                >
                  Password
                </label>
                <br />
                <input
                  className={
                    errors.password
                      ? "text-[14px] sm:text-[16px] font-[400] leading-[24px] w-full sm:w-[440px] mt-[4px] px-[16px] py-[5px] sm:py-[12px] border-[1px] border-[#e74c3c] rounded-[8px] focus:border-[#FF7037] focus:ring-[#FF7037]"
                      : "text-[14px] sm:text-[16px] font-[400] leading-[24px] w-full sm:w-[440px] mt-[4px] px-[16px] py-[5px] sm:py-[12px] border-[1px] border-[#DCDFED] rounded-[8px] focus:border-[#FF7037] focus:ring-[#FF7037]"
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

              <div className="flex justify-between">
                <div>
                  <input
                    type="checkbox"
                    id="rememberMe"
                    name="rememberMe"
                    value={rememberMe}
                    onChange={() => setRememberMe(!rememberMe)}
                    className="text-[#FF7037] rounded-[6px] mr-[5px] focus:ring-0 "
                  />
                  <span className="text-[16px] font-[500] leading-[24px]">
                    Remember?
                  </span>
                </div>
                <Link href="/login/forget_password">
                  <div className="text-[16px] text-[#FF7037] font-[700] leading-[24px]">
                    Forget Password?
                  </div>
                </Link>
              </div>

              <div className="text-center my-[10px]">
                <button
                  className="bg-[#FF7037] text-[14px] sm:text-[16px] font-[700] leading-[24px] text-[#FFFFFF] rounded-[99px] sm:px-[24px] py-[5px] sm:py-[12px] w-[200px] sm:w-full"
                  type="submit"
                >
                  Login
                </button>
              </div>

              <h3 className="flex items-center w-full">
                <span className="flex-grow bg-gray-200 rounded h-[1px]"></span>
                <span className="text-[14px] sm:text-[18px] text-[#7B7E8F] font-[500] leading-[26px] mx-3">
                  Or Continue With
                </span>
                <span className="flex-grow bg-gray-200 rounded h-[1px]"></span>
              </h3>

              <div className="text-center">
                <div className="flex gap-[12px] justify-between">
                  {/* <button
                    className="flex justify-center gap-[10px] bg-[#F6F6F9] text-black w-1/2 rounded-[99px] px-[24px] py-[12px] h-[34px] sm:h-[48px]"
                    onClick={() => handleOauthSignIn("twitter")}
                  >
                    <span className="flex items-center">
                      <Image src={xIcon} alt="x icon" />
                    </span>
                    <span className="sm:block hidden text-[16px] font-[700] leading-[24px]">
                      X
                    </span>
                  </button> */}
                  <button
                    className="flex justify-center gap-[10px] bg-[#F6F6F9]  text-black w-[100%] rounded-[99px] px-[24px] py-[6px] sm:py-[12px] h-[34px] sm:h-[48px]"
                    onClick={() => handleOauthSignIn("google")}
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
};

export default LoginPage;
