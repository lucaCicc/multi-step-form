import { Steps } from "@/types";
import clsx from "clsx";

import { RefObject } from "react";

/**
 *
 *
 */
export const Slider = ({
  children,
  ref,
}: {
  children: React.ReactNode;
  ref: RefObject<HTMLDivElement | null>;
}) => {
  return (
    <div
      className="w-full h-auto whitespace-nowrap overflow-scroll  flex items-center  items-center"
      ref={ref}
    >
      {children}
    </div>
  );
};

/**
 *
 *
 */
export const SliderItem = ({
  id,
  currentStep = 0,
  show,
  children,
}: {
  id: Steps;
  children: React.ReactNode;
  currentStep?: number;
  show: boolean;
}) => {
  return (
    <div
      className={clsx("w-full flex-shrink-0   flex-none max-w-full", {
        hidden: currentStep !== id && !show,
      })}
    >
      {children}
    </div>
  );
};
