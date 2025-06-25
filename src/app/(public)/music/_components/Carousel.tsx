"use client";

import { FC, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  EffectCoverflow,
  Navigation,
  Pagination,
  Autoplay,
} from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Card } from "./Card";
import { featuredMediaList } from "../data/featuredMedia";

export const Carousel: FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="w-full h-min-screen flex justify-center">
      <Swiper
        effect="coverflow"
        grabCursor={true}
        centeredSlides={true}
        loop={true}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        slidesPerView="auto"
        spaceBetween={-20}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 300,
          modifier: 1.2,
          slideShadows: false,
        }}
        pagination={{ clickable: true }}
        navigation={true}
        modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
        className=""
      >
        {featuredMediaList.map((item, index) => (
          <SwiperSlide
            key={index}
            className={`!w-[300px] md:!w-[350px] lg:!w-[400px] transition-all duration-500 ${
              index === activeIndex
                ? "opacity-100 scale-85"
                : "opacity-90 scale-95"
            }`}
          >
            <Card
              imageSrc={item.imageSrc}
              title={item.title}
              subtitle={item.subtitle}
              links={item.links}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* ✅ Estilos globais aplicados localmente */}
      <style jsx global>{`
        /* Pagination (dots) */
        .swiper-pagination {
        }

        .swiper-pagination-bullet {
          background-color: #cbd5e1 !important;
          opacity: 1;
          width: 10px;
          height: 10px;
          margin: 0 6px !important;
          border-radius: 9999px;
          transition: background-color 0.3s ease;
        }

        .swiper-pagination-bullet-active {
          background-color: #868686 !important;
        }

        /* Arrows */
        .swiper-button-prev,
        .swiper-button-next {
          color: #e4e4e4 !important;
          border-radius: 100%;
          width: 40px;
          height: 40px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }

        .swiper-button-prev:hover,
        .swiper-button-next:hover {
          color: #868686 !important;
        }

        .swiper-button-prev::after,
        .swiper-button-next::after {
          font-size: 18px !important;
          font-weight: bold;
        }
        /* Esconde setas em telas menores que 768px */
        @media (max-width: 767px) {
          .swiper-button-prev,
          .swiper-button-next {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
};
