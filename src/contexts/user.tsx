"use client";

import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import supabase from "@utils/supabase/supabase-browser";
import { getCustomer } from "@services/customer";
import { Session } from "@supabase/supabase-js";
import { IUser, UserType } from "types/user";
import { getProvider } from "@services/provider";

const UserContext = createContext<{ user: IUser | null }>({
  user: null,
});

function UserProvider({
  accessToken,
  children,
}: {
  accessToken?: string;
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    const fetchCustomer = async (session: Session) => {
      const type: UserType = session.user.user_metadata.type;

      const { data } =
        type === UserType.CUSTOMER ? await getCustomer() : await getProvider();
      if (data) {
        setUser({ ...data, type, email: session.user.email });
      }
    };

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        fetchCustomer(session);
      } else {
        setUser(null);
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        fetchCustomer(session);
      } else {
        setUser(null);
      }

      if (session?.access_token !== accessToken) {
        router.refresh();
      }
    });
    return () => subscription.unsubscribe();
  }, [accessToken]);

  return (
    <UserContext.Provider value={{ user }}>
      <>{children}</>
    </UserContext.Provider>
  );
}

const useUser = () => useContext(UserContext);

export { useUser, UserProvider };
