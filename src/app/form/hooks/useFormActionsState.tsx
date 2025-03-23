import { stepOnection } from "@/app/form/steps/actions/stepOneAction";
import { stepThreeAction } from "@/app/form/steps/actions/stepThreeActiont";
import { stepTwoAction } from "@/app/form/steps/actions/stepTwoActiont";
import { FormActionsState } from "@/types";
import { useActionState } from "react";

/**
 *
 *
 */
export const useFormActionsState = (): FormActionsState => {
  const [formOne, formActionOne, isFormOnePending] = useActionState(
    stepOnection,
    undefined
  );

  const [formTwo, formActionTwo, isFormTwoPending] = useActionState(
    stepTwoAction,
    undefined
  );

  const [formThree, formActionThree, isFormThreePending] = useActionState(
    stepThreeAction,
    undefined
  );

  return {
    formOne,
    formActionOne,
    isFormOnePending,
    formTwo,
    formActionTwo,
    isFormTwoPending,
    formThree,
    formActionThree,
    isFormThreePending,
  };
};
