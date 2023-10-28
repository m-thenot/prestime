import { IBookingCard } from "types/booking";
import Image from "next/image";
import { Time, User } from "@icons";
import dayjs from "dayjs";
import "dayjs/locale/fr";
import Link from "next/link";
import ProActions from "./ProActions";

interface IProBookingCardProps {
  booking: IBookingCard;
}

const ProBookingCard: React.FC<IProBookingCardProps> = ({ booking }) => {
  return (
    <div className="drop-shadow-lg bg-white rounded-lg w-full" key={booking.id}>
      <div className="flex">
        <div className="rounded-l-lg relative w-2/6">
          <Image
            src={booking.task.service.image}
            objectFit="cover"
            fill
            alt=""
            className="rounded-l-lg"
          />
        </div>
        <div className="px-4 py-3 flex justify-between w-full items-end">
          <div>
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

            <div className="flex items-center mt-1">
              <User />
              <p className="ml-2 mb-0">{booking.customer.firstname}</p>
            </div>

            <Link
              href={`/account/bookings/${booking.id}`}
              className="font-semibold block w-full text-center mt-4"
            >
              Voir le détail de la commande
            </Link>
          </div>
          <div className="flex flex-col justify-end relative h-full">
            <ProActions booking={booking} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProBookingCard;
