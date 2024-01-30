"use client";
import React from "react";
import { useState } from "react";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div className="flex items-center justify-center">
      <div className="h-screen xl:w-[1440px] flex items-center justify-center relative">
        <div className=" grid gap-[24px] z-10">
          <div className="pb-[24px] gap-[8px] text-center">
            <h1 className="text-[56px]  leading-[64px] ">Join Us!</h1>
            <p className="text-[18px] sm:text-[24px] ">
              Find your perfect <br className="sm:hidden" /> pet sitter with us
            </p>
          </div>

          <div className="flex justify-center">
            <form onSubmit={handleSubmit} className="grid gap-[16px] center">
              <div>
                <label className="text-[16px]">Your Name</label>
                <br />
                <input
                  className="sm:w-[440px] mt-[4px] px-[16px] py-[12px] border-[1px] rounded-[8px]  "
                  type="name"
                  id="name"
                  name="name"
                  placeholder="Enter your full name"
                  input
                  onChange={(event) => setName(e.target.value)}
                  required
                />
              </div>
              <small>กรุณาใส่ชื่อให้เรียบร้อย</small>

              <div>
                <label className="text-[16px]" htmlFor="email">
                  Email
                </label>
                <br />
                <input
                  className="sm:w-[440px] mt-[4px] px-[16px] py-[12px] border-[1px] rounded-[8px]  "
                  type="email"
                  id="email"
                  name="email"
                  placeholder="email@company.com"
                  input
                  onChange={(event) => setEmail(e.target.value)}
                  required
                />
              </div>
              <small>กรุณากรอกรูปแบบemail (@ และ .com) ให้ครบถ้วน</small>

              <div>
                <label className="text-[16px]" htmlFor="phone">
                  Phone
                </label>
                <br />
                <input
                  className="sm:w-[440px] mt-[4px] px-[16px] py-[12px] border-[1px] rounded-[8px]  "
                  type="tel"
                  id="phone_number"
                  name="phone_number"
                  placeholder="Your phone number"
                  input
                  onChange={(event) => setPhoneNumber(e.target.value)}
                  required
                />
              </div>
              <small>กรุณากรอกเบอร์โทรศัพท์ 10ตัว ให้ครบถ้วน</small>

              <div>
                <label className="text-[16px]" htmlFor="password">
                  Password
                </label>
                <br />
                <input
                  className="sm:w-[440px] mt-[4px] px-[16px] py-[12px] border-[1px] rounded-[8px]  "
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Create your password"
                  input
                  onChange={(event) => setPassword(e.target.value)}
                  required
                />
              </div>
              <small>รหัสpasswordควรมีมากกว่า12ตัวอักษร</small>

              <div className="text-center">
                <button
                  className="bg-[#FF7037] rounded-[99px] px-[24px] py-[12px] w-full"
                  type="submit"
                >
                  Register
                </button>
              </div>

              <p className="text-center">Or Countinue With</p>

              <div className="text-center">
                <div className="flex gap-[12px] justify-between">
                  <div className="bg-[#F6F6F9] text-black w-1/2 rounded-[99px] px-[24px] py-[12px] h-[48px]">
                    <div></div>Facebook
                  </div>
                  <div className="bg-[#F6F6F9] text-black w-1/2 rounded-[99px] px-[24px] py-[12px] h-[48px]">
                    Gmail
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
          <svg
            width="318"
            height="310"
            viewBox="0 0 188 192"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="rotate-90"
          >
            <path
              d="M123.387 0.717219L136.384 50.7374L187.827 56.1232L156.791 97.44L184.673 140.976L132.974 142.477L116.299 191.38L82.868 151.935L34.1929 169.379L44.2036 118.691L0.181374 91.5415L46.096 67.7794L39.8763 16.4798L87.1202 37.5372L123.387 0.717219Z"
              fill="#1CCD83"
            />
          </svg>
        </div>

        <div className="left-[38px] bottom-[240px] fixed">
          <svg
            width="118"
            height="118"
            viewBox="0 0 118 118"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="rotate-45"
          >
            <path
              d="M0 117.5C3.68009e-07 102.07 3.03923 86.7905 8.94416 72.5347C14.8491 58.2789 23.5041 45.3258 34.415 34.4149C45.3258 23.5041 58.279 14.8491 72.5347 8.94415C86.7905 3.03922 102.07 -2.88193e-06 117.5 0L117.5 77.3354C112.226 77.3354 107.003 78.3742 102.13 80.3927C97.2567 82.4112 92.8289 85.3697 89.0993 89.0993C85.3697 92.8289 82.4112 97.2566 80.3927 102.13C78.3742 107.003 77.3353 112.226 77.3353 117.5H0Z"
              fill="#76D0FC"
            />
          </svg>
        </div>

        <div className="-right-[30px] top-[0px] fixed">
          <svg
            width="239"
            height="350"
            viewBox="0 0 163 169"
            fill="none"
            transform="rotate(290)"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M151.951 87.1469C151.842 87.0623 151.71 87.0175 151.591 86.9505C167.657 64.7346 160.119 43.0141 146.386 32.0517C137.425 24.8994 125.967 22.8068 117.108 24.1907C113.871 15.7984 106.337 6.88797 95.6847 2.67736C79.3572 -3.77656 56.8431 0.53281 45.7025 25.6042C45.5853 25.5343 45.4808 25.4423 45.3534 25.3901C35.6324 21.4105 16.1481 23.6788 6.67511 39.771C-7.307 63.5226 5.1663 80.7418 4.23574 96.6137C2.58639 124.751 15.4151 142.036 40.7749 156.263L41.2958 156.564C66.2532 171.49 87.5852 173.996 111.043 158.494C124.276 149.75 145.373 151.98 158.88 127.953C168.031 111.674 160.245 93.6065 151.952 87.1478L151.951 87.1469Z"
              fill="#FFCA62"
            />
            <path
              d="M41.3355 81.9771C50.8793 79.4823 56.1288 68.0257 53.0607 56.3882C49.9925 44.7506 39.7685 37.339 30.2247 39.8339C20.681 42.3288 15.4314 53.7853 18.4996 65.4228C21.5677 77.0604 31.7917 84.472 41.3355 81.9771Z"
              fill="white"
            />
            <path
              d="M77.5114 59.4181C87.2039 61.324 96.9063 53.3023 99.1822 41.5012C101.458 29.7 95.4458 18.5883 85.7532 16.6823C76.0607 14.7764 66.3584 22.7981 64.0824 34.5992C61.8065 46.4004 67.8189 57.5121 77.5114 59.4181Z"
              fill="white"
            />
            <path
              d="M130.822 130.52C142.399 127.368 149.662 117.078 147.043 107.536C144.424 97.9947 132.916 92.8154 121.338 95.9678C109.761 99.1202 102.498 109.411 105.117 118.952C107.736 128.493 119.244 133.673 130.822 130.52Z"
              fill="white"
            />
            <path
              d="M134.636 75.4684C143.683 67.5899 145.754 55.1473 139.263 47.677C132.772 40.2066 120.176 40.5375 111.13 48.4159C102.083 56.2944 100.012 68.737 106.503 76.2073C112.994 83.6777 125.59 83.3468 134.636 75.4684Z"
              fill="white"
            />
            <path
              d="M99.2161 128.195C100.824 119.124 96.2755 114.718 96.1148 102.754C96.015 95.3454 102.501 79.1138 89.7885 71.6702C77.0108 64.344 66.2432 78.0967 59.7995 81.7143C49.3939 87.5568 43.3172 85.8065 36.2931 91.7394C32.4349 94.9981 31.5847 99.3897 31.6578 103.199C31.7823 109.778 38.3703 117.596 49.3371 120.08C54.7388 121.304 59.1127 123.606 59.7191 123.934C60.3066 124.298 64.4802 126.948 68.2355 131.03C75.8631 139.318 85.9025 141.133 91.6441 137.953C94.969 136.11 98.333 133.177 99.2161 128.195Z"
              fill="white"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
