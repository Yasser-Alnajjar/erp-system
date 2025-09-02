import { FormikHelpers } from "formik";

export interface IStep {
  title?: string;
  description?: string;
  label?: string;
  stepTitle?: string;
  component: React.ComponentType<any>;
  initialValues: Record<string, any>;
  validationSchema: any;
}

export interface FormStepperProps {
  steps: IStep[];
  onSubmit: (values: any, helpers: FormikHelpers<any>) => void;
  toggleForm?: () => void;
}
