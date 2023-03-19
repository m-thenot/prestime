"use client";
import { useBooking } from "@contexts/booking";
import { useRouter } from "next/navigation";
import { sort } from "radash";
import React, { useEffect, useState } from "react";
import { ISchedule, ITimeSlot } from "types/schedule";

import StepContent from "./StepContent";

interface ISelectScheduleProps {
  schedules: ISchedule[];
}

const SelectSchedule: React.FC<ISelectScheduleProps> = ({ schedules }) => {
  const { booking, setBooking } = useBooking();
  const [isDateView, setIsDateView] = useState(true);
  const [currentSelection, setCurrentSelection] = useState<ISchedule | null>(
    null
  );
  const router = useRouter();

  const onDateSelect = (schedule: ISchedule) => {
    setIsDateView(false);
    setCurrentSelection(schedule);
  };

  const onTimeSlotSelect = (
    timeSlot: ITimeSlot,
    currentSelection: ISchedule
  ) => {
    let newSchedules: ISchedule[];
    const prevSchedules = booking?.schedules || [];

    if (prevSchedules.some((s) => s.display === currentSelection.display)) {
      newSchedules = prevSchedules.map((s) => {
        if (s.display === currentSelection.display) {
          if (s.timeSlots.some((t) => t.display === timeSlot.display)) {
            return {
              ...s,
              timeSlots: s.timeSlots.filter(
                (t) => t.display !== timeSlot.display
              ),
            };
          } else {
            const timeSlots = [...s.timeSlots];
            timeSlots.push(timeSlot);
            return {
              ...s,
              timeSlots,
            };
          }
        } else {
          return s;
        }
      });
    } else {
      newSchedules = [
        ...prevSchedules,
        {
          ...currentSelection,
          timeSlots: [timeSlot],
        },
      ];
    }

    setBooking({
      ...booking,
      schedules: newSchedules,
    });
  };

  useEffect(() => {
    if (booking?.schedules && isDateView) {
      setIsDateView(false);
    }
  }, [booking]);

  const schedulesSelected = currentSelection
    ? (booking?.schedules || [])
        .filter((s) => s.display !== currentSelection?.display)
        .concat(currentSelection)
    : booking?.schedules;

  return (
    <StepContent
      percentProgress={60}
      onSubmit={() =>
        booking?.schedules &&
        router.push(`/booking/${booking!.service!.slug}/address`)
      }
      title="Quelles sont vos disponibilités ?"
    >
      {isDateView ? (
        <div className="flex flex-wrap">
          {schedules.map((schedule) => (
            <button
              type="button"
              className="border rounded-md border-gray-300 hover:border-primary-100 p-4 mr-4 mb-4 transition"
              key={schedule.value}
              onClick={() => onDateSelect(schedule)}
            >
              <p className="font-semibold	capitalize">{schedule.name}</p>
              <p>{schedule.display}</p>
            </button>
          ))}
        </div>
      ) : (
        <>
          <div className="flex overflow-x">
            {sort(schedulesSelected || [], (o) => o.value)?.map((s) => {
              const isSelected = s.value === currentSelection?.value;

              return (
                <div
                  key={s.value}
                  className="flex flex-col mb-4 w-fit items-center mr-4"
                >
                  <button
                    type="button"
                    className={`border rounded-md ${
                      isSelected ? "border-primary-100" : "border-gray-300"
                    }  p-4 transition relative`}
                    onClick={() => {
                      setCurrentSelection(
                        schedules.find((sc) => sc.display === s.display)!
                      );
                    }}
                  >
                    <p className="font-semibold	capitalize">{s?.name}</p>
                    <p>{s?.display}</p>
                    {!isSelected && (
                      <p className="absolute top-1 right-1 text-xs w-4 h-4 bg-primary-100 text-white rounded-full">
                        {s.timeSlots.length}
                      </p>
                    )}
                  </button>
                  {isSelected && (
                    <div className="w-6 overflow-hidden inline-block">
                      <div className=" h-4 w-4 bg-primary-100 -rotate-45 transform origin-top-left" />
                    </div>
                  )}
                </div>
              );
            })}

            <button
              type="button"
              onClick={() => setIsDateView(true)}
              className="bg-primary-100 hover:bg-primary-200 rounded-full w-8 h-8 text-2xl text-white mt-5 transition duration-200"
            >
              +
            </button>
          </div>

          <div className="flex flex-wrap">
            {currentSelection?.timeSlots.map((timeSlot) => {
              const isSelected = booking?.schedules
                ?.find((s) => s.display === currentSelection.display)
                ?.timeSlots.some((t) => t.display === timeSlot.display);

              return (
                <button
                  type="button"
                  className={`border rounded-md border-gray-300 hover:border-primary-100 p-4 mr-4 mb-4 transition ${
                    isSelected ? "bg-primary-100" : "bg-transparent"
                  }`}
                  key={timeSlot.value}
                  onClick={() => onTimeSlotSelect(timeSlot, currentSelection)}
                >
                  {timeSlot.display}h
                </button>
              );
            })}
          </div>
        </>
      )}
    </StepContent>
  );
};

export default SelectSchedule;
