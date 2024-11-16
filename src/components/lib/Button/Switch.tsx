import { cn } from "../../../tools/cn";

interface ISwitchProps {
  onChange: (checked: boolean) => void;
  isLoading?: boolean;
  isDisabled?: boolean;
  checked: boolean;
  label?: string;
  className?: string;
}

export default function Switch({
  onChange,
  isLoading,
  isDisabled,
  checked,
  label,
  className,
}: ISwitchProps): JSX.Element {
  const handleClick = () => {
    if (!isDisabled && !isLoading) {
      onChange(!checked);
    }
  };

  return (
    <div className={cn("flex flex-col gap-2 items-center justify-center", className)}>
      <span className="text-sm">{label}</span>
      <button
        onClick={handleClick}
        disabled={isDisabled}
        className={cn("relative inline-flex items-center h-6 w-12 rounded-full transition-all", {
          "bg-primary hover:bg-primary-hover": !isDisabled && !isLoading && checked,
          "bg-gray-300": !checked,
          "bg-primary-disabled cursor-not-allowed": isDisabled,
          "animate-pulse": isLoading,
        })}
      >
        <span
          className={cn("absolute left-1 top-1 h-4 w-4 rounded-full transition-transform transform bg-white", {
            "translate-x-6": checked,
            "translate-x-0": !checked,
          })}
        />
      </button>
    </div>
  );
}
