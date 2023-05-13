import { HamburgerMenu } from "icons/HamburgerMenu";
import React, { useState } from "react";
import Button from "./Button";
import { LinkButton } from "@components/Button";
import { useServices } from "@contexts/services";
import { Arrow, Chevron, Close } from "@icons";
import { ICategoryWithServices } from "types/category";
import { WhatsApp } from "icons/WhatsApp";
import colors from "tailwindcss/colors";
import Link from "next/link";

const MobileMenu = () => {
  const { categories } = useServices();
  const [isOpen, setIsOpen] = useState(false);
  const [activeCategory, setActiveCategory] =
    useState<null | ICategoryWithServices>(null);

  const toggleMenu = () => {
    if (!isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    setIsOpen(!isOpen);
    setActiveCategory(null);
  };

  return (
    <>
      <Button
        variant="transparent"
        className="block sm:hidden pr-0"
        onClick={toggleMenu}
      >
        <HamburgerMenu width={32} height={32} />
      </Button>
      <Button
        variant="none"
        className={`${
          isOpen ? "block" : "hidden"
        } z-50 fixed top-5 right-5 bg-white rounded-full p-3`}
        onClick={toggleMenu}
      >
        <Close />
      </Button>

      <div
        className={`fixed top-0 left-0 w-full h-full bg-gray-900 z-40 opacity-25 ${
          isOpen ? "block" : "hidden"
        }`}
        onClick={toggleMenu}
      />
      <nav
        className={`fixed top-0 left-0 w-9/12 h-full bg-white z-50 transform transition-transform pt-6 px-6 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className={`${activeCategory ? "hidden" : "block"}`}>
          <LinkButton href="/login">Se connecter</LinkButton>

          <LinkButton href="/sign-up" variant="secondary" className="mt-3">
            S&lsquo;inscrire
          </LinkButton>

          <div className="border-t border-slate-200 my-6" />

          <p className="text-xl font-bold">Nos services</p>
          {categories.map((category) => (
            <button
              type="button"
              key={category.id}
              onClick={() => setActiveCategory(category)}
              className="py-2 flex justify-between items-center w-full"
            >
              <span>{category.title} </span>
              <Chevron />
            </button>
          ))}

          <div className="border-t border-slate-200 my-6" />

          <p className="text-xl font-bold mb-4">Besoin d&lsquo;aide ?</p>

          <Link
            href={process.env.NEXT_PUBLIC_WHATSAPP_LINK!}
            className="flex items-center"
          >
            <span className="mr-4 underline">Nous contacter</span>
            <WhatsApp color={colors.black} />
          </Link>
        </div>

        <div
          className={`w-full h-full bg-white z-50 transform transition-transform ${
            activeCategory ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {activeCategory && (
            <>
              <Button
                variant="transparent"
                onClick={() => setActiveCategory(null)}
                className="mb-5 flex items-center px-0"
              >
                <Arrow headDirection="left" />
                <span className="ml-3">Retour</span>
              </Button>

              <p className="mb-2 font-semibold">{activeCategory.title}</p>

              {activeCategory?.services.map((service) => (
                <LinkButton
                  variant="transparent"
                  key={service.id}
                  href={`/services/${service.slug}`}
                  className="py-2 flex justify-between items-center w-full font-normal px-0"
                >
                  <span>{service.title} </span>
                  <Chevron />
                </LinkButton>
              ))}
            </>
          )}
        </div>
      </nav>
    </>
  );
};

export default MobileMenu;
