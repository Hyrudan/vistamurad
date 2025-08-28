import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

type HeroSlidesProps = {
  slides: {
    title: React.ReactNode;
    description: React.ReactNode;
  }[];
};

export const HeroSlides: React.FC<HeroSlidesProps> = ({ slides }) => {
  return (
    <Swiper
      modules={[Autoplay, Pagination]}
      autoplay={{ delay: 7000, disableOnInteraction: false }}
      pagination={{ clickable: true }}
      loop
      className="mb-6"
    >
      {slides.map((slide, idx) => (
        <SwiperSlide key={idx}>
          <div className="px-4 py-6 sm:px-6 sm:py-8">
            <div className="text-center">
              {slide.title}
            </div>
            <div className="mt-4 text-center px-2 sm:px-4">
              {slide.description}
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default HeroSlides;
