"use client";
import RadioGroup from "@components/RadioGroup";
import { useBooking } from "@contexts/booking";
import { Amex, Mastercard, Visa } from "@icons";
import React, { useState } from "react";
import StepContent from "./StepContent";

const paymentMethods = [
  {
    value: "credit_card",
    node: (
      <>
        <div className="flex flex-col ml-3">
          <p className="mb-1">Carte bancaire (recommandé)</p>
          <div className="flex items-center icons">
            <Visa />
            <Mastercard />
            <Amex />
          </div>
        </div>
        <style jsx>
          {`
            .icons > :global(svg) {
              margin-right: 8px;
            }
          `}
        </style>
      </>
    ),
  },
  {
    value: "cash",
    label: "Cash",
  },
];

const SelectPayment: React.FC = () => {
  const { booking, setBooking } = useBooking();
  const [paymentMethod, setPaymentMethod] = useState("");

  const onSelect = () => {
    setBooking({
      ...booking,
    });
  };

  return (
    <StepContent
      percentProgress={90}
      onSubmit={onSelect}
      title="Choisissez votre méthode de paiement"
    >
      <RadioGroup
        options={paymentMethods}
        hasTwoColumns
        onChange={(value) => setPaymentMethod(value as string)}
        defaultValue={booking?.task?.id}
      />
    </StepContent>
  );
};

export default SelectPayment;
