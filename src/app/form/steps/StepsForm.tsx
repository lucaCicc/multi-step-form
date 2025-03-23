"use client";

import { useFormDataProvider } from "@/providers/FormProvider";
import { useCallback, useRef, useState } from "react";

import Form from "@/components/form/Form";
import FormReview from "@/components/form/FormReview";
import { InitFormDataType, isSubmitError, Steps } from "@/types";
import toast from "react-hot-toast";
import { useFormActionsState } from "@/app/form/hooks/useFormActionsState";
import { submitAction } from "@/app/form/steps/actions/submitActions";
import { Slider, SliderItem } from "@/components/slider/Slider";
import { useFormSteps } from "@/app/form/hooks/useFormSteps";
import { useNextStepListener } from "@/app/form/hooks/useNextStepListener";
import { useEventScrolledListener } from "@/app/form/hooks/useEventScrolledListener";

/**
 * Steps Form
 *
 */
const StepsForm = () => {
  const [showSlider, setShowSlider] = useState(false);
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);

  const sliderRef = useRef<HTMLDivElement>(null);

  const formActionsState = useFormActionsState();

  const { inputStepsOne, inputStepsTwo, inputStepsThree } =
    useFormSteps(formActionsState);

  const { currentStep, updateStep, dataForm, updateData } =
    useFormDataProvider() ?? {};

  useEventScrolledListener(sliderRef?.current, () => {
    setShowSlider(false);
  });

  const {
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
  const scrollSliderLeft = useCallback(() => {
    const { width } = sliderRef?.current?.getBoundingClientRect?.() ?? {};
    sliderRef?.current?.scrollBy?.({ left: width, behavior: "smooth" });
  }, []);

  /**
   * Handle next step
   *
   */
  const handleNextStep = useCallback(
    (nextStep: Steps) => {
      setShowSlider(true);

      setTimeout(() => {
        scrollSliderLeft();
        updateStep?.(nextStep);
      }, 0);
    },
    [scrollSliderLeft, updateStep]
  );

  useNextStepListener({
    formActionsState,
    currentStep,
    handleNextStep,
  });

  /**
   * handle Submit
   *
   */
  const handleFormSubmit = useCallback(() => {
    setIsSubmitLoading(true);

    submitAction(dataForm)
      .then((resp) => {
        if (isSubmitError(resp)) {
          return updateStep?.(resp.step);
        }

        toast.success("Submitted successfully “🎉🎉🎉");
      })
      .finally(() => {
        setIsSubmitLoading(false);
      })
      .catch(console.error);
  }, [dataForm, updateStep]);

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

  return Steps.STEP_REVIEW === currentStep ? (
    <FormReview
      show={true}
      action={handleFormSubmit}
      inputs={dataForm}
      isLoading={isSubmitLoading}
      submitLabel="Submit"
    />
  ) : (
    <Slider ref={sliderRef}>
      {/** STEP ONE **/}
      <SliderItem
        currentStep={currentStep}
        show={showSlider}
        id={Steps.STEP_ONE}
      >
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
      <SliderItem
        currentStep={currentStep}
        show={showSlider}
        id={Steps.STEP_TWO}
      >
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
      <SliderItem
        currentStep={currentStep}
        show={showSlider}
        id={Steps.STEP_THREE}
      >
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
