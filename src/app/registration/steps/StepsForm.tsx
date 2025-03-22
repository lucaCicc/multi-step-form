"use client";

import { stepOneFormAction as oneAction } from "@/app/registration/steps/actions/stepOneFormAction";
import { stepTwoFormAction as twoAction } from "@/app/registration/steps/actions/stepTwoFormActiont";
import { stepThreeFormAction as threeAction } from "@/app/registration/steps/actions/stepThreeFormActiont";

import { useFormDataProvider } from "@/providers/FormProvider";
import { useActionState, useCallback, useEffect, useState } from "react";

import Form from "@/components/form/Form";
import FormReview from "@/components/form/FormReview";
import { submitAction } from "@/app/registration/steps/actions/submitActions";
import { isSubmitError } from "@/types";

/**
 * Steps Form
 *
 */
const StepsForm = () => {
  const formDataProvider = useFormDataProvider();

  const currentStep = formDataProvider?.step;

  const [formOne, formActionOne, isFormOnePending] = useActionState(
    oneAction,
    undefined
  );

  const [formTwo, formActionTwo, isFormTwoPending] = useActionState(
    twoAction,
    undefined
  );

  const [formThree, formActionThree, isFormThreePending] = useActionState(
    threeAction,
    undefined
  );

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (currentStep === 1 && formOne?.isSuccess && !isFormOnePending)
      formDataProvider?.updateStep(2);

    if (currentStep === 2 && formTwo?.isSuccess && !isFormTwoPending)
      formDataProvider?.updateStep(3);

    if (currentStep === 3 && formThree?.isSuccess && !isFormThreePending)
      formDataProvider?.updateStep(4);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    formOne?.isSuccess,
    formTwo?.isSuccess,
    formThree?.isSuccess,
    isFormThreePending,
    isFormOnePending,
    isFormTwoPending,
  ]);

  const handleFormSubmit = async () => {
    setIsLoading(true);
    const res = await submitAction(formDataProvider?.dataForm);
    setIsLoading(false);
    if (isSubmitError(res)) {
      formDataProvider?.updateStep(res.step);
    }
  };

  /**
   *
   */
  const onChange = useCallback(
    (name: string, value: string) => {
      formDataProvider?.updateData({
        [name]: value,
      });
    },
    [formDataProvider]
  );

  /**
   * Main render
   *
   */
  return (
    <>
      {/** Step 1 */}
      <Form
        show={currentStep === 1}
        isLoading={isFormOnePending}
        submitLabel="Continue"
        inputs={[
          {
            id: "name",
            label: "Name",
            type: "text",
            onChange,
            required: true,
            description: "",
            errorMsg: isFormOnePending ? undefined : formOne?.errors?.name,
            value: formDataProvider?.dataForm["name"],
          },
          {
            id: "surname",
            label: "Surname",
            type: "text",
            onChange,
            required: true,
            errorMsg: isFormOnePending ? undefined : formOne?.errors?.surname,
            value: formDataProvider?.dataForm["surname"],
            description: "",
          },
        ]}
        action={formActionOne}
      />

      {/** Step 2 */}
      <Form
        show={currentStep === 2}
        submitLabel="Continue"
        isLoading={isFormTwoPending}
        inputs={[
          {
            id: "birthday",
            label: "Birthday",
            type: "text",
            onChange,
            required: true,
            description: "YYYY-MM-DD",
            errorMsg: isFormTwoPending ? undefined : formTwo?.errors?.birthday,
            value: formDataProvider?.dataForm["birthday"],
          },
          {
            id: "country",
            label: "Country",
            type: "text",
            onChange,
            required: true,
            description: "",
            errorMsg: isFormTwoPending ? undefined : formTwo?.errors?.country,
            value: String(formDataProvider?.dataForm["country"] ?? ""),
          },
        ]}
        action={formActionTwo}
      />

      {/** Step 3 */}
      <Form
        isLoading={isFormThreePending}
        submitLabel="Continue"
        show={currentStep === 3}
        inputs={[
          {
            id: "phoneNumber",
            label: "Phone number",
            type: "text",
            onChange,
            required: true,
            description: "",
            errorMsg: isFormThreePending
              ? undefined
              : formThree?.errors?.phoneNumber,
            value: formDataProvider?.dataForm["phoneNumber"],
          },
          {
            id: "email",
            label: "Contact Email",
            type: "email",
            onChange,
            required: true,
            description: "",
            value: formDataProvider?.dataForm["email"],
            errorMsg: isFormThreePending ? undefined : formThree?.errors?.email,
          },
        ]}
        action={formActionThree}
      />

      {/** Review */}
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
