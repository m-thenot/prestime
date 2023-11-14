import ProBookings from "@features/Pro/ProBookings";
import { getOrders } from "@services/order/server";
import "server-only";
import { IBookingCard } from "types/booking";

export default async function Page() {
  const orders = await getOrders();

  return <ProBookings bookings={orders as IBookingCard[] | null} />;
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
