"use client";

import { LinkButton } from "@components/Button";
import React from "react";

const BecomePro: React.FC = () => {
  return (
    <section className="section-bg">
      <div className="container flex flex-col items-center px-8">
        <p className="font-bold mb-0">Vous êtes un professionel ?</p>
        <p className="my-6 max-w-[400px] text-center">
          Rejoingnez-nous, et nous vous aiderons à trouver des clients et
          développer votre business.
        </p>
        <LinkButton href="/pro/sign-up">Nous rejoindre</LinkButton>
      </div>
    </section>
  );
};

export default BecomePro;
