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
  Calendar,
  Popover,
  PopoverTrigger,
  Button,
  PopoverContent,
} from "@components";
import { Field } from "formik";
import React from "react";
import { IFieldConfig } from "./types";
import { cn } from "@lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { arSA, enUS } from "date-fns/locale";
import { useLocale } from "next-intl";
interface FieldRendererProps {
  field: IFieldConfig;
  index: number;
  arrayName: string;
}

export function FieldArrayRenderer({
  arrayName,
  field,
  index,
}: FieldRendererProps) {
  const fullName = `${arrayName}.${index}.${field.name}`;

  const locale = useLocale();
  return (
    <Field name={fullName}>
      {({ field: formikField, form }: any) => {
        const value = formikField.value;

        switch (field.type) {
          case "checkbox":
            return (
              <React.Fragment key={fullName}>
                <Checkbox
                  id={fullName}
                  checked={!!value}
                  className={cn("shrink-0", field.className)}
                  onCheckedChange={(checked: boolean) => {
                    form.setFieldValue(fullName, checked);
                    if (field.onChange) {
                      field.onChange({ value: checked, form });
                    }
                  }}
                />
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
              </React.Fragment>
            );

          case "switch":
            return (
              <React.Fragment key={fullName}>
                <Switch
                  id={fullName}
                  checked={!!value}
                  size={field.size}
                  dir={locale === "ar" ? "rtl" : "ltr"}
                  className={cn(field.className)}
                  onCheckedChange={(checked: boolean) => {
                    form.setFieldValue(fullName, checked);
                    if (field.onChange) {
                      field.onChange({ value: checked, form });
                    }
                  }}
                />
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
              </React.Fragment>
            );
          case "radio":
            return (
              <React.Fragment key={fullName}>
                <div className="flex gap-4">
                  {(field.options || []).map((option, index) => (
                    <label
                      key={index}
                      htmlFor={`${fullName}-${option.value}`}
                      className="flex items-center gap-2"
                    >
                      <RadioGroup
                        value={value}
                        onValueChange={(value) => {
                          form.setFieldValue(fullName, value);
                          if (field.onChange) {
                            field.onChange({ value, form });
                          }
                        }}
                      >
                        <RadioGroupItem
                          value={String(option.value)}
                          id={`${fullName}-${option.value}`}
                        />
                      </RadioGroup>
                      {option.label}
                    </label>
                  ))}
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
              </React.Fragment>
            );

          case "select":
            return (
              <React.Fragment key={fullName}>
                <Select
                  dir={locale === "ar" ? "rtl" : "ltr"}
                  value={value}
                  onValueChange={(value) => {
                    form.setFieldValue(fullName, value);
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
                  <p
                    className={cn(
                      "text-xs text-foreground/70",
                      field.descriptionClass
                    )}
                  >
                    {field.description}
                  </p>
                )}
              </React.Fragment>
            );
          case "multi-select":
            return (
              <React.Fragment key={fullName}>
                <MultiSelect
                  {...field}
                  options={field.options || []}
                  selected={formikField.value || []}
                  onChange={(selected: string[]) => {
                    form.setFieldValue(fullName, selected);
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
                          form.setFieldValue(fullName, updated);

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
                  <p
                    className={cn(
                      "text-xs text-foreground/70",
                      field.descriptionClass
                    )}
                  >
                    {field.description}
                  </p>
                )}
              </React.Fragment>
            );
          case "tags-select":
            return (
              <React.Fragment key={fullName}>
                <TagSelect
                  {...field}
                  options={
                    (field.options && field.options.map((o) => o.value)) || []
                  }
                  value={formikField.value || []}
                  onChange={(selected: string[]) => {
                    form.setFieldValue(fullName, selected);
                    if (field.onChange) {
                      field.onChange({ value: selected, form });
                    }
                  }}
                  placeholder={field.placeholder}
                  className={cn(field.className)}
                />
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
              </React.Fragment>
            );

          case "drop-file":
            return (
              <React.Fragment key={fullName}>
                <FileDropZone
                  value={form.values[fullName] || []}
                  multiple={field.multiple}
                  onChange={(files: File[]) => {
                    form.setFieldValue(fullName, files);
                    if (field.onChange) {
                      field.onChange({ value: files, form });
                    }
                  }}
                />
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
              </React.Fragment>
            );
          case "date":
            return (
              <React.Fragment key={fullName}>
                <div className="relative flex gap-2">
                  <Input
                    id={fullName}
                    value={
                      value instanceof Date
                        ? format(value, "MMMM dd, yyyy", {
                            locale: locale === "en" ? enUS : arSA,
                          })
                        : ""
                    }
                    placeholder="June 01, 2025"
                    className="bg-background pr-10"
                    onChange={(e) => {
                      const parsed = new Date(e.target.value);
                      if (!isNaN(parsed.getTime())) {
                        form.setFieldValue(fullName, parsed);
                        if (field.onChange) {
                          field.onChange({ value: parsed, form });
                        }
                      } else {
                        form.setFieldValue(fullName, null);
                      }
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "ArrowDown") {
                        e.preventDefault();
                      }
                    }}
                  />

                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        id={`${fullName}-picker`}
                        variant="ghost"
                        size="icon"
                        className="absolute right-2 top-1/2 h-6 w-6 -translate-y-1/2"
                      >
                        <CalendarIcon className="size-3" />
                        <span className="sr-only">Select date</span>
                      </Button>
                    </PopoverTrigger>

                    <PopoverContent
                      className="w-auto overflow-hidden p-0 border-input shadow-[0px_24px_48px_-12px_#1018282E]"
                      align="end"
                      alignOffset={-8}
                      sideOffset={10}
                    >
                      <Calendar
                        mode="single"
                        dir={locale === "en" ? "ltr" : "rtl"}
                        locale={locale === "en" ? enUS : arSA}
                        formatters={{
                          formatMonthDropdown: (date) =>
                            date.toLocaleString("ar-EG", { month: "long" }),
                        }}
                        selected={value instanceof Date ? value : undefined}
                        captionLayout="dropdown"
                        onSelect={(date) => {
                          if (!date) return;
                          form.setFieldValue(fullName, date);
                          if (field.onChange) {
                            field.onChange({ value: date, form });
                          }
                        }}
                      />
                    </PopoverContent>
                  </Popover>
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
              </React.Fragment>
            );
          case "textarea":
            return (
              <React.Fragment key={fullName}>
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
                    form.setFieldValue(fullName, event.target.value);

                    if (field.onChange) {
                      field.onChange({
                        value: event.target.value,
                        form,
                      });
                    }
                  }}
                  onBlur={(event) => {
                    form.setFieldTouched(fullName, event.target.value);

                    if (field.onBlur) {
                      field.onBlur({
                        value: event.target.value,
                        form,
                      });
                    }
                  }}
                  rows={field.rows || 5}
                  id={fullName}
                />
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
              </React.Fragment>
            );

          default:
            return (
              <React.Fragment key={fullName}>
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
                    form.setFieldValue(fullName, event.target.value);

                    if (field.onChange) {
                      field.onChange({
                        value: event.target.value,
                        form,
                      });
                    }
                  }}
                  onBlur={(event) => {
                    form.setFieldTouched(fullName, event.target.value);

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
                  id={fullName}
                />
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
              </React.Fragment>
            );
        }
      }}
    </Field>
  );
}
