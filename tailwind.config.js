/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      bebas: ["Bebas Neue", "cursive"],
      inter: ["Inter", "sans-serif"],
      nimbus: ["Nimbus Sans L", "sans-serif"]
    },
  },
  plugins: [],
};
