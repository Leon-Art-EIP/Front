import React, { useState, useRef, useEffect } from "react";
import { Button } from "@mui/material";
import { ExpandMore, ExpandLess } from "@mui/icons-material";

interface IPostTextProps {
  text: string;
}

export default function PostText(props: IPostTextProps) {
  const [isOverflowing, setIsOverflowing] = useState(false);
  const [showFullText, setShowFullText] = useState(false);
  const textRef = useRef(null);

  useEffect(() => {
    const checkOverflow = () => {
      const element = textRef.current as HTMLElement | null;
      if (element && element.scrollHeight > element.clientHeight) {
        setIsOverflowing(true);
      } else {
        setIsOverflowing(false);
      }
    };

    checkOverflow();
    window.addEventListener("resize", checkOverflow);
    return () => {
      window.removeEventListener("resize", checkOverflow);
    };
  }, []);

  const handleToggleText = () => {
    setShowFullText(!showFullText);
  };

  return (
    <div>
      <p ref={textRef} className={`break-words text-justify ${showFullText ? "" : "max-h-[74px] overflow-y-hidden"}`}>
        {props.text}
      </p>
      {isOverflowing && (
        <Button onClick={handleToggleText} variant="text" startIcon={showFullText ? <ExpandLess /> : <ExpandMore />}>
          {showFullText ? "Voir moins" : "Voir plus"}
        </Button>
      )}
    </div>
  );
}
