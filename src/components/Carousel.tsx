import { Swiper } from "swiper/react";
import { Navigation, Pagination, Thumbs, A11y, SwiperOptions } from "swiper";
import React, { useRef } from "react";
import { NavigationOptions } from "swiper/types";
import { Arrow } from "@icons";

interface ICarouselProps {
  children: React.ReactNode;
  title?: string;
  spaceBetween: number;
  slidesPerView: number;
  breakpoints?: SwiperOptions["breakpoints"];
}

const Carousel: React.FC<ICarouselProps> = ({
  children,
  title = "",
  spaceBetween,
  slidesPerView,
  breakpoints,
}) => {
  const navigationNextRef = useRef<HTMLButtonElement>(null);
  const navigationPrevRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      <div className="flex justify-between">
        <h2 className="mb-4">{title}</h2>
        <div className="hidden sm:block">
          <button
            ref={navigationPrevRef}
            aria-label="précédent"
            className="drop-shadow-lg rounded-full bg-white p-1 disabled:opacity-50"
          >
            <Arrow headDirection="left" />
          </button>
          <button
            ref={navigationNextRef}
            aria-label="suivant"
            className="drop-shadow-lg rounded-full bg-white p-1 ml-2 disabled:opacity-50"
          >
            <Arrow />
          </button>
        </div>
      </div>
      <Swiper
        modules={[Navigation, Pagination, Thumbs, A11y]}
        spaceBetween={spaceBetween}
        slidesPerView={slidesPerView}
        breakpoints={breakpoints}
        navigation={{
          prevEl: navigationPrevRef.current,
          nextEl: navigationNextRef.current,
        }}
        onBeforeInit={(swiper) => {
          (swiper.params.navigation as NavigationOptions).nextEl =
            navigationNextRef.current;
          (swiper.params.navigation as NavigationOptions).prevEl =
            navigationPrevRef.current;
        }}
        a11y={{
          prevSlideMessage: "précédent",
          nextSlideMessage: "suivant",
        }}
      >
        {children}
      </Swiper>
    </>
  );
};

export default Carousel;
