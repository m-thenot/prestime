"use client";

import Button from "@components/Button";
import { useUser } from "@contexts/user";
import Link from "next/link";
import supabase from "@utils/supabase/supabase-browser";
import { Account } from "@icons";
import { HamburgerMenu } from "icons/HamburgerMenu";

const Header: React.FC = () => {
  const { user } = useUser();

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <header className="items-center flex justify-between mb-8 sm:mb-12">
      <Link
        href="/"
        className="text-xl sm:text-2xl font-extrabold hover:no-underline"
      >
        Easy Service
      </Link>

      {!user && (
        <Button
          variant="link"
          className="block sm:hidden font-semibold underline"
        >
          Devenir pro
        </Button>
      )}

      <Button variant="transparent" className="block sm:hidden">
        <HamburgerMenu width={32} height={32} />
      </Button>

      {user ? (
        <div className="hidden sm:flex flex-col relative">
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
        <div className="hidden sm:flex items-center">
          <Link href="/login" className="mr-6 font-semibold">
            Se connecter
          </Link>
          <Button>Devenir professionnel</Button>
        </div>
      )}
    </header>
  );
};

export default Header;
