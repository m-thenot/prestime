"use client";
import React, { useEffect } from "react";
import { Check } from "@icons";
import { LinkButton } from "@components/Button";
import { useBooking } from "@contexts/booking";

const OrderConfirmation: React.FC = () => {
  const { setBooking } = useBooking();

  useEffect(() => {
    setBooking(null);
  }, []);

  return (
    <div className="sm:shadow-md rounded sm:px-8 sm:py-5 w-full bg-white">
      <div className="flex flex-col items-center justify-center max-w-md mx-auto min-h-[400px]">
        <div className="p-3 rounded-full border-4 border-green-500 mb-2">
          <Check width={23} height={23} />
        </div>
        <h1 className="my-3 text-center">Merci pour votre réservation !</h1>
        <p className="mt-2 mb-5">
          Votre réservation a bien été enregistrée. Le prestataire vous
          contactera prochainement pour confirmer votre rendez-vous.
        </p>

        <LinkButton href="/account/bookings">Voir ma réservation</LinkButton>
      </div>
    </div>
  );
};

export default OrderConfirmation;
