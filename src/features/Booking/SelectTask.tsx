"use client";
import RadioGroup from "@components/RadioGroup";
import { useBooking } from "@contexts/booking";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { IService } from "types/service";
import { ITask } from "types/task";
import StepContent from "./StepContent";

interface ISelectTaskProps {
  tasks: ITask[];
  service: IService;
}

const SelectTask: React.FC<ISelectTaskProps> = ({ tasks, service }) => {
  const [taskSelected, setTaskSelected] = useState(tasks[0]?.id);
  const { booking, setBooking, skipProviderSelection } = useBooking();
  const router = useRouter();

  useEffect(() => {
    // Reset booking if it is not the same service
    if (booking && booking?.service?.slug !== service.slug) {
      setBooking(null);
    }
  }, [booking]);

  useEffect(() => {
    router.prefetch(`/booking/${service.slug}/description`);
  }, []);

  const onSelect = () => {
    setBooking({
      ...booking,
      service: service,
      task: tasks.find((task) => task.id === taskSelected),
      ...(skipProviderSelection ? { taskProvider: null } : {}),
    });
    router.push(`/booking/${service.slug}/description`);
  };

  return (
    <StepContent
      percentProgress={15}
      onSubmit={onSelect}
      title={`${service.title} - Quel est votre besoin ?`}
    >
      <RadioGroup
        options={tasks.map((task) => {
          return {
            value: task.id,
            node: skipProviderSelection ? (
              <div className="ml-3">
                {task.name}
                {task.recommended_price && (
                  <>
                    -{" "}
                    <span className="font-semibold">
                      {task.recommended_price} DJF{" "}
                      {task.is_hourly_price ? "/ heure" : ""}
                    </span>
                  </>
                )}
              </div>
            ) : (
              <span className="ml-3">{task.name}</span>
            ),
          };
        })}
        onChange={(value) => setTaskSelected(value as number)}
        defaultValue={booking?.task?.id || tasks[0]?.id}
      />
    </StepContent>
  );
};

export default SelectTask;
