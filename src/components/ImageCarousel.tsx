import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const communityImages = Object.values(import.meta.glob('../assets/communityarts/*.jpg', { eager: true })).map(
  (mod: any) => mod.default
);

const brazilImages = Object.values(import.meta.glob('../assets/muradinbrazil/*.jpg', { eager: true })).map(
  (mod: any) => mod.default
);

const worldwideImages = Object.values(import.meta.glob('../assets/muradworldwide/*.jpg', { eager: true })).map(
  (mod: any) => mod.default
);

const createImageId = (category: string, index: number) => `${category}-${index}`;

const ImageCarousel: React.FC = () => {
  // Estado para armazenar a contagem de votos para cada imagem
  const [votes, setVotes] = useState<Record<string, number>>({});
  // Estado para rastrear em quais imagens o usuário já votou
  const [votedImages, setVotedImages] = useState<Record<string, boolean>>({});
  // Estado para controlar a ordenação por votos
  const [sortByVotes, setSortByVotes] = useState(false);

  // Carregar votos e imagens votadas do localStorage ao iniciar
  useEffect(() => {
    const savedVotes = localStorage.getItem('imageVotes');
    if (savedVotes) {
      setVotes(JSON.parse(savedVotes));
    }
    const savedVotedImages = localStorage.getItem('votedImages');
    if (savedVotedImages) {
      setVotedImages(JSON.parse(savedVotedImages));
    }
  }, []);

  // Salvar votos no localStorage quando mudam
  useEffect(() => {
    localStorage.setItem('imageVotes', JSON.stringify(votes));
  }, [votes]);

  // Salvar imagens votadas no localStorage quando mudam
  useEffect(() => {
    localStorage.setItem('votedImages', JSON.stringify(votedImages));
  }, [votedImages]);

  // Função para votar em uma imagem
  const handleVote = (imageId: string) => {
    // Verificar se o usuário já votou nesta imagem
    if (votedImages[imageId]) {
      return;
    }
    // Incrementar o contador de votos
    setVotes(prevVotes => ({
      ...prevVotes,
      [imageId]: (prevVotes[imageId] || 0) + 1
    }));
    // Marcar a imagem como votada por este usuário
    setVotedImages(prev => ({ ...prev, [imageId]: true }));
  };

  const renderCarousel = (title: string, images: string[], delay: number, category: string) => {
    // Criar um array com imagens e seus índices para ordenação
    let sortedImages = images.map((image, index) => ({ image, index }));
    
    // Ordenar imagens por número de votos se a opção estiver ativada
    if (sortByVotes) {
      sortedImages.sort((a, b) => {
        const votesA = votes[createImageId(category, a.index)] || 0;
        const votesB = votes[createImageId(category, b.index)] || 0;
        return votesB - votesA;
      });
    }

    return (
      <div className="mb-16">
        <h2 className="text-lg sm:text-2xl md:text-3xl font-bold text-white mb-4 sm:mb-6 text-center">
          {title}
        </h2>
        
        {/* Botão para alternar entre ordenação por votos e ordem original */}
        <div className="flex justify-center mb-4">
          <button
            onClick={() => setSortByVotes(!sortByVotes)}
            className="px-4 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600 transition-colors"
          >
            {sortByVotes ? 'Show Original Order' : 'Sort by Votes'}
          </button>
        </div>
        
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={16}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay }}
          loop={true}
          breakpoints={{
            640: { slidesPerView: 1, spaceBetween: 20 },
            768: { slidesPerView: 2, spaceBetween: 24 },
            1024: { slidesPerView: 3, spaceBetween: 30 },
          }}
          className="rounded-xl sm:rounded-2xl overflow-hidden shadow-xl"
        >
          {sortedImages.map(({ image, index }) => {
            const imageId = createImageId(category, index);
            const voteCount = votes[imageId] || 0;
            const hasVoted = votedImages[imageId] || false;
            return (
              <SwiperSlide key={index} className="flex flex-col justify-center items-center relative">
                <img
                  src={image}
                  alt={`Slide ${index + 1}`}
                  className="w-full h-auto max-h-[40vh] sm:max-h-[55vh] md:max-h-[70vh] object-contain block"
                  loading="lazy"
                />
                <div className="vote-container absolute bottom-4 right-4 bg-black bg-opacity-70 rounded-lg p-2 flex items-center">
                  <span className="text-white mr-2">{voteCount} votes</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleVote(imageId);
                    }}
                    className={`bg-pink-500 hover:bg-pink-600 text-white px-3 py-1 rounded-md transition-colors ${hasVoted ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={hasVoted}
                  >
                    {hasVoted ? 'Voted' : 'Vote'}
                  </button>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    );
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-2 sm:px-4 my-8 sm:my-16">
      {renderCarousel('Murad Collection: Knowing the World', worldwideImages, 4000, 'worldwide')}
      {renderCarousel('Murad Collection: in Brazil', brazilImages, 4500, 'brazil')}
      {renderCarousel('Arts and memes created by the community, create yours too!', communityImages, 5000, 'community')}

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
        .vote-container {
          z-index: 10;
        }
      `}</style>
    </div>
  );
};

export default ImageCarousel;
