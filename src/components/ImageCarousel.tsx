// src/components/ImageCarousel.tsx
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useAuth } from '../contexts/AuthContext';
import CarouselSection from './CarouselSection';

// --- Image arrays for each category, using the public/assets path ---
// Community Arts Images
const communityImages = [
  '/assets/communityarts/1000.jpg',
  '/assets/communityarts/10000.jpg',
  '/assets/communityarts/ai.jpg',
  '/assets/communityarts/airdrop.jpg',
  '/assets/communityarts/both.jpg',
  '/assets/communityarts/buybuy.jpg',
  '/assets/communityarts/caleido.jpg',
  '/assets/communityarts/cartoon.jpg',
  '/assets/communityarts/cults.jpg',
  '/assets/communityarts/dancing.jpg',
  '/assets/communityarts/didusay.jpg',
  '/assets/communityarts/etherfun.jpg',
  '/assets/communityarts/ethervista.jpg',
  '/assets/communityarts/glory.jpg',
  '/assets/communityarts/greens.jpg',
  '/assets/communityarts/happy.jpg',
  '/assets/communityarts/hero.jpg',
  '/assets/communityarts/jesus.jpg',
  '/assets/communityarts/laugh.jpg',
  '/assets/communityarts/logoatt.jpg',
  '/assets/communityarts/memecoin.jpg',
  '/assets/communityarts/mill.jpg',
  '/assets/communityarts/MMGA.jpg',
  '/assets/communityarts/mooning.jpg',
  '/assets/communityarts/muradcartoon.jpg',
  '/assets/communityarts/partners.jpg',
  '/assets/communityarts/potential.jpg',
  '/assets/communityarts/red.jpg',
  '/assets/communityarts/rocket.jpg',
  '/assets/communityarts/solana.jpg',
  '/assets/communityarts/spx.jpg',
  '/assets/communityarts/spxvista.jpg',
  '/assets/communityarts/supercycle.jpg',
  '/assets/communityarts/surprised.jpg',
  '/assets/communityarts/vistabuy.jpg',
];

// Murad in Brazil Images
const brazilImages = [
  '/assets/muradinbrazil/beer.jpg',
  '/assets/muradinbrazil/beer2.jpg',
  '/assets/muradinbrazil/campfire.jpg',
  '/assets/muradinbrazil/carnival.jpg',
  '/assets/muradinbrazil/etherfun.jpg',
  '/assets/muradinbrazil/hurry.jpg',
  '/assets/muradinbrazil/just.jpg',
  '/assets/muradinbrazil/onbeach.jpg',
  '/assets/muradinbrazil/pelourinho.jpg',
  '/assets/muradinbrazil/relaxing.jpg',
  '/assets/muradinbrazil/samba.jpg',
  '/assets/muradinbrazil/traffic.jpg',
  '/assets/muradinbrazil/wc.jpg',
];

// Murad Worldwide Images
const worldwideImages = [
  '/assets/muradworldwide/argentina.jpg',
  '/assets/muradworldwide/australia.jpg',
  '/assets/muradworldwide/cheryblossom.jpg',
  '/assets/muradworldwide/china.jpg',
  '/assets/muradworldwide/china3.jpg',
  '/assets/muradworldwide/egypth.jpg',
  '/assets/muradworldwide/france.jpg',
  '/assets/muradworldwide/ireland.jpg',
  '/assets/muradworldwide/isle.jpg',
  '/assets/muradworldwide/italy.jpg',
  '/assets/muradworldwide/italy2.jpg',
  '/assets/muradworldwide/japan.jpg',
  '/assets/muradworldwide/japan2.jpg',
  '/assets/muradworldwide/machupichu.jpg',
  '/assets/muradworldwide/nyc.jpg',
  '/assets/muradworldwide/pharaoh.jpg',
  '/assets/muradworldwide/russia.jpg',
  '/assets/muradworldwide/safari.jpg',
  '/assets/muradworldwide/saudi.jpg',
];

// --- Helper for unique image IDs ---
const createImageId = (category: string, index: number): string => `${category}-${index}`;

// --- Vote data interface ---
interface VoteData {
  totalVotes: number;
  voters: string[];
}

