import React from "react";
import { cn } from "../../../tools/cn";
export interface InputProps {
  value?: string | number;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  required?: boolean;
  placeHolder?: string;
  className?: string;
  label?: string;
  disabled?: boolean;
}

export default function Input(props: InputProps): JSX.Element {
  return (
    <label className={`${props.className} flex flex-col gap-2 text-tertiary font-regular text-md`}>
      <span>
        {props.label} {props.required && <span className="text-primary">*</span>}
      </span>
      <input
        type={props.type}
        className={cn(
          "text-md rounded-xl p-3 bg-gray-700 border-gray-600 placeholder-[#8F8F8F] text-white disabled:cursor-not-allowed disabled:text-gray",
          props.className
        )}
        placeholder={props.placeHolder}
        value={props.value}
        onChange={props.onChange}
        required={props.required}
        disabled={props.disabled}
      />
    </label>
  );
}
