"use client";

import { LinkButton } from "@components/Button";
import { useUser } from "@contexts/user";
import Link from "next/link";
import { Account } from "@icons";
import MobileMenu from "@components/MobileMenu";
import ServicesNavigation from "@features/Service/ServicesNavigation";
import { proAccountRoutes, userAccountRoutes } from "@utils/user";
import LogOutButton from "@features/Authentification/LogOutButton";
import { UserType } from "types/user";
import Logo from "@images/full_logo.png";
import LogoMobile from "@images/logo.png";
import Image from "next/image";

const Header: React.FC = () => {
  const { user } = useUser();
  const routes =
    user?.type === UserType.CUSTOMER ? userAccountRoutes : proAccountRoutes;

  return (
    <header className="container items-center flex justify-between mb-8 sm:mb-12">
      <Link
        href="/"
        className="text-xl sm:text-2xl font-extrabold hover:no-underline translate-y-1"
      >
        <div className="hidden sm:block">
          <Image src={Logo} alt="" priority width={150} height={39} />
        </div>
        <div className="sm:hidden">
          <Image src={LogoMobile} alt="" priority width={50} height={50} />
        </div>
      </Link>

      {user?.type !== UserType.PROVIDER && <ServicesNavigation />}

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
            {routes.map((route) => (
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
