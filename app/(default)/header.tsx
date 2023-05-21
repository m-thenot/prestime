"use client";

import { LinkButton } from "@components/Button";
import { useUser } from "@contexts/user";
import Link from "next/link";
import { Account } from "@icons";
import MobileMenu from "@components/MobileMenu";
import ServicesNavigation from "@features/Service/ServicesNavigation";
import { userAccountRoutes } from "@utils/user";
import LogOutButton from "@features/Authentification/LogOutButton";
import { UserType } from "types/user";

const Header: React.FC = () => {
  const { user } = useUser();

  return (
    <header className="container items-center flex justify-between mb-8 sm:mb-12">
      <Link
        href="/"
        className="text-xl sm:text-2xl font-extrabold hover:no-underline"
      >
        Easy Service
      </Link>

      <ServicesNavigation />

      {!user && (
        <LinkButton
          variant="link"
          isUnderlined
          className="block sm:hidden font-semibold"
          href="/pro/sign-up"
        >
          Devenir pro
        </LinkButton>
      )}

      <MobileMenu />

      {user ? (
        <div className="hidden sm:flex flex-col relative">
          <Link href="/account/information" className="peer flex items-center">
            <p className="mx-3 font-semibold	mb-0">{user.firstname}</p>
            <Account />
          </Link>
          <div
            className="hidden absolute top-8 right-0 p-3 z-20 hover:flex rounded peer-hover:flex w-64	
 flex-col bg-white drop-shadow-lg"
          >
            {user.type === UserType.CUSTOMER &&
              userAccountRoutes.map((route) => (
                <Link key={route.href} href={route.href} className="mb-3">
                  {route.label}
                </Link>
              ))}
            <LogOutButton />
          </div>
        </div>
      ) : (
        <div className="hidden sm:flex items-center">
          <Link href="/login" className="mr-6 font-semibold">
            Se connecter
          </Link>
          <LinkButton href="/pro/sign-up">Devenir professionnel</LinkButton>
        </div>
      )}
    </header>
  );
};

export default Header;
