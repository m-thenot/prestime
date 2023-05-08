import { Novu, ChatProviderIdEnum } from "@novu/node";
import { NextResponse } from "next/server";
import { InsertCustomer } from "types/customer";

const novu = new Novu(process.env.NOVU_API_KEY!);

interface ICreateCustomerRequest {
  customer: InsertCustomer;
}

/* Create customer */
export async function POST(request: Request) {
  const body: ICreateCustomerRequest = await request.json();
  const { firstname, lastname, phone_number, user_id } = body.customer;

  await novu.subscribers.identify(user_id, {
    phone: phone_number,
    firstName: firstname,
    lastName: lastname,
  });

  await novu.subscribers.setCredentials(user_id, ChatProviderIdEnum.Discord, {
    webhookUrl: process.env.DISCORD_NOTIFICATIONS_WEBHOOK_URL,
  });

  await novu.trigger("customers-created", {
    to: {
      subscriberId: body.customer.user_id,
    },
    payload: {
      phone: phone_number,
      firstName: firstname,
      lastName: lastname,
    },
  });

  return NextResponse.json({ status: "success" });
}
