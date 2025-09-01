import React from "react";

export interface IFieldOption {
  label: string;
  value: string | any;
}

export interface IFieldConfig {
  name: string;
  label?: string | React.ReactNode;
  placeholder?: string;
  description?: string;
  col?: string;
  options?: Array<IFieldOption>;
  order?: number;
  type?: string;
  [key: string]: any;
}
