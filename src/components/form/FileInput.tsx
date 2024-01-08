import { AddSharp } from "@mui/icons-material";
import { useController } from "react-hook-form";
import { cn } from "../../tools/cn";

interface IFileInputProps {
  title?: string;
  name: string;
  className?: string;
}

export default function FileInput(props: IFileInputProps): JSX.Element {
  const {
    field: { onChange, value },
    fieldState: { error },
  } = useController({ name: props.name });

  return (
    <div className={cn("flex flex-col gap-2", props.className)}>
      {props.title && <div className="text-lg">{props.title}</div>}
      <div className="flex flex-col h-full">
        <label
          htmlFor="file_input"
          className="hover:cursor-pointer bg-secondaryGrey rounded flex justify-center items-center text-gray-400 h-full"
        >
          <AddSharp style={{ fontSize: 50 }} />
        </label>
        <input id="file_input" type="file" className="hidden" value={value} onChange={onChange} />
        <p>{value.split("\\").pop()}</p>
      </div>

      {error && <div className="text-red-600">{error.message}</div>}
    </div>
  );
}
