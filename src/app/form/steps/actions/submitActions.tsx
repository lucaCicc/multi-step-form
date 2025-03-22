"use server";

import { stepTwoSchema, stepOneSchema, stepThreeSchema } from "@/schemas";
import { InitFormDataType, SubmitActionType } from "@/types";
import { getFormErrosInfo } from "@/utils";

/**
 * Submit Action
 *
 */
export const submitAction = async (
  data?: InitFormDataType
): Promise<SubmitActionType> => {
  return new Promise((resolve) => {
    console.info("Action => submitAction");

    setTimeout(() => {
      const stepOneValidated = stepOneSchema.safeParse(data);
      if (!stepOneValidated.success) {
        const errors = getFormErrosInfo(stepOneValidated.error?.issues);

        return resolve({
          isError: true,
          step: 1,
          messages: errors,
        });
      }

      const stepTwoValidated = stepTwoSchema.safeParse(data);
      if (!stepTwoValidated.success) {
        const errors = getFormErrosInfo(stepTwoValidated.error?.issues);

        return resolve({
          isError: true,
          step: 2,
          messages: errors,
        });
      }

      const stepThreeValidated = stepThreeSchema.safeParse(data);
      if (!stepThreeValidated.success) {
        const errors = getFormErrosInfo(stepThreeValidated.error?.issues);

        return resolve({
          isError: true,
          step: 3,
          messages: errors,
        });
      }

      return resolve({ isSuccess: true, isError: false });
    }, 2000);
  });
};
