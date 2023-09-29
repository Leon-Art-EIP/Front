import { SvgIconProps } from "@mui/material";

type TTailwindCustomColor = "grey" | "black";

interface IconButtonProps {
  text?: string;
  icon: React.ComponentType<SvgIconProps>;
  backgroundColor: TTailwindCustomColor;
  onClick(): void;
  color: string;
  id?: string;
}

export default function IconButton({ icon: Icon, ...props }: IconButtonProps): JSX.Element {
  return (
    <button
      id={props.id}
      className="rounded-full flex gap-4 px-6 py-2.5 text-white"
      style={{ background: `${props.backgroundColor === "black" ? "#3E3E3E" : "#F3F3F3"}` }}
      onClick={props.onClick}
    >
      <Icon style={{ color: props.color }} />
      {props.text}
    </button>
  );
}
