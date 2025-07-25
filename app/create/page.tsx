"use client";
import React, { useState } from "react";
import LogoTitle from "./_components/LogoTitle";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import LogoDesc from "./_components/LogoDesc";
import LogoColorPallete from "./_components/LogoColorPallete";
import LogoDesigns from "./_components/LogoDesigns";
import LogoIdea from "./_components/LogoIdea";
import PricingModel from "./_components/PricingModel";

function CreateLogo() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<any>();
  const onHandleInputChange = (field: any, value: any) => {
    setFormData((prev: any) => ({
      ...prev,
      [field]: value,
    }));
    console.log(formData)
  };
  return (
    <div className="mt-28 p-10 border rounded-xl 2xl:mx-72">
      {step == 1 ? (
        <LogoTitle
          onHandleInputChange={(v: any) => onHandleInputChange("title", v)}
          formData={formData}
        />
      ) : step == 2 ? (
        <LogoDesc onHandleInputChange={(v: any) => onHandleInputChange("desc", v)} formData={formData} />
      ) : step == 3 ? (
        <LogoColorPallete onHandleInputChange={(v: any) => onHandleInputChange("pallete", v)} formData={formData}/>
      ) : step == 4 ? (
        <LogoDesigns onHandleInputChange={(v: any) => onHandleInputChange("design", v)} formData={formData}/>
      ) : step == 5 ? (
        <LogoIdea formData={formData} onHandleInputChange={(v: any) => onHandleInputChange("idea", v)} />
      ) : step == 6 ? (
        <PricingModel formData={formData} onHandleInputChange={(v: any) => onHandleInputChange("pricing", v)} />
      ):null}
      <div className="flex items-center justify-between mt-10">
        {step != 1 && (
          <Button
            variant="outline"
            className="hover:cursor-pointer"
            onClick={() => setStep(step - 1)}
          >
            <ArrowLeft /> Previous
          </Button>
        )}
        <Button
          className="hover:cursor-pointer"
          onClick={() => setStep(step + 1)}
        >
          <ArrowRight /> Continue
        </Button>
      </div>
    </div>
  );
}

export default CreateLogo;
