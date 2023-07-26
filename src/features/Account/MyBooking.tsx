"use client";

import Button, { LinkButton } from "@components/Button";
import theme from "constants/theme";
import { WhatsApp } from "icons/WhatsApp";
import { IUserBooking } from "types/booking";
import Image from "next/image";
import AvatarImage from "@images/avatar.svg";
import dayjs from "dayjs";
import "dayjs/locale/fr";
import { sum } from "radash";
import Stars from "@components/Stars";
import { Arrow } from "@icons";
dayjs.locale("fr");

interface IMyBookingProps {
  booking: IUserBooking;
}

const MyBooking: React.FC<IMyBookingProps> = ({ booking }) => {
  const providerRating = booking.task_provider?.provider.reviews
    ? sum(booking.task_provider.provider.reviews, (r) => r.rating) /
      booking.task_provider.provider.reviews.length
    : null;

  return (
    <div className="container">
      <div className="flex -translate-x-4 mb-6">
        <LinkButton variant="transparent" href="/account/bookings">
          <Arrow headDirection="left" />

          <span className="ml-3">Retour</span>
        </LinkButton>
      </div>

      <h1 className="mb-8 sm:mb-10 text-center">Ma réservation</h1>

      <div className="sm:grid sm:grid-cols-2 sm:gap-10">
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
              href={`"tel:${booking.task_provider.provider.phone_number.replace(
                /\s/g,
                ""
              )}"`}
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

        <div className="mt-6 sm:mt-0">
          <h2 className="mb-4">Ma réservation en détails</h2>

          <div className="mb-3">
            <p className="font-bold">{booking.task.service.title}</p>
            <p>{booking.task.name}</p>
          </div>

          <div className="mb-3">
            <p className="font-bold">Adresse</p>
            <p>{booking.appointment.address.formatted_address}</p>
          </div>

          <div className="mb-3">
            {booking.appointment.date ? (
              <>
                <p className="font-bold">Date du rendez-vous</p>
                <p>{dayjs(booking.appointment.date).format("ddd D MMMM")}</p>
              </>
            ) : (
              <>
                <p className="font-bold">Disponibilités</p>
                {booking.appointment.suggested_dates.map((date, index) => (
                  <p key={index}>{dayjs(date).format("ddd D MMMM, hh")}h</p>
                ))}
              </>
            )}
          </div>

          <div className="mb-3 mt-5 flex justify-between">
            <p className="font-bold">Total:</p>
            <p className="font-bold text-lg">
              {booking.task_provider?.price} DJF
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

export default MyBooking;
