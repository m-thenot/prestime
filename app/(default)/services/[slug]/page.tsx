import "server-only";

import { HowItWorks } from "@features/HomePage";
import Faq from "@components/Faq";
import { getServiceContentBySlug } from "@services/service";
import ServiceBanner from "@features/Service/ServiceBanner";
import GalleryServices from "@features/Service/GalleryServices";
import { getCategoryBySlug } from "@services/category";
import { notFound } from "next/navigation";

export const revalidate = 3600;

interface IParams {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: IParams) {
  const service = await getServiceContentBySlug(params.slug);

  if (!service) {
    notFound();
  }

  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL!),
    title: service.seo.title,
    description: service.seo.description,
    openGraph: {
      title: service.seo.title,
      description: service.seo.description,
      type: "website",
      siteName: "Deg Deg",
    },
  };
}

export default async function Page({ params }: IParams) {
  const service = await getServiceContentBySlug(params.slug);

  if (!service) {
    notFound();
  }

  const category = await getCategoryBySlug(params.slug);

  return (
    <>
      <ServiceBanner content={service.banner} slug={params.slug} />
      {category && <GalleryServices categoryId={category.id} />}
      <HowItWorks />
      <Faq options={service.faqCollection.items} />
    </>
  );
}
