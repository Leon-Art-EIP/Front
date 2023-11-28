import { CircularProgress } from "@mui/material";
import React from "react";

export type ButtonType = "submit" | "button" | "reset";
export type ButtonColor = "primary" | "secondary" | "danger" | "success" | "info";

export interface ButtonProps {
  children: React.ReactNode;
  type: ButtonType;
  color: ButtonColor;
  className?: string;
  onClick?: () => void;
  loading?: boolean;
}

const colorClasses: Record<ButtonColor, string> = {
  primary: "text-white bg-[#E03915] hover:bg-[#ca3313] disabled:bg-[#eb9785]",
  secondary: "text-[#2d142c] bg-[#EEEEEE] hover:bg-[#e2e2e2] disabled:text-[#c7c2c7]",
  danger: "bg-red-600 text-white hover:bg-red-700 disabled:bg-red-400",
  success: "bg-gray-200 text-purple-800 hover:bg-gray-300 disabled:bg-gray-400",
  info: "bg-purple-800 text-white hover:bg-purple-900 disabled:bg-purple-400",
};

export default function Button({ children, type, color, className = "", onClick, loading }: ButtonProps): JSX.Element {
  return (
    <button
      type={type}
      className={`rounded-[20px] px-16 py-3 font-semibold text-base transition duration-200 ${colorClasses[color]} ${className}`}
      onClick={onClick}
    >
      {loading ? <CircularProgress size={20} thickness={4} color="primary" /> : children}
    </button>
  )
};
