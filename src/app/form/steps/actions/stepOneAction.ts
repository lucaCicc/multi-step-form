"use server";

import { stepOneSchema } from "@/schemas";
import { FormResponse } from "@/types";
import { getFormErrosInfo } from "@/utils";

/**
 * StepOne Action
 *
 */
export const stepOnection = async (
  _: FormResponse | undefined,
  formData: FormData
): Promise<FormResponse | undefined> => {
  console.info("Action => stepOneForm");

  return new Promise((resolve) => {
    setTimeout(() => {
      const data = Object.fromEntries(formData.entries());

      const validated = stepOneSchema.safeParse(data);

      if (!validated.success) {
        const errors = getFormErrosInfo(validated.error?.issues);

        resolve({
          isSuccess: false,
          errors: errors,
        });
      }

      resolve({
        isSuccess: true,
      });
    }, 500);
  });
};
