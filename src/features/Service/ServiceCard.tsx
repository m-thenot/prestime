"use client";
import React from "react";
import { LinkButton } from "@components/Button";
import { IService } from "types/service";
import Image from "next/image";

interface IServiceCard {
  service: IService;
}

const ServiceCard: React.FC<IServiceCard> = ({ service }) => {
  return (
    <div
      className="drop-shadow-lg bg-white my-4 rounded-lg w-fit mx-2"
      style={{ position: "relative" }}
    >
      <Image
        src={service.image}
        alt=""
        width={270}
        height={320}
        className="rounded-t-lg"
      />
      <div className="px-4 py-3">
        <p className="font-medium">{service.title}</p>
        <LinkButton
          href={`/booking/${service.slug}`}
          variant="secondary"
          className="w-full mt-3"
        >
          Réserver
        </LinkButton>
      </div>
    </div>
  );
};

export default ServiceCard;
