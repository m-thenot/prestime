import "server-only";
import "../styles/globals.css";
import supabase from "@utils/supabase/supabase-server";
import { UserProvider } from "@contexts/user";
import QueryProvider from "@contexts/query";

export const revalidate = 0;

async function getSession() {
  const {
    data: { session },
  } = await supabase().auth.getSession();

  return session;
}

interface ILayoutContainerProps {
  children: React.ReactNode;
  classNames?: string;
}

//@ts-expect-error Server Component
const LayoutContainer: React.FC<ILayoutContainerProps> = async ({
  children,
  classNames = "container px-5 my-4 sm:px-10",
}) => {
  const session = await getSession();

  return (
    <html lang="fr">
      <body className={`${classNames}`}>
        <QueryProvider>
          <UserProvider accessToken={session?.access_token}>
            {children}
          </UserProvider>
        </QueryProvider>
      </body>
    </html>
  );
};

export default LayoutContainer;
