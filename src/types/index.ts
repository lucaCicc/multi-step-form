import { formDataSchema, initFormDataSchema } from "@/schemas";
import { z } from "zod";

/**
 *
 */
export type InitFormDataType = z.infer<typeof initFormDataSchema>;

/**
 *
 */
export type FormDataType = z.infer<typeof formDataSchema>;
export interface FormErrors {
  [key: string]: string | undefined;
}

export interface FormResponse {
  errors?: FormErrors;
  isSuccess: boolean;
}

export enum MainRoutes {
  STEPS_FORM = "/registration/steps",
}

interface SubmitActionReturnErrorType {
  isError: true;
  step: number;
  messages: FormErrors;
}

interface SubmitActionReturnSuccessType {
  isError: false;
  isSuccess: true;
}

export type SubmitActionType =
  | SubmitActionReturnErrorType
  | SubmitActionReturnSuccessType;

export const isSubmitError = (
  v: SubmitActionType
): v is SubmitActionReturnErrorType => v.isError === true;

export interface Step {
  title: string;
  step: number;
  description: string;
}
