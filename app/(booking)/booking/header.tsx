"use client";

import Button from "@components/Button";
import { useUser } from "@contexts/user";
import Link from "next/link";
import supabase from "@utils/supabase/supabase-browser";
import { Account, Arrow } from "@icons";
import { usePathname, useRouter } from "next/navigation";
import { BOOKING_STEPS } from "types/booking";
import { steps } from "constants/booking";

const Header: React.FC = () => {
  const { user } = useUser();
  const router = useRouter();
  const pathname = usePathname();
  const step = pathname.split("/").pop() as BOOKING_STEPS;

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const onClickBack = () => {
    if (steps.includes(step)) {
      router.push(
        `${pathname.split(step)[0]}${steps[steps.indexOf(step) - 1]}`
      );
    } else {
      router.push("/");
    }
  };

  return (
    <header className="bg-white drop-shadow-md">
      <div className="container items-center flex justify-between mb-8 py-6 px-5 sm:px-10">
        <Button
          variant="transparent"
          onClick={onClickBack}
          className="flex items-center"
        >
          <Arrow headDirection="left" />
          <span className="ml-3">Retour</span>
        </Button>

        <Link href="/" className="text-2xl font-extrabold hover:no-underline">
          Easy Service
        </Link>

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
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
