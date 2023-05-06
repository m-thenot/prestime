import supabase from "@utils/supabase/supabase-server";

const CATEGORY_TABLE = "category";

export const getAllCategories = async () => {
  const { data: categories, error } = await supabase()
    .from(CATEGORY_TABLE)
    .select("id, title, image");

  if (categories) {
    return categories;
  } else {
    throw error;
  }
};

export const getCategoryBySlug = async (slug: string) => {
  const { data: category } = await supabase()
    .from(CATEGORY_TABLE)
    .select("id, slug")
    .eq("slug", slug)
    .single();

  return category;
};
