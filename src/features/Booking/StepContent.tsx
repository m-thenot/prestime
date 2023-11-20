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
  hasSubmitButton?: boolean;
  submitButtonDisabled?: boolean;
  isButtonLoading?: boolean;
}

const StepContent: React.FC<IStepContentProps> = ({
  title,
  children,
  onSubmit,
  percentProgress,
  hasSubmitButton = true,
  submitButtonDisabled = false,
  isButtonLoading = false,
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
    <section className="section-booking w-full flex flex-col mb-28 sm:mb-0">
      {isLoading ? (
        <div className="flex items-center justify-center h-full w-full">
          <Loader color="black" />
        </div>
      ) : (
        <>
          <div className="hidden sm:block">
            <Progress percent={percentProgress} />
          </div>
          <h2 className="sm:text-center mt-2 mb-6 sm:mb-8 sm:mt-6">{title}</h2>
          {children}

          <div className="flex flex-1" />

          {hasSubmitButton ? (
            <div className="z-10 sm:flex sm:relative sm:justify-end mt-8 fixed bottom-0 py-4 pt-1 sm:pt-4 px-5 bg-white w-screen -translate-x-5 sm:px-0 sm:py-0 sm:w-auto sm:translate-x-0">
              <Button
                hasMinWidth
                onClick={onSubmit}
                className="w-full sm:w-fit"
                disabled={submitButtonDisabled}
                type="submit"
                isLoading={isButtonLoading}
              >
                Continuer
              </Button>
            </div>
          ) : (
            <div className="z-10 fixed bottom-0 bg-white w-screen -translate-x-5 h-[70px] sm:hidden" />
          )}
        </>
      )}
    </section>
  );
};

export default StepContent;
