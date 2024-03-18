import { SvgIconProps } from "@mui/material";
import { cn } from "../../../tools/cn";

type TTailwindCustomColor = "grey" | "black" | "white" | "transparent";

interface IconButtonProps {
  text?: string;
  icon: React.ComponentType<SvgIconProps>;
  backgroundColor: TTailwindCustomColor;
  onClick(): void;
  color: string;
  id?: string;
  className?: string;
  disabled?: boolean;
}

export default function IconButton({ icon: Icon, ...props }: IconButtonProps): JSX.Element {
  let backgroundColor = "#ffffff";
  if (props.backgroundColor === "grey") {
    backgroundColor = "#F3F3F3";
  } else if (props.backgroundColor === "black") {
    backgroundColor = "#3E3E3E";
  } else if (props.backgroundColor === "transparent") {
    backgroundColor = "transparent";
  }

  return (
    <button
      id={props.id}
      className={cn("rounded-full flex gap-4 px-6 py-2.5 text-white", props.className)}
      style={{ backgroundColor }}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      <Icon style={{ color: props.color }} />
      {props.text}
    </button>
  );
}
