import { stepOnection } from "@/app/registration/steps/actions/stepOneAction";
import { stepThreeAction } from "@/app/registration/steps/actions/stepThreeActiont";
import { stepTwoAction } from "@/app/registration/steps/actions/stepTwoActiont";
import { useActionState } from "react";

/**
 *
 *
 */
export const useFormActionsState = () => {
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
