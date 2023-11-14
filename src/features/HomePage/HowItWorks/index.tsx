import "server-only";

import React from "react";
import {
  Bill,
  Calendar,
  Quote,
  Select,
  CurvedArrowDown,
  CurvedArrowUp,
} from "@icons";

const steps = [
  {
    icon: Quote,
    label: "Choisissez un service",
    description: "Donnez nous les détails sur ce dont vous avez besoin",
  },
  {
    icon: Calendar,
    label: "Donnez-nous vos disponibilités",
    description:
      "Vous pouvez nous fournir plusieurs dates qui vous arrangent afin que nous vous trouvions un professionel facilement",
  },
  {
    icon: Select,
    label: "On vous sélectionne un prestataire",
    description:
      "On vous trouve un prestataire disponible qui correspond à vos besoins",
  },
  {
    icon: Bill,
    label: "Obtenez votre prestation",
    description:
      "Payez, obtenez votre prestation puis évaluez la qualité de celle-ci sur notre plateforme",
  },
];

const HowItWorks: React.FC = () => {
  return (
    <section className="section-bg">
      <div className="container px-8">
        <h2 className="mb-8">Comment ça fonctionne ?</h2>
        <div className="flex justify-between items-center sm:items-start flex-col sm:flex-row">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <React.Fragment key={index}>
                <div className="mb-8 sm:mb-0 max-w-[320px] sm:w-1/5 flex flex-col items-center">
                  <div className="bg-white rounded-full drop-shadow-lg p-4">
                    <Icon />
                  </div>
                  <p className="font-semibold my-4 text-center">{step.label}</p>
                  <p className="text-slate-500 text-center">
                    {step.description}
                  </p>
                </div>
                {index !== steps.length - 1 && (
                  <div className="hidden place-self-center mx-2 sm:flex">
                    {index % 2 === 0 ? <CurvedArrowUp /> : <CurvedArrowDown />}
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
