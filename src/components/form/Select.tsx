import { useController } from "react-hook-form";
import { IOption } from "../../interfaces";
import { cn } from "../../tools/cn";

interface ISelectProps {
  title?: string;
  name: string;
  options: IOption<string>[];
  placeholder?: string;
  className?: string;
}

export default function Select(props: ISelectProps): JSX.Element {
  const {
    field: { onChange, value },
    fieldState: { error },
  } = useController({ name: props.name });

  return (
    <div className={cn("flex flex-col gap-2", props.className)}>
      {props.title && <div className="text-lg text-tertiary">{props.title}</div>}
      <select
        name={props.name}
        id={props.name}
        onChange={onChange}
        value={value}
        className={cn("border-none focus:outline-none p-2 rounded hover:cursor-pointer")}
      >
        <option value="" disabled>
          {props.placeholder}
        </option>
        {props.options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <div className="text-primary">{error.message}</div>}
    </div>
  );
}
