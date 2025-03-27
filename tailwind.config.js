/** @type {import('tailwindcss').Config} */
import {white} from "tailwindcss/colors";

export default {
  content: ["./src/**/*.{tsx,jsx}"],
  theme: {
    colors:{
      "primaryDark":"#1A222D",
      "secondaryDark":"#21283A",
      "blue":"#3D63DD",
      "gray":"#797979",
      "middleGray":"#A5A5A5",
      "lightGray":"#D0D0D0",
      "whiteGray":"#F2F2F2",
      white
    },
    screens:{
      xl:"1440px",
      '2xl':"1920px",
    },
    extend: {},
  },
  plugins: [],
}

