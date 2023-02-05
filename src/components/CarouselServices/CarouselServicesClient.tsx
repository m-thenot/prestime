"use client";

import { SwiperSlide } from "swiper/react";
import Carousel from "../Carousel";
import Image from "next/image";
import Button from "../Button";
import { IService } from "types/service";

interface ICarouselServicesClientProps {
  services: IService[];
  title?: string;
}

const CarouselServicesClient: React.FC<ICarouselServicesClientProps> = ({
  services,
  title,
}) => {
  return (
    <section className="section-white py-12">
      <Carousel
        slidesPerView={2}
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
        }}
      >
        {services.map((service) => (
          <SwiperSlide key={service.id}>
            <div className="drop-shadow-lg bg-white my-4 rounded-lg w-fit mx-2">
              <Image
                src="https://vntdjmqkmksxybhxvyha.supabase.co/storage/v1/object/sign/services-images/services/paint.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJzZXJ2aWNlcy1pbWFnZXMvc2VydmljZXMvcGFpbnQucG5nIiwiaWF0IjoxNjc1NTg4OTA5LCJleHAiOjE2NzYxOTM3MDl9.zBPdwetWbOgPTswgMU_w1Ojc6SS8sSrOIz0u0JinuXU&t=2023-02-05T09%3A21%3A49.099Z"
                alt=""
                width={270}
                height={320}
                className="rounded-t-lg"
              />
              <div className="px-4 py-3">
                <p className="font-medium">{service.title}</p>
                <Button variant="secondary" className="w-full mt-3">
                  Réserver
                </Button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Carousel>
    </section>
  );
};

export default CarouselServicesClient;
