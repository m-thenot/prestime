"use client";

import { IBookingCard } from "types/booking";
import Image from "next/image";
import { Time, User } from "@icons";
import dayjs from "dayjs";
import "dayjs/locale/fr";
import Link from "next/link";
dayjs.locale("fr");

interface IBookingProps {
  bookings: IBookingCard[] | null;
}

const Bookings: React.FC<IBookingProps> = ({ bookings }) => {
  return (
    <div className="container">
      <h1 className="mb-2 text-center">Mes réservations</h1>

      <div className="mt-6 sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6">
        {bookings?.map((booking) => (
          <div
            className="drop-shadow-lg bg-white my-4 rounded-lg w-full"
            key={booking.id}
          >
            <div className="rounded-t-lg h-16 relative w-full">
              <Image
                src={booking.task.service.image}
                fill
                alt=""
                className="rounded-t-lg"
              />
            </div>
            <div className="px-4 py-3">
              <p className="font-medium mb-0">{booking.task.service.title}</p>
              <p className="text-gray-500">{booking.task.name}</p>

              <div className="flex items-center">
                <Time />
                <p className="ml-2 mb-0">
                  {dayjs(
                    booking.appointment.date ||
                      booking.appointment.suggested_dates[0]
                  ).format("ddd D MMMM")}
                  {!booking.appointment.date && "..."}
                </p>
              </div>

              {booking.task_provider?.provider && (
                <div className="flex items-center mt-1">
                  <User />
                  <p className="ml-2 mb-0">
                    {booking.task_provider?.provider.firstname}
                  </p>
                </div>
              )}

              <div className="h-[1px] w-full bg-gray-100 my-4" />

              <Link
                href={`/account/bookings/${booking.id}`}
                className="font-semibold block w-full text-center"
              >
                Voir ma réservation
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Bookings;
