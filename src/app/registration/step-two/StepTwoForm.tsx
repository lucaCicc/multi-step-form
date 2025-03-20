"use client";

import { SubmitButton } from "@/components/buttons/SubmitButton";
import { Input } from "@/components/inputs/DefaultInput";

/**
 * Step TwoForm
 *
 */
const StepTwoForm = () => {
  return (
    <form className="flex flex-1 flex-col items-center">
      <div className="flex w-full flex-col gap-8 lg:max-w-[700px]">
        <Input
          label="Coupon Code"
          id="coupon"
          required
          type="text"
          description="Must be at least 5 characters long"
          minLength={5}
          errorMsg={"serverErrors?.coupon"}
        />
        <Input
          label="Discount (%)"
          id="discount"
          min={1}
          max={100}
          required
          description="Must be between 1 and 100"
          type="number"
          errorMsg={"serverErrors?.discount"}
        />

        <SubmitButton text="Continue" />
      </div>
    </form>
  );
};

export { StepTwoForm };
