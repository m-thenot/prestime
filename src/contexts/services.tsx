"use client";
import React, { createContext, useContext } from "react";
import { ICategoryWithServices } from "types/category";

interface IServicesContext {
  categories: ICategoryWithServices[];
}

export const ServicesContext = createContext<IServicesContext>({
  categories: [],
});

const ServicesProvider = ({
  children,
  categories,
}: {
  children: React.ReactNode;
  categories: ICategoryWithServices[];
}) => {
  return (
    <ServicesContext.Provider value={{ categories }}>
      {children}
    </ServicesContext.Provider>
  );
};

const useServices = () => useContext(ServicesContext);

export { useServices, ServicesProvider };
