import supabase from "@utils/supabase/supabase-server";
import { ICategoryWithServices } from "types/category";

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

export const getAllCategoriesWithServices = async () => {
  const { data: categories, error } = await supabase()
    .from(CATEGORY_TABLE)
    .select(
      `
    id,
    title,
    slug,
    services:service(
      id,
      title,
      slug
    )
    `
    );

  if (categories) {
    return categories as ICategoryWithServices[];
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
