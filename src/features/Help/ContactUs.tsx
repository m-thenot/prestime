"use client";
import { LinkButton } from "@components/Button";
import Tag from "@components/Tag";
import theme from "constants/theme";
import { Email } from "icons/Email";
import { Message } from "icons/Message";
import { WhatsApp } from "icons/WhatsApp";
import React from "react";
import ContactCard from "./ContactCard";

const ContactUs = () => {
  return (
    <>
      <div className="container flex flex-col items-center mt-5">
        <Tag text="Contactez-nous" />
        <h1 className="text-center mt-2 max-w-md">
          Quelque chose n&lsquo;est pas clair ? Vous avez besoin d&lsquo;aide ?
        </h1>
        <p className="text-slate-500 mt-3">
          Contactez-nous et nous ferons de notre mieux pour vous aider.
        </p>
      </div>
      <div className="flex flex-wrap justify-center -mx-4 mt-6 sm:mt-16">
        <ContactCard
          title="Contactez-nous par message"
          description="Vous pouvez nous contacter sur notre What&lsquo;s App au numéro
            suivant:"
          contactInfo={process.env.NEXT_PUBLIC_PHONE_NUMBER!}
          icon={<Message width={36} height={36} />}
        >
          <LinkButton
            variant="secondary"
            href={process.env.NEXT_PUBLIC_WHATSAPP_LINK!}
          >
            <span className="mr-4">Nous contacter</span>
            <WhatsApp color={theme.colors.primary[100]} />
          </LinkButton>
        </ContactCard>
        <ContactCard
          title="Contactez-nous par email"
          description="Vous pouvez nous écrire par email à l'adresse suivant:"
          contactInfo={process.env.NEXT_PUBLIC_CONTACT_EMAIL!}
          icon={<Email width={36} height={36} />}
        >
          <LinkButton
            variant="secondary"
            href={`mailto: ${process.env.NEXT_PUBLIC_CONTACT_EMAIL!}`}
          >
            <span className="mr-4">Nous écrire</span>
          </LinkButton>
        </ContactCard>
      </div>
    </>
  );
};

export default ContactUs;
