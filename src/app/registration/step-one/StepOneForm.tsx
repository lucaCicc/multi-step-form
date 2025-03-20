"use client";

import { SubmitButton } from "@/components/buttons/SubmitButton";
import { Input } from "@/components/inputs/DefaultInput";

/**
 * Step One Form
 *
 */
const StepOneForm = () => {
  return (
    <form className="flex flex-1 flex-col items-center">
      <div className="flex w-full flex-col gap-8 lg:max-w-[700px] ">
        <Input label="Name" id="name" type="text" required errorMsg={"error"} />
        <Input
          label="Link"
          id="link"
          required
          type="text"
          description='Must start with "http://" or "https://"'
          pattern="[Hh][Tt][Tt][Pp][Ss]?:\/\/(?:(?:[a-zA-Z\u00a1-\uffff0-9]+-?)*[a-zA-Z\u00a1-\uffff0-9]+)(?:\.(?:[a-zA-Z\u00a1-\uffff0-9]+-?)*[a-zA-Z\u00a1-\uffff0-9]+)*(?:\.(?:[a-zA-Z\u00a1-\uffff]{2,}))(?::\d{2,5})?(?:\/[^\s]*)?"
          errorMsg={"error"}
        />
        <SubmitButton text="Continue" />
      </div>
    </form>
  );
};

export { StepOneForm };
