import "server-only";
import Header from "./header";
import Footer from "./footer";
import LayoutContainer from "@components/LayoutContainer";
import { defaultMetadata, defaultViewport } from "@utils/defaultMetadata";
import { Analytics } from "@vercel/analytics/react";
import { ServicesProvider } from "@contexts/services";
import { getAllCategoriesWithServices } from "@services/category";
import Tracking from "@components/Tracking";
import ContactButton from "@components/ContactButton";

export const revalidate = 3600;

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const categories = await getAllCategoriesWithServices();

  return (
    <>
      <Analytics />
      <Tracking />
      <LayoutContainer>
        <ServicesProvider categories={categories}>
          <Header />
          <main>{children}</main>
          <ContactButton />
          <Footer />
        </ServicesProvider>
      </LayoutContainer>
    </>
  );
}

export const metadata = defaultMetadata;

export const viewport = {
  ...defaultViewport,
};
