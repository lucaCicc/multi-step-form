"use client";

import { useFormDataProvider } from "@/providers/FormProvider";
import { useCallback, useEffect, useRef, useState } from "react";

import Form from "@/components/form/Form";
import FormReview from "@/components/form/FormReview";
import { InitFormDataType, isSubmitError, Steps } from "@/types";
import toast from "react-hot-toast";
import { useFormActionsState } from "@/app/form/hooks/useFormActionsState";
import { submitAction } from "@/app/form/steps/actions/submitActions";
import { useEventListenerScrolled } from "@/hooks/useEventListenerScrolled";
import { Slider, SliderItem } from "@/components/slider/Slider";
import { useFormSteps } from "@/app/form/hooks/useFormSteps";

/**
 * Steps Form
 *
 */
const StepsForm = () => {
  const formDataProvider = useFormDataProvider();
  const sliderRef = useRef<HTMLDivElement>(null);

  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const formActionsState = useFormActionsState();
  const { currentStep, updateData, updateStep } = formDataProvider ?? {};

  const { inputStepsOne, inputStepsTwo, inputStepsThree } =
    useFormSteps(formActionsState);

  useEventListenerScrolled(sliderRef?.current, () => {
    setShow(false);
  });

  const {
    formOne,
    formTwo,
    formThree,
    formActionOne,
    formActionTwo,
    formActionThree,
    isFormOnePending,
    isFormTwoPending,
    isFormThreePending,
  } = formActionsState;

  /**
   *
   */
  const scrollLeft = useCallback(() => {
    const { width } = sliderRef?.current?.getBoundingClientRect?.() ?? {};

    sliderRef?.current?.scrollBy?.({ left: width, behavior: "smooth" });
  }, []);

  /**
   * Handle next step
   *
   */
  const handleNextStep = useCallback(
    (nextStep: Steps) => {
      setShow(true);

      setTimeout(() => {
        scrollLeft();
        updateStep?.(nextStep);
      }, 0);
    },
    [scrollLeft, updateStep]
  );

  /**
   * Handle next step
   *
   */
  useEffect(() => {
    if (
      currentStep === Steps.STEP_ONE &&
      formOne?.isSuccess &&
      !isFormOnePending
    ) {
      handleNextStep(Steps.STEP_TWO);
    }
    if (
      currentStep === Steps.STEP_TWO &&
      formTwo?.isSuccess &&
      !isFormTwoPending
    ) {
      handleNextStep(Steps.STEP_THREE);
    }
    if (
      currentStep === Steps.STEP_THREE &&
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

  /**
   * handle Submit
   *
   */
  const handleFormSubmit = useCallback(async () => {
    setIsLoading(true);

    submitAction(formDataProvider?.dataForm)
      .then((resp) => {
        if (isSubmitError(resp)) {
          updateStep?.(resp.step);
        } else {
          toast.success("Submitted successfully");
        }
      })
      .finally(() => {
        setIsLoading(false);
      })
      .catch(console.error);
  }, [formDataProvider?.dataForm, updateStep]);

  /**
   *
   */
  const onChangeForm = useCallback(
    (key: string, value: string) => {
      const _key = key as keyof InitFormDataType;

      updateData?.({ [_key]: value });
    },
    [updateData]
  );

  /******************
   * Renders
   *
   */
  if (Steps.STEP_REVIEW === currentStep) {
    return (
      <FormReview
        show={true}
        action={handleFormSubmit}
        inputs={formDataProvider?.dataForm}
        isLoading={isLoading}
        submitLabel="Submit"
      />
    );
  }

  return (
    <Slider ref={sliderRef}>
      {/** STEP ONE **/}
      <SliderItem currentStep={currentStep} show={show} id={Steps.STEP_ONE}>
        <Form
          show={true}
          submitLabel="Next"
          inputs={inputStepsOne}
          action={formActionOne}
          onChange={onChangeForm}
          isLoading={isFormOnePending}
        />
      </SliderItem>

      {/** STEP TWO **/}
      <SliderItem currentStep={currentStep} show={show} id={Steps.STEP_TWO}>
        <Form
          show={true}
          submitLabel="Next"
          inputs={inputStepsTwo}
          action={formActionTwo}
          onChange={onChangeForm}
          isLoading={isFormTwoPending}
        />
      </SliderItem>

      {/** STEP THREE **/}
      <SliderItem currentStep={currentStep} show={show} id={Steps.STEP_THREE}>
        <Form
          show={true}
          submitLabel="Next"
          onChange={onChangeForm}
          inputs={inputStepsThree}
          action={formActionThree}
          isLoading={isFormThreePending}
        />
      </SliderItem>
    </Slider>
  );
};

export { StepsForm };
