"use client";

import React from "react";

interface IContactCardProps {
  title: string;
  description: string;
  contactInfo: string;
  children: React.ReactNode;
  icon: React.ReactNode;
}

const ContactCard: React.FC<IContactCardProps> = ({
  title,
  description,
  contactInfo,
  icon,
  children,
}) => {
  return (
    <div className="w-full md:w-1/2 lg:w-auto px-4 xl:px-10 mb-10 md:mb-0">
      <div className="max-w-sm mx-auto h-full py-8 px-6 bg-white border border-gray-200 rounded-5xl">
        <div className="max-w-2xs mx-auto text-center">
          <div className="flex justify-center mb-4">{icon}</div>
          <h3 className="text-xl font-bold mb-3">{title}</h3>
          <p className="text-slate-500 mb-3">{description}</p>
          <span className="block text-primary-100 mb-8">{contactInfo}</span>
          {children}
        </div>
      </div>
    </div>
  );
};

export default ContactCard;
