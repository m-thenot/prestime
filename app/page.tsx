import HomePage from "@features/HomePage";
import { getAllCategories } from "@services/category";

export default async function Page() {
  const categories = await getAllCategories();

  return (
    <>
      <HomePage categories={categories} />
    </>
  );
}
