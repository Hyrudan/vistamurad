// src/components/Hero/HeroSlides.tsx

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

type HeroSlidesProps = {
  slides: {
    title: React.ReactNode;
    description: React.ReactNode;
    showCountdown: boolean;
  }[];
  timeLeft: { days: number; hours: number; minutes: number; seconds: number };
};

// HeroSlides component: displays a carousel of slides with optional countdown
export const HeroSlides: React.FC<HeroSlidesProps> = ({ slides, timeLeft }) => {
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
            {/* Slide title */}
            <div className="text-center">
              {slide.title}
            </div>
            {/* Slide description */}
            <div className="mt-4 text-center px-2 sm:px-4">
              {slide.description}
            </div>
            {/* Optional countdown section */}
            {slide.showCountdown && (
              <div className="text-center text-white font-bold text-base xs:text-lg sm:text-xl mt-6">
                Countdown to Snapshot:
                <div className="text-2xl xs:text-3xl mt-2 font-mono tracking-wide">
                  {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
                </div>
              </div>
            )}
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default HeroSlides;
