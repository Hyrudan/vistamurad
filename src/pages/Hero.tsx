import React, { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { Link } from 'react-router-dom';

// MEXC web and deep link URLs
const MEXC_DEX_LINK =
  'https://www.mexc.com/pt-BR/dex/trade?pair_ca=0xc96a13d14c2B2E4D7e13AAAA1DA97b4E659Ebe30&chain_id=56&token_ca=0x52bf2b94Ab3c33867c4CA5849E529290baaf692c&from=search';
const MEXC_DEX_DEEP_LINK =
  'https://www.mexc.com/pt-BR/dex/trade?pair_ca=0xc96a13d14c2B2E4D7e13AAAA1DA97b4E659Ebe30&chain_id=56&token_ca=0x52bf2b94Ab3c33867c4CA5849E529290baaf692c&from=search';

// Opens MEXC app via deep link, falls back to web after 1.5s
function openMexcLink(e?: React.MouseEvent) {
  if (e) e.preventDefault();
  window.location.href = MEXC_DEX_DEEP_LINK;
  setTimeout(() => {
    window.open(MEXC_DEX_LINK, '_blank');
  }, 1500);
}

const Hero: React.FC = () => {
  // Calculates time left for the countdown
  const calculateTimeLeft = () => {
    const targetDate = new Date('2025-08-12T00:00:00Z');
    const now = new Date();
    const difference = targetDate.getTime() - now.getTime();

    let timeLeft = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  // State for countdown timer
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  // Updates countdown every second
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Swiper slides data
  const slides = [
    {
      title: (
        <>
          $VMURAD AIRDROP
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-500">
            20 MILLION TOKENS! Celebrate our listing on PancakeSwap and Ethervista!
          </span>
        </>
      ),
      description: (
        <>
          We're rewarding our most loyal holders with a massive airdrop of <strong>20 million $VMURAD tokens</strong> – that's <strong>2% of total supply! Hurry up, the clock is ticking!</strong>
          <br /><br />
          <strong>Eligibility Rules:</strong><br />
          1️⃣ Hold at least <strong>10 million $VMURAD</strong><br />
          2️⃣ <strong>No selling</strong> of any token $VMURAD from launch to <strong>August 12, 2025</strong><br />
          3️⃣ Be a true <span className="text-yellow-300 font-bold">Diamond Hand 💎</span>
        </>
      ),
      showCountdown: true,
    },
    {
      title: (
        <>
          OFFICIAL CONTEST – “LET’S PIXELATE EVERYTHING!”
        </>
      ),
      description: (
        <>
          The $VMURAD community is launching the most creative contest of the season: transform memes and images related to the $VMURAD universe into pixelated versions and compete for <strong>5 MILLION tokens!</strong> Join, invite friends, and show your pixelated vision of the wildest ecosystem on Etherfun.
          <br /><br />
          {/* Contest page button */}
          <Link
            to="/contest"
            className="inline-block mt-4 px-6 py-2 bg-pink-500/40 hover:bg-purple-500/40 text-white font-bold rounded-full transition-all duration-300 border border-white/30 hover:border-pink-400/50 text-base"
          >
            PARTICIPATION RULES <ArrowRight size={16} className="inline ml-1" />
          </Link>
        </>
      ),
      showCountdown: false,
    },
    // MEXC DEX+ FOMO SLIDE
    {
      title: (
        <>
          🚀 MEXC DEX+ EXCLUSIVE LAUNCH!
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-600">
            Don’t Miss Out – Limited Time to Buy $VMURAD!
          </span>
        </>
      ),
      description: (
        <>
          <span className="font-bold text-green-300">The window is closing fast!</span> $VMURAD is now LIVE on <span className="text-green-400 font-bold">MEXC DEX+</span>. Early buyers are already securing their positions – <span className="text-blue-300 font-bold">don’t be left behind</span> when the next wave hits!
          <br /><br />
          <span className="text-yellow-300 font-semibold">FOMO is real:</span> Every second counts. The earlier you buy, the bigger your potential gains. <span className="text-pink-400 font-bold">Supplies are limited and demand is skyrocketing!</span>
          <br /><br />
          <span className="text-white font-bold">Be part of the first wave. Buy now and ride the momentum!</span>
          <br /><br />
          {/* BUY NOW Button with deep link fallback */}
          <button
            onClick={openMexcLink}
            className="inline-block mt-4 px-8 py-3 bg-pink-500/40 hover:bg-purple-500/40 text-white font-extrabold rounded-full transition-all duration-300 transform hover:scale-105 text-base border border-white/30 hover:border-pink-400/50"
          >
            BUY NOW on MEXC DEX+!
          </button>
        </>
      ),
      showCountdown: false,
    },
  ];

  return (
    <section
      id="hero"
      className="pt-14 pb-8 sm:pt-20 sm:pb-14 md:pt-32 md:pb-24"
      // No background color here; the section is transparent
    >
      <div className="container mx-auto px-2 sm:px-4 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-8">
          {/* Left column: Hero text and actions */}
          <div className="lg:w-1/2 w-full text-center lg:text-left">
            {/* Swiper for Hero messages */}
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
                    {/* Responsive heading */}
                    <h1 className="text-xl xs:text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-extrabold text-white leading-snug xs:leading-tight mb-2 sm:mb-4 break-words">
                      {slide.title}
                    </h1>
                    {/* Responsive paragraph */}
                    <p className="text-sm xs:text-base sm:text-lg md:text-xl text-pink-100 mb-4 sm:mb-8 break-words">
                      {slide.description}
                    </p>
                    {/* Countdown block */}
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
            {/* Action buttons: vertical on mobile, horizontal on desktop */}
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-2 sm:gap-4 w-full">
              {/* Buy on MEXC button with deep link fallback */}
              <button
                onClick={openMexcLink}
                className="px-4 py-2 sm:px-8 sm:py-3 bg-pink-500/40 hover:bg-purple-500/40 text-white font-bold rounded-full transition-all duration-300 transform hover:scale-105 text-center text-xs xs:text-sm sm:text-base border border-white/30 hover:border-pink-400/50"
              >
                Buy on MEXC!
              </button>
              {/* Other buy buttons */}
              <a
                href="https://ethervista.app/bsc/token/0x52bf2b94Ab3c33867c4CA5849E529290baaf692c"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 sm:px-8 sm:py-3 bg-pink-500/40 hover:bg-purple-500/40 text-white font-bold rounded-full transition-all duration-300 transform hover:scale-105 text-center text-xs xs:text-sm sm:text-base border border-white/30 hover:border-pink-400/50"
              >
                Buy on Ethervista!
              </a>
              <a
                href="https://pancakeswap.finance/swap?outputCurrency=0x52bf2b94Ab3c33867c4CA5849E529290baaf692c"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 sm:px-8 sm:py-3 bg-pink-500/40 hover:bg-purple-500/40 text-white font-bold rounded-full transition-all duration-300 transform hover:scale-105 text-center text-xs xs:text-sm sm:text-base border border-white/30 hover:border-pink-400/50"
              >
                Buy on PancakeSwap!
              </a>
              <a
                href="https://compranopix.com/index.php?acao=buydex&token=0x52bf2b94Ab3c33867c4CA5849E529290baaf692c"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 sm:px-8 sm:py-3 bg-pink-500/40 hover:bg-purple-500/40 text-white font-bold rounded-full transition-all duration-300 transform hover:scale-105 text-center text-xs xs:text-sm sm:text-base border border-white/30 hover:border-pink-400/50"
              >
                Buy with PIX!
              </a>
              {/* Social buttons */}
              <a
                href="https://x.com/vistamurad?t=v1DvOASEPC_9vOzXKN-GGw&s=35"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 sm:px-8 sm:py-3 bg-pink-500/40 hover:bg-purple-500/40 text-white font-bold rounded-full transition-all duration-300 border border-white/30 flex items-center justify-center gap-2 text-center text-xs xs:text-sm sm:text-base hover:border-pink-400/50"
              >
                Join on X <ArrowRight size={16} />
              </a>
              <a
                href="https://t.me/+lov0IxvuySphMzgx"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 sm:px-8 sm:py-3 bg-pink-500/40 hover:bg-purple-500/40 text-white font-bold rounded-full transition-all duration-300 border border-white/30 flex items-center justify-center gap-2 text-center text-xs xs:text-sm sm:text-base hover:border-pink-400/50"
              >
                Join Telegram <ArrowRight size={16} />
              </a>
            </div>
          </div>
          {/* Right column: Hero image */}
          <div className="lg:w-1/2 flex justify-center mt-8 lg:mt-0 w-full">
            <div className="w-32 h-32 xs:w-44 xs:h-44 sm:w-56 sm:h-56 md:w-80 md:h-80 relative animate-float">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-pink-600 rounded-full opacity-20 blur-2xl"></div>
              <div className="relative">
                <img
                  src="https://i.ibb.co/qLBs72sk/logoatt.jpg"
                  alt="Logo VISTAMURAD"
                  className="mx-auto w-28 h-28 xs:w-40 xs:h-40 sm:w-52 sm:h-52 md:w-72 md:h-72 object-contain rounded-full"
                />
              </div>
            </div>
          </div>
        </div>
        {/* Stats grid */}
        <div className="mt-8 sm:mt-16 grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-6 text-center">
          {[
            { label: 'Total Supply', value: '1,000,000,000' },
            { label: 'Airdrop Amount', value: '20,000,000' },
            { label: 'Diamond Hands Only', value: 'No Sales Allowed' },
            { label: 'Snapshot Date', value: 'Aug 12, 2025' },
          ].map((stat, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-2 xs:p-3 sm:p-4 border border-white/10"
            >
              <p className="text-pink-300 text-[10px] xs:text-xs sm:text-sm">{stat.label}</p>
              <p className="text-white text-base xs:text-lg sm:text-xl md:text-2xl font-bold">{stat.value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
