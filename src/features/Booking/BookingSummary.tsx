"use client";
import { useBooking } from "@contexts/booking";
import { Chevron } from "@icons";
import { usePathname } from "next/navigation";
import React, { Fragment, useState } from "react";
import { BOOKING_STEPS } from "types/booking";

const BookingSummary: React.FC = () => {
  const { booking, skipProviderSelection, isLoading } = useBooking();
  const pathname = usePathname();
  const step = pathname.split("/").pop() as BOOKING_STEPS;
  const [isSummaryOpen, setIsSummaryOpen] = useState(false);
  const price =
    booking?.task?.recommended_price || booking?.taskProvider?.price;

  if (step === BOOKING_STEPS.CONFIRMATION || isLoading) {
    return null;
  }

  return (
    <>
      <section
        className={`section-booking sm:ml-16 sm:min-w-[250px] sm:-z-10 transition-transform duration-300	fixed sm:static bottom-[65px] ${
          isSummaryOpen ? "translate-y-0" : "translate-y-full"
        } sm:translate-y-0 left-0 w-full sm:w-auto px-5 pb-5 bg-white sm:block`}
      >
        <button
          type="button"
          onClick={() => setIsSummaryOpen((prev) => !prev)}
          className={`sm:hidden fixed w-full h-10 shadow-[0px_-6px_10px_rgba(0,0,0,0.1)] z-20 bg-white left-0 top-[-40px] py-2 flex justify-center ${
            isSummaryOpen ? "rounded-t-full" : "rounded-none"
          }`}
        >
          <Chevron
            width={30}
            height={30}
            headDirection={isSummaryOpen ? "bottom" : "top"}
          />
        </button>
        <h2 className="text-lg text-center mb-4">Mon panier</h2>

        <h3 className="font-semibold">Services</h3>
        {booking?.task ? (
          <p className="text-sm">
            {booking.service?.title} - {booking.task.name}
          </p>
        ) : (
          <p className="text-sm text-gray-500">Quel est votre besoin ?</p>
        )}

        {booking?.task &&
          booking.comment !== undefined &&
          !skipProviderSelection && (
            <>
              <h3 className="font-semibold mt-2">Prestataire</h3>
              {booking?.taskProvider !== undefined ? (
                <p className="text-sm">
                  {booking.taskProvider === null
                    ? "Prestime"
                    : `${booking.taskProvider.provider.firstname} ${booking.taskProvider.provider.lastname}`}
                </p>
              ) : (
                <p className="text-sm text-gray-500">
                  Choisissez votre prestataire
                </p>
              )}
            </>
          )}

        {booking?.taskProvider !== undefined && (
          <>
            <h3 className="font-semibold mt-2">Disponibilités</h3>
            {booking?.schedules ? (
              booking.schedules.map((schedule) => (
                <Fragment key={schedule.value}>
                  <p className="capitalize text-sm mt-2 mb-1">
                    {schedule.display}
                  </p>
                  <div className="flex items-center flex-wrap">
                    {schedule.timeSlots.map((t) => (
                      <p key={t.value} className="text-sm mr-2 p-1 bg-gray-100">
                        {t.display}h
                      </p>
                    ))}
                  </div>
                </Fragment>
              ))
            ) : (
              <p className="text-sm text-gray-500">
                Choisissez vos disponibilités
              </p>
            )}
          </>
        )}

        {booking?.schedules !== undefined && (
          <>
            <h3 className="font-semibold mt-2">Adresse</h3>
            {booking?.address ? (
              <p className="text-sm">{booking.address.formattedAddress}</p>
            ) : (
              <p className="text-sm text-gray-500">Indiquer votre adresse</p>
            )}
          </>
        )}

        {booking?.taskProvider !== undefined && (
          <h3 className="font-semibold mt-4">
            Total:{" "}
            {price
              ? `${price} DJF ${booking.task?.is_hourly_price ? "/ heure" : ""}`
              : "Sur devis"}
          </h3>
        )}
      </section>
    </>
  );
};

export default BookingSummary;
