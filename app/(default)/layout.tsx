import "server-only";
import Header from "./header";
import Footer from "./footer";
import LayoutContainer from "@components/LayoutContainer";
import { defaultMetadata } from "@utils/defaultMetadata";
import { Analytics } from "@vercel/analytics/react";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LayoutContainer>
      <Analytics />
      <Header />
      <main>{children}</main>
      <Footer />
    </LayoutContainer>
  );
}

export const metadata = defaultMetadata;
