import { FormActionsState, Steps } from "@/types";
import { useEffect } from "react";

interface Props {
  currentStep?: Steps;
  formActionsState: FormActionsState;
  handleNextStep: (newStep: Steps) => void;
}

/**
 *
 *
 */
export const useNextStepListener = ({
  currentStep,
  formActionsState,
  handleNextStep,
}: Props) => {
  const {
    formOne,
    formTwo,
    formThree,
    isFormOnePending,
    isFormTwoPending,
    isFormThreePending,
  } = formActionsState;

  /**
   * Handle next step
   *
   */
  useEffect(() => {
    if (
      Steps.STEP_ONE === currentStep &&
      formOne?.isSuccess &&
      !isFormOnePending
    ) {
      handleNextStep(Steps.STEP_TWO);
    }
    if (
      Steps.STEP_TWO === currentStep &&
      formTwo?.isSuccess &&
      !isFormTwoPending
    ) {
      handleNextStep(Steps.STEP_THREE);
    }
    if (
      Steps.STEP_THREE === currentStep &&
      formThree?.isSuccess &&
      !isFormThreePending
    ) {
      handleNextStep(Steps.STEP_REVIEW);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    formOne?.isSuccess,
    formTwo?.isSuccess,
    formThree?.isSuccess,
    isFormThreePending,
    isFormOnePending,
    isFormTwoPending,
  ]);
};
