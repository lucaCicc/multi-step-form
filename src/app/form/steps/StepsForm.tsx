"use client";

import { useFormDataProvider } from "@/providers/FormProvider";
import { useCallback, useEffect, useState } from "react";

import Form from "@/components/form/Form";
import FormReview from "@/components/form/FormReview";
import {
  FormErrors,
  InitFormDataType,
  isSubmitError,
  StepsEnum,
} from "@/types";
import toast from "react-hot-toast";
import { useFormActionsState } from "@/app/form/hooks/useFormActionsState";
import { submitAction } from "@/app/form/steps/actions/submitActions";

/**
 * Steps Form
 *
 */
const StepsForm = () => {
  const formDataProvider = useFormDataProvider();
  const [isLoading, setIsLoading] = useState(false);
  const [formErrors, setFormErrors] = useState<FormErrors | undefined>();

  const { currentStep, updateData, updateStep } = formDataProvider ?? {};

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
  } = useFormActionsState();

  /**
   * Handle next step
   *
   */
  useEffect(() => {
    if (currentStep === 1 && formOne?.isSuccess && !isFormOnePending)
      updateStep?.(2);
    if (currentStep === 2 && formTwo?.isSuccess && !isFormTwoPending)
      updateStep?.(3);
    if (currentStep === 3 && formThree?.isSuccess && !isFormThreePending)
      updateStep?.(4);
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
   * Clean form errors
   *
   */
  const cleanFormErrors = useCallback((key: keyof InitFormDataType) => {
    setFormErrors((errors) => ({ ...errors, [key]: undefined }));
  }, []);

  /**
   * handle Submit
   *
   */
  const handleFormSubmit = async () => {
    setIsLoading(true);

    submitAction(formDataProvider?.dataForm)
      .then((resp) => {
        if (isSubmitError(resp)) {
          setFormErrors(resp.messages);
          updateStep?.(resp.step);
        } else {
          toast.success("Submitted successfully");
        }
      })
      .finally(() => {
        setIsLoading(false);
      })
      .catch(console.error);
  };

  /**
   *
   */
  const onChangeTextInput = useCallback(
    (key: string, value: string) => {
      const _key = key as keyof InitFormDataType;

      cleanFormErrors(_key);
      updateData?.({ [_key]: value });
    },
    [cleanFormErrors, updateData]
  );

  /**
   * Main render
   *
   */
  return (
    <>
      {/** Step 1 **/}
      <Form
        show={currentStep === StepsEnum.STEP_ONE}
        isLoading={isFormOnePending}
        submitLabel="Next"
        inputs={[
          {
            id: "name",
            label: "Name",
            type: "text",
            onChange: onChangeTextInput,
            required: true,
            description: "",
            errorMsg: isFormOnePending
              ? undefined
              : formOne?.errors?.name ?? formErrors?.name,
            value: formDataProvider?.dataForm["name"],
          },
          {
            id: "surname",
            label: "Surname",
            type: "text",
            onChange: onChangeTextInput,
            required: true,
            errorMsg: isFormOnePending
              ? undefined
              : formOne?.errors?.surname ?? formErrors?.surname,
            value: formDataProvider?.dataForm["surname"],
            description: "",
          },
        ]}
        action={formActionOne}
      />

      {/** Step 2 **/}
      <Form
        show={currentStep === StepsEnum.STEP_TWO}
        submitLabel="Next"
        isLoading={isFormTwoPending}
        inputs={[
          {
            id: "birthday",
            label: "Birthday",
            type: "text",
            onChange: onChangeTextInput,
            required: true,
            description: "YYYY-MM-DD",
            errorMsg: isFormTwoPending
              ? undefined
              : formTwo?.errors?.birthday ?? formErrors?.birthday,
            value: formDataProvider?.dataForm["birthday"],
          },
          {
            id: "country",
            label: "Country",
            type: "text",
            onChange: onChangeTextInput,
            required: true,
            description: "",
            errorMsg: isFormTwoPending
              ? undefined
              : formTwo?.errors?.country ?? formErrors?.country,
            value: String(formDataProvider?.dataForm["country"] ?? ""),
          },
        ]}
        action={formActionTwo}
      />

      {/** Step 3 **/}
      <Form
        show={currentStep === StepsEnum.STEP_THREE}
        isLoading={isFormThreePending}
        submitLabel="Next"
        inputs={[
          {
            id: "phoneNumber",
            label: "Phone number",
            type: "text",
            onChange: onChangeTextInput,
            required: true,
            description: "",
            errorMsg: isFormThreePending
              ? undefined
              : formThree?.errors?.phoneNumber ?? formErrors?.phoneNumber,
            value: formDataProvider?.dataForm["phoneNumber"],
          },
          {
            id: "email",
            label: "Email",
            type: "email",
            onChange: onChangeTextInput,
            required: true,
            description: "",
            value: formDataProvider?.dataForm["email"],
            errorMsg: isFormThreePending
              ? undefined
              : formThree?.errors?.email ?? formErrors?.email,
          },
        ]}
        action={formActionThree}
      />

      {/** Review **/}
      <FormReview
        show={currentStep === StepsEnum.STEP_REVIEW}
        action={handleFormSubmit}
        inputs={formDataProvider?.dataForm}
        isLoading={isLoading}
        submitLabel="Submit"
      />
    </>
  );
};

export { StepsForm };
