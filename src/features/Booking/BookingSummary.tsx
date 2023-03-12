"use client";
import { useBooking } from "@contexts/booking";
import React from "react";

const BookingSummary: React.FC = () => {
  const { booking } = useBooking();

  return (
    <section className="section-booking ml-16 min-w-[250px]">
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
          {booking?.taskProvider ? (
            <p className="text-sm">
              {booking.taskProvider === null
                ? "EasyService"
                : `${booking.taskProvider.provider.firstname} ${booking.taskProvider.provider.lastname}`}
            </p>
          ) : (
            <p className="text-sm text-gray-500">
              Choisissez votre prestataire
            </p>
          )}
        </>
      )}
    </section>
  );
};

export default BookingSummary;
