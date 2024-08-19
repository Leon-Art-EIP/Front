"use client";

import { useController, useFormContext } from "react-hook-form";
import { cn } from "../../tools/cn";

interface IInputProps {
  name: string;
  className: string;
  placeholder?: string;
  title?: string;
}

export default function NumberInput(props: Omit<IInputProps, "type">): JSX.Element {
  const { register } = useFormContext();

  const {
    field: { onChange, value },
    fieldState: { error },
  } = useController({ name: props.name });

  const handleInputOnChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    onChange(e.target.value);
  };

  return (
    <div className="flex flex-col gap-2 sm:min-w-min min-w-0">
      {props.title && <div className="text-lg text-tertiary">{props.title}</div>}
      <input
        type="number"
        name={props.name}
        id={props.name}
        className={cn("sm:min-w-min min-w-0", props.className)}
        placeholder={props.placeholder}
        onChange={handleInputOnChange}
        value={value}
      />
      {error && <div className="text-primary">{error.message}</div>}
    </div>
  );
}
