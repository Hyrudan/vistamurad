import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

type HeroSlidesProps = {
  slides: {
    title: React.ReactNode;
    description: React.ReactNode;
    showCountdown: boolean;
  }[];
  timeLeft: { days: number; hours: number; minutes: number; seconds: number };
};

export function HeroSlides({ slides, timeLeft }: HeroSlidesProps) {
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
          <div>
            <h1 className="text-xl xs:text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-extrabold text-white leading-snug xs:leading-tight mb-2 sm:mb-4 break-words">
              {slide.title}
            </h1>
            <p className="text-sm xs:text-base sm:text-lg md:text-xl text-pink-100 mb-4 sm:mb-8 break-words">
              {slide.description}
            </p>
            {slide.showCountdown && (
              <div className="text-white font-bold text-base xs:text-lg sm:text-xl mb-5">
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
}
