/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{html,js}",
    "./node_modules/tw-elements/dist/js/**/*.js",

    "./src/public/**/*.html",
  ],
  theme: {
    extend: {
      colors: {
        firstOrange: "#E44A0C",
        secondOrange: "#FF7037",
        thirdOrange: "#FF986F",
        fourthOrange: "#FFB899",
        fifthOrange: "#FFD5C2",
        sixthOrange: "#FFF1EC",
        firstGray: "#3A3B46",
        secondGray: "#5B5D6F",
        thirdGray: "#7B7E8F",
        fourthGray: "#AEB1C3",
        fifthGray: "#DCDFED",
        sixthGray: "#F6F6F9",
        firstYellow: "#FFCA62",
        secondYellow: "#FFF5EC",
        firstLigthBlue: "#76D0FC",
        secondLigthBlue: "#ECFBFF",
        firstGreen: "#1CCD83",
        secondGreen: "#E7FDF4",
        firstPink: "#FA8AC0",
        secondPink: "#FFF0F1",
        firstRed: "#EA1010",
      },

      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
