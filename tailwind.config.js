/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        LibreFranklin: ["Libre Franklin", "sans-serif"],
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
