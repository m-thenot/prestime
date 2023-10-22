import { createNewOrder } from "@services/order/server";
import { logger } from "@utils/logger";
import { stripe } from "@utils/stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { IBooking, PaymentMethod } from "types/booking";
import { OrderState, PaymentState } from "types/order";

interface IBookingWithCustomer extends IBooking {
  customerId: number;
  financialId: string;
}

export async function POST(request: Request) {
  const headersList = headers();
  const referer = headersList.get("referer")?.split("?")[0];

  try {
    const body = await request.formData();
    const booking: IBookingWithCustomer = JSON.parse(
      body.get("booking") as string
    );

    const {
      task,
      taskProvider,
      address,
      comment,
      customerId,
      service,
      financialId,
      schedules,
    } = booking;

    const orderId = await createNewOrder(
      {
        payment: {
          state: PaymentState.PENDING,
          method: PaymentMethod.CREDIT_CARD,
        },
        task: task!.id,
        taskProvider: taskProvider?.id,
        state: OrderState.PENDING,
        address: address!,
        comment: comment,
        schedules: schedules!.map((sch) => sch.value),
        provider: taskProvider?.provider.id || null,
      },
      customerId
    );

    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            product_data: {
              name: service!.title,
              description: task?.name,
            },
            currency: "DJF",
            unit_amount: taskProvider?.price || task?.recommended_price!,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${referer}/?success=true`,
      cancel_url: `${referer}/?canceled=true`,
      customer: financialId,
      client_reference_id: orderId,
    });
    return NextResponse.redirect(session.url!, 303);
  } catch (err: any) {
    logger.error(err);
    return NextResponse.redirect(`${referer}/?error=true`, 303);
  }
}
