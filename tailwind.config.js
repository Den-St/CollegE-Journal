/** @type {import('tailwindcss').Config} */
import {white} from "tailwindcss/colors";

export default {
  content: ["./src/**/*.{tsx,jsx}"],
  theme: {
    colors:{
      "primaryDark":"rgb(14,14,22)",
      "secondaryDark":"rgb(24,23,34)",
      "thirdDark":"rgb(19,19,28)",
      "gray":"rgb(22,21,31)",
      white
    },
    extend: {},
  },
  plugins: [],
}

