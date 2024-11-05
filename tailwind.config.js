/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)"],
        syne: ["var(--font-syne)"],
      },
      backgroundColor: ["focus"],
      colors: {
        primary: {
          DEFAULT: "var(--color-primary)",
          hover: "var(--color-primaryHover)",
          pressed: "var(--color-primaryPressed)",
          disabled: "var(--color-primaryDisabled)",
        },
        secondary: {
          DEFAULT: "var(--color-secondary)",
          hover: "var(--color-secondaryHover)",
          pressed: "var(--color-secondaryPressed)",
          disabled: "var(--color-secondaryDisabled)",
        },
        tertiary: {
          DEFAULT: "var(--color-tertiary)",
          hover: "var(--color-tertiaryHover)",
        },
        quaternary: {
          DEFAULT: "var(--color-quaternary)",
          hover: "var(--color-quaternaryHover)",
        },
        background: {
          DEFAULT: "var(--color-background)",
          hl: "var(--color-backgroundHighlight)",
          inputfield: "var(--color-backgroundInputField)",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
  safelist: ["bg-primary", "bg-secondary"],
};
