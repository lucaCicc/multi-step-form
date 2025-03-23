import { useFormDataProvider } from "@/providers/FormProvider";
import { FormResponse } from "@/types";
import { useMemo } from "react";

interface Props {
  formOne: FormResponse | undefined;
  formTwo: FormResponse | undefined;
  formThree: FormResponse | undefined;
  isFormOnePending: boolean;
  isFormTwoPending: boolean;
  isFormThreePending: boolean;
}

/**
 *
 *
 */
export const useFormSteps = ({
  formOne,
  formTwo,
  formThree,
  isFormOnePending,
  isFormTwoPending,
  isFormThreePending,
}: Props) => {
  const formDataProvider = useFormDataProvider();

  /**
   *
   */
  const inputStepsOne = useMemo(() => {
    return [
      {
        id: "name",
        label: "Name",
        type: "text",
        required: true,
        description: "",
        errorMsg: isFormOnePending ? undefined : formOne?.errors?.name, //?? formErrors?.name,
        value: formDataProvider?.dataForm["name"],
      },
      {
        id: "surname",
        label: "Surname",
        type: "text",
        required: true,
        errorMsg: isFormOnePending ? undefined : formOne?.errors?.surname, // ?? formErrors?.surname,
        value: formDataProvider?.dataForm["surname"],
        description: "",
      },
    ];
  }, [
    formDataProvider?.dataForm,
    formOne?.errors?.name,
    formOne?.errors?.surname,
    isFormOnePending,
  ]);

  /**
   *
   */
  const inputStepsTwo = useMemo(() => {
    return [
      {
        id: "birthday",
        label: "Birthday (YYYY-MM-DD)",
        type: "text",
        required: true,
        description: "",
        errorMsg: isFormTwoPending ? undefined : formTwo?.errors?.birthday, // ?? formErrors?.birthday,
        value: formDataProvider?.dataForm["birthday"],
      },
      {
        id: "country",
        label: "Country",
        type: "text",
        required: true,
        description: "",
        errorMsg: isFormTwoPending ? undefined : formTwo?.errors?.country, // ?? formErrors?.country,
        value: String(formDataProvider?.dataForm["country"] ?? ""),
      },
    ];
  }, [
    formDataProvider?.dataForm,
    formTwo?.errors?.birthday,
    formTwo?.errors?.country,
    isFormTwoPending,
  ]);

  /**
   *
   */
  const inputStepsThree = useMemo(() => {
    return [
      {
        id: "phoneNumber",
        label: "Phone number",
        type: "text",
        required: true,
        description: "",
        errorMsg: isFormThreePending
          ? undefined
          : formThree?.errors?.phoneNumber, // ?? formErrors?.phoneNumber,
        value: formDataProvider?.dataForm["phoneNumber"],
      },
      {
        id: "email",
        label: "Email",
        type: "email",
        required: true,
        description: "",
        value: formDataProvider?.dataForm["email"],
        errorMsg: isFormThreePending ? undefined : formThree?.errors?.email, // ?? formErrors?.email,
      },
    ];
  }, [
    formDataProvider?.dataForm,
    formThree?.errors?.email,
    formThree?.errors?.phoneNumber,
    isFormThreePending,
  ]);

  return {
    inputStepsOne,
    inputStepsTwo,
    inputStepsThree,
  };
};
