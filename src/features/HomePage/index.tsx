"use client";

import { ICategory } from "types/category";

import Banner from "./Banner";

interface IHomePageProps {
  categories: Omit<ICategory, "services">[];
}

const HomePage: React.FC<IHomePageProps> = ({ categories }) => {
  return (
    <>
      <Banner />
    </>
  );
};

export default HomePage;
