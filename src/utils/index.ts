import { FormErrors } from "@/types";
import { ZodIssue } from "zod";

/**
 *
 *
 */
const getFormErrosInfo = (issues: ZodIssue[]): FormErrors => {
  const errors = issues.reduce((acc: FormErrors, { path, message }) => {
    const field = path.at(0) as string;
    acc[field] = message;
    return acc;
  }, {});

  return errors;
};

export { getFormErrosInfo };
