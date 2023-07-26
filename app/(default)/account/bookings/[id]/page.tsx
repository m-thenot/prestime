import "server-only";
import MyBooking from "@features/Account/MyBooking";
import { getOrderById, getOrders } from "@services/order/server";
import { IUserBooking } from "types/booking";

export default async function Page({ params }: { params: { id: string } }) {
  const order = await getOrderById(params.id);

  return <MyBooking booking={order as IUserBooking} />;
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
