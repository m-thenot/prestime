import "../src/styles/globals.css";
import Header from "./header";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className="container my-4 px-10">
        <Header />
        {children}
      </body>
    </html>
  );
}
