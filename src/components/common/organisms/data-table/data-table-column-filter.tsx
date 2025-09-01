"use client";

import { useEffect, useState } from "react";
import type { Column } from "@tanstack/react-table";
import { AlignJustify, X } from "lucide-react";
import { Utils } from "@lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  RadioGroup,
  RadioGroupItem,
  Label,
  Input,
  Button,
} from "@components";
import { FilterCondition, LogicOperator } from "./complexFilter";

interface DataTableColumnFilterProps<TData, TValue> {
  column: Column<TData, TValue>;
  title: string;
}

export function DataTableColumnFilter<TData, TValue>({
  column,
  title,
}: DataTableColumnFilterProps<TData, TValue>) {
  const [isOpen, setIsOpen] = useState(false);
  const [conditions, setConditions] = useState<FilterCondition[]>([
    { id: "", operator: "contains", value: "" },
  ]);
  const [logicOperator, setLogicOperator] = useState<LogicOperator>("AND");

  const filterOperators = [
    { value: "contains", label: "Contains" },
    { value: "notContains", label: "Does not contain" },
    { value: "equals", label: "Equals" },
    { value: "notEquals", label: "Does not equal" },
    { value: "startsWith", label: "Begins with" },
    { value: "endsWith", label: "Ends with" },
    { value: "isBlank", label: "Blank" },
    { value: "isNotBlank", label: "Not blank" },
  ];

  const applyFilterDebounced = Utils.debounce((conds: FilterCondition[]) => {
    const isEmpty = conds.every((c) => c.value.trim() === "");
    column.setFilterValue(
      isEmpty ? undefined : { conditions: conds, logicOperator }
    );
  }, 500);

  const updateCondition = (
    index: number,
    field: keyof FilterCondition,
    value: string
  ) => {
    const updated = [...conditions];
    updated[index] = { ...updated[index], [field]: value };
    setConditions(updated);
  };

  useEffect(() => {
    applyFilterDebounced(conditions);

    const last = conditions[conditions.length - 1];
    const isLastFilled = last && last.value.trim() !== "";

    if (isLastFilled && conditions.length < 2) {
      setConditions((prev) => [
        ...prev,
        { id: "", operator: "contains", value: "", logicOperator: "AND" },
      ]);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conditions]);

  const removeCondition = (index: number) => {
    if (conditions.length > 1) {
      const newConditions = conditions.filter((_, i) => i !== index);
      setConditions(newConditions);
      applyFilterDebounced(newConditions);
    }
  };

  const clearFilter = () => {
    setConditions([{ id: "", operator: "contains", value: "" }]);
    column.setFilterValue(undefined);
    setIsOpen(false);
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger className="text-foreground/60 cursor-pointer">
        <AlignJustify size={16} />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80 p-4" align="start">
        <div className="space-y-4">
          <div className="font-medium text-sm">{title} Filters</div>

          {conditions.map((condition, index) => (
            <div key={index} className="space-y-2">
              {index > 0 && (
                <div className="flex items-center justify-between">
                  <RadioGroup
                    value={logicOperator}
                    onValueChange={(value) =>
                      setLogicOperator(value as LogicOperator)
                    }
                    className="flex space-x-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="AND" id={`and-${index}`} />
                      <Label htmlFor={`and-${index}`} className="text-sm">
                        AND
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="OR" id={`or-${index}`} />
                      <Label htmlFor={`or-${index}`} className="text-sm">
                        OR
                      </Label>
                    </div>
                  </RadioGroup>
                  {conditions.length > 1 && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeCondition(index)}
                      className="size-6"
                    >
                      <X className="size-3" />
                    </Button>
                  )}
                </div>
              )}
              <div className="flex space-x-2">
                <Select
                  value={condition.operator}
                  onValueChange={(value) =>
                    updateCondition(index, "operator", value)
                  }
                >
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {filterOperators.map((op) => (
                      <SelectItem key={op.value} value={op.value}>
                        {op.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Input
                  placeholder="Filter value..."
                  value={condition.value}
                  onChange={(e) =>
                    updateCondition(index, "value", e.target.value)
                  }
                  className="flex-1"
                  disabled={["isBlank", "isNotBlank"].includes(
                    condition.operator
                  )}
                />
              </div>
            </div>
          ))}

          {conditions.some((c) => c.value.trim() !== "") && (
            <div className="flex justify-end pt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={clearFilter}
                className="text-sm"
              >
                Clear
              </Button>
            </div>
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
