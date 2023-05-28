import { UserMutation } from "@hooks/useSignUp";
import { Novu, ChatProviderIdEnum } from "@novu/node";
import { NextResponse } from "next/server";
import { UserType } from "types/user";
import { stripe } from "@utils/stripe";
import { createProvider } from "@services/provider/server";
import { createCustomer } from "@services/customer/server";
import { logger } from "@utils/logger";

const novu = new Novu(process.env.NOVU_API_KEY!);

interface ICreateCustomerRequest {
  user: UserMutation;
  type: UserType;
}

/* Create customer */
export async function POST(request: Request) {
  const body: ICreateCustomerRequest = await request.json();
  const { firstname, lastname, phone_number, user_id, email } = body.user;

  try {
    const stripeCustomer = await stripe.customers.create({ email });

    const { error } =
      body.type === UserType.CUSTOMER
        ? await createCustomer({
            firstname: firstname,
            lastname: lastname,
            phone_number: phone_number,
            user_id: user_id,
            financial_id: stripeCustomer.id,
          })
        : await createProvider({
            firstname: firstname,
            lastname: lastname,
            phone_number: phone_number,
            user_id: user_id,
            financial_id: stripeCustomer.id,
          });

    if (error) {
      throw new Error(error.message);
    }

    await novu.subscribers.identify(user_id, {
      phone: phone_number,
      firstName: firstname,
      lastName: lastname,
    });

    await novu.subscribers.setCredentials(user_id, ChatProviderIdEnum.Discord, {
      webhookUrl: process.env.DISCORD_NOTIFICATIONS_WEBHOOK_URL,
    });

    if (body.type === UserType.CUSTOMER) {
      await novu.trigger("customers-created", {
        to: {
          subscriberId: body.user.user_id,
        },
        payload: {
          phone: phone_number,
          firstName: firstname,
          lastName: lastname,
        },
      });
    } else {
      await novu.trigger("providers-created", {
        to: {
          subscriberId: body.user.user_id,
        },
        payload: {
          phone: phone_number,
          firstName: firstname,
          lastName: lastname,
          jobs: "jobs" in body.user ? body.user.jobs : [],
        },
      });
    }

    return NextResponse.json({ status: 200 });
  } catch (err: any) {
    logger.error(err);
    return NextResponse.json(
      { message: err.message || "Failed to create customer / provider" },
      { status: err.status || 500 }
    );
  }
}
