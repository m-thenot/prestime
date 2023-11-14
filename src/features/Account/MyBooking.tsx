"use client";

import { LinkButton } from "@components/Button";
import theme from "constants/theme";
import { WhatsApp } from "icons/WhatsApp";
import { IUserBooking, PaymentMethod } from "types/booking";
import Image from "next/image";
import AvatarImage from "@images/avatar.svg";
import { sum } from "radash";
import Stars from "@components/Stars";
import { Arrow } from "@icons";
import { getFullDateFormatted } from "@utils/date";
import OrderDetails from "@components/OrderDetails";

interface IMyBookingProps {
  booking: IUserBooking;
}

const MyBooking: React.FC<IMyBookingProps> = ({ booking }) => {
  const providerReviews = booking.task_provider?.provider.reviews;
  const providerRating =
    providerReviews && providerReviews.length > 0
      ? sum(providerReviews, (r) => r.rating) / providerReviews.length
      : null;

  return (
    <OrderDetails
      title="Ma réservation"
      booking={booking}
      detailsTitle="Ma réservation en détails"
    >
      {booking.task_provider ? (
        <div className="max-w-md">
          <h2 className="mb-4">Mon prestataire</h2>

          <div className="flex mb-4">
            <Image
              src={AvatarImage}
              alt=""
              width={40}
              height={40}
              className="rounded-full"
            />

            <div className="ml-3">
              <p className="font-bold mb-1">
                {booking.task_provider.provider.firstname}
              </p>
              {providerRating && <Stars averageRating={providerRating} />}
            </div>
          </div>

          <p className="font-bold">À propos</p>
          <p className="line-clamp-5 mb-3">
            {booking.task_provider.provider.description}
          </p>

          <LinkButton
            variant="secondary"
            href={`tel:${booking.task_provider.provider.phone_number.replace(
              /\s/g,
              ""
            )}`}
            className="w-full"
          >
            Contacter {booking.task_provider.provider.firstname}
          </LinkButton>
        </div>
      ) : (
        <div className="bg-background rounded-xl p-6">
          <p className="font-bold text-center mb-4">
            Réservation enregistrée et maintenant ?
          </p>
          <p>
            Nous choisissons le meilleur prestataire pour vous. Vous serez
            contacté dès que le prestataire aura confirmé la prise en charge.
          </p>
        </div>
      )}
    </OrderDetails>
  );
};

export default MyBooking;
