"use client";
import DefaultLoader from "@/components/loaders/DefaultLoader";

interface SubmitButtonProps {
  text: string;
  isLoading: boolean;
  onPress?: () => void;
}

/**
 *
 *
 */
const SubmitButton = ({ text, isLoading, onPress }: SubmitButtonProps) => {
  return (
    <button
      onClick={onPress}
      className="mt-2 rounded-lg bg-teal-500 py-4 text-lg text-black disabled:bg-teal-600/30 lg:py-7 lg:text-2xl"
      type="submit"
    >
      {isLoading ? <DefaultLoader /> : text}
    </button>
  );
};

export { SubmitButton };
