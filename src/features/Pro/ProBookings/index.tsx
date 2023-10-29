import Tabs from "@components/Tabs";
import { IBookingCard } from "types/booking";
import { OrderCompletedStates } from "types/order";
import ProBookingCard from "./ProBookingCard";
interface IBookingProps {
  bookings: IBookingCard[] | null;
}

const ProBookings: React.FC<IBookingProps> = ({ bookings }) => {
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
        upcomingOrders.map((booking) => (
          <ProBookingCard key={booking.id} booking={booking} />
        ))
      ) : (
        <p>Aucune commande à venir pour le moment.</p>
      ),
    },
    {
      title: `Historique ${
        hasCompletedOrders ? `(${completedOrders.length})` : ""
      }`,
      key: "past",
      content: hasCompletedOrders ? (
        completedOrders.map((booking) => (
          <ProBookingCard key={booking.id} booking={booking} />
        ))
      ) : (
        <p>Vous n&lsquo;avez réalisez aucune prestation pour le moment.</p>
      ),
    },
  ];

  return (
    <div className="container max-w-4xl sm:max-w-5xl">
      <h1 className="mb-8 sm:mb-10 text-center">Mes commandes</h1>

      <Tabs tabs={tabs} />
    </div>
  );
};

export default ProBookings;
