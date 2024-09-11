"use client";

import { HTMLInputTypeAttribute } from "react";
import { useController } from "react-hook-form";
import { cn } from "../../tools/cn";

interface IInputProps {
  type: HTMLInputTypeAttribute;
  name: string;
  className?: string;
  errorClassName?: string;
  placeholder: string;
  title?: string;
  hideError?: boolean;
  onBlur?: () => void;
  onFocus?: () => void;
}

/* c8 ignore start */

export default function Input(props: IInputProps): JSX.Element {
  const {
    field: { onChange, value },
    fieldState: { error },
  } = useController({ name: props.name });

  return (
    <div className="flex flex-col gap-2 sm:min-w-min min-w-0">
      {props.title && <div className="text-lg text-tertiary">{props.title}</div>}
      <input
        type={props.type}
        name={props.name}
        id={props.name}
        className={cn("sm:min-w-min min-w-0 px-6 py-4 rounded placeholder:text-tertiary-hover", props.className)}
        placeholder={props.placeholder}
        onChange={onChange}
        onBlur={props.onBlur}
        onFocus={props.onFocus}
        value={value}
        autoComplete="off"
      />
      {error && !props.hideError && <div className={cn("text-primary", props.errorClassName)}>{error.message}</div>}
    </div>
  );
}

/* c8 ignore stop */
