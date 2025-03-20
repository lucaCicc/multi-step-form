"use client";

import { SubmitButton } from "@/components/buttons/SubmitButton";
import { Input } from "@/components/inputs/DefaultInput";

/**
 * Step Three Form
 *
 */
const StepThreeForm = () => {
  return (
    <form className="flex flex-1 flex-col items-center">
      <div className="flex w-full flex-col gap-8 lg:max-w-[700px] ">
        <Input
          label="Contact Name"
          id="contactName"
          required
          type="text"
          errorMsg={"serverErrors?.contactName"}
        />
        <Input
          label="Contact Email"
          id="contactEmail"
          required
          type="email"
          errorMsg={"serverErrors?.email"}
        />

        <SubmitButton text="Continue" />
      </div>
    </form>
  );
};

export { StepThreeForm };
