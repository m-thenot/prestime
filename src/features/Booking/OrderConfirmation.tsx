"use client";
import React from "react";
import { Check } from "@icons";
import { LinkButton } from "@components/Button";

const OrderConfirmation: React.FC = () => {
  return (
    <div className="section-booking w-full bg-white">
      <div className="flex flex-col items-center justify-center max-w-md mx-auto min-h-[400px]">
        <div className="p-3 rounded-full border-4 border-green-500 mb-2">
          <Check width={23} height={23} />
        </div>
        <h1 className="my-3 text-center">Merci pour votre réservation !</h1>
        <p className="mt-2 mb-5">
          Votre réservation a bien été enregistrée. Le prestataire vous
          contactera prochainement pour confirmer votre rendez-vous.
        </p>

        <LinkButton href="/">Retour à l&lsquo;accueil</LinkButton>
      </div>
    </div>
  );
};

export default OrderConfirmation;
