import { cn } from "../../tools/cn";

interface ITitledLabelProps {
  title: string;
  text: string;
  underline?: boolean;
  capitalize?: boolean;
}

export default function TitledLabel(props: ITitledLabelProps): JSX.Element {
  return (
    <div className="flex flex-col gap-4 font-semibold text-lg">
      <div>{props.title}</div>
      <div className={cn("px-4 text-gray-500", props.underline && "underline", props.capitalize && "capitalize")}>
        {props.text}
      </div>
    </div>
  );
}
