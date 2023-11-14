import "server-only";
import { getOrderById } from "@services/order/server";
import { IUserBooking } from "types/booking";
import ProBookingDetails from "@features/Pro/ProBookings/ProBookingDetails";

export default async function Page({ params }: { params: { id: string } }) {
  const order = await getOrderById(params.id);

  return <ProBookingDetails booking={order as IUserBooking} />;
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
