import type { Metadata } from "next";
import "./globals.css";
import QueryClientProvider from "@/providers/QueryClientProvider";

import { ReactNode } from "react";
import { MainRoutes } from "@/types";
import { MirageInit } from "@/components/mirage/MirageInit";
import { Main } from "@/components/wrappers/MainWrapper";
import { DefaultHeader } from "@/components/headers/DefaultHeader";
import { ContentWrapper } from "@/components/wrappers/ContentWrapper";
import { StepNavigation } from "@/components/navigations/StepNavigation";

export const metadata: Metadata = {
  title: "Multi Step",
};

interface Pros {
  readonly children: ReactNode;
}

const steps = [
  {
    title: "Step One",
    route: "step-one",
    link: MainRoutes.STEP_ONE,
  },
  {
    title: "Step Two",
    route: "step-two",
    link: MainRoutes.STEP_TWO,
  },
  {
    title: "Step Three",
    route: "step-three",
    link: MainRoutes.STEP_THREE,
  },
];

const title = "Form";

/**
 * Root Layout
 *
 */
export default function RootLayout({ children }: Pros) {
  return (
    <QueryClientProvider>
      <MirageInit />

      <Main>
        <DefaultHeader title={title} />

        <ContentWrapper navigation={<StepNavigation steps={steps} />}>
          {children}
        </ContentWrapper>
      </Main>
    </QueryClientProvider>
  );
}
