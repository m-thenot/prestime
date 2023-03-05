"use client";
import Button from "@components/Button";
import React from "react";
import Progress from "./Progress";

interface IStepContentProps {
  title: string;
  children: React.ReactNode;
  onSubmit: () => void;
  percentProgress: number;
}

const StepContent: React.FC<IStepContentProps> = ({
  title,
  children,
  onSubmit,
  percentProgress,
}) => {
  return (
    <section className="section-booking w-full">
      <Progress percent={percentProgress} />
      <h2 className="text-center mb-8 mt-6">{title}</h2>
      {children}
      <div className="flex justify-end mt-8">
        <Button hasMinWidth onClick={onSubmit}>
          Continuer
        </Button>
      </div>
    </section>
  );
};

export default StepContent;
