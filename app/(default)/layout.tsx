import "server-only";
import Header from "./header";
import Footer from "./footer";
import LayoutContainer from "@components/LayoutContainer";
import { defaultMetadata, defaultViewport } from "@utils/defaultMetadata";
import { Analytics } from "@vercel/analytics/react";
import { ServicesProvider } from "@contexts/services";
import { getAllCategoriesWithServices } from "@services/category";
import Tracking from "@components/Tracking";
import Script from "next/script";

export const revalidate = 3600;

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const categories = await getAllCategoriesWithServices();

  return (
    <LayoutContainer>
      <Analytics />
      <Tracking />
      <ServicesProvider categories={categories}>
        <Header />
        <main>{children}</main>
        <Footer />
      </ServicesProvider>
      <Script
        id="fb-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '1774956386278965');
          fbq('track', 'PageView');
          `,
        }}
      />
    </LayoutContainer>
  );
}

export const metadata = defaultMetadata;

export const viewport = {
  ...defaultViewport,
};
