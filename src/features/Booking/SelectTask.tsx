"use client";
import Button from "@components/Button";
import RadioGroup from "@components/RadioGroup";
import React from "react";
import { ITask } from "types/task";
import Progress from "./Progress";

interface ISelectTaskProps {
  tasks: ITask[];
}

const SelectTask: React.FC<ISelectTaskProps> = ({ tasks }) => {
  return (
    <section className="section-booking w-full">
      <Progress percent={15} />
      <h2 className="text-center mb-8 mt-6">
        {tasks[0].service.title} - Quel est votre besoin ?
      </h2>
      <RadioGroup
        options={tasks.map((task) => {
          return { value: task.id, label: task.name };
        })}
      />
      <div className="flex justify-end mt-8">
        <Button hasMinWidth>Continuer</Button>
      </div>
    </section>
  );
};

export default SelectTask;
