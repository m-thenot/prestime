import "server-only";

import { HowItWorks } from "@features/HomePage";
import Faq from "@components/Faq";
import { getServiceContentBySlug } from "@services/service";
import ServiceBanner from "@features/Service/ServiceBanner";
import GalleryServices from "@features/Service/GalleryServices";
import { getCategoryBySlug } from "@services/category";
import { notFound } from "next/navigation";

export const revalidate = 3600;

export default async function Page({ params }: { params: { slug: string } }) {
  const service = await getServiceContentBySlug(params.slug);

  if (!service) {
    notFound();
  }

  const category = await getCategoryBySlug(params.slug);

  return (
    <>
      <ServiceBanner content={service.banner} />
      {category && <GalleryServices categoryId={category.id} />}
      <HowItWorks />
      <Faq options={service.faqCollection.items} />
    </>
  );
}
