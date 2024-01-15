import { useController } from "react-hook-form";
import { cn } from "../../tools/cn";

interface ITextAreaProps {
  name: string;
  className?: string;
  title?: string;
  placeholder?: string;
}

export default function TextArea(props: ITextAreaProps): JSX.Element {
  const {
    field: { onChange, value },
    fieldState: { error },
  } = useController({ name: props.name });

  return (
    <div className={cn("flex flex-col gap-2 sm:min-w-min min-w-0", props.className)}>
      {props.title && <div className="text-lg">{props.title}</div>}
      <textarea
        name={props.name}
        id={props.name}
        onChange={onChange}
        value={value}
        placeholder={props.placeholder}
        className="bg-secondaryGrey p-2 rounded flex-1 sm:min-w-min min-w-0"
      />
      {error && <div className="text-red-600">{error.message}</div>}
    </div>
  );
}
