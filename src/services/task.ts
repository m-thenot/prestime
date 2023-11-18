import supabase from "@utils/supabase/supabase-server";

const TASK_TABLE = "task";

export const getAllTasksByService = async (serviceId: number) => {
  const { data: tasks, error } = await supabase()
    .from(TASK_TABLE)
    .select("name, id, recommended_price, is_hourly_price")
    .eq("service", serviceId);

  if (tasks) {
    return tasks;
  } else {
    throw error;
  }
};
