"use client";

import { useFormDataProvider } from "@/providers/FormProvider";
import { Step } from "@/types";
import clsx from "clsx";

interface Props {
  readonly steps: Step[];
}
/**
 *
 *
 */
const StepNavigation = ({ steps }: Props) => {
  const formDataProvider = useFormDataProvider();

  /**
   *
   */
  return (
    <div className="mb-12 mt-4 lg:mb-0 min-w-60">
      <div className="relative flex flex-row justify-between lg:flex-col lg:justify-start lg:gap-8">
        {steps.map((step, i) => (
          <button
            key={step.step}
            className="group z-20 flex items-center gap-3 text-2xl"
            onClick={() => formDataProvider?.updateStep(step.step)}
          >
            <span
              className={clsx(
                "flex h-10 w-10 items-center justify-center rounded-full border  text-sm  transition-colors duration-200  lg:h-12 lg:w-12 lg:text-lg",
                {
                  "border-none bg-teal-500 text-black group-hover:border-none group-hover:text-black":
                    formDataProvider?.step === step.step,
                  "border-white/75 bg-gray-900 group-hover:border-white group-hover:text-white text-white/75":
                    formDataProvider?.step !== step.step,
                }
              )}
            >
              {i + 1}
            </span>
            <span
              className={clsx(
                "hidden text-white/75 transition-colors duration-200 group-hover:text-white lg:block",
                {
                  "font-light": formDataProvider?.step !== step.step,
                  "font-semibold text-white":
                    formDataProvider?.step === step.step,
                }
              )}
            >
              {step.title}
            </span>
          </button>
        ))}
        <div className="absolute top-4 flex h-1 w-full border-b border-dashed lg:hidden" />
      </div>
    </div>
  );
};

export { StepNavigation };
