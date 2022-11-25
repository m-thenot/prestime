"use client";

import { Database } from "types/database";

import Banner from "./Banner";

type Category = Database["public"]["Tables"]["categories"]["Row"];

interface IHomePageProps {
  categories: Omit<Category, "services">[];
}

const HomePage: React.FC<IHomePageProps> = ({ categories }) => {
  return (
    <>
      <Banner />
    </>
  );
};

export default HomePage;
