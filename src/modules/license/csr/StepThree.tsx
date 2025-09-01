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

          <Table>
            <TableHeader>
              <TableRow>
                {fieldGroups[0].fields.map((field) => (
                  <TableHead key={field.name}>{field.label}</TableHead>
                ))}
                <TableHead>إجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {values.licenses?.map((_: any, tableIndex: number) => (
                <TableRow key={tableIndex}>
                  {fieldGroups[0].fields.map((field) => (
                    <TableCell key={field.name}>
                      <FieldArrayRenderer
                        arrayName="licenses"
                        index={tableIndex}
                        field={field}
                      />
                    </TableCell>
                  ))}
                  <TableCell>
                    <Button
                      type="button"
                      variant="error"
                      onClick={() => remove(tableIndex)}
                    >
                      حذف
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </FieldArray>
  );
}
