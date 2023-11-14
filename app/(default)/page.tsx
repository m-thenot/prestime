import "server-only";

import { getAllCategories } from "@services/category";

import { HowItWorks, Banner, BecomePro } from "@features/HomePage";
import Faq from "@components/Faq";
import CarouselServices from "@features/Service/CarouselServices";
import { getFAQByTag } from "@services/editorial-content";

export const revalidate = 3600;

export default async function Page() {
  const categories = await getAllCategories();
  const faqOptions = await getFAQByTag("home");

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
      <Faq options={faqOptions.reverse()} />
    </>
  );
}
