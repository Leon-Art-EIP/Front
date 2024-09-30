"use client";

import Session from "../components/session";
import "./globals.css";
import tabs from "./tabs";
import { Syne, Inter } from "next/font/google";
import { ThemeProvider } from "../contexts/ThemeContext";

export const syne = Syne({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-syne",
});

export const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const setInitialTheme = `
(function() {
  try {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      document.documentElement.setAttribute('data-theme', savedTheme);
    } else {
      const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const defaultTheme = prefersDarkScheme ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', defaultTheme);
    }
  } catch (e) {
    console.error('Error setting initial theme:', e);
  }
})();
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${syne.variable} ${inter.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: setInitialTheme }} />
      </head>
      <body>
        <ThemeProvider>
          {" "}
          {/* Wrap with ThemeProvider */}
          <div className="flex flex-col h-screen bg-background font-sans">
            <Session tabs={tabs}>{children}</Session>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
