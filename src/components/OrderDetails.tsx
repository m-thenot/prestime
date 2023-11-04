"use client";

import { LinkButton } from "@components/Button";
import theme from "constants/theme";
import { WhatsApp } from "icons/WhatsApp";
import { IUserBooking, PaymentMethod } from "types/booking";
import { Arrow } from "@icons";
import { getFullDateFormatted } from "@utils/date";

interface IOrderDetailsProps {
  booking: IUserBooking;
  title: string;
  detailsTitle: string;
  children: React.ReactNode;
}

const getPaymentMethodLabel = (method: PaymentMethod) => {
  switch (method) {
    case PaymentMethod.CASH:
      return "Cash";
    case PaymentMethod.CREDIT_CARD:
      return "Paiement en ligne (Carte bancaire)";

    default:
      return null;
  }
};

const OrderDetails: React.FC<IOrderDetailsProps> = ({
  booking,
  title,
  detailsTitle,
  children,
}) => {
  return (
    <div className="container">
      <div className="flex -translate-x-4 mb-6">
        <LinkButton variant="transparent" href="/account/bookings">
          <Arrow headDirection="left" />

          <span className="ml-3">Retour</span>
        </LinkButton>
      </div>

      <h1 className="mb-8 sm:mb-10 text-center">{title}</h1>

      <div className="sm:grid sm:grid-cols-2 sm:gap-10">
        {children}

        <div className="mt-6 sm:mt-0">
          <h2 className="mb-4">{detailsTitle}</h2>

          <div className="mb-3">
            <p className="font-bold">{booking.task.service.title}</p>
            <p>{booking.task.name}</p>
          </div>

          {booking.comment && (
            <div className="mb-3">
              <p className="font-bold">Description</p>
              <p>{booking.comment}</p>
            </div>
          )}

          <div className="mb-3">
            <p className="font-bold">Adresse</p>
            <p>{booking.appointment.address.formatted_address}</p>
          </div>

          <div className="mb-3">
            {booking.appointment.date ? (
              <>
                <p className="font-bold">Date du rendez-vous</p>
                <p>{getFullDateFormatted(booking.appointment.date)}</p>
              </>
            ) : (
              <>
                <p className="font-bold">Disponibilités</p>
                {booking.appointment.suggested_dates.map((date, index) => (
                  <p key={index}>{getFullDateFormatted(date)}</p>
                ))}
              </>
            )}
          </div>

          <div className="mb-3">
            <p className="font-bold">Moyen de paiement</p>
            <p>{getPaymentMethodLabel(booking.payment.method)}</p>
          </div>

          <div className="mb-3 mt-5 flex justify-between">
            <p className="font-bold">Total:</p>
            <p className="font-bold text-lg">
              {booking.task.recommended_price || booking.task_provider?.price}{" "}
              DJF
            </p>
          </div>
        </div>

        <div className="mt-6 sm:mt-0">
          <h2 className="mb-4">Nous contacter</h2>
          <LinkButton
            variant="secondary"
            className="mb-6"
            href={process.env.NEXT_PUBLIC_WHATSAPP_LINK!}
          >
            <span className="mr-4">
              {process.env.NEXT_PUBLIC_PHONE_NUMBER!}
            </span>
            <WhatsApp color={theme.colors.primary[100]} />
          </LinkButton>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
