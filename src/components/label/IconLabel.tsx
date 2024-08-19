import { SvgIconProps } from "@mui/material";

export interface IIconLabelProps {
  icon: React.ComponentType<SvgIconProps>;
  text: string;
  color?: string;
}

export default function IconLabel({ icon: Icon, color = "inherit", ...props }: IIconLabelProps): JSX.Element {
  return (
    <div className="flex gap-8 items-center align-middle h-12">
      <Icon className={`text-${color}`} style={{ fontSize: 48 }} />
      <span className={`font-medium text-xl text-${color}`}>{props.text}</span>
    </div>
  );
}
