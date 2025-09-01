"use client";
import React, { useState } from "react";
import { companyStepperConfig } from "./companyStepperConfig";
import { StepperForm } from "src/components/common/organisms/stepper-form";
import { Button } from "@components";
import { CirclePlus } from "lucide-react";

export const LicenseForm = () => {
  const [toggle, setToggle] = useState(false);

  const toggleForm = () => {
    setToggle(!toggle);
  };
  return toggle ? (
    <StepperForm
      steps={companyStepperConfig}
      onSubmit={(values) => console.log(values)}
      toggleForm={toggleForm}
    />
  ) : (
    <div className="flex items-center justify-center flex-col h-screen gap-4">
      <h1 className="font-bold">الرخص والأنشطة الخاصة بالمنشأة</h1>
      <p className="font-light">
        في هذه الصفحة، يمكنك إضافة وتعديل وإدارة جميع الرخص والأنشطة الاقتصادية
        الخاصة بمنشأتك لضمان التوافق مع المتطلبات.
      </p>
      <Button type="button" onClick={toggleForm}>
        إضافة رخصة جديدة <CirclePlus size={16} />
      </Button>
    </div>
  );
};
