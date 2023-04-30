"use client";

import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import supabase from "@utils/supabase/supabase-browser";
import { getCustomer } from "@services/customer";
import { ICustomer } from "types/customer";
import { Session } from "@supabase/supabase-js";

const UserContext = createContext<{ user: ICustomer | null }>({
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
  const [user, setUser] = useState<ICustomer | null>(null);

  useEffect(() => {
    const fetchCustomer = async (session: Session) => {
      const { data } = await getCustomer();
      if (data) {
        setUser({ ...data, email: session.user.email });
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
