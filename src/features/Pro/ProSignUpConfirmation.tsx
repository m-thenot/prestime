import "server-only";
import React from "react";
import { Check } from "@icons";

const ProSignUpConfirmation: React.FC = () => {
  return (
    <div className="container">
      <div className="flex flex-col items-center justify-center max-w-md mx-auto min-h-[400px]">
        <div className="p-3 rounded-full border-4 border-green-500 mb-2">
          <Check width={23} height={23} />
        </div>
        <h1 className="my-3 text-center">Merci pour votre inscription !</h1>
        <p className="mt-2">
          Votre demande d&lsquo;inscription a bien été enregistrée. Nous sommes
          ravis de vous accueillir parmi nos membres.
        </p>
        <p>
          Nous allons prendre en contact avec vous prochainement pour compléter
          votre profil et finaliser votre inscription.
        </p>
      </div>
    </div>
  );
};

export default ProSignUpConfirmation;
