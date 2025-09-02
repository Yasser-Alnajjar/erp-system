"use client";
import React from "react";
import { cn } from "@lib/utils";
import { useLocale } from "next-intl";
import { IStep } from "./FormSteeperTypes";

interface VerticalStepperProps {
  steps: IStep[];
  stepIndex: number;
  setStepIndex: (index: number) => void;
}

export const VerticalStepper = ({
  steps,
  stepIndex,
  setStepIndex,
}: VerticalStepperProps) => {
  const locale = useLocale();

  return (
    <div
      className={cn(
        "flex flex-col relative ",
        locale === "rtl" ? "items-end" : "items-start"
      )}
    >
      {steps.map((step, index) => {
        const isActive = stepIndex === index;
        const isCompleted = stepIndex > index;

        return (
          <div
            key={index}
            className={cn(
              "flex items-start relative cursor-pointer min-h-[100px] gap-3",
              locale === "rtl" ? "flex-row-reverse" : "flex-row"
            )}
            onClick={() => setStepIndex(index)}
          >
            {/* Circle */}
            <div
              className={cn(
                "w-7 h-7 shrink-0 flex items-center justify-center rounded-full border-2 transition-colors z-10",
                isActive
                  ? "border-primary bg-primary text-white"
                  : isCompleted
                  ? "border-primary text-primary"
                  : "border-muted-foreground text-muted-foreground opacity-50"
              )}
            >
              {index + 1}
            </div>

            {/* Connector line */}
            {index < steps.length - 1 && (
              <div
                className={cn(
                  "absolute w-px top-7 bottom-0 start-3",
                  isCompleted ? "bg-primary" : "bg-muted-foreground opacity-30"
                )}
              />
            )}

            {/* Label */}
            <div
              className={cn(
                "text-sm font-semibold transition-opacity",
                locale === "rtl" ? "mr-3" : "ml-3",
                isActive
                  ? "text-primary"
                  : isCompleted
                  ? "text-foreground"
                  : "opacity-50"
              )}
            >
              {isActive && step.stepTitle}
            </div>
          </div>
        );
      })}
    </div>
  );
};
