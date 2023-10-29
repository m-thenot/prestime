import { IBookingCard } from "types/booking";
import { OrderCompletedStates } from "types/order";
import ProBookingCard from "./ProBookingCard";
interface IBookingProps {
  bookings: IBookingCard[] | null;
}

const ProBookings: React.FC<IBookingProps> = ({ bookings }) => {
  console.log(bookings);
  const upcomingOrders = bookings?.filter(
    (booking) => !OrderCompletedStates.includes(booking.state)
  );
  const completedOrders = bookings?.filter((booking) =>
    OrderCompletedStates.includes(booking.state)
  );

  return (
    <div className="container max-w-4xl sm:max-w-5xl">
      <h1 className="mb-8 sm:mb-10 text-center">Mes commandes</h1>

      <h2 className="mb-5">À venir</h2>

      {upcomingOrders && upcomingOrders.length > 0 ? (
        upcomingOrders.map((booking) => (
          <ProBookingCard key={booking.id} booking={booking} />
        ))
      ) : (
        <p>Aucune commande à venir pour le moment.</p>
      )}

      {completedOrders && completedOrders.length > 0 && (
        <>
          <h2 className="mb-5 mt-7">Historique</h2>

          {completedOrders?.map((booking) => (
            <ProBookingCard key={booking.id} booking={booking} />
          ))}
        </>
      )}
    </div>
  );
};

export default ProBookings;
