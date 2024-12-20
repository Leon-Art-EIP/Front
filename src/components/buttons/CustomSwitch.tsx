"use client";

import React from "react";
import cn from "classnames";

interface ICustomSwitchProps {
  labelOn: string;
  labelOff: string;
  checked: boolean;
  onChange: () => void;
  tooltip?: string;
}

export default function CustomSwitch({ labelOn, labelOff, checked, onChange, tooltip }: ICustomSwitchProps) {
  return (
    <div className="flex items-center cursor-pointer" onClick={onChange} title={tooltip}>
      <span
        className={cn(
          "inline-flex py-1 px-3 text-s rounded-2xl ml-2",
          checked ? "bg-primary text-secondary" : "bg-secondary text-primary",
          "transform translate-y-[-3px]"
        )}
      >
        {checked ? labelOn : labelOff}
      </span>
    </div>
  );
}
