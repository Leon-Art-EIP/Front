"use client";

import { ImageOutlined } from "@mui/icons-material";
import { useState } from "react";
import Image from "next/image";
import { cn } from "../../tools/cn";

interface IModifiableImageProps {
  src: string;
  width?: number;
  height?: number;
  alt: string;
  className?: string;
  imageClassName?: string;
  hoverClassName?: string;
  onClick?: () => void;
  color?: "white" | "black";
}

export default function ModifiableImage(props: IModifiableImageProps): JSX.Element {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={cn("hover: cursor-pointer", props.className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={props.onClick}
    >
      {isHovered && (
        <div
          className={cn(
            "absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-50",
            props.hoverClassName
          )}
        >
          <ImageOutlined className={cn(`rounded-full h-1/4 flex-1 text-${props.color ?? "white"}`)} />
        </div>
      )}
      <Image
        className={cn(props.imageClassName)}
        alt={props.alt}
        src={props.src}
        width={props.width}
        height={props.height}
      />
    </div>
  );
}
