import { Novu } from "@novu/node";
import { createNewOrder } from "@services/order/server";

const novu = new Novu(process.env.NOVU_API_KEY!);

import { NextResponse } from "next/server";
import { IBooking, PaymentMethod } from "types/booking";
import { OrderState, PaymentState } from "types/order";
import { IUser } from "types/user";

interface IBookingWithCustomer extends IBooking {
  user: IUser;
}

interface IOrderRequest {
  booking: IBookingWithCustomer;
}

/* Create order */
export async function POST(request: Request) {
  const body: IOrderRequest = await request.json();

  const { task, taskProvider, address, comment, user, service, schedules } =
    body.booking;

  const orderId = await createNewOrder(
    {
      payment: {
        state: PaymentState.PENDING,
        method: PaymentMethod.CASH,
      },
      task: task!.id,
      taskProvider: taskProvider?.id,
      state: OrderState.SUBMITED,
      address: address!,
      comment: comment,
      schedules: schedules!.map((sch) => sch.value),
      provider: null,
    },
    user.id
  );

  await novu.trigger("orders-created", {
    to: {
      subscriberId: user.user_id,
    },
    payload: {
      firstname: user.firstname,
      orderId,
      product: `${service?.title} - ${task?.name}`,
    },
  });

  return NextResponse.json({ status: "success" });
}
