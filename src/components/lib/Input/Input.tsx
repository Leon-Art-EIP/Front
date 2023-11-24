import React from "react";

/* c8 ignore start */
export interface InputProps {
  value?: string | number;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  required?: boolean;
  placeHolder?: string;
  className?: string;
  label?: string;
  disabled?: boolean;
}

const Input: React.FC<InputProps> = ({
  value,
  onChange,
  type = "text",
  required = false,
  placeHolder,
  className = "",
  label = "",
  disabled = false,
}) => {
  return (
    <label className={`${className} flex flex-col gap-2 text-black font-regular text-md`}>
      <span>
        {label} {required && <span className="text-red-500">*</span>}
      </span>
      <input
        type={type}
        className="text-md rounded-xl p-3 bg-gray-700 border-gray-600 placeholder-[#8F8F8F] text-white disabled:cursor-not-allowed disabled:text-gray"
        placeholder={placeHolder}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
      />
    </label>
  );
};

export default Input;
/* c8 ignore stop */
