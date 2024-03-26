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
      secondary: "#ff0000", // Red color for light theme
    },
    {
      name: "dark",
      primary: {
        DEFAULT: "#333333",
        hover: "#555555",
      },
      secondary: "#00ff00", // Green color for dark theme
    },
    {
      name: "dark-purple",
      primary: {
        DEFAULT: "#9c27b0",
        hover: "#aa00ff",
      },
      secondary: "#0000ff", // Blue color for dark-purple theme
    },
  ];

  useEffect(() => {
    setSelectedTheme("");
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
          className={`rounded-full h-8 w-8 flex items-center justify-center mx-1 focus:outline-none border border-grey border-2 ${
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
