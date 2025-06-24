// src/app/(public)/music/_components/highlightCarousel/HighlightCarousel.tsx
"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import { EffectCoverflow, Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { HighlightCard } from "./HighlightCard";
import { HighlightCardData } from "@/app/(public)/music/types/highlightCard";

// Importe o novo arquivo CSS para os estilos customizados do Swiper
import "./HighlightCarousel.css"; // NOVO: Importar CSS customizado
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

interface HighlightCarouselProps {
  cards: HighlightCardData[];
}

export const HighlightCarousel: React.FC<HighlightCarouselProps> = ({
  cards,
}) => {
  if (cards.length === 0) {
    return null;
  }

  return (
    <div className="relative w-full ">
      <Swiper
        modules={[EffectCoverflow, Pagination, Navigation]}
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        loop={true}
        slidesPerView={1.2}
        spaceBetween={50}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 2.5,
          slideShadows: false,
        }}
        pagination={{
          el: ".swiper-pagination",
          clickable: true,
          bulletActiveClass: "swiper-pagination-bullet-active-custom", // NOVA CLASSE ATIVA
          bulletClass: "swiper-pagination-bullet-custom", // NOVA CLASSE BÁSICA
        }}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        className="swiper_container"
        breakpoints={{
          320: {
            slidesPerView: 1.1,
            spaceBetween: 20,
          },
          640: {
            slidesPerView: 1.3,
            spaceBetween: 30,
          },
          768: {
            slidesPerView: 1.5,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 1.8,
            spaceBetween: 50,
          },
          1280: {
            slidesPerView: 2.2,
            spaceBetween: 60,
          },
        }}
      >
        {cards.map((cardData) => (
          <SwiperSlide key={cardData.id}>
            {({ isActive }) => (
              <div
                className={`
                  flex justify-center items-center h-full mb-4
                  ${isActive ? "scale-100 z-10" : "scale-95 opacity-80 z-0"}
                  transition-all duration-300 ease-in-out
                `}
                style={{
                  minHeight: "250px",
                  boxShadow: isActive
                    ? "0px 15px 30px rgba(0, 0, 0, 0.01)"
                    : "none",
                }}
              >
                <HighlightCard data={cardData} />
              </div>
            )}
          </SwiperSlide>
        ))}

        {/* CONTROLES DO SLIDER: PAGINAÇÃO E NAVEGAÇÃO NA PARTE DE BAIXO */}
        <div className="slider-controler flex justify-center items-center mt-6 space-x-4">
          {/* Botões de Navegação - Posicionamento e Estilo */}
          <button className="swiper-button-prev slider-arrow cursor-pointer  flex items-center justify-center"></button>

          {/* Paginação (Pontos) */}
          <div className="swiper-pagination relative w-[auto] bottom-0 !m-0"></div>

          <button className="swiper-button-next slider-arrow cursor-pointer  flex items-center justify-center"></button>
        </div>
      </Swiper>
    </div>
  );
};
