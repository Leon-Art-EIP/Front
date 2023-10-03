import { SvgIconProps } from "@mui/material";
import { cn } from "../../tools/cn";

interface IButtonProps {
  onClick: () => void;
  text: string;
  className?: string;
}

export default function Button(props: IButtonProps): JSX.Element {
  return (
    <button
      onClick={props.onClick}
      className={cn(
        "inline-flex py-0.5 px-5 text-center bg-white text-black text-xs rounded-2xl border-none",
        props.className
      )}
    >
      {props.text}
    </button>
  );
}