// --- Main ImageCarousel Component ---
const ImageCarousel: React.FC = () => {
  // State for votes, sorting, login prompt, and loaded images
  const [votes, setVotes] = useState<Record<string, VoteData>>({});
  const [sortByVotes, setSortByVotes] = useState<boolean>(false);
  const [showLoginPrompt, setShowLoginPrompt] = useState<boolean>(false);
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());
  const { currentUser } = useAuth();

  // Memoize images for performance
  const memoizedImages = useMemo(
    () => ({
      community: communityImages,
      brazil: brazilImages,
      worldwide: worldwideImages,
    }),
    []
  );

  // Load votes from localStorage on mount
  useEffect(() => {
    const savedVotes = localStorage.getItem('imageVotes');
    if (savedVotes) {
      try {
        const parsedVotes = JSON.parse(savedVotes);
        const migratedVotes: Record<string, VoteData> = {};
        Object.entries(parsedVotes).forEach(([imageId, voteCount]: [string, any]) => {
          if (typeof voteCount === 'number') {
            migratedVotes[imageId] = {
              totalVotes: voteCount,
              voters: [],
            };
          } else if (typeof voteCount === 'object' && voteCount !== null) {
            migratedVotes[imageId] = voteCount as VoteData;
          }
        });
        setVotes(migratedVotes);
      } catch (error) {
        console.error('Error loading votes:', error);
        setVotes({});
      }
    }
  }, []);

  // Save votes to localStorage whenever votes change
  useEffect(() => {
    localStorage.setItem('imageVotes', JSON.stringify(votes));
  }, [votes]);

  // Check if user has already voted for a specific image
  const hasUserVoted = useCallback(
    (imageId: string): boolean => {
      if (!currentUser) return false;
      const voteData = votes[imageId];
      return voteData?.voters?.includes(currentUser) || false;
    },
    [currentUser, votes]
  );

  // Handle voting on an image
  const handleVote = useCallback(
    (imageId: string): void => {
      if (!currentUser) {
        setShowLoginPrompt(true);
        return;
      }
      if (hasUserVoted(imageId)) {
        return;
      }
      setVotes((prevVotes) => {
        const currentVoteData = prevVotes[imageId] || { totalVotes: 0, voters: [] };
        return {
          ...prevVotes,
          [imageId]: {
            totalVotes: currentVoteData.totalVotes + 1,
            voters: [...currentVoteData.voters, currentUser],
          },
        };
      });
    },
    [currentUser, hasUserVoted]
  );

  // Handle image load event
  const handleImageLoad = useCallback((imageId: string) => {
    setLoadedImages((prev) => new Set(prev).add(imageId));
  }, []);

  // --- Render ---
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
      <CarouselSection
        title="Murad Collection: Knowing the World"
        images={memoizedImages.worldwide}
        delay={4000}
        category="worldwide"
        votes={votes}
        currentUser={currentUser}
        hasUserVoted={hasUserVoted}
        handleVote={handleVote}
        loadedImages={loadedImages}
        handleImageLoad={handleImageLoad}
        sortByVotes={sortByVotes}
        setSortByVotes={setSortByVotes}
      />
      <CarouselSection
        title="Murad Collection: in Brazil"
        images={memoizedImages.brazil}
        delay={4500}
        category="brazil"
        votes={votes}
        currentUser={currentUser}
        hasUserVoted={hasUserVoted}
        handleVote={handleVote}
        loadedImages={loadedImages}
        handleImageLoad={handleImageLoad}
        sortByVotes={sortByVotes}
        setSortByVotes={setSortByVotes}
      />
      <CarouselSection
        title="Arts and memes created by the community, create yours too!"
        images={memoizedImages.community}
        delay={5000}
        category="community"
        votes={votes}
        currentUser={currentUser}
        hasUserVoted={hasUserVoted}
        handleVote={handleVote}
        loadedImages={loadedImages}
        handleImageLoad={handleImageLoad}
        sortByVotes={sortByVotes}
        setSortByVotes={setSortByVotes}
      />

      {/* Extra CSS to ensure Swiper pagination bullets are hidden */}
      <style>{`
        .swiper-pagination {
          display: none !important;
        }
      `}</style>
    </div>
  );
};

export default ImageCarousel;
