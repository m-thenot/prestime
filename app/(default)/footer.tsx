import { Facebook, Twitter } from "@icons";
import Link from "next/link";
import React from "react";

const legalLinks = [
  /* {
    label: "Mentions légales",
    href: "/legal/notices",
  },
  {
    label: "CGU",
    href: "/legal/terms-and-conditions",
  }, */
  {
    label: "Politique de confidentialité",
    href: "/legal/privacy-policy",
  },
];

const SocialNetworks = ({ label }: { label: string }) => (
  <>
    <p className="font-bold mb-5 sm:mb-3">{label}</p>
    <div className="flex">
      <Link href="" className="mr-6 sm:mr-3">
        <Facebook />
      </Link>
      <Link href="">
        <Twitter />
      </Link>
    </div>
  </>
);

const Footer: React.FC = () => {
  return (
    <footer className="bg-background w-screen">
      <div className="pt-12 pb-6 container bg-background rounded">
        <div className="flex justify-between">
          <p className="font-bold text-xl hidden sm:flex">Easy Service</p>

          <div className="flex justify-between w-full sm:w-auto">
            <div className="flex flex-col sm:ml-16">
              <p className="font-bold mb-3">Besoin d&lsquo;aide</p>
              <Link href="/help/faq" className="mb-2">
                FAQ
              </Link>
              <Link href="/help/contact">Nous contacter</Link>
            </div>
            <div className="flex flex-col sm:ml-16">
              <p className="font-bold mb-3">À propos</p>
              <Link href="/about-us" className="mb-2">
                Qui sommes-nous ?
              </Link>
            </div>
            <div className="hidden sm:block ml-16">
              <SocialNetworks label="Réseaux sociaux" />
            </div>
          </div>
        </div>
        <hr className="sm:hidden bg-background my-8" />
        <div className="sm:hidden flex flex-col items-center">
          <SocialNetworks label="Suivez-nous" />
        </div>

        <div className="flex flex-col-reverse sm:flex-row items-center mt-16">
          <p className="text-sm mr-6 mt-6 sm:mt-0 mb-0">
            Tous droits réservés © 2023
          </p>
          {legalLinks.map((link) => (
            <Link href={link.href} key={link.href} className="text-sm mr-6">
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
