import { submitOrder, updatePaymentState } from "@services/order/server";
import { logger } from "@utils/logger";
import Stripe from "stripe";
import { PaymentState } from "types/order";

export const checkoutCompletedHandler = async (
  stripCheckoutSession: Stripe.Checkout.Session
) => {
  logger.log(
    "Starts handling checkout completed...",
    stripCheckoutSession.client_reference_id
  );

  try {
    const paymentId = await submitOrder(
      parseInt(stripCheckoutSession.client_reference_id!)
    );
    await updatePaymentState(paymentId, PaymentState.PAID);
  } catch (e) {
    logger.error("Failed to update order paid", { error: e });
  }
};
