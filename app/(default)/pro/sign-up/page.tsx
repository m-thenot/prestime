import "server-only";

import { notFound } from "next/navigation";
import { getProfessionalPage } from "@services/editorial-content";
import ProSignUpBanner from "@features/Pro/ProSignUpBanner";

export const revalidate = 3600;

export async function generateMetadata() {
  const page = await getProfessionalPage();

  if (!page) {
    notFound();
  }

  return {
    title: page.seo.title,
    description: page.seo.description,
    openGraph: {
      title: page.seo.title,
      description: page.seo.description,
      type: "website",
      siteName: "EasyService",
    },
  };
}

export default async function Page() {
  const page = await getProfessionalPage();

  if (!page) {
    notFound();
  }

  return (
    <>
      <ProSignUpBanner title={page.title} claims={page.argument.json} />
      {/* <Faq options={service.faqCollection.items} /> */}
    </>
  );
}
