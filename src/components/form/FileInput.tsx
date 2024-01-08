"use client";

import { ChangeEvent, DragEvent, useEffect } from "react";
import { useRef, useState } from "react";
import { cn } from "../../tools/cn";
import { useController } from "react-hook-form";
import { AddSharp, Loop } from "@mui/icons-material";
import { Button } from "../lib";

interface IUploadButtonProps {
  name: string;
}

export default function FileInput(props: IUploadButtonProps): JSX.Element {
  const {
    field: { onChange, value },
    fieldState: { error },
  } = useController({ name: props.name });

  const [isDragging, setIsDragging] = useState(false);

  const fileInput = useRef<HTMLInputElement>(null);

  const handleClick = (): void => {
    fileInput.current?.click();
  };

  const handleDragOver = (e: DragEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const newFile = e.target.files?.item(0);

    if (newFile) {
      onChange(newFile);
    }
  };

  const handleDrop = (e: DragEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    setIsDragging(false);

    const newFile = e.dataTransfer.files.item(0);

    if (newFile) {
      onChange(newFile);
    }
  };

  const cancel = (): void => {
    fileInput.current?.value && (fileInput.current.value = "");
    onChange("");
  };

  return (
    <div className="flex flex-col gap-2">
      <button
        type="button"
        title="Importer"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onDragLeave={handleDragLeave}
        onClick={handleClick}
        className={cn(
          "hover:cursor-pointer bg-secondaryGrey rounded flex justify-center items-center text-gray-400 h-full",
          isDragging && "cursor-grab"
        )}
      >
        <AddSharp style={{ fontSize: 50 }} />
      </button>
      {value && (
        <div className="flex gap-2">
          {value.name}
          <button className="border px-2" type="button" onClick={cancel}>
            Annuler
          </button>
        </div>
      )}
      <input
        name={props.name}
        accept={"image/*"}
        type="file"
        multiple={false}
        ref={fileInput}
        onChange={handleChange}
        className="hidden"
        id={props.name}
      />
      {error && <div className="text-red-600">{error.message}</div>}
    </div>
  );
}
