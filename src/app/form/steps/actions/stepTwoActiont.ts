"use server";

import { stepTwoSchema } from "@/schemas";
import { FormResponse } from "@/types";
import { getFormErrosInfo } from "@/utils";

/**
 * StepTwo Action
 *
 */
export const stepTwoAction = async (
  prevState: FormResponse | undefined,
  formData: FormData
): Promise<FormResponse | undefined> => {
  console.info("Action => stepTwoFormAction");

  return new Promise((resolve) => {
    setTimeout(() => {
      const data = Object.fromEntries(formData.entries());
      console.log("data", data);
      const validated = stepTwoSchema.safeParse(data);

      if (!validated.success) {
        const errors = getFormErrosInfo(validated.error?.issues);
        console.log("KO");
        return resolve({
          isSuccess: false,
          errors: errors,
        });
      }
      console.log("OK");

      resolve({
        isSuccess: true,
      });
    }, 500);
  });
};
