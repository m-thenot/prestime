"use client";
import { Less } from "icons/Less";
import { Plus } from "icons/Plus";
import React, { useState } from "react";
import RichText from "./RichText";
import { IFaqFields } from "types/contentful";

interface IFaqProps {
  options: IFaqFields[];
  hasTitle?: boolean;
  hasParent?: boolean;
}

interface ILineItemProps {
  option: IFaqFields;
}

const LineItem: React.FC<ILineItemProps> = ({ option }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <button
      onClick={() => setIsOpen((prev) => !prev)}
      className="flex mb-4 pb-4 group w-full items-start justify-between border-b border-gray-100 text-left"
    >
      <div className="w-full">
        <div className="flex items-center justify-between mb-4 w-full">
          <h3
            className={`text-lg font-semibold pr-3 ${
              isOpen ? "text-primary-100" : ""
            }`}
          >
            {option.question}
          </h3>
          <div>{isOpen ? <Less /> : <Plus />}</div>
        </div>
        {isOpen && (
          <RichText
            document={option.answer.json}
            textClassName="text-md text-slate-500 mb-3"
          />
        )}
      </div>
    </button>
  );
};

const Faq: React.FC<IFaqProps> = ({
  options,
  hasTitle = true,
  hasParent = false,
}) => {
  return (
    <section className={`${hasParent ? "" : "section-bg"}`}>
      <div
        className={`${
          hasParent ? "" : "container"
        }  flex flex-col items-center`}
      >
        <div className="py-6 sm:pt-16 px-6 sm:px-12 sm:pb-12 bg-white rounded-4xl sm:shadow-lg rounded w-full sm:w-10/12">
          {hasTitle && <h2 className="mb-8 text-center">FAQ</h2>}
          {options.map((o) => (
            <LineItem option={o} key={o.question} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Faq;
