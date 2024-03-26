/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
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
        tertiary: "var(--color-tertiary)",
        background: {
          DEFAULT: "var(--color-background)",
          hl: "var(--color-backgroundHighlight)",
        },
        // black: {
        //   DEFAULT: "#2d142c",
        //   hover: "#2d142c",
        //   pressed: "#2d142c",
        //   disabled: "#2d142c75",
        // },
        // pink: "#FFB4AD",
        // cardBackground: "#F3F3F3",
        // // Thème sombre
        // darkPrimary: {
        //   DEFAULT: "#1a202c",
        //   hover: "#2d3748",
        //   pressed: "#2d3748",
        //   disabled: "#4a5568",
        // },
        // darkSecondary: {
        //   DEFAULT: "#2d3748",
        //   hover: "#4a5568",
        //   pressed: "#4a5568",
        //   disabled: "#4a5568",
        // },
        // darkBlack: {
        //   DEFAULT: "#f7fafc",
        //   hover: "#f7fafc",
        //   pressed: "#f7fafc",
        //   disabled: "#f7fafc75",
        // },
        // darkPink: "#FFB4AD",
        // darkCardBackground: "#1a202c",
      },
    },
  },
  plugins: [],
};
