"use client";

import { AddSharp } from "@mui/icons-material";
import { ChangeEvent, DragEvent, useRef, useState } from "react";
import { useController } from "react-hook-form";
import { cn } from "../../tools/cn";
import { Button } from "../lib";

interface IUploadButtonProps {
  name: string;
  maxFileSize?: number;
  children?: React.ReactNode;
  className?: string;
}

export default function FileInput(props: IUploadButtonProps): JSX.Element {
  const {
    field: { onChange, value },
    fieldState: { error },
  } = useController({ name: props.name });

  const [isDragging, setIsDragging] = useState(false);
  const [fileError, setFileError] = useState<string | null>(null);

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

  const validateFileSize = (file: File): boolean => {
    if (props.maxFileSize && file.size > props.maxFileSize * 1024 * 1024) {
      setFileError(`La taille de l'image ne doit pas dépasser ${props.maxFileSize}MB.`);
      return false;
    }
    setFileError(null);
    return true;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const newFile = e.target.files?.item(0);

    if (newFile && validateFileSize(newFile)) {
      onChange(newFile);
    }
  };

  const handleDrop = (e: DragEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    setIsDragging(false);

    const newFile = e.dataTransfer.files.item(0);

    if (newFile && validateFileSize(newFile)) {
      onChange(newFile);
    }
  };

  const cancel = (): void => {
    fileInput.current?.value && (fileInput.current.value = "");
    onChange("");
  };

  return (
    <div className={cn("flex flex-col gap-2", props.className)}>
      <button
        type="button"
        title="Importer"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onDragLeave={handleDragLeave}
        onClick={handleClick}
        className={cn(
          "hover:cursor-pointer bg-secondary rounded flex justify-center items-center text-tertiary h-full",
          isDragging && "cursor-grab"
        )}
      >
        {props.children ?? <AddSharp style={{ fontSize: 50 }} />}
      </button>
      {value && (
        <div className="flex items-center gap-4">
          <label className="text-tertiary text-lg">
            <span className="underline">Image sélectionnée :</span> {value.name}
          </label>
          <Button className="px-4 rounded" color="secondary" type="button" onClick={cancel}>
            Annuler
          </Button>
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
      {fileError && <div className="text-primary">{fileError}</div>}
      {error && <div className="text-primary">{error.message}</div>}
    </div>
  );
}
