import Bookings from "@features/Account/Bookings";
import { getOrders } from "@services/order/server";
import "server-only";
import { IBookingCard } from "types/booking";

export default async function Page() {
  const orders = await getOrders();

  return <Bookings bookings={orders as IBookingCard[] | null} />;
}

export const metadata = {
  robots: {
    index: false,
    nocache: true,
    googleBot: {
      index: false,
      noimageindex: true,
    },
  },
};
