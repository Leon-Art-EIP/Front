import { SvgIconProps } from "@mui/material";

export interface IIconLabelProps {
  icon: React.ComponentType<SvgIconProps>;
  text: string;
}

export default function IconLabel({ icon: Icon, ...props }: IIconLabelProps): JSX.Element {
  return (
    <div className="flex gap-8 items-center align-middle h-12">
      <Icon style={{ fontSize: 48 }} />
      <span className="font-medium text-xl">{props.text}</span>
    </div>
  );
}
