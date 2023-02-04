"use client";

import { ICategory } from "types/category";

import Banner from "./Banner";
import BecomePro from "./BecomePro";
import HowItWorks from "./HowItWorks";

interface IHomePageProps {
  categories: Omit<ICategory, "services">[];
}

const HomePage: React.FC<IHomePageProps> = ({ categories }) => {
  return (
    <>
      <Banner />
      <HowItWorks />
      <BecomePro />
    </>
  );
};

export default HomePage;
