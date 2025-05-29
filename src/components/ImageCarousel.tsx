// src/components/ImageCarousel.tsx
import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import { useAuth } from '../contexts/AuthContext';
import 'swiper/css';
import 'swiper/css/navigation';

// Import community art images dynamically
const communityImages = Object.values(
  import.meta.glob('../assets/communityarts/*.jpg', { eager: true })
).map((mod: any) => mod.default);

// Import Brazil images dynamically
const brazilImages = Object.values(
  import.meta.glob('../assets/muradinbrazil/*.jpg', { eager: true })
).map((mod: any) => mod.default);

// Import worldwide images dynamically
const worldwideImages = Object.values(
  import.meta.glob('../assets/muradworldwide/*.jpg', { eager: true })
).map((mod: any) => mod.default);

// Helper function to create unique image IDs for voting system
const createImageId = (category: string, index: number): string => `${category}-${index}`;

// Interface for vote data structure
interface VoteData {
  totalVotes: number;
  voters: string[];
}

const ImageCarousel: React.FC = () => {
  // State to store vote data for each image (total votes + voters list)
  const [votes, setVotes] = useState<Record<string, VoteData>>({});
  // State to control sorting by votes
  const [sortByVotes, setSortByVotes] = useState<boolean>(false);
  // State to show login prompt
  const [showLoginPrompt, setShowLoginPrompt] = useState<boolean>(false);

  // Use auth context instead of local state
  const { currentUser, isLoggedIn } = useAuth();

  // Listen for auth state changes
  useEffect(() => {
    const handleAuthChange = (event: Event): void => {
      // Reload votes when auth state changes
      loadVotes();
    };

    window.addEventListener('authStateChanged', handleAuthChange);
    return () => window.removeEventListener('authStateChanged', handleAuthChange);
  }, []);

  // Load votes function
  const loadVotes = (): void => {
    const savedVotes = localStorage.getItem('imageVotes');
    if (savedVotes) {
      try {
        const parsedVotes = JSON.parse(savedVotes);
        // Migrate old vote format to new format if needed
        const migratedVotes: Record<string, VoteData> = {};
        
        Object.entries(parsedVotes).forEach(([imageId, voteCount]: [string, any]) => {
          if (typeof voteCount === 'number') {
            // Old format: just numbers
            migratedVotes[imageId] = {
              totalVotes: voteCount,
              voters: []
            };
          } else if (typeof voteCount === 'object' && voteCount !== null) {
            // New format: object with totalVotes and voters
            migratedVotes[imageId] = voteCount as VoteData;
          }
        });
        
        setVotes(migratedVotes);
      } catch (error) {
        console.error('Error loading votes:', error);
        setVotes({});
      }
    }
  };

  // Load votes on component mount
  useEffect(() => {
    loadVotes();
  }, []);

  // Save votes to localStorage whenever votes state changes
  useEffect(() => {
    localStorage.setItem('imageVotes', JSON.stringify(votes));
  }, [votes]);

  // Function to check if current user has voted on an image
  const hasUserVoted = (imageId: string): boolean => {
    if (!currentUser) return false;
    const voteData = votes[imageId];
    return voteData?.voters?.includes(currentUser) || false;
  };

  // Function to handle voting on an image
  const handleVote = (imageId: string): void => {
    // Check if user is logged in
    if (!currentUser) {
      setShowLoginPrompt(true);
      return;
    }

    // Check if user has already voted on this image
    if (hasUserVoted(imageId)) {
      return;
    }

    // Add vote for current user
    setVotes(prevVotes => {
      const currentVoteData = prevVotes[imageId] || { totalVotes: 0, voters: [] };
      
      return {
        ...prevVotes,
        [imageId]: {
          totalVotes: currentVoteData.totalVotes + 1,
          voters: [...currentVoteData.voters, currentUser]
        }
      };
    });
  };

  // Function to render a carousel with given parameters
  const renderCarousel = (title: string, images: string[], delay: number, category: string) => {
    // Create array with images and their indices for sorting purposes
    let sortedImages = images.map((image, index) => ({ image, index }));
    
    // Sort images by vote count if sorting option is enabled
    if (sortByVotes) {
      sortedImages.sort((a, b) => {
        const votesA = votes[createImageId(category, a.index)]?.totalVotes || 0;
        const votesB = votes[createImageId(category, b.index)]?.totalVotes || 0;
        return votesB - votesA; // Sort in descending order (highest votes first)
      });
    }

    return (
      <div className="mb-16">
        {/* Carousel title */}
        <h2 className="text-lg sm:text-2xl md:text-3xl font-bold text-white mb-4 sm:mb-6 text-center">
          {title}
        </h2>
        
        {/* User status and controls */}
        <div className="flex justify-center items-center gap-4 mb-4 flex-wrap">
          {/* Current user display */}
          {currentUser ? (
            <div className="flex items-center gap-2 px-3 py-1 bg-green-600 text-white rounded-lg text-sm">
              <span>Logged as: {currentUser}</span>
            </div>
          ) : (
            <div className="px-3 py-1 bg-yellow-600 text-white rounded-lg text-sm">
              Login required to vote
            </div>
          )}
          
          {/* Toggle button to switch between vote sorting and original order */}
          <button
            onClick={() => setSortByVotes(!sortByVotes)}
            className="px-4 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600 transition-colors"
          >
            {sortByVotes ? 'Show Original Order' : 'Sort by Votes'}
          </button>
        </div>
        
        {/* Swiper carousel component */}
        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={16}
          slidesPerView={1}
          navigation
          autoplay={{ delay }}
          loop={true}
          breakpoints={{
            640: { slidesPerView: 1, spaceBetween: 20 },
            768: { slidesPerView: 2, spaceBetween: 24 },
            1024: { slidesPerView: 3, spaceBetween: 30 },
          }}
          className="rounded-xl sm:rounded-2xl overflow-hidden shadow-xl"
        >
          {/* Map through sorted images and create slides */}
          {sortedImages.map(({ image, index }) => {
            const imageId = createImageId(category, index);
            const voteData = votes[imageId] || { totalVotes: 0, voters: [] };
            const hasVoted = hasUserVoted(imageId);
            
            return (
              <SwiperSlide key={index} className="flex flex-col justify-center items-center relative">
                {/* Main image */}
                <img
                  src={image}
                  alt={`Slide ${index + 1}`}
                  className="w-full h-auto max-h-[40vh] sm:max-h-[55vh] md:max-h-[70vh] object-contain block"
                  loading="lazy"
                />
                
                {/* Vote container overlay */}
                <div className="vote-container absolute bottom-4 right-4 bg-black bg-opacity-70 rounded-lg p-2 flex items-center">
                  {/* Vote count display */}
                  <span className="text-white mr-2">{voteData.totalVotes} votes</span>
                  
                  {/* Vote button */}
                  <button
                    onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                      e.stopPropagation();
                      handleVote(imageId);
                    }}
                    className={`px-3 py-1 rounded-md transition-colors text-white ${
                      !currentUser 
                        ? 'bg-gray-500 hover:bg-gray-400' 
                        : hasVoted 
                        ? 'bg-green-600 opacity-75 cursor-not-allowed' 
                        : 'bg-pink-500 hover:bg-pink-600'
                    }`}
                    disabled={hasVoted}
                    title={
                      !currentUser 
                        ? 'Login required to vote' 
                        : hasVoted 
                        ? 'You already voted' 
                        : 'Click to vote'
                    }
                  >
                    {!currentUser ? 'Login to Vote' : hasVoted ? 'Voted ✓' : 'Vote'}
                  </button>
                </div>

                {/* Voters list (optional - shows on hover) */}
                {voteData.voters.length > 0 && (
                  <div className="absolute bottom-4 left-4 bg-black bg-opacity-70 rounded-lg p-2 opacity-0 hover:opacity-100 transition-opacity">
                    <div className="text-white text-xs">
                      <div className="font-semibold mb-1">Voters:</div>
                      {voteData.voters.slice(0, 5).map((voter: string, idx: number) => (
                        <div key={idx} className="text-gray-300">
                          {voter}
                        </div>
                      ))}
                      {voteData.voters.length > 5 && (
                        <div className="text-gray-400">
                          +{voteData.voters.length - 5} more...
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    );
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-2 sm:px-4 my-8 sm:my-16">
      {/* Login Prompt Modal */}
      {showLoginPrompt && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[100]">
          <div className="bg-purple-900 border border-purple-700 rounded-xl p-6 w-80 max-w-[90vw]">
            <h3 className="text-white text-xl font-bold mb-4 text-center">Login Required</h3>
            <p className="text-white text-center mb-4">
              You need to login to vote on images. Please use the login button in the navigation bar.
            </p>
            <button
              onClick={() => setShowLoginPrompt(false)}
              className="w-full px-3 py-2 bg-pink-500 hover:bg-pink-600 text-white rounded-lg transition-colors"
            >
              OK
            </button>
          </div>
        </div>
      )}

      {/* Render three different carousels with different categories */}
      {renderCarousel('Murad Collection: Knowing the World', worldwideImages, 4000, 'worldwide')}
      {renderCarousel('Murad Collection: in Brazil', brazilImages, 4500, 'brazil')}
      {renderCarousel('Arts and memes created by the community, create yours too!', communityImages, 5000, 'community')}

      {/* Global styles for Swiper components */}
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
        
        .vote-container {
          z-index: 10;
        }
      `}</style>
    </div>
  );
};

export default ImageCarousel;
