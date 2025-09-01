"use client";
import React from "react";
import { useFormikContext } from "formik";
import { FieldRenderer, IFieldConfig } from "@components";
import { cn } from "@lib/utils";
interface IFieldGroup {
  title: string;
  fields: IFieldConfig[];
}
interface IStepProps {
  fieldGroups: IFieldGroup[];
  warperClass?: string;
}
export const Step = (props: IStepProps) => {
  const { fieldGroups, warperClass } = props;
  const { errors } = useFormikContext();
  return (
    <div className={warperClass}>
      {fieldGroups.map((group, groupIndex) => (
        <div key={groupIndex} className="mb-6">
          <h2 className="text-md font-bold mb-4">{group.title}</h2>
          <div className="grid grid-cols-12 gap-4">
            {group.fields.map((field) => {
              const { name } = field;
              return (
                <div
                  key={field.name}
                  style={{ order: field.order ?? 0 }}
                  className={cn("col-span-12", field.col && field.col)}
                >
                  <div
                    className={cn(
                      "flex flex-col gap-2",
                      (field.type === "switch" || field.type === "checkbox") &&
                        "flex-row-reverse items-center w-fit",
                      field.rowClassName
                    )}
                  >
                    {field.label && typeof field.label === "string" ? (
                      <label
                        htmlFor={field.name}
                        className={cn(
                          "text-sm font-medium",
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
                  {(errors as any)[name!] && (
                    <small className="text-error">
                      {(errors as any)[name!]}
                    </small>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};
