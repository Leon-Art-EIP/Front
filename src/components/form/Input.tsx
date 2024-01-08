"use client";

import { useController } from "react-hook-form";
import { cn } from "../../tools/cn";

interface IInputProps {
  type: string;
  name: string;
  className?: string;
  placeholder: string;
  title?: string;
}

export default function Input(props: IInputProps): JSX.Element {
  const {
    field: { onChange, value },
    fieldState: { error },
  } = useController({ name: props.name });

  return (
    <div className="flex flex-col gap-2 sm:min-w-min min-w-0">
      {props.title && <div className="text-lg">{props.title}</div>}
      <input
        type={props.type}
        name={props.name}
        id={props.name}
        className={cn("sm:min-w-min min-w-0", props.className)}
        placeholder={props.placeholder}
        onChange={onChange}
        value={value}
      />
      {error && <div className="text-red-600">{error.message}</div>}
    </div>
  );
}
