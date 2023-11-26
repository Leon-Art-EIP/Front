import { CircularProgress } from "@mui/material";
import React from "react";

export interface IButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  color?: "danger" | "success" | "info";
  type?: "submit" | "reset" | "button";
  loading?: boolean;
}

export default function Button({ onClick, children, color, type, loading }: IButtonProps): JSX.Element {
  let buttonColor: string;
  let hoverColor: string;

  switch (color) {
    case "danger":
      buttonColor = "bg-red-600 text-white";
      hoverColor = "hover:bg-red-700";
      break;
    case "success":
      buttonColor = "bg-gray-200 text-purple-800";
      hoverColor = "hover:bg-gray-300";
      break;
    case "info":
      buttonColor = "bg-purple-800 text-white";
      hoverColor = "hover:bg-purple-900";
      break;
    default:
      buttonColor = "";
      hoverColor = "";
  }

  return (
    <div
      className={`flex gap-2 rounded-lg py-3 px-10 text-base font-semibold cursor-pointer transition-colors duration-300 ease-in-out ${buttonColor} ${hoverColor} truncate items-center align-middle`}
    >
      <button onClick={onClick} type={type} className="flex justify-center items-center align-middle w-full">
        {children}
      </button>
      {loading && <CircularProgress size={20} thickness={4} color="primary" />}
    </div>
  );
}
