"use client";

import Button from "@components/Button";
import React from "react";

const BecomePro: React.FC = () => {
  return (
    <section className="section-bg flex flex-col items-center">
      <p className="font-bold">Vous êtes un professionel ?</p>
      <p className="my-6 max-w-[400px] text-center">
        Rejoingnez-nous, et nous vous aiderons à trouver des clients et
        développer votre business.
      </p>
      <Button>Nous rejoindre</Button>
    </section>
  );
};

export default BecomePro;
