"use server";

import { stepThreeSchema } from "@/schemas";
import { FormResponse } from "@/types";
import { getFormErrosInfo } from "@/utils";

/**
 * StepThree Action
 *
 */
export const stepThreeAction = async (
  prevState: FormResponse | undefined,
  formData: FormData
): Promise<FormResponse | undefined> => {
  console.info("Action => stepThreeFormAction");

  return new Promise((resolve) => {
    setTimeout(() => {
      const data = Object.fromEntries(formData.entries());

      const validated = stepThreeSchema.safeParse(data);

      if (!validated.success) {
        const errors = getFormErrosInfo(validated.error?.issues);

        return resolve({
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
