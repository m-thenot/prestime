import { IBookingCard } from "types/booking";
import dayjs from "dayjs";
import "dayjs/locale/fr";
import ProBookingCard from "./ProBookingCard";
dayjs.locale("fr");

interface IBookingProps {
  bookings: IBookingCard[] | null;
}

const ProBookings: React.FC<IBookingProps> = ({ bookings }) => {
  console.log(bookings);
  return (
    <div className="container max-w-4xl sm:max-w-5xl">
      <h1 className="mb-8 sm:mb-10 text-center">Mes commandes</h1>

      <h2 className="mb-5">À venir</h2>

      {bookings?.map((booking) => (
        <ProBookingCard key={booking.id} booking={booking} />
      ))}

      <h2 className="mb-5 mt-7">Historique</h2>
    </div>
  );
};

export default ProBookings;
