"use client";

import { Edit } from "@mui/icons-material";
import { useState } from "react";
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
  sizes?: string;
  style?: React.CSSProperties;
}

export default function ModifiableImage(props: IModifiableImageProps): JSX.Element {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className={props.className} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      {isHovered && (
        <div className={cn("absolute inset-0 flex items-center justify-center", props.hoverClassName)}>
          <Edit
            className={cn(
              "rounded-full h-10 w-10 p-2 text-blue-500 bg-white hover:bg-blue-100 hover:text-blue-700 transform hover:scale-110 transition-transform duration-300 ease-in-out flex items-center justify-center border border-blue-300 cursor-pointer shadow-md"
            )}
            onClick={props.onClick}
          />
        </div>
      )}

      <img
        className={cn(props.imageClassName)}
        alt={props.alt}
        src={props.src}
        width={props.width}
        height={props.height}
        sizes={props.sizes}
        style={props.style}
      />
    </div>
  );
}
