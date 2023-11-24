"use client";

import { useEffect } from "react";
import { useController } from "react-hook-form";

interface IInputProps {
  type: string;
  name: string;
  className: string;
  placeholder: string;
}

export default function Input(props: IInputProps): JSX.Element {
  const {
    field: { onChange, value },
    fieldState: { error },
  } = useController({ name: props.name });

  return (
    <div className="flex flex-col gap-2">
      <input
        type={props.type}
        name={props.name}
        id={props.name}
        className={props.className}
        placeholder={props.placeholder}
        onChange={onChange}
      />
      {error && <div className="text-red-600">{error.message}</div>}
    </div>
  );
}
