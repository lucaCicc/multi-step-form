"use client";

interface InputProps {
  label: string;
  id: string;
  description?: string;
  required?: boolean;
  pattern?: string;
  type: string;
  minLength?: number;
  min?: number;
  max?: number;
  value?: string;
  errorMsg?: string;
  disabled?: boolean;
  onChange?: (name: string, value: string) => void;
}

/**
 *
 *
 */
const Input = ({
  label,
  id,
  required,
  pattern,
  type,
  minLength,
  min,
  max,
  description,
  errorMsg,
  onChange,
  value,
  disabled = false,
}: InputProps) => {
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
        disabled={disabled}
        className={`w-full rounded-md py-4 px-2 text-slate-900 text-white ${
          errorMsg ? "border-red-500" : "border-slate-300"
        } border-2`}
        type={type}
        name={id}
        id={id}
        required={required}
        pattern={pattern}
        minLength={minLength}
        min={min}
        max={max}
        onChange={(e) => {
          onChange?.(e.target.name, e.target.value);
        }}
        defaultValue={value ?? ""}
      />
      <div className="min-h-8 mt-1">
        {errorMsg && (
          <span className="text-red-500 text-sm block ">{errorMsg}</span>
        )}
      </div>
    </div>
  );
};

export { Input };
