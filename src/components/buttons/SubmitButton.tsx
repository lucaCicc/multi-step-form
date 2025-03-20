"use client";
import DefaultLoader from "@/components/loaders/DefaultLoader";
import { useFormStatus } from "react-dom";

interface SubmitButtonProps {
  readonly text: string;
}

/**
 *
 *
 */
const SubmitButton = ({ text }: SubmitButtonProps) => {
  const { pending } = useFormStatus();
  return (
    <button
      className="mt-2 rounded-lg bg-teal-500 py-4 text-lg text-black disabled:bg-teal-600/30 lg:py-7 lg:text-2xl"
      type="submit"
    >
      {pending ? <DefaultLoader /> : text}
    </button>
  );
};

export { SubmitButton };
