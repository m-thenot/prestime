import { IBookingCard } from "types/booking";
import { OrderCompletedStates } from "types/order";
import BookingCard from "./BookingCard";
import Tabs from "@components/Tabs";

interface IBookingProps {
  bookings: IBookingCard[] | null;
}

const Bookings: React.FC<IBookingProps> = ({ bookings }) => {
  const upcomingOrders = bookings?.filter(
    (booking) => !OrderCompletedStates.includes(booking.state)
  );
  const hasUpcomingOrders = upcomingOrders && upcomingOrders.length > 0;
  const completedOrders = bookings?.filter((booking) =>
    OrderCompletedStates.includes(booking.state)
  );
  const hasCompletedOrders = completedOrders && completedOrders.length > 0;

  const tabs = [
    {
      title: `À venir ${hasUpcomingOrders ? `(${upcomingOrders.length})` : ""}`,
      key: "upcoming",
      content: hasUpcomingOrders ? (
        <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-6 mb-6">
          {upcomingOrders.map((booking) => (
            <BookingCard key={booking.id} booking={booking} />
          ))}
        </div>
      ) : (
        <p>Pas encore de service réservé.</p>
      ),
    },
    {
      title: `Historique ${
        hasCompletedOrders ? `(${completedOrders.length})` : ""
      }`,
      key: "past",
      content: hasCompletedOrders ? (
        <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-6 mb-6">
          {completedOrders.map((booking) => (
            <BookingCard key={booking.id} booking={booking} />
          ))}
        </div>
      ) : (
        <p>Vous n&lsquo;avez complété aucune réservation pour le moment.</p>
      ),
    },
  ];

  return (
    <div className="container max-w-4xl sm:max-w-5xl">
      <h1 className="mb-8 sm:mb-10 text-center">Mes réservations</h1>

      <Tabs tabs={tabs} />
    </div>
  );
};

export default Bookings;
