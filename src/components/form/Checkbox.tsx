import { useController } from "react-hook-form";
import { cn } from "../../tools/cn";

interface ICheckboxProps {
  name: string;
  className?: string;
  title?: string;
}

export default function Checkbox(props: ICheckboxProps): JSX.Element {
  const {
    field: { onChange, value },
    fieldState: { error },
  } = useController({ name: props.name });

  return (
    <div className="flex flex-col gap-2 sm:min-w-min min-w-0">
      <div className="flex gap-2 items-center">
        {props.title && <div className="text-lg">{props.title}</div>}
        <input
          type="checkbox"
          name={props.name}
          id={props.name}
          className={cn("sm:min-w-min min-w-0 h-4 w-4", props.className)}
          onChange={onChange}
          value={value}
        />
      </div>
      {error && <div className="text-red-600">{error.message}</div>}
    </div>
  );
}
