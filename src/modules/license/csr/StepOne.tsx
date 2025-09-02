"use client";
import React, { useState } from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  IFieldConfig,
  Input,
  Label,
} from "@components";
import { cn } from "@lib/utils";
import { ImageUp } from "lucide-react";
import { Step } from "src/components/common/organisms/stepper-form";

interface IFieldGroup {
  title: string;
  fields: IFieldConfig[];
}

interface IStepProps {
  fieldGroups: IFieldGroup[];
  wrapperClass?: string;
  validationSchema?: any;
}

export const StepOne = ({
  fieldGroups,
  validationSchema,
  wrapperClass,
}: IStepProps) => {
  const [previewLogo, setPreviewLogo] = useState("");

  if (!fieldGroups?.length) return null;

  const [firstGroup, ...restGroups] = fieldGroups;
  const firstFields = firstGroup.fields.slice(0, 2);
  const otherFields = firstGroup.fields.slice(2);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setPreviewLogo(reader.result as string);
    reader.readAsDataURL(file);
  };
  return (
    <div className={wrapperClass}>
      {firstFields.map((field) =>
        field.name === "logo" ? (
          <React.Fragment key={field.name}>
            <Label id="logo" className="max-w-fit">
              <Avatar className="size-[100px] cursor-pointer">
                <AvatarImage src={previewLogo} />
                <AvatarFallback className="hover:bg-muted/50 transition-colors">
                  <ImageUp />
                </AvatarFallback>
              </Avatar>
              <input
                type="file"
                className="hidden"
                id="logo"
                accept="image/*"
                onChange={handleFileChange}
              />
            </Label>
            {field.description && (
              <p
                className={cn(
                  "text-xs text-foreground/70 my-3",
                  field.descriptionClass
                )}
              >
                {field.description}
              </p>
            )}
          </React.Fragment>
        ) : (
          field.name === "naturalId" && (
            <div className="col-span-12 mb-4" key={field.name}>
              <div className="flex items-center gap-2">
                <Input
                  type={field.type || "text"}
                  placeholder={field.placeholder}
                  className={cn(
                    "bg-transparent placeholder:text-xs placeholder:text-inherit/90 max-w-1/2 disabled:border-border-disabled",
                    field.className
                  )}
                  autoComplete={field.autoComplete || "off"}
                  autoFocus={field.autoFocus}
                  disabled={field.disabled}
                  id={field.name}
                />
                <span className="bg-secondary h-10 px-6 flex items-center rounded-lg border border-secondary">
                  قريبا
                </span>
              </div>
              {field.description && (
                <p
                  className={cn(
                    "text-xs text-foreground/70",
                    field.descriptionClass
                  )}
                >
                  {field.description}
                </p>
              )}
            </div>
          )
        )
      )}
      {otherFields.length > 0 && (
        <Step
          fieldGroups={[{ ...firstGroup, fields: otherFields }]}
          validationSchema={validationSchema}
        />
      )}

      {restGroups.length > 0 && <Step fieldGroups={restGroups} />}
    </div>
  );
};
