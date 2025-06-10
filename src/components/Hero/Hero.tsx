// src/components/Hero/Hero.tsx

import React, { useState, useEffect } from 'react';
import BuyOnEthervista from './BuyOnEthervista';
import HeroSlides from './HeroSlides';
import HeroStats from './HeroStats';
import WalletModalMobile from './WalletModalMobile';

// Helper function to calculate the remaining time until a given snapshot date
function getTimeLeft(snapshotDate: string) {
  const now = new Date();
  const end = new Date(snapshotDate);
  const totalSeconds = Math.max(0, Math.floor((end.getTime() - now.getTime()) / 1000));
  const days = Math.floor(totalSeconds / (3600 * 24));
  const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return { days, hours, minutes, seconds };
}

// Snapshot date for the airdrop countdown
const SNAPSHOT_DATE = '2025-08-12T00:00:00Z';

// Array of slides for the HeroSlides carousel
// Each slide has a title, description, and a flag for showing the countdown
const slides = [
  {
    title: (
      <div className="text-center">
        <div className="text-white text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-3">
          $VMURAD AIRDROP
        </div>
        <div className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-400 to-orange-500 text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold mb-3">
          20 MILLION TOKENS!
        </div>
        <div className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">
          Celebrate our listing on PancakeSwap and Ethervista!
        </div>
      </div>
    ),
    description: (
      <div className="text-white text-base sm:text-lg md:text-xl text-center max-w-4xl mx-auto">
        <div className="mb-4">
          We are rewarding our most loyal holders with a massive airdrop of{' '}
          <span className="font-bold">20 million $VMURAD tokens</span> – that is{' '}
          <span className="font-bold">2% of total supply!</span>{' '}
          Hurry up, the clock is ticking!
        </div>
        <div className="text-left space-y-2">
          <div className="font-bold text-xl">Eligibility Rules:</div>
          <div>1 - Hold at least <span className="font-bold">10 million $VMURAD</span></div>
          <div>
            2 - No sale of any $VMURAD token since its first purchase, until{' '}
            <span className="font-bold">August 12, 2025</span>
          </div>
          <div>
            3 - Be a true <span className="text-yellow-400 font-bold">Diamond Hand</span>
          </div>
        </div>
      </div>
    ),
    showCountdown: true,
  },
  {
    title: (
      <div className="text-center">
        <div className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold">
          OFFICIAL CONTEST –
        </div>
        <div className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-500 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold">
          "LET'S PIXELATE EVERYTHING!"
        </div>
      </div>
    ),
    description: (
      <div className="text-white text-base sm:text-lg md:text-xl text-center max-w-4xl mx-auto">
        <div className="mb-4">
          The $VMURAD community is launching the most creative contest of the season: transform memes and images related to the $VMURAD universe into pixelated versions and compete for{' '}
          <span className="font-bold text-yellow-400">5 MILLION tokens!</span> Join, invite friends, and show your pixelated vision of the wildest ecosystem on Etherfun.
        </div>
        <a
          href="/contest"
          className="inline-flex items-center px-6 py-3 mt-4 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold hover:from-pink-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
        >
          PARTICIPATION RULES
        </a>
      </div>
    ),
    showCountdown: false,
  },
];

const Hero: React.FC = () => {
  // State for the wallet modal visibility
  const [walletModalOpen, setWalletModalOpen] = useState(false);

  // State for the countdown timer
  const [timeLeft, setTimeLeft] = useState(getTimeLeft(SNAPSHOT_DATE));

  // Handler for opening the MEXC link in a new tab
  const openMexcLink = (e?: React.MouseEvent<HTMLButtonElement>) => {
    if (e) e.preventDefault();
    window.open(
      'https://www.mexc.com/pt-BR/dex/trade?pair_ca=0xc96a13d14c2B2E4D7e13AAAA1DA97b4E659Ebe30&chain_id=56&token_ca=0x52bf2b94Ab3c33867c4CA5849E529290baaf692c&from=search',
      '_blank'
    );
  };

  // Update the countdown every second
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft(SNAPSHOT_DATE));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative bg-gradient-to-b from-purple-900 to-purple-950 py-16 px-4 sm:px-8 flex flex-col items-center justify-center overflow-hidden">
      {/* Slides or animated banners at the top of the hero section */}
      <div className="w-full max-w-6xl mb-8">
        <HeroSlides slides={slides} timeLeft={timeLeft} />
      </div>

      {/* Main headline and actions section */}
      <div className="w-full max-w-3xl text-center mb-8">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight mb-4 drop-shadow-lg">
          Welcome to the Murad Ecosystem
        </h1>
        <p className="text-lg sm:text-xl text-purple-200 mb-6">
          Explore, trade, and join the most vibrant crypto community. Buy, vote, and participate in the future of decentralized finance!
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <BuyOnEthervista />
        </div>
      </div>

      {/* Animated logo with floating effect */}
      <div className="w-full flex justify-center my-8">
        <div className="w-40 h-40 xs:w-56 xs:h-56 sm:w-64 sm:h-64 md:w-80 md:h-80 relative animate-float">
          <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full opacity-20 blur-2xl"></div>
          <div className="relative w-full h-full flex items-center justify-center">
            <img
              src="https://i.ibb.co/qLBs72sk/logoatt.jpg"
              alt="Logo VISTAMURAD"
              className="w-36 h-36 xs:w-48 xs:h-48 sm:w-56 sm:h-56 md:w-72 md:h-72 object-contain rounded-full"
            />
          </div>
        </div>
      </div>

      {/* Stats or key metrics section below the actions */}
      <div className="w-full max-w-4xl mb-10">
        <HeroStats />
      </div>

      {/* Wallet modal for mobile wallet selection */}
      <WalletModalMobile open={walletModalOpen} onClose={() => setWalletModalOpen(false)} />

      {/* Decorative or animated background (optional) */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[120vw] h-[60vh] bg-pink-600 opacity-10 rounded-full blur-3xl" />
      </div>
    </section>
  );
};

export default Hero;
