"use client";

import Button from "@components/Button";
import { useServices } from "@contexts/services";
import { Arrow } from "@icons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const ServicesNavigation: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { categories } = useServices();
  const pathname = usePathname();

  const toggleMenu = () => {
    if (!isMenuOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    setIsMenuOpen((prev) => !prev);
  };

  useEffect(() => {
    if (isMenuOpen) {
      toggleMenu();
    }
  }, [pathname]);

  return (
    <>
      <Button
        variant="transparent"
        className="hidden sm:block"
        onClick={toggleMenu}
      >
        Services
      </Button>
      <nav
        className={`w-screen h-screen fixed top-0 left-0 z-50 bg-white p-7 pt-12 transform duration-500 transition-transform ${
          isMenuOpen ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="flex items-center justify-between mb-7 max-w-5xl m-auto">
          <Button
            variant="link"
            onClick={toggleMenu}
            className="flex items-center"
          >
            <Arrow headDirection="left" />
            Retour
          </Button>
          <h2 className="text-center">Tous les services</h2>
          <span />
        </div>

        <div className="grid grid-cols-3 gap-4 max-w-5xl m-auto">
          {categories.map((category) => (
            <div
              key={category.id}
              className="rounded-lg border border-slate-200 w-full px-6 py-6 flex flex-col mb-4"
            >
              <Link
                href={`/services/${category.slug}`}
                className="mb-3 font-bold"
              >
                {category.title}
              </Link>
              {category.services.map((service) => (
                <Link
                  key={service.id}
                  href={`/services/${service.slug}`}
                  className="mb-2"
                >
                  {service.title}
                </Link>
              ))}
            </div>
          ))}
        </div>
      </nav>
    </>
  );
};

export default ServicesNavigation;
