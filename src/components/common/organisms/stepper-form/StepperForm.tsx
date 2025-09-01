import { useState } from "react";
import { Formik, Form } from "formik";
import { Button } from "@components";
import { FormStepperProps } from "./FormSteeperTypes";

export const StepperForm = ({
  steps,
  onSubmit,
  toggleForm,
}: FormStepperProps) => {
  const [stepIndex, setStepIndex] = useState(0);

  const combinedInitialValues = steps.reduce((acc, step) => {
    return { ...acc, ...step.initialValues };
  }, {});

  const currentStep = steps[stepIndex];
  const isLastStep = stepIndex === steps.length - 1;
  const CurrentComponent = currentStep.component;

  const handleNext = (values: any, helpers: any) => {
    if (isLastStep) {
      onSubmit(values, helpers);
      toggleForm?.();
    } else {
      setStepIndex((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setStepIndex((prev) => Math.max(prev - 1, 0));
  };

  return (
    <Formik
      initialValues={combinedInitialValues}
      validationSchema={currentStep.validationSchema}
      onSubmit={handleNext}
    >
      {(formik) => (
        <Form className="space-y-6">
          <CurrentComponent {...formik} />

          <div className="flex justify-end gap-2">
            {toggleForm && (
              <Button
                type="button"
                variant="outline"
                className="text-error border-error hover:bg-error hover:text-white"
                onClick={toggleForm}
              >
                إلغاء
              </Button>
            )}
            {stepIndex > 0 && (
              <Button type="button" onClick={handleBack} variant="outline">
                السابق
              </Button>
            )}
            <Button type="submit">{isLastStep ? "حفظ" : "التالي"}</Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};
