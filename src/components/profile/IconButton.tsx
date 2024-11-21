import { SvgIconProps } from "@mui/material";
import { cn } from "../../tools/cn";

interface IIconButtonProps {
  onClick: () => void;
  text: string;
  className?: string;
  icon: React.ComponentType<SvgIconProps> | undefined;
  left?: boolean;
  disabled?: boolean;
}

export default function IconButton({ icon: Icon, ...props }: IIconButtonProps): JSX.Element {
  return (
    <button
      onClick={props.onClick}
      className={cn(
        "inline-flex py-0.5 px-5 text-center justify-center text-xs rounded-2xl border-none gap-2 items-center",
        props.className ?? "bg-background-hl text-tertiary"
      )}
      disabled={props.disabled}
    >
      {props.left && Icon && <Icon />}
      {props.text}
      {!props.left && Icon && <Icon />}
    </button>
  );
}
