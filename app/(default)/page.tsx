import "server-only";

import { getAllCategories } from "@services/category";

import CarouselServices from "@components/CarouselServices";
import { HowItWorks, Banner, BecomePro } from "@features/HomePage";

export default async function Page() {
  const categories = await getAllCategories();

  return (
    <>
      <Banner />
      <HowItWorks />
      {categories.slice(0, 2).map((category) => (
        <CarouselServices key={category.id} category={category} />
      ))}
      <BecomePro />
      {categories.slice(2).map((category) => (
        <CarouselServices key={category.id} category={category} />
      ))}
    </>
  );
}
