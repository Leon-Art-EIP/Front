"use client";

import { useEffect, useState } from "react";

const ThemeSelector = () => {
  const [selectedTheme, setSelectedTheme] = useState("");

  const themes = [
    {
      name: "light",
      primary: {
        DEFAULT: "#ffffff",
        hover: "#f0f0f0",
      },
      secondary: "#ff0000",
    },
    {
      name: "dark",
      primary: {
        DEFAULT: "#333333",
        hover: "#555555",
      },
      secondary: "#00ff00",
    },
    {
      name: "dark-purple",
      primary: {
        DEFAULT: "#9c27b0",
        hover: "#aa00ff",
      },
      secondary: "#0000ff",
    },
    {
      name: "solarized",
      primary: {
        DEFAULT: "#002b36",
        hover: "#073642",
      },
      secondary: "#268bd2",
    },
    {
      name: "high-contrast",
      primary: {
        DEFAULT: "#000000",
        hover: "#1a1a1a",
      },
      secondary: "#ffff00",
    },
    {
      name: "pastel",
      primary: {
        DEFAULT: "#f7e1e3",
        hover: "#f2c5cc",
      },
      secondary: "#ffb6c1",
    },
  ];

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setSelectedTheme(savedTheme);
      document.documentElement.setAttribute("data-theme", savedTheme);
    } else {
      console.log("settt");
      // Set theme based on system preference if no saved theme
      const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)").matches;
      const defaultTheme = prefersDarkScheme ? "dark" : "light";
      setSelectedTheme(defaultTheme);
      document.documentElement.setAttribute("data-theme", defaultTheme);
    }
  }, []);

  const toggleTheme = (theme: string) => {
    setSelectedTheme(theme);
    localStorage.setItem("theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
  };

  return (
    <div className="flex">
      {themes.map((theme, index) => (
        <button
          key={index}
          className={`rounded-full h-8 w-8 flex items-center justify-center mx-1 focus:outline-none border-gray-400 border-2 ${
            selectedTheme === theme.name ? "border-2" : ""
          }`}
          style={{ backgroundColor: theme.primary.DEFAULT }}
          onClick={() => toggleTheme(theme.name)}
        >
          {selectedTheme === theme.name && (
            <>
              <div className="w-4 h-4 rounded-full bg-primary" style={{ marginRight: "4px" }}></div>
              <div className="w-8 h-8 rounded-full bg-tertiary absolute"></div>
            </>
          )}
        </button>
      ))}
    </div>
  );
};

export default ThemeSelector;
