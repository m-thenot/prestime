import "server-only";
import Header from "./header";
import Footer from "./footer";
import LayoutContainer from "@components/LayoutContainer";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LayoutContainer>
      <Header />
      <main>{children}</main>
      <Footer />
    </LayoutContainer>
  );
}
