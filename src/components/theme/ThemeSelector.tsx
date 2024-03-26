import { useEffect, useState } from "react";

const ThemeSelector = () => {
  const [selectedTheme, setSelectedTheme] = useState("");

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const themes = [
    {
      name: "light",
      primary: {
        DEFAULT: "#ffffff",
        hover: "#f0f0f0",
      },
    },
    {
      name: "dark",
      primary: {
        DEFAULT: "#333333",
        hover: "#555555",
      },
    },
    {
      name: "dark-purple",
      primary: {
        DEFAULT: "#9c27b0",
        hover: "#aa00ff",
      },
    },
    // Ajoutez d'autres thèmes au besoin
  ];

  useEffect(() => {
    const currentTheme = localStorage.getItem("theme");
    if (currentTheme && themes.find((theme) => theme.name === currentTheme)) {
      setSelectedTheme(currentTheme);
    } else {
      const prefersDarkMode = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
      setSelectedTheme(prefersDarkMode ? "dark" : "light");
    }
  }, [themes]);

  const toggleTheme = (theme) => {
    setSelectedTheme(theme);
    localStorage.setItem("theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
  };

  return (
    <div className="flex">
      {themes.map((theme, index) => (
        <button
          key={index}
          className={`rounded-full h-8 w-8 flex items-center justify-center mx-1 focus:outline-none ${
            selectedTheme === theme.name ? "border border-primary" : ""
          }`}
          style={{ backgroundColor: theme.primary.DEFAULT }}
          onClick={() => toggleTheme(theme.name)}
        >
          {selectedTheme === theme.name && <div className="w-4 h-4 rounded-full bg-primary"></div>}
        </button>
      ))}
    </div>
  );
};

export default ThemeSelector;
