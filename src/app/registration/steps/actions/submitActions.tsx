"use server";

import {
  stepTwoSchema,
  stepOneSchema,
  stepThreeSchema,
  InitFormDataType,
} from "@/schemas";
import { SubmitActionType } from "@/types";

/**
 *
 *
 */
export const submitAction = async (
  data?: InitFormDataType
): Promise<SubmitActionType> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const stepOneValidated = stepOneSchema.safeParse(data);
      if (!stepOneValidated.success) {
        return resolve({
          isError: true,
          step: 1,
        });
      }

      const stepTwoValidated = stepTwoSchema.safeParse(data);
      if (!stepTwoValidated.success) {
        return resolve({
          isError: true,
          step: 2,
        });
      }

      const stepThreeValidated = stepThreeSchema.safeParse(data);
      if (!stepThreeValidated.success) {
        return resolve({
          isError: true,
          step: 3,
        });
      }

      return resolve({ isSuccess: true, isError: false });
    }, 2000);
  });
};
