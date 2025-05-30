import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import OptimizedImage from './OptimizedImage';
import VoteButton from './VoteButton';
import VotersList from './VotersList';

interface VoteData {
  totalVotes: number;
  voters: string[];
}

interface CarouselSectionProps {
  title: string;
  images: string[];
  delay: number;
  category: string;
  votes: Record<string, VoteData>;
  currentUser: string | null | undefined;
  hasUserVoted: (imageId: string) => boolean;
  handleVote: (imageId: string) => void;
  loadedImages: Set<string>;
  handleImageLoad: (imageId: string) => void;
  sortByVotes: boolean;
  setSortByVotes: (v: boolean) => void;
}

// Helper to create unique image IDs for voting
const createImageId = (category: string, index: number) => `${category}-${index}`;

// CarouselSection renders a Swiper carousel for a specific image set and voting logic.
const CarouselSection: React.FC<CarouselSectionProps> = ({
  title,
  images,
  delay,
  category,
  votes,
  currentUser,
  hasUserVoted,
  handleVote,
  loadedImages,
  handleImageLoad,
  sortByVotes,
  setSortByVotes,
}) => {
  // Sort images by votes if enabled
  let sortedImages = images.map((image, index) => ({ image, index }));

  if (sortByVotes) {
    sortedImages.sort((a, b) => {
      const votesA = votes[createImageId(category, a.index)]?.totalVotes || 0;
      const votesB = votes[createImageId(category, b.index)]?.totalVotes || 0;
      return votesB - votesA;
    });
  }

  return (
    <div className="mb-16">
      <h2 className="text-lg sm:text-2xl md:text-3xl font-bold text-white mb-4 sm:mb-6 text-center">
        {title}
      </h2>
      <div className="flex justify-center items-center gap-4 mb-4 flex-wrap">
        {currentUser ? (
          <div className="flex items-center gap-2 px-3 py-1 bg-green-600 text-white rounded-lg text-sm">
            <span>Logged as: {currentUser}</span>
          </div>
        ) : (
          <div className="px-3 py-1 bg-yellow-600 text-white rounded-lg text-sm">
            Login required to vote
          </div>
        )}
        <button
          onClick={() => setSortByVotes(!sortByVotes)}
          className="px-4 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600 transition-colors"
        >
          {sortByVotes ? 'Show Original Order' : 'Sort by Votes'}
        </button>
      </div>
      <Swiper
        modules={[Navigation, Autoplay]} // No Pagination module!
        spaceBetween={16}
        slidesPerView={1}
        navigation
        autoplay={{
          delay,
          pauseOnMouseEnter: true,
          disableOnInteraction: false,
        }}
        loop={true}
        // No 'pagination' prop here!
        breakpoints={{
          640: { slidesPerView: 1, spaceBetween: 20 },
          768: { slidesPerView: 2, spaceBetween: 24 },
          1024: { slidesPerView: 3, spaceBetween: 30 },
        }}
        className="rounded-xl sm:rounded-2xl overflow-hidden shadow-xl"
      >
        {sortedImages.map(({ image, index }) => {
          const imageId = createImageId(category, index);
          const voteData = votes[imageId] || { totalVotes: 0, voters: [] };
          const hasVoted = hasUserVoted(imageId);
          const isLoaded = loadedImages.has(imageId);

          return (
            <SwiperSlide key={index} className="flex flex-col justify-center items-center relative">
              {/* Loading skeleton while image loads */}
              {!isLoaded && (
                <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-lg" />
              )}
              <OptimizedImage
                src={image}
                alt={`${category} collection image ${index + 1}`}
                className="w-full h-auto max-h-[40vh] sm:max-h-[55vh] md:max-h-[70vh] object-contain block rounded-lg"
                loading={index < 3 ? 'eager' : 'lazy'}
                onLoad={() => handleImageLoad(imageId)}
              />
              {/* Voting overlay */}
              <div className="vote-container absolute bottom-4 right-4 bg-black bg-opacity-70 rounded-lg p-2 flex items-center backdrop-blur-sm">
                <span className="text-white mr-2 text-sm font-medium">
                  {voteData.totalVotes} votes
                </span>
                <VoteButton
                  hasVoted={hasVoted}
                  currentUser={currentUser}
                  onVote={() => handleVote(imageId)}
                />
              </div>
              {/* Voters list overlay */}
              <VotersList voters={voteData.voters} />
            </SwiperSlide>
          );
        })}
      </Swiper>
      {/* Extra CSS to ensure Swiper pagination bullets are hidden */}
      <style>{`
        .swiper-pagination {
          display: none !important;
        }
      `}</style>
    </div>
  );
};

export default CarouselSection;
