"use client";
import Button from "@components/Button";
import RadioGroup from "@components/RadioGroup";
import { useBooking } from "@contexts/booking";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { IService } from "types/service";
import { ITask } from "types/task";
import Progress from "./Progress";

interface ISelectTaskProps {
  tasks: ITask[];
  service: IService;
}

const SelectTask: React.FC<ISelectTaskProps> = ({ tasks, service }) => {
  const [taskSelected, setTaskSelected] = useState(tasks[0]?.id);
  const { booking, setBooking } = useBooking();
  const router = useRouter();

  const onSelect = () => {
    setBooking({
      ...booking,
      service: service,
      cartContent: tasks.find((task) => task.id === taskSelected),
    });
    router.push(`/booking/${service.slug}/description`);
  };

  return (
    <section className="section-booking w-full">
      <Progress percent={15} />
      <h2 className="text-center mb-8 mt-6">
        {service.title} - Quel est votre besoin ?
      </h2>
      <RadioGroup
        options={tasks.map((task) => {
          return { value: task.id, label: task.name };
        })}
        onChange={(value) => setTaskSelected(value)}
      />
      <div className="flex justify-end mt-8">
        <Button hasMinWidth onClick={onSelect}>
          Continuer
        </Button>
      </div>
    </section>
  );
};

export default SelectTask;
