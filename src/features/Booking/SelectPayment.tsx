"use client";
import RadioGroup from "@components/RadioGroup";
import { useBooking } from "@contexts/booking";
import { useUser } from "@contexts/user";
import { Amex, Mastercard, Visa } from "@icons";
import { loadStripe } from "@stripe/stripe-js";
import { fetchPostJSON } from "@utils/api";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { PaymentMethod } from "types/booking";
import StepContent from "./StepContent";
import { useMutation } from "react-query";
import { logger } from "@utils/logger";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const paymentMethods = [
  {
    value: PaymentMethod.CREDIT_CARD,
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
    value: PaymentMethod.CASH,
    label: "Cash",
  },
];

const SelectPayment: React.FC = () => {
  const { booking } = useBooking();
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(
    PaymentMethod.CREDIT_CARD
  );
  const searchParams = useSearchParams();
  const formRef = useRef<HTMLFormElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useUser();
  const router = useRouter();
  const { mutate } = useMutation({
    mutationFn: async (data: any) => {
      return await fetchPostJSON("/api/orders", { booking: data });
    },
  });

  useEffect(() => {
    if (searchParams.get("success")) {
      router.push("/booking/confirmation");
    }
    if (searchParams.get("error")) {
      toast.error(
        "Une erreur inattendue s'est produite lors du paiement. Merci de réessayer ou de contacter le support client."
      );
      setIsLoading(false);
    }
  }, [searchParams]);

  const onSelect = async () => {
    setIsLoading(true);
    if (paymentMethod === PaymentMethod.CREDIT_CARD) {
      formRef.current && formRef.current.submit();
    } else {
      mutate(
        {
          ...booking,
          user,
        },
        {
          onSuccess: () => router.push("/booking/confirmation"),
          onError: (e) => {
            toast.error(
              "Une erreur inattendue s'est produite. Merci de réessayer ou de contacter le support client."
            );
            logger.error("Failed to create new order", { error: e });
            setIsLoading(false);
          },
        }
      );
    }
  };

  return (
    <StepContent
      percentProgress={90}
      onSubmit={onSelect}
      title="Choisissez votre méthode de paiement"
      isButtonLoading={isLoading}
    >
      <form action="/api/checkout" method="POST" ref={formRef}>
        <RadioGroup
          options={paymentMethods}
          hasTwoColumns
          onChange={(value) => setPaymentMethod(value as PaymentMethod)}
          defaultValue={PaymentMethod.CREDIT_CARD}
        />
        <input
          type="hidden"
          name="booking"
          value={JSON.stringify({
            ...booking,
            user,
          })}
        />
      </form>
    </StepContent>
  );
};

export default SelectPayment;
