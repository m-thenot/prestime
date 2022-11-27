import "../src/styles/globals.css";
import Header from "./header";
import SupabaseListener from "@hooks/supabaseListener";
import supabase from "@utils/supabase/supabase-server";

export const revalidate = 0;

async function getSession() {
  const {
    data: { session },
  } = await supabase().auth.getSession();

  return session;
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  return (
    <html lang="fr">
      <body className="container my-4 px-5 sm:px-10">
        <SupabaseListener accessToken={session?.access_token} />
        <Header />
        {children}
      </body>
    </html>
  );
}
