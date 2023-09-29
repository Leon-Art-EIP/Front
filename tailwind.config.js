/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundColor: ["focus"],
      colors: {
        primaryRed: "#e03915",
        primaryRedHover: "#e03a15d6",
        primaryRedPressed: "#e03a15d6",
        primaryRedDisabled: "#e03a1580",
        secondaryGrey: "#eeeeee",
        secondaryGreyHover: "#eeeeeec2",
        secondaryGreyPressed: "#eeeeeec2",
        secondaryGreyDisabled: "#eeeeee8b",
        primaryBlack: "#2d142c",
        primaryBlackHover: "#2d142c",
        primaryBlackPressed: "#2d142c",
        primaryBlackDisabled: "#2d142c75",
        primaryPink: "#FFB4AD",
        cardBackground: "#F3F3F3",
      },
    },
  },
  plugins: [],
};
