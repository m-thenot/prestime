import supabaseBrowser from "@utils/supabase/supabase-browser";
import { ITaskProvider } from "types/provider";

const TASK_PROVIDER_TABLE = "task_provider";

export const getAllTaskProvidersByTask = async (taskId: number) => {
  const { data: taskProviders, error } = await supabaseBrowser
    .from(TASK_PROVIDER_TABLE)
    .select(
      `
    id,
    min_estimated_cost,
    max_estimated_cost,
    price,
    payable_in_advance,
    provider:public_provider(
      id,
      firstname,
      lastname,
      description,
      reviews:review(
          id,
          rating
      )
    )
    `
    )
    .eq("task", taskId);

  if (taskProviders) {
    return taskProviders as ITaskProvider[];
  } else {
    throw error;
  }
};
