import { IBookingCard } from "types/booking";
import Image from "next/image";
import { Time, User } from "@icons";
import Link from "next/link";
import ProActions from "./ProActions";
import { getFullDateFormatted } from "@utils/date";

interface IProBookingCardProps {
  booking: IBookingCard;
}

const ProBookingCard: React.FC<IProBookingCardProps> = ({ booking }) => {
  const suggestedDates = booking.appointment.suggested_dates;

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
                {!booking.appointment.date || suggestedDates.length < 1 ? (
                  <a
                    className="group max-w-max relative flex flex-col items-center justify-center"
                    href="#"
                  >
                    <p className="mb-0">
                      Voir les dates proposés par le client
                    </p>
                    <div className="absolute bottom-0 mb-6 origin-bottom rounded text-white opacity-0 transition-all duration-300 group-hover:opacity-100">
                      <div className="flex max-w-xs flex-col items-center">
                        <div className="rounded bg-gray-900 p-2 text-xs text-center shadow-lg">
                          {suggestedDates.map((date) => (
                            <div key={date}>{getFullDateFormatted(date)}</div>
                          ))}
                        </div>
                        <div className="w-0 h-0 border-l-[5px] border-l-transparent border-t-[7px] border-t-gray-900 border-r-[5px] border-r-transparent"></div>
                      </div>
                    </div>
                  </a>
                ) : (
                  getFullDateFormatted(
                    booking.appointment.date || suggestedDates[0]
                  )
                )}
              </p>
            </div>

            <div className="flex items-center mt-1">
              <User />
              <p className="ml-2 mb-0">{booking.customer.firstname}</p>
            </div>

            <Link
              href={`/account/bookings/${booking.id}`}
              className="font-semibold block w-full mt-4"
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
