"use client";

import { InitFormDataType, FormDataType } from "@/schemas";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

const initFormData: InitFormDataType = {
  name: undefined,
  surname: undefined,
  birthday: undefined,
  country: undefined,
  email: undefined,
  phoneNumber: undefined,
};

export const FormProviderContext = createContext<IFormContext | null>(null);

interface IFormProvider {
  children: React.ReactNode;
}

interface IFormContext {
  dataForm: InitFormDataType;
  updateData: (newValues: Partial<FormDataType>) => void;
  step: number;
  nextStep: () => void;
  updateStep: (step: number) => void;
}

/**
 *
 */
export const FormProvider = ({ children }: IFormProvider) => {
  const [dataForm, setDataForm] = useState<InitFormDataType>(initFormData);
  const [step, setStep] = useState<number>(1);

  /**
   *
   */
  const updateData = useCallback((newValues: Partial<FormDataType>) => {
    setDataForm((currentValues) => ({ ...currentValues, ...newValues }));
  }, []);

  /**
   *
   */
  const nextStep = useCallback(() => {
    setStep((step) => step + 1);
  }, []);

  /**
   *
   */
  const updateStep = useCallback((step: number) => {
    setStep(step);
  }, []);

  /**
   *
   */
  const contextValue = useMemo(
    () => ({
      dataForm,
      updateData,
      step,
      nextStep,
      updateStep,
    }),
    [dataForm, updateData, step, nextStep, updateStep]
  );

  /**
   *
   */
  return (
    <FormProviderContext.Provider value={contextValue}>
      {children}
    </FormProviderContext.Provider>
  );
};

export const useFormDataProvider = () => useContext(FormProviderContext);
