"use client";

import { useEffect, useState } from "react";

interface InputProps {
  id: string;
  type: string;
  min?: number;
  max?: number;
  label: string;
  value?: string;
  pattern?: string;
  errorMsg?: string;
  required?: boolean;
  minLength?: number;
  disabled?: boolean;
  description?: string;
  onChange?: (name: string, value: string) => void;
}

/**
 *
 *
 */
const Input = ({
  id,
  min,
  max,
  type,
  label,
  value = "",
  pattern,
  required,
  errorMsg,
  onChange,
  minLength,
  description,
  disabled = false,
}: InputProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsError(!!errorMsg);
  }, [errorMsg]);

  return (
    <div>
      <label className="block text-lg" htmlFor={id}>
        {label}
        {description && (
          <span className="text-sm text-slate-200 block mb-1">
            {description}
          </span>
        )}
      </label>
      <input
        className={`w-full rounded-md py-4 px-2 text-slate-900 text-white ${
          errorMsg && isError ? "border-red-500" : "border-slate-300"
        } border-2`}
        id={id}
        name={id}
        min={min}
        max={max}
        type={type}
        disabled={disabled}
        required={required}
        pattern={pattern}
        minLength={minLength}
        onBlur={() => {
          setIsFocused(false);
        }}
        onFocus={() => {
          setIsFocused(true);
        }}
        onChange={(e) => {
          setIsError(false);
          onChange?.(e.target.name, e.target.value);
        }}
        defaultValue={value}
      />
      <div className="min-h-8 mt-1">
        {isError && !isFocused && (
          <span className="text-red-500 text-sm block ">{errorMsg}</span>
        )}
      </div>
    </div>
  );
};

export { Input };
