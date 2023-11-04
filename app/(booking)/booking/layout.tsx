import "server-only";
import Header from "./header";
import LayoutContainer from "@components/LayoutContainer";
import BookingSummary from "@features/Booking/BookingSummary";
import { BookingProvider } from "@contexts/booking";
import { defaultMetadata, defaultViewport } from "@utils/defaultMetadata";
import { Analytics } from "@vercel/analytics/react";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LayoutContainer classNames="sm:bg-background">
      <Header />
      <Analytics />
      <main className="px-5 mb-4 sm:px-10 container">
        <div className="flex justify-between">
          <BookingProvider>
            {children}
            <BookingSummary />
          </BookingProvider>
        </div>
      </main>
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
