import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const images: string[] = [
  'https://i.ibb.co/jPYpNSZW/greens.jpg',
  'https://i.ibb.co/2LNJd7H/mill.jpg',
  'https://i.ibb.co/mFbFx35f/murads.jpg',
  'https://i.ibb.co/RksxtSZH/spx.jpg',
  'https://i.ibb.co/BHMv6BCP/spxvista.jpg',
  'https://i.ibb.co/hFbZfpbk/surprised.jpg',
  'https://i.ibb.co/pNvM6Yz/vistabuy.jpg',
  'https://i.ibb.co/VWNdy1rw/new-logo.jpg',
  'https://i.ibb.co/tpv053wT/supercycle.jpg',
  'https://i.ibb.co/FqW3DkzD/muradcartoon.jpg',
  'https://i.ibb.co/BVXgvGTB/cartoon.jpg',
  'https://i.ibb.co/h1xsZwcy/buybuy.jpg',
  'https://i.ibb.co/6cZvCHMt/didusay.jpg'
];

const ImageCarousel: React.FC = () => {
  return (
    <div className="w-full max-w-4xl mx-auto px-2 sm:px-4 my-8 sm:my-16">
      <h2 className="text-lg sm:text-2xl md:text-3xl font-bold text-white mb-4 sm:mb-6 text-center">
        Arts and memes created by the community, create yours too!
      </h2>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={16}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000 }}
        loop={true}
        breakpoints={{
          640: { slidesPerView: 1, spaceBetween: 20 },
          768: { slidesPerView: 2, spaceBetween: 24 },
          1024: { slidesPerView: 3, spaceBetween: 30 },
        }}
        className="rounded-xl sm:rounded-2xl overflow-hidden shadow-xl"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index} className="flex justify-center items-center">
            <img
              src={image}
              alt={`Slide ${index + 1}`}
              className="w-full h-auto max-h-[40vh] sm:max-h-[55vh] md:max-h-[70vh] object-contain block"
              loading="lazy"
            />
          </SwiperSlide>
        ))}
      </Swiper>
      {/* Swiper navigation and pagination custom styles */}
      <style jsx global>{`
        .swiper-button-next,
        .swiper-button-prev {
          color: #fff;
          width: 32px;
          height: 32px;
        }
        @media (max-width: 640px) {
          .swiper-button-next,
          .swiper-button-prev {
            width: 24px !important;
            height: 24px !important;
          }
        }
        .swiper-pagination-bullet {
          background: #f472b6;
          opacity: 0.7;
        }
        .swiper-pagination-bullet-active {
          background: #db2777;
        }
      `}</style>
    </div>
  );
};

export default ImageCarousel;
