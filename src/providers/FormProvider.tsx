"use client";

import { FormDataType, InitFormDataType, Steps } from "@/types";
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
  currentStep: number;
  updateData: (newValues: Partial<FormDataType>) => void;
  updateStep: (step: Steps) => void;
}

/**
 *
 */
export const FormProvider = ({ children }: IFormProvider) => {
  const [dataForm, setDataForm] = useState<InitFormDataType>(initFormData);
  const [currentStep, setCurrentStep] = useState<number>(Steps.STEP_ONE);

  /**
   *
   */
  const updateData = useCallback((newValues: Partial<FormDataType>) => {
    setDataForm((currentValues) => ({ ...currentValues, ...newValues }));
  }, []);

  /**
   *
   */
  const updateStep = useCallback((step: Steps) => {
    setCurrentStep(step);
  }, []);

  /**
   *
   */
  const contextValue = useMemo(
    () => ({
      dataForm,
      updateData,
      currentStep,
      updateStep,
    }),
    [dataForm, updateData, currentStep, updateStep]
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
