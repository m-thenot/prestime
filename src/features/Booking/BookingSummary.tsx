"use client";
import { useBooking } from "@contexts/booking";
import React from "react";

const BookingSummary: React.FC = () => {
  const { booking } = useBooking();

  return (
    <section className="section-booking ml-16 min-w-[250px]">
      <h2 className="text-lg text-center mb-4">Mon panier</h2>

      <h3 className="font-semibold">Services</h3>
      {booking?.cartContent ? (
        <p className="text-sm">
          {booking.service?.title} - {booking.cartContent.name}
        </p>
      ) : (
        <p className="text-sm text-gray-500">Quel est votre besoin ?</p>
      )}
    </section>
  );
};

export default BookingSummary;
