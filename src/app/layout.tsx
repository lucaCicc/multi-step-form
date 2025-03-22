import type { Metadata } from "next";
import "./globals.css";

import { ReactNode } from "react";
import { Main } from "@/components/wrappers/MainWrapper";
import { DefaultHeader } from "@/components/headers/DefaultHeader";
import { ContentWrapper } from "@/components/wrappers/ContentWrapper";
import { StepNavigation } from "@/components/navigations/StepNavigation";
import { FormProvider } from "@/providers/FormProvider";
import { Step } from "@/types";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Multi Step",
};

interface Pros {
  readonly children: ReactNode;
}

const steps: Step[] = [
  {
    title: "1",
    description: "One",
    step: 1,
  },
  {
    title: "2",
    description: "Two",
    step: 2,
  },
  {
    title: "3",
    description: "Three",
    step: 3,
  },
  {
    title: "4",
    description: "Review",
    step: 4,
  },
];

const title = "Form";

/**
 * Root Layout
 *
 */
export default function RootLayout({ children }: Pros) {
  return (
    <FormProvider>
      <Main>
        <DefaultHeader title={title} />

        <ContentWrapper navigation={<StepNavigation steps={steps} />}>
          {children}
          <Toaster />
        </ContentWrapper>
      </Main>
    </FormProvider>
  );
}
