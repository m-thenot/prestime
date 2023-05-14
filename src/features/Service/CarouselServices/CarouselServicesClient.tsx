"use client";

import { SwiperSlide } from "swiper/react";
import Carousel from "@components/Carousel";
import { IService } from "types/service";
import ServiceCard from "@features/Service/ServiceCard";

interface ICarouselServicesClientProps {
  services: IService[];
  title?: string;
}

const CarouselServicesClient: React.FC<ICarouselServicesClientProps> = ({
  services,
  title,
}) => {
  return (
    <section className="py-6 sm:py-12">
      <Carousel
        slidesPerView={1.3}
        spaceBetween={10}
        title={title}
        breakpoints={{
          1024: {
            spaceBetween: 40,
            slidesPerView: 4,
          },
          640: {
            spaceBetween: 20,
            slidesPerView: 3,
          },
          420: {
            slidesPerView: 2,
          },
        }}
      >
        {services.map((service) => (
          <SwiperSlide key={service.id}>
            <ServiceCard service={service} />
          </SwiperSlide>
        ))}
      </Carousel>
    </section>
  );
};

export default CarouselServicesClient;
