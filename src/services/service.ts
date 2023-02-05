import supabase from "@utils/supabase/supabase-server";

const SERVICE_TABLE = "service";

export const getAllServicesByCategory = async (categoryId: number) => {
  const { data: services, error } = await supabase()
    .from(SERVICE_TABLE)
    .select("id, title, category")
    .eq("category", categoryId);

  if (services) {
    return services;
  } else {
    throw error;
  }
};
