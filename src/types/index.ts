export interface FormErrors {
  [key: string]: string | undefined;
}

export enum MainRoutes {
  STEP_ONE = "/registration/step-one",
  STEP_TWO = "/registration/step-two",
  STEP_THREE = "/registration/step-three",
}

export interface Step {
  title: string;
  route: string;
  link: MainRoutes;
}
