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
  // link: MainRoutes;
}
