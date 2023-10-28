import { createAddress } from "@services/address";
import { logger } from "@utils/logger";
import supabase, { createServiceClient } from "@utils/supabase/supabase-server";
import {
  IInsertAppointment,
  IInsertOrder,
  IInsertPayment,
  INewOrder,
  OrderState,
  PaymentState,
} from "types/order";

const ORDER_TABLE = "order";
const PAYMENT_TABLE = "payment";
const APPOINTMENT_TABLE = "appointment";

export const submitOrder = async (orderId: number) => {
  const result = await createServiceClient()
    .from(ORDER_TABLE)
    .update({
      state: OrderState.SUBMITED,
    })
    .eq("id", orderId)
    .select("payment")
    .single();

  return result.data?.payment;
};

const insertOrder = async (order: IInsertOrder) => {
  const result = await supabase()
    .from(ORDER_TABLE)
    .insert(order)
    .select("id")
    .single();

  if (result.error) {
    throw new Error(result.error.message);
  }

  return result.data?.id;
};

const insertPayment = async (payment: IInsertPayment) => {
  const result = await supabase()
    .from(PAYMENT_TABLE)
    .insert(payment)
    .select("id")
    .single();

  if (result.error) {
    throw new Error(result.error.message);
  }

  return result.data?.id;
};

export const updatePaymentState = async (
  id: number,
  paymentState: PaymentState
) => {
  return await createServiceClient()
    .from(PAYMENT_TABLE)
    .update({
      state: paymentState,
    })
    .eq("id", id);
};

const insertAppointment = async (appointment: IInsertAppointment) => {
  const result = await supabase()
    .from(APPOINTMENT_TABLE)
    .insert(appointment)
    .select("id")
    .single();

  if (result.error) {
    throw new Error(result.error.message);
  }

  return result.data?.id;
};

export const createNewOrder = async (
  newOrder: INewOrder,
  customerId: number
) => {
  try {
    const [paymentId, addressId] = await Promise.all([
      insertPayment({
        ...newOrder.payment,
      }),
      createAddress(newOrder.address, customerId),
    ]);

    const appointmentId = await insertAppointment({
      address: addressId,
      customer: customerId,
      provider: newOrder.provider,
      suggested_dates: newOrder.schedules.map((s) => new Date(s).toISOString()),
    });

    return await insertOrder({
      payment: paymentId,
      appointment: appointmentId,
      state: newOrder.state,
      task: newOrder.task,
      task_provider: newOrder.taskProvider,
      customer: customerId,
      provider: newOrder.provider,
      comment: newOrder.comment,
    });
  } catch (e) {
    logger.error("Failed to create a new Order", { error: e });
    throw new Error("Failed to create a new Order");
  }
};

export const getOrders = async () => {
  const orders = await supabase()
    .from(ORDER_TABLE)
    .select(
      `
  id,
  created_at,
  state,
  task:task(
    name,
    recommended_price,
    service:service(
      title,
      image
    )
  ),
  customer:customer(
    firstname,
    lastname,
    phone_number
  ),
  task_provider:task_provider(
    provider:public_provider(
      firstname
    )
  ),
  appointment:appointment(
    id,
    date,
    suggested_dates,
    address:address(
      formatted_address
    )
  )
  `
    )
    .order("created_at", { ascending: false });

  return orders.data;
};

export const getOrderById = async (orderId: string) => {
  const orders = await supabase()
    .from(ORDER_TABLE)
    .select(
      `
  id,
  created_at,
  state,
  task:task(
    name,
    recommended_price,
    service:service(
      title,
      image
    )
  ),
  task_provider:task_provider(
    price,
    provider:public_provider(
      firstname,
      description,
      phone_number,
      reviews:review(
        id,
        rating
    )
    )
  ),
  appointment:appointment(
    date,
    suggested_dates,
    address:address(
      formatted_address,
      latitude,
      longitude,
      country,
      city
    )
  )
  `
    )
    .eq("id", orderId)
    .single();

  return orders.data;
};
