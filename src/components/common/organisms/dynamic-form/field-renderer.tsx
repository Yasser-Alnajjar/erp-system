"use client";

import {
  Input,
  Switch,
  Checkbox,
  RadioGroup,
  RadioGroupItem,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Textarea,
  FileDropZone,
  MultiSelect,
  TagSelect,
} from "@components";
import { Field } from "formik";
import React from "react";
import { IFieldConfig } from "./types";
import { cn } from "@lib/utils";

interface FieldRendererProps {
  field: IFieldConfig;
}

export function FieldRenderer({ field }: FieldRendererProps) {
  return (
    <Field name={field.name}>
      {({ field: formikField, form }: any) => {
        const value = formikField.value;

        switch (field.type) {
          case "checkbox":
            return (
              <>
                <Checkbox
                  id={field.name}
                  checked={!!value}
                  className={cn("shrink-0", field.className)}
                  onCheckedChange={(checked: boolean) => {
                    form.setFieldValue(field.name, checked);
                    if (field.onChange) {
                      field.onChange({ value: checked, form });
                    }
                  }}
                />
                {field.description && (
                  <p className={cn("text-xs", field.descriptionClass)}>
                    {field.description}
                  </p>
                )}
              </>
            );

          case "switch":
            return (
              <>
                <Switch
                  id={field.name}
                  checked={!!value}
                  size={field.size}
                  className={cn(field.className)}
                  onCheckedChange={(checked: boolean) => {
                    form.setFieldValue(field.name, checked);
                    if (field.onChange) {
                      field.onChange({ value: checked, form });
                    }
                  }}
                />
                {field.description && (
                  <p className={cn("text-xs", field.descriptionClass)}>
                    {field.description}
                  </p>
                )}
              </>
            );
          case "radio":
            return (
              <>
                <div className="flex gap-4">
                  {(field.options || []).map((option, index) => (
                    <label
                      key={index}
                      htmlFor={`${field.name}-${option.value}`}
                      className="flex items-center gap-2"
                    >
                      <RadioGroup
                        value={value}
                        onValueChange={(value) => {
                          form.setFieldValue(field.name, value);
                          if (field.onChange) {
                            field.onChange({ value, form });
                          }
                        }}
                      >
                        <RadioGroupItem
                          value={String(option.value)}
                          id={`${field.name}-${option.value}`}
                        />
                      </RadioGroup>
                      {option.label}
                    </label>
                  ))}
                </div>
                {field.description && (
                  <p className={cn("text-xs", field.descriptionClass)}>
                    {field.description}
                  </p>
                )}
              </>
            );

          case "select":
            return (
              <>
                <Select
                  value={value}
                  onValueChange={(value) => {
                    form.setFieldValue(field.name, value);
                    if (field.onChange) {
                      field.onChange({ value, form });
                    }
                  }}
                  {...field}
                >
                  <SelectTrigger
                    className={cn("bg-transparent", field.className)}
                  >
                    <SelectValue
                      placeholder={field.placeholder || "Select..."}
                    />
                  </SelectTrigger>
                  <SelectContent position={field?.position}>
                    {(field.options || []).map((option, index) => (
                      <SelectItem key={index} value={String(option.value)}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {field.description && (
                  <p className={cn("text-xs", field.descriptionClass)}>
                    {field.description}
                  </p>
                )}
              </>
            );
          case "multi-select":
            return (
              <>
                <MultiSelect
                  {...field}
                  options={field.options || []}
                  selected={formikField.value || []}
                  onChange={(selected: string[]) => {
                    form.setFieldValue(field.name, selected);
                    if (field.onChange) {
                      field.onChange({ value: selected, form });
                    }
                  }}
                  onCreateOption={
                    field.creatable
                      ? (inputValue: string) => {
                          const updated = [
                            ...(formikField.value || []),
                            inputValue,
                          ];
                          form.setFieldValue(field.name, updated);

                          if (
                            field.options &&
                            !field.options.find((o) => o.value === inputValue)
                          ) {
                            field.options.push({
                              value: inputValue,
                              label: inputValue,
                            });
                          }

                          if (field.onChange) {
                            field.onChange({ value: updated, form });
                          }
                        }
                      : undefined
                  }
                  placeholder={field.placeholder}
                  creatable={field.creatable}
                  className={cn(field.className)}
                />
                {field.description && (
                  <p className={cn("text-xs", field.descriptionClass)}>
                    {field.description}
                  </p>
                )}
              </>
            );
          case "tags-select":
            return (
              <>
                <TagSelect
                  {...field}
                  options={
                    (field.options && field.options.map((o) => o.value)) || []
                  }
                  value={formikField.value || []}
                  onChange={(selected: string[]) => {
                    form.setFieldValue(field.name, selected);
                    if (field.onChange) {
                      field.onChange({ value: selected, form });
                    }
                  }}
                  placeholder={field.placeholder}
                  className={cn(field.className)}
                />
                {field.description && (
                  <p className={cn("text-xs", field.descriptionClass)}>
                    {field.description}
                  </p>
                )}
              </>
            );

          case "drop-file":
            return (
              <>
                <FileDropZone
                  value={form.values[field.name] || []}
                  multiple={field.multiple}
                  onChange={(files: File[]) => {
                    form.setFieldValue(field.name, files);
                    if (field.onChange) {
                      field.onChange({ value: files, form });
                    }
                  }}
                />
                {field.description && (
                  <p className={cn("text-xs", field.descriptionClass)}>
                    {field.description}
                  </p>
                )}
              </>
            );
          case "textarea":
            return (
              <>
                <Textarea
                  placeholder={field.placeholder}
                  className={cn(
                    "bg-transparent placeholder:text-xs placeholder:text-inherit/90",
                    field.className
                  )}
                  autoComplete={field.autoComplete || "off"}
                  autoFocus={field.autoFocus}
                  disabled={field.disabled}
                  {...formikField}
                  value={value}
                  onChange={(event) => {
                    form.setFieldValue(field.name, event.target.value);

                    if (field.onChange) {
                      field.onChange({
                        value: event.target.value,
                        form,
                      });
                    }
                  }}
                  onBlur={(event) => {
                    form.setFieldTouched(field.name, event.target.value);

                    if (field.onBlur) {
                      field.onBlur({
                        value: event.target.value,
                        form,
                      });
                    }
                  }}
                  id={field.name}
                />
                {field.description && (
                  <p className={cn("text-xs", field.descriptionClass)}>
                    {field.description}
                  </p>
                )}
              </>
            );

          default:
            return (
              <>
                <Input
                  type={field.type || "text"}
                  placeholder={field.placeholder}
                  className={cn(
                    "bg-transparent placeholder:text-xs placeholder:text-inherit/90",
                    field.className
                  )}
                  {...formikField}
                  value={value}
                  onChange={(event) => {
                    form.setFieldValue(field.name, event.target.value);

                    if (field.onChange) {
                      field.onChange({
                        value: event.target.value,
                        form,
                      });
                    }
                  }}
                  onBlur={(event) => {
                    form.setFieldTouched(field.name, event.target.value);

                    if (field.onBlur) {
                      field.onBlur({
                        value: event.target.value,
                        form,
                      });
                    }
                  }}
                  autoComplete={field.autoComplete || "off"}
                  autoFocus={field.autoFocus}
                  disabled={field.disabled}
                  id={field.name}
                />
                {field.description && (
                  <p className={cn("text-xs", field.descriptionClass)}>
                    {field.description}
                  </p>
                )}
              </>
            );
        }
      }}
    </Field>
  );
}
