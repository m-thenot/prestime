import HomePage from "@features/HomePage";
import { supabase } from "@utils/initSupabase";

async function getCategories() {
  const { data: categories, error } = await supabase
    .from("category")
    .select("title, image, id");

  if (categories) {
    return categories;
  } else {
    throw error;
  }
}

export default async function Page() {
  const categories = await getCategories();
  return (
    <>
      <HomePage categories={categories} />
    </>
  );
}
