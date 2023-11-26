import { SvgIconProps } from "@mui/material";

type TTailwindCustomColor = "grey" | "black" | "white";

interface IconButtonProps {
  text?: string;
  icon: React.ComponentType<SvgIconProps>;
  backgroundColor: TTailwindCustomColor;
  onClick(): void;
  color: string;
  id?: string;
}

export default function IconButton({ icon: Icon, ...props }: IconButtonProps): JSX.Element {
  let backgroundColor = "#ffffff";
  if (props.backgroundColor === "grey") {
    backgroundColor = "#F3F3F3";
  } else if (props.backgroundColor === "black") {
    backgroundColor = "#3E3E3E";
  }

  return (
    <button
      id={props.id}
      className="rounded-full flex gap-4 px-6 py-2.5 text-white"
      style={{ backgroundColor }}
      onClick={props.onClick}
    >
      <Icon style={{ color: props.color }}  />
      {props.text}
    </button>
  );
}
