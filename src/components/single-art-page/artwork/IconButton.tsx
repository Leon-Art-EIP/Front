import { SvgIconProps } from "@mui/material";
import { cn } from "../../../tools/cn";

interface IconButtonProps {
  text?: string;
  icon: React.ComponentType<SvgIconProps>;
  backgroundColor: string;
  onClick(): void;
  iconColor: string; // Ajoutez une nouvelle propriété pour la couleur de l'icône
  id?: string;
  className?: string;
  disabled?: boolean;
}

export default function IconButton({ icon: Icon, iconColor, ...props }: IconButtonProps): JSX.Element {
  return (
    <button
      id={props.id}
      className={cn("rounded-full flex gap-4 px-6 py-2.5", props.backgroundColor, props.className)}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      <Icon style={{ color: iconColor }} />
      {props.text}
    </button>
  );
}
