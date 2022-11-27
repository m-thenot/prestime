const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
      zinc: colors.zinc,
      slate: colors.slate,
      neutral: colors.neutral,
      primary: {
        100: "#FF6A45",
        200: "#FF8277",
      },
    },
    extend: {
      boxShadow: {
        xl: "0px 0px 10px 1px rgba(0, 0, 0, 0.15)",
      },
    },
    container: {
      center: true,
      screens: {
        "2xl": "1320px",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
