import React from 'react';
import { ArrowRight } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section
      id="hero"
      className="pt-16 pb-10 sm:pt-24 sm:pb-16 md:pt-32 md:pb-24 bg-gradient-to-br from-purple-900 via-purple-800 to-pink-900"
    >
      <div className="container mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-8">
          <div className="lg:w-1/2 text-center lg:text-left">
            <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-3 sm:mb-4">
              Welcome to the
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-blue-400">
                VISTAMURAD
              </span>
              Community
            </h1>
            <p className="text-base xs:text-lg md:text-xl text-pink-100 mb-6 sm:mb-8">
              The most innovative and fun decentralized meme coin in the crypto universe. Join our vibrant community today!
            </p>
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-3 sm:gap-4">
              <a
                href="https://ethervista.app/bsc/token/0x52bf2b94Ab3c33867c4CA5849E529290baaf692c"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2 sm:px-8 sm:py-3 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold rounded-full transition-all duration-300 transform hover:scale-105 text-center text-sm sm:text-base"
              >
                Buy VISTAMURAD
              </a>
              <a
                href="https://x.com/vistamurad?t=v1DvOASEPC_9vOzXKN-GGw&s=35"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2 sm:px-8 sm:py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-full transition-all duration-300 border border-white/30 flex items-center justify-center gap-2 text-center text-sm sm:text-base"
              >
                Join on X <ArrowRight size={16} />
              </a>
              <a
                href="https://t.me/+lov0IxvuySphMzgx"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2 sm:px-8 sm:py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-full transition-all duration-300 border border-white/30 flex items-center justify-center gap-2 text-center text-sm sm:text-base"
              >
                Join Telegram <ArrowRight size={16} />
              </a>
            </div>
          </div>
          <div className="lg:w-1/2 flex justify-center mt-8 lg:mt-0">
            <div className="w-40 h-40 xs:w-56 xs:h-56 sm:w-64 sm:h-64 md:w-80 md:h-80 relative animate-float">
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full opacity-20 blur-2xl"></div>
              <div className="relative">
                <img
                  src="https://i.ibb.co/qLBs72sk/logoatt.jpg"
                  alt="Logo VISTAMURAD"
                  className="mx-auto w-36 h-36 xs:w-48 xs:h-48 sm:w-56 sm:h-56 md:w-72 md:h-72 object-contain rounded-full"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 sm:mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-center">
          {[
            { label: 'Total Supply', value: '1,000,000,000' },
            { label: 'Holders', value: '10,000+' },
            { label: 'Community', value: '25,000+' },
            { label: 'Launch', value: 'May 11, 2025' },
          ].map((stat, index) => (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-white/10"
            >
              <p className="text-pink-300 text-xs sm:text-sm">{stat.label}</p>
              <p className="text-white text-lg sm:text-xl md:text-2xl font-bold">{stat.value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
