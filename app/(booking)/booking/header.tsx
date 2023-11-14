"use client";

import Button from "@components/Button";
import { useUser } from "@contexts/user";
import Link from "next/link";
import supabase from "@utils/supabase/supabase-browser";
import { Account, Arrow } from "@icons";
import { usePathname, useRouter } from "next/navigation";
import { BOOKING_STEPS } from "types/booking";
import { steps } from "constants/booking";
import Logo from "@images/full_logo.png";
import Image from "next/image";

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
    <>
      <header className="bg-white sm:drop-shadow-md">
        <div className="container items-center flex justify-between mb-2 sm:mb-8 py-6 px-5 sm:px-10 header">
          {step !== BOOKING_STEPS.CONFIRMATION ? (
            <Button
              variant="transparent"
              onClick={onClickBack}
              className="flex items-center"
            >
              <Arrow headDirection="left" />

              <span className="ml-3">Retour</span>
            </Button>
          ) : (
            <div />
          )}

          <Link
            href="/"
            className="text-xl sm:text-2xl font-extrabold hover:no-underline translate-y-1"
          >
            <div className="hidden sm:block">
              <Image src={Logo} alt="" priority width={150} height={39} />
            </div>
            <div className="sm:hidden -translate-y-[5px]">
              <Image src={Logo} alt="" priority width={89} height={24} />
            </div>
          </Link>

          {user ? (
            <div className="hidden sm:flex flex-col relative">
              <Link href="/account" className="peer flex items-center">
                <p className="mx-3 font-semibold mb-0">{user.firstname}</p>
                <Account />
              </Link>
              <div
                className="hidden absolute top-8 right-0 p-3 z-20 hover:flex rounded peer-hover:flex w-64	
 flex-col bg-white drop-shadow-lg"
              >
                <Link href="/account/bookings" className="mb-3">
                  Mes réservations
                </Link>
                {/*   <Link href="/account/payments" className="mb-3">
                  Mes moyens de paiement
                </Link> */}
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
      <style jsx>
        {`
          .header > :global(button:first-child) {
            padding: 0;
          }
        `}
      </style>
    </>
  );
};

export default Header;
