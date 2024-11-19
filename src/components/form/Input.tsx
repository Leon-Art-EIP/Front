import { HTMLInputTypeAttribute, useState } from "react";
import { useController } from "react-hook-form";
import { cn } from "../../tools/cn";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

interface IInputProps {
  type: HTMLInputTypeAttribute;
  name: string;
  className?: string;
  errorClassName?: string;
  placeholder: string;
  title?: string;
  hideError?: boolean;
  onBlur?: () => void;
  onFocus?: () => void;
}

export default function Input(props: IInputProps): JSX.Element {
  const {
    field: { onChange, value },
    fieldState: { error },
  } = useController({ name: props.name });

  const [showPassword, setShowPassword] = useState(false);
  const isPasswordType = props.type === "password";
  const inputType = isPasswordType && showPassword ? "text" : props.type;

  return (
    <div className="flex flex-col gap-2 sm:min-w-min min-w-0 relative">
      {props.title && <div className="text-lg text-tertiary">{props.title}</div>}
      <div className="relative">
        <input
          type={inputType}
          name={props.name}
          id={props.name}
          className={cn(
            "sm:min-w-min min-w-0 px-6 py-4 w-full rounded placeholder:text-tertiary-hover pr-10",
            props.className
          )}
          placeholder={props.placeholder}
          onChange={onChange}
          onBlur={props.onBlur}
          onFocus={props.onFocus}
          value={value}
          autoComplete="off"
        />
        {isPasswordType && (
          <button
            type="button"
            className="absolute inset-y-0 right-3 flex items-center"
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? "Masquer le mot de passe" : "Voir le mot de passe"}
          >
            {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
          </button>
        )}
      </div>
      {error && !props.hideError && <div className={cn("text-primary", props.errorClassName)}>{error.message}</div>}
    </div>
  );
}
