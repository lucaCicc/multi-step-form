"use client";

interface InputProps {
  readonly label: string;
  readonly id: string;
  readonly description?: string;
  readonly required?: boolean;
  readonly pattern?: string;
  readonly type: string;
  readonly minLength?: number;
  readonly min?: number;
  readonly max?: number;
  readonly errorMsg?: string;
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
        className={`w-full rounded-md py-4 px-2 text-slate-900 ${
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
        onChange={() => null}
        defaultValue={""}
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
