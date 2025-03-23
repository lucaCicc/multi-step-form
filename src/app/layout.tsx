import type { Metadata } from "next";
import "./globals.css";

import { ReactNode } from "react";
import { Main } from "@/components/wrappers/MainWrapper";
import { DefaultHeader } from "@/components/headers/DefaultHeader";
import { ContentWrapper } from "@/components/wrappers/ContentWrapper";
import { StepNavigation } from "@/components/navigations/StepNavigation";
import { FormProvider } from "@/providers/FormProvider";
import { Toaster } from "react-hot-toast";
import { navigationSteps } from "@/app/form/data";

export const metadata: Metadata = {
  title: "Multi Step",
};

interface Pros {
  readonly children: ReactNode;
}

/**
 * Root Layout
 *
 */
export default function RootLayout({ children }: Pros) {
  return (
    <FormProvider>
      <Main>
        <DefaultHeader title={"Personal info"} />

        <ContentWrapper navigation={<StepNavigation steps={navigationSteps} />}>
          {children}
          <Toaster position="bottom-center" />
        </ContentWrapper>
      </Main>
    </FormProvider>
  );
}
