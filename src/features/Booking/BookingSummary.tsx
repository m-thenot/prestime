"use client";
import { useBooking } from "@contexts/booking";
import { usePathname } from "next/navigation";
import React, { Fragment } from "react";
import { BOOKING_STEPS } from "types/booking";

const BookingSummary: React.FC = () => {
  const { booking } = useBooking();
  const pathname = usePathname();
  const step = pathname.split("/").pop() as BOOKING_STEPS;

  if (step === BOOKING_STEPS.CONFIRMATION) {
    return null;
  }

  return (
    <section className="section-booking ml-16 min-w-[250px] hidden sm:block">
      <h2 className="text-lg text-center mb-4">Mon panier</h2>

      <h3 className="font-semibold">Services</h3>
      {booking?.task ? (
        <p className="text-sm">
          {booking.service?.title} - {booking.task.name}
        </p>
      ) : (
        <p className="text-sm text-gray-500">Quel est votre besoin ?</p>
      )}

      {booking?.task && booking.comment !== undefined && (
        <>
          <h3 className="font-semibold mt-2">Prestataire</h3>
          {booking?.taskProvider !== undefined ? (
            <p className="text-sm">
              {booking.taskProvider === null
                ? "Deg Deg"
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
    </section>
  );
};

export default BookingSummary;
