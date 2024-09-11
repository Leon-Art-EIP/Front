import React from "react";
import { cn } from "../../tools/cn";

interface IStatusBadgeProps {
  text: string;
  count: number;
  isOpen: boolean;
}

const StatusBadge: React.FC<IStatusBadgeProps> = ({ text, count, isOpen }) => {
  return (
    <div
      className={cn(
        "inline-flex py-0.5 px-5 text-center justify-center text-xs rounded-2xl border-none gap-2 items-center",
        isOpen ? "bg-green-500 text-white" : "bg-red-500 text-white"
      )}
    >
      {text} ({count})
    </div>
  );
};

export default StatusBadge;
