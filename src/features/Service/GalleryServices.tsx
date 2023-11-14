import { getAllServicesByCategory } from "@services/service";
import ServiceCard from "./ServiceCard";

interface IGalleryServicesProps {
  categoryId: number;
}

//@ts-expect-error Server Component
const GalleryServices: React.FC<IGalleryServicesProps> = async ({
  categoryId,
}) => {
  const services = await getAllServicesByCategory(categoryId);

  return (
    <section className="container py-12">
      <h2 className="mb-4">Nos cours particuliers</h2>
      <div className="grid justify-between gap-3 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {services.map((service) => (
          <ServiceCard service={service} key={service.id} />
        ))}
      </div>
    </section>
  );
};

export default GalleryServices;
