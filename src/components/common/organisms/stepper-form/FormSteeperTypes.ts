import { FormikHelpers } from "formik";

export interface IStep {
  label?: string;
  component: React.ComponentType<any>;
  initialValues: Record<string, any>;
  validationSchema: any;
}

export interface FormStepperProps {
  steps: IStep[];
  onSubmit: (values: any, helpers: FormikHelpers<any>) => void;
  toggleForm?: () => void;
}
