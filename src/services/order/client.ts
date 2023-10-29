import supabase from "@utils/supabase/supabase-browser";
import { OrderState } from "types/order";

const APPOINTMENT_TABLE = "appointment";
const ORDER_TABLE = "order";

export const updateAppointmentDate = async (
  date: string,
  appointmentId: number
) => {
  const result = await supabase
    .from(APPOINTMENT_TABLE)
    .update({
      date,
    })
    .eq("id", appointmentId);
  if (result.error) {
    throw new Error(result.error.message);
  }

  return result.data;
};

export const acceptOrder = async (orderId: number) => {
  const result = await supabase
    .from(ORDER_TABLE)
    .update({
      state: OrderState.ACCEPTED,
    })
    .eq("id", orderId);

  if (result.error) {
    throw new Error(result.error.message);
  }

  return result.data;
};

export const declineOrder = async (orderId: number) => {
  const { data, error } = await supabase.functions.invoke("decline-order", {
    body: { orderId },
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};
