"use client";

import { useFormDataProvider } from "@/providers/FormProvider";
import { useCallback, useEffect, useState } from "react";

import Form from "@/components/form/Form";
import FormReview from "@/components/form/FormReview";
import { submitAction } from "@/app/registration/steps/actions/submitActions";
import { FormErrors, InitFormDataType, isSubmitError } from "@/types";
import { useFormActionsState } from "@/app/registration/hooks/useFormActionsState";
import toast from "react-hot-toast";

/**
 * Steps Form
 *
 */
const StepsForm = () => {
  const formDataProvider = useFormDataProvider();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors | undefined>();

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
   *
   */
  const handleFormSubmit = async () => {
    setIsLoading(true);

    submitAction(formDataProvider?.dataForm)
      .then((resp) => {
        if (isSubmitError(resp)) {
          setErrors(resp.messages);
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
      setErrors((errors) => ({ ...errors, [_key]: undefined }));

      const newData = { [_key]: value };
      updateData?.(newData);
    },
    [updateData]
  );

  /**
   * Main render
   *
   */
  return (
    <>
      {/** Step 1 **/}
      <Form
        show={currentStep === 1}
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
              : formOne?.errors?.name ?? errors?.name,
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
              : formOne?.errors?.surname ?? errors?.surname,
            value: formDataProvider?.dataForm["surname"],
            description: "",
          },
        ]}
        action={formActionOne}
      />

      {/** Step 2 **/}
      <Form
        show={currentStep === 2}
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
              : formTwo?.errors?.birthday ?? errors?.birthday,
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
              : formTwo?.errors?.country ?? errors?.country,
            value: String(formDataProvider?.dataForm["country"] ?? ""),
          },
        ]}
        action={formActionTwo}
      />

      {/** Step 3 **/}
      <Form
        isLoading={isFormThreePending}
        submitLabel="Next"
        show={currentStep === 3}
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
              : formThree?.errors?.phoneNumber ?? errors?.phoneNumber,
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
              : formThree?.errors?.email ?? errors?.email,
          },
        ]}
        action={formActionThree}
      />

      {/** Review **/}
      <FormReview
        show={currentStep === 4}
        action={handleFormSubmit}
        inputs={formDataProvider?.dataForm}
        isLoading={isLoading}
        submitLabel="Submit"
      />
    </>
  );
};

export { StepsForm };
