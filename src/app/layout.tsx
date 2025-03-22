import type { Metadata } from "next";
import "./globals.css";

import { ReactNode } from "react";
import { Main } from "@/components/wrappers/MainWrapper";
import { DefaultHeader } from "@/components/headers/DefaultHeader";
import { ContentWrapper } from "@/components/wrappers/ContentWrapper";
import { StepNavigation } from "@/components/navigations/StepNavigation";
import { FormProvider } from "@/providers/FormProvider";

export const metadata: Metadata = {
  title: "Multi Step",
};

interface Pros {
  readonly children: ReactNode;
}

const steps = [
  {
    title: "Step One",
    step: 1,
  },
  {
    title: "Step Two",
    step: 2,
  },
  {
    title: "Step Three",
    step: 3,
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
        </ContentWrapper>
      </Main>
    </FormProvider>
  );
}
