"use client";

import React from "react";
import {
  Form,
  Formik,
  FormikConfig,
  FormikHelpers,
  FormikProvider,
} from "formik";
import { FieldRenderer } from "./field-renderer";
import { IFieldConfig } from "./types";
import { cn } from "@lib/utils";

interface DynamicFormProps extends FormikConfig<any> {
  fields: Array<IFieldConfig>;
  actions?: React.ReactNode;
  girdClassName?: string;
  formikHelpers?: (formikHelpers: FormikHelpers<any>) => void;
  className?: string;
  children?: (formik: FormikHelpers<any> & any) => React.ReactNode;
}

export const DynamicForm: React.FC<DynamicFormProps> = ({
  fields,
  actions,
  className,
  formikHelpers,
  girdClassName,
  children,
  ...formikConfig
}) => {
  return (
    <Formik {...formikConfig} enableReinitialize>
      {(formik) => {
        if (formikHelpers) {
          formikHelpers(formik);
        }

        return (
          <FormikProvider value={formik}>
            <Form className={cn(className)}>
              <div className={cn("grid grid-cols-12 gap-4", girdClassName)}>
                {fields.map((field) => (
                  <div
                    key={field.name}
                    style={{ order: field.order ?? 0 }}
                    className={cn("col-span-12", field.col && field.col)}
                  >
                    <div
                      className={cn(
                        "flex flex-col gap-2",
                        (field.type === "switch" ||
                          field.type === "checkbox") &&
                          "flex-row-reverse items-center w-fit",
                        field.rowClassName
                      )}
                    >
                      {field.label && typeof field.label === "string" ? (
                        <label
                          htmlFor={field.name}
                          className={cn(
                            "text-xs font-medium",
                            field.labelClassName
                          )}
                        >
                          {field.label}
                        </label>
                      ) : (
                        field.label
                      )}
                      <FieldRenderer field={field} />
                    </div>
                    {formik?.touched[field.name] &&
                      formik?.errors[field.name] && (
                        <small className="text-xs text-red-500">
                          {formik?.errors[field.name]?.toString()}
                        </small>
                      )}
                  </div>
                ))}
              </div>
              {children ? children(formik) : actions}
            </Form>
          </FormikProvider>
        );
      }}
    </Formik>
  );
};
