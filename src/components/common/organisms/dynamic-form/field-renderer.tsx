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
}

export function FieldRenderer({ field }: FieldRendererProps) {
  const locale = useLocale();
  return (
    <Field name={field.name}>
      {({ field: formikField, form }: any) => {
        const value = formikField.value;

        switch (field.type) {
          case "checkbox":
            return (
              <React.Fragment key={field.name}>
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
              <React.Fragment key={field.name}>
                <Switch
                  id={field.name}
                  checked={!!value}
                  size={field.size}
                  dir={locale === "ar" ? "rtl" : "ltr"}
                  className={cn(field.className)}
                  onCheckedChange={(checked: boolean) => {
                    form.setFieldValue(field.name, checked);
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
              <React.Fragment key={field.name}>
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
              <React.Fragment key={field.name}>
                <Select
                  dir={locale === "ar" ? "rtl" : "ltr"}
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
              <React.Fragment key={field.name}>
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
              <React.Fragment key={field.name}>
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
              <React.Fragment key={field.name}>
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
              <React.Fragment key={field.name}>
                <div className="relative flex gap-2">
                  <Input
                    id={field.name}
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
                        form.setFieldValue(field.name, parsed);
                        if (field.onChange) {
                          field.onChange({ value: parsed, form });
                        }
                      } else {
                        form.setFieldValue(field.name, null);
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
                        id={`${field.name}-picker`}
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
                          form.setFieldValue(field.name, date);
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
              <React.Fragment key={field.name}>
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
                  rows={field.rows || 5}
                  id={field.name}
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
              <React.Fragment key={field.name}>
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
