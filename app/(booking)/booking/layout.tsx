import "server-only";
import Header from "./header";
import LayoutContainer from "@components/LayoutContainer";
import BookingSummary from "@features/Booking/BookingSummary";
import { BookingProvider } from "@contexts/booking";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LayoutContainer classNames="sm:bg-background">
      <Header />
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
