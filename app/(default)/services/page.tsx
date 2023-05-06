import "server-only";

import { HowItWorks } from "@features/HomePage";
import Faq from "@components/Faq";
import { getServiceContentBySlug } from "@services/service";
import ServiceBanner from "@features/Service/ServiceBanner";
import GalleryServices from "@features/Service/GalleryServices";

export default async function Page() {
  const service = await getServiceContentBySlug("private-lessons");

  return (
    <>
      <ServiceBanner content={service.banner} />
      <GalleryServices categoryId={3} />
      <HowItWorks />
      <Faq options={service.faqCollection.items} />
    </>
  );
}
