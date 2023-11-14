import { createNewOrder } from "@services/order/server";
import { logger } from "@utils/logger";
import { stripe } from "@utils/stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { IBooking, PaymentMethod } from "types/booking";
import { OrderState, PaymentState } from "types/order";
import { Novu } from "@novu/node";
import { ICustomerUser } from "types/user";

const novu = new Novu(process.env.NOVU_API_KEY!);
interface IBookingWithCustomer extends IBooking {
  user: ICustomerUser;
}

export async function POST(request: Request) {
  const headersList = headers();
  const referer = headersList.get("referer")?.split("?")[0];

  try {
    const body = await request.formData();
    const booking: IBookingWithCustomer = JSON.parse(
      body.get("booking") as string
    );

    const { task, taskProvider, address, comment, user, service, schedules } =
      booking;

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
        schedules: schedules!.flatMap((day) =>
          day.timeSlots.map((slot) => slot.value)
        ),
        provider: taskProvider?.provider.id || null,
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
      customer: user.financial_id,
      client_reference_id: orderId,
    });
    return NextResponse.redirect(session.url!, 303);
  } catch (err: any) {
    logger.error(err);
    return NextResponse.redirect(`${referer}/?error=true`, 303);
  }
}
