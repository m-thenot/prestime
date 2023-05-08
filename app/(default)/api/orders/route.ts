import { Novu } from "@novu/node";

const novu = new Novu(process.env.NOVU_API_KEY!);

import { NextResponse } from "next/server";
import { ICustomer } from "types/customer";

interface IOrderRequest {
  customer: ICustomer;
}

/* Create order */
export async function POST(request: Request) {
  const body: IOrderRequest = await request.json();

  await novu.trigger("orders-created", {
    to: {
      subscriberId: body.customer.user_id,
    },
    payload: {
      firstname: body.customer.firstname,
    },
  });

  return NextResponse.json({ status: "success" });
}
