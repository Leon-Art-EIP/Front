import { SvgIconProps } from "@mui/material";
import { cn } from "../../../tools/cn";

interface IconButtonProps {
  text?: string;
  icon: React.ComponentType<SvgIconProps>;
  backgroundColor: string;
  onClick?(): void;
  iconColor: string; // Ajoutez une nouvelle propriété pour la couleur de l'icône
  id?: string;
  className?: string;
  disabled?: boolean;
  iconClassName?: string;
}

export default function IconButton({ icon: Icon, iconColor, ...props }: IconButtonProps): JSX.Element {
  return (
    <button
      id={props.id}
      className={cn("rounded-full", props.backgroundColor, props.className)}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      <Icon style={{ color: iconColor }} className={props.iconClassName} />
      {props.text}
    </button>
  );
}
