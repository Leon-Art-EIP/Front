"use client";

import React, { createContext, useEffect, useState, ReactNode } from "react";

interface ThemeContextType {
  selectedTheme: string;
  setSelectedTheme: (theme: string) => void;
}

export const ThemeContext = createContext<ThemeContextType>({
  selectedTheme: "light",
  setSelectedTheme: () => {},
});

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [selectedTheme, setSelectedTheme] = useState<string>("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setSelectedTheme(savedTheme);
      document.documentElement.setAttribute("data-theme", savedTheme);
    } else {
      const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)").matches;
      const defaultTheme = prefersDarkScheme ? "dark" : "light";
      setSelectedTheme(defaultTheme);
      document.documentElement.setAttribute("data-theme", defaultTheme);
    }
  }, []);

  const updateTheme = (theme: string) => {
    setSelectedTheme(theme);
    localStorage.setItem("theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
  };

  return (
    <ThemeContext.Provider value={{ selectedTheme, setSelectedTheme: updateTheme }}>{children}</ThemeContext.Provider>
  );
};
