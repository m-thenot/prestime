import { checkoutCompletedHandler } from "@services/stripe/checkout-completed-handler";
import { logger } from "@utils/logger";
import { stripe } from "@utils/stripe";
import { headers } from "next/headers";

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(request: Request) {
  const headersList = headers();
  const sig = headersList.get("stripe-signature");
  const buf = await request.text();
  let event;

  try {
    logger.log("Constructing Strip webhook event...");
    event = stripe.webhooks.constructEvent(buf, sig!, endpointSecret);
  } catch (err) {
    logger.error(err);
    return new Response(`Webhook error: ${err}`, {
      status: 400,
    });
  }

  logger.log("New Stripe event received", event.type);

  // Handle the event
  switch (event.type) {
    case "checkout.session.completed":
      checkoutCompletedHandler(event.data.object as any);
      break;
    default:
      logger.log(`Unhandled Stripe event type ${event.type}`);
  }
}
