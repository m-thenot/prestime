import "server-only";

import { getAllServicesByCategory } from "@services/service";
import { ICategory } from "types/category";
import CarouselServicesClient from "./CarouselServicesClient";

interface ICarouselServicesProps {
  category: Omit<ICategory, "services" | "slug">;
}

//@ts-expect-error Server Component
const CarouselServices: React.FC<ICarouselServicesProps> = async ({
  category,
}) => {
  const services = await getAllServicesByCategory(category.id);

  if (services && services.length === 0) {
    return null;
  }

  return <CarouselServicesClient services={services} title={category.title} />;
};

export default CarouselServices;
