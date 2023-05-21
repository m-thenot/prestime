import { UserMutation } from "@hooks/useSignUp";
import { Novu, ChatProviderIdEnum } from "@novu/node";
import { NextResponse } from "next/server";
import { UserType } from "types/user";

const novu = new Novu(process.env.NOVU_API_KEY!);

interface ICreateCustomerRequest {
  user: UserMutation;
  type: UserType;
}

/* Create customer */
export async function POST(request: Request) {
  const body: ICreateCustomerRequest = await request.json();
  const { firstname, lastname, phone_number, user_id } = body.user;

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

  return NextResponse.json({ status: "success" });
}
