import { CircularProgress } from "@mui/material";
import React from "react";

export type ButtonType = "submit" | "button" | "reset";
export type ButtonColor = "primary" | "secondary" | "danger" | "success" | "info";

export interface IButtonProps {
  children: React.ReactNode;
  type: ButtonType;
  color: ButtonColor;
  className?: string;
  onClick?: () => void;
  loading?: boolean;
  id?: string;
  name?: string;
  disabled?: boolean;
}

const colorClasses: Record<ButtonColor, string> = {
  primary: "text-white bg-primary hover:bg-primary-hover disabled:bg-primary-disabled",
  secondary:
    "text-tertiary bg-secondary hover:bg-secondary-hover disabled:bg-secondary-disabled disabled: text-secondary",
  danger: "bg-primary text-white hover:bg-primary-hover disabled:bg-primary-disabled",
  success: "bg-secondary text-white hover:bg-secondary-hover disabled:bg-secondary-disabled",
  info: "bg-purple-800 text-white hover:bg-purple-900 disabled:bg-purple-400",
};

export default function Button(props: IButtonProps): JSX.Element {
  return (
    <button
      id={props.id}
      name={props.name}
      type={props.type}
      className={`rounded-3xl px-16 py-3 font-semibold text-base transition duration-200 ${colorClasses[props.color]} ${
        props.className
      }`}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.loading ? <CircularProgress size={20} thickness={4} color="primary" /> : props.children}
    </button>
  );
}
