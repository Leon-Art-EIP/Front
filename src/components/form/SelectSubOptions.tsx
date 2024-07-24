import { useState, useEffect } from "react";
import { useController } from "react-hook-form";
import { IOption, IOptionSubOptions } from "../../interfaces";
import { cn } from "../../tools/cn";
import CheckIcon from "@mui/icons-material/Check";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

interface ISelectSubOptions {
  title?: string;
  name: string;
  options: IOptionSubOptions<string>[];
  placeholder?: string;
  className?: string;
}

export default function SelectSubOptions(props: ISelectSubOptions): JSX.Element {
  const {
    field: { onChange, value },
    fieldState: { error },
  } = useController({ name: props.name });

  const [filterCollapsed, setFilterCollapsed] = useState(false);
  const [options, setOptions] = useState<IOptionSubOptions<string>[]>(props.options);

  const toggleOptionCollapse = (optionValue: string) => {
    setOptions((prevOptions) =>
      prevOptions.map((option) =>
        option.value === optionValue ? { ...option, collapsed: !option.collapsed } : option
      )
    );
  };

  const handleSubOptionClick = (optionValue: string, subOptionValue: string) => {
    setOptions((prevOptions) =>
      prevOptions.map((option) =>
        option.value === optionValue
          ? {
              ...option,
              subOptions: option.subOptions.map((subOption) =>
                subOption.value === subOptionValue
                  ? { ...subOption, selected: !subOption.selected }
                  : subOption
              ),
            }
          : option
      )
    );
    onChange(subOptionValue);
  };

  const toggleFilterCollapse = () => {
    setFilterCollapsed(!filterCollapsed);
  };

  useEffect(() => {
    setOptions(props.options); // Update state if props.options changes
  }, [props.options]);

  return (
    <div className="flex flex-col">
      <button
        className={`flex flex-row justify-between bg-secondary items-center px-6 py-4 rounded-t ${
          !filterCollapsed && "rounded-b"
        }`}
        type="button"
        onClick={toggleFilterCollapse}
      >
        <span className="text-lg text-tertiary-hover">{props.placeholder}</span>
        {filterCollapsed ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </button>
      <div className={cn("flex flex-col gap-2 bg-secondary rounded-b", props.className)}>
        {filterCollapsed &&
          options.map((option) => (
            <div key={option.value}>
              <button
                type="button"
                className="py-2 w-full flex flex-row justify-between items-center px-4 rounded-xl duration-300 ease-in-out"
                onClick={() => toggleOptionCollapse(option.value)}
              >
                {option.label}
                {option.collapsed ? <ExpandMoreIcon /> : <ExpandLessIcon />}
              </button>
              {option.collapsed && (
                <div className="flex flex-col px-4">
                  {option.subOptions.map((subOption) => (
                    <button
                      key={subOption.value}
                      type="button"
                      className={`py-3 w-full flex flex-row justify-between items-center px-4 rounded-xl hover:bg-gray-200 hover:shadow-lg duration-300 ease-in-out ${
                        subOption.selected ? "bg-gray-200" : ""
                      }`}
                      onClick={() => handleSubOptionClick(option.value, subOption.value)}
                    >
                      {subOption.label}
                      {subOption.selected && <CheckIcon className="text-green-300" />}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
      </div>
      {error && <div className="text-primary">{error.message}</div>}
    </div>
  );
}
