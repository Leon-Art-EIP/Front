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
    <div className="flex flex-col gap-2 sm:min-w-min min-w-0">
      {props.title && <div className="text-lg text-tertiary">{props.title}</div>}
      <textarea
        name={props.name}
        id={props.name}
        onChange={onChange}
        value={value}
        placeholder={props.placeholder}
        className={cn("sm:min-w-min min-w-0 px-6 py-4 rounded placeholder:text-tertiary-hover", props.className)}
      />
      {error && <div className="text-primary">{error.message}</div>}
    </div>
  );
}
