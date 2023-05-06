"use client";
import { LinkButton } from "@components/Button";

const NotFound = () => {
  return (
    <section className="flex items-center h-full p-16">
      <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
        <div className="max-w-md text-center">
          <h2 className="mb-8 font-extrabold text-9xl ">
            <span className="sr-only">Erreur</span>404
          </h2>
          <p className="text-xl font-semibold">
            Désolé, la page que vous recherchez est introuvable.
          </p>
          <p className="mt-4 mb-8 text-gray-500">
            Veuillez vérifier l&lsquo;URL ou retourner à la page
            d&lsquo;accueil.
          </p>

          <LinkButton href={"/"}>
            Retourner sur la page d&lsquo;accueil
          </LinkButton>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
