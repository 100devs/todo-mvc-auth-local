/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/*.ejs", "./node_modules/flowbite/**/*.js"],

  theme: {
    fontFamily: {
      krona: ["Krona One", "sans-serif"],
      londrina: ["Londrina Shadow", "cursive"],
      long: ["Long Cang", "cursive"],
      love: ["Love Light", "cursive"],
      source: ["Source Sans Pro", "sans-serif"],
    },
    extend: {
      backgroundImage: {
        guitar: "url('/img/guitar.webp')",
      },
    },
  },
  plugins: [require("flowbite")],
};
