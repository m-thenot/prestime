"use client";
import Button from "@components/Button";
import Loader from "@components/Loader";
import { useBooking } from "@contexts/booking";
import { steps } from "constants/booking";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { BOOKING_STEPS } from "types/booking";
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
  const { booking, isLoading } = useBooking();
  const pathname = usePathname();
  const router = useRouter();

  // Redirection to the beginning of the funnel if there is no booking
  useEffect(() => {
    if (!isLoading) {
      const step = pathname.split("/").pop() as BOOKING_STEPS;

      if (!booking && steps.includes(step)) {
        router.push(pathname.split(step)[0]);
      }
    }
  }, [isLoading]);

  return (
    <section className="section-booking w-full">
      {isLoading ? (
        <div className="flex items-center justify-center h-full w-full">
          <Loader color="black" />
        </div>
      ) : (
        <>
          <Progress percent={percentProgress} />
          <h2 className="text-center mb-8 mt-6">{title}</h2>
          {children}
          <div className="flex justify-end mt-8">
            <Button hasMinWidth onClick={onSubmit}>
              Continuer
            </Button>
          </div>
        </>
      )}
    </section>
  );
};

export default StepContent;
