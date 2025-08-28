import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import BuyOnEthervista from './BuyOnEthervista';
import HeroSlides from './HeroSlides';
import WalletModalMobile from './WalletModalMobile';

const slides = [
  {
    title: (
      <div className="text-center">
        <div className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 via-red-500 via-yellow-500 to-blue-500 text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold mb-3">
          $VMURAD AVAILABLE ON ETHERVISTA!
        </div>
        <div className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 via-red-500 via-yellow-500 to-blue-500 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">
          Celebrate our listing on ETHERVISTA!
        </div>
      </div>
    ),
    description: (
      <p className="text-center text-white text-base sm:text-lg mt-2">
        Join us now and be part of the revolution.
      </p>
    ),
  },
  {
    title: (
      <div className="text-center">
        <div className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-400 to-orange-500 text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold mb-3">
          $VMURAD AVAILABLE ON PANCAKESWAP!
        </div>
        <div className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">
          Celebrate our listing on PancakeSwap!
        </div>
      </div>
    ),
    description: (
      <p className="text-center text-white text-base sm:text-lg mt-2">
        Here are all you need.
      </p>
    ),
  },
  {
    title: (
      <div className="text-center">
        <div className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-600 to-blue-900 text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold mb-3">
          $VMURAD AVAILABLE ON LATOKEN!
        </div>
        <div className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-blue-0 to-blue-100 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">
          Celebrate our listing on LATOKEN!
        </div>
      </div>
    ),
    description: (
      <p className="text-center text-white text-base sm:text-lg mt-2">
        Don't miss our upcoming events and updates.
      </p>
    ),
  },
];

const Hero: React.FC = () => {
  const [walletModalOpen, setWalletModalOpen] = useState(false);

  return (
    <section className="relative bg-gradient-to-b from-purple-900 to-purple-950 py-16 px-4 sm:px-8 flex flex-col items-center justify-center overflow-hidden">
      {/* Slides */}
      <div className="w-full max-w-6xl mb-8">
        <HeroSlides slides={slides} />
      </div>

      {/* Headline and actions */}
      <div className="w-full max-w-3xl text-center mb-8">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight mb-4 drop-shadow-lg">
          Welcome to the Murad Ecosystem
        </h1>
        <p className="text-lg sm:text-xl text-purple-200 mb-6">
          Explore, trade, and join the most vibrant crypto community. Buy, vote, and participate in the future of decentralized finance!
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <BuyOnEthervista />
          <Link
            to=""
            className="px-4 py-2 sm:px-8 sm:py-3 bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white font-bold rounded-full transition-all duration-300 transform hover:scale-105 text-center text-xs xs:text-sm sm:text-base border border-white/30 hover:border-green-400/50"
          >
            Coming Soon!
          </Link>
        </div>
      </div>

      {/* Animated logo */}
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

      {/* Wallet modal */}
      <WalletModalMobile open={walletModalOpen} onClose={() => setWalletModalOpen(false)} />

      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[120vw] h-[60vh] bg-pink-600 opacity-10 rounded-full blur-3xl" />
      </div>
    </section>
  );
};

export default Hero;
