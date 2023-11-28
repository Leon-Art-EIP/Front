import { CircularProgress } from "@mui/material";
import React from "react";

export type ButtonType = "submit" | "button";
export type ButtonColor = "primary" | "secondary";

export interface ButtonProps {
  children: React.ReactNode;
  type: ButtonType;
  color: ButtonColor;
  className?: string;
  onClick?: () => void;
}

const colorClasses: Record<ButtonColor, string> = {
  primary: "text-white bg-[#E03915] hover:bg-[#ca3313] disabled:bg-[#eb9785]",
  secondary: "text-[#2d142c] bg-[#EEEEEE] hover:bg-[#e2e2e2] disabled:text-[#c7c2c7]",
};

const Button: React.FC<ButtonProps> = ({ children, type, color, className = "", onClick }) => (
  <button
    type={type}
    className={`rounded-[20px] px-16 py-3 font-semibold text-base transition duration-200 ${colorClasses[color]} ${className}`}
    onClick={onClick}
  >
    {children}
  </button>
);

export default Button;
