"use client";

import Button from "@components/Button";
import { useUser } from "@contexts/user";
import Link from "next/link";
import supabase from "@utils/supabase/supabase-browser";
import { Account } from "@icons";

const Header: React.FC = () => {
  const { user } = useUser();

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <div className="items-center flex justify-between mb-8">
      <Link href="/" className="text-2xl font-extrabold hover:no-underline">
        Easy Service
      </Link>

      {user ? (
        <div className="flex flex-col relative">
          <Link href="/account" className="peer flex items-center">
            <p className="mx-3 font-semibold	">{user.firstname}</p>
            <Account />
          </Link>
          <div
            className="hidden absolute top-8 right-0 p-3 z-20 hover:flex rounded peer-hover:flex w-64	
 flex-col bg-white drop-shadow-lg"
          >
            <Link href="/account/bookings" className="mb-3">
              Mes réservations à venir
            </Link>
            <Link href="/account/payments" className="mb-3">
              Mes moyens de paiement
            </Link>
            <Link href="/account/information" className="mb-3">
              Mes informations
            </Link>
            <Button variant="link" onClick={handleLogout}>
              Se déconnecter
            </Button>
          </div>
        </div>
      ) : (
        <div>
          <Link href="/login" className="mr-6">
            Se connecter
          </Link>
          <Button>Devenir professionnel</Button>
        </div>
      )}
    </div>
  );
};

export default Header;
