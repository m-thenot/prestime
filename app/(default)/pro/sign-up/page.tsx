import "server-only";

import { notFound } from "next/navigation";
import { getProfessionalPage } from "@services/editorial-content";
import ProSignUpBanner from "@features/Pro/ProSignUpBanner";
import ProHowItWorks from "@features/Pro/ProHowItWorks";
import Faq from "@components/Faq";

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
      siteName: "Deg Deg",
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
      <ProHowItWorks content={page.howItWorks} />
      <Faq options={page.faqCollection.items} />
    </>
  );
}
