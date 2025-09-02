"use client";

import { FieldArray, useFormikContext } from "formik";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Button,
  IFieldConfig,
  FieldArrayRenderer,
} from "@components";
import { Trash2 } from "lucide-react";

interface IFieldGroup {
  title: string;
  fields: IFieldConfig[];
}

interface IStepProps {
  fieldGroups: IFieldGroup[];
  warperClass?: string;
}

export default function StepThree({ fieldGroups }: IStepProps) {
  const { values } = useFormikContext<any>();

  return (
    <FieldArray name="licenses">
      {({ push, remove }) => (
        <div className="space-y-4">
          <Button
            type="button"
            className="ms-auto"
            onClick={() =>
              push({
                ministry: "",
                address: "",
                activity: "",
                licenseType: "",
                licenseNumber: "",
                licenseIssueDate: "",
                licenseExpiryDate: "",
                status: "",
              })
            }
          >
            إضافة ترخيص
          </Button>

          <div className="overflow-x-auto border p-1 rounded-lg shadow-[0px_12px_16px_-4px_#10182814]">
            <Table className="text-center">
              <TableHeader>
                <TableRow className="border-secondary">
                  {fieldGroups[0].fields.map((field) => (
                    <TableHead
                      key={field.name}
                      className="border-secondary first:border-0 last:border-0 border-x text-center"
                    >
                      {field.label}
                    </TableHead>
                  ))}
                  <TableHead>إجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {values.licenses?.map((_: any, tableIndex: number) => (
                  <TableRow
                    key={tableIndex}
                    className="border-b border-secondary"
                  >
                    {fieldGroups[0].fields.map((field) => (
                      <TableCell
                        key={field.name}
                        className="border-secondary first:border-0 last:border-0 border-x text-center"
                      >
                        <FieldArrayRenderer
                          arrayName="licenses"
                          index={tableIndex}
                          field={field}
                        />
                      </TableCell>
                    ))}
                    <TableCell className="flex items-center justify-center">
                      <button
                        type="button"
                        className="text-error cursor-pointer "
                        onClick={() => remove(tableIndex)}
                      >
                        <Trash2 />
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      )}
    </FieldArray>
  );
}
