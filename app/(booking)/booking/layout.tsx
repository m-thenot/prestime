import "server-only";
import Header from "./header";
import LayoutContainer from "@components/LayoutContainer";
import BookingSummary from "@features/Booking/BookingSummary";
import { BookingProvider } from "@contexts/booking";
import { defaultMetadata, defaultViewport } from "@utils/defaultMetadata";
import { Analytics } from "@vercel/analytics/react";
import Tracking from "@components/Tracking";
import Script from "next/script";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LayoutContainer classNames="sm:bg-background">
      <Header />
      <Analytics />
      <Tracking />
      <main className="px-5 mb-4 sm:px-10 container">
        <div className="flex justify-between">
          <BookingProvider>
            {children}
            <BookingSummary />
          </BookingProvider>
        </div>
      </main>
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

export const metadata = {
  ...defaultMetadata,
  robots: {
    index: false,
    nocache: true,
    googleBot: {
      index: false,
      noimageindex: true,
    },
  },
};

export const viewport = {
  ...defaultViewport,
};
