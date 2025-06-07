import React, { useEffect, useState, MouseEvent } from 'react';
import { HeroSlides } from './HeroSlides';
import { HeroStats } from './HeroStats';
import WalletModalMobile from './WalletModalMobile';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

// Hook to detect if the device is mobile based on window width
function useIsMobile(breakpoint: number = 768): boolean {
  const [isMobile, setIsMobile] = useState<boolean>(
    typeof window !== "undefined" ? window.innerWidth < breakpoint : false
  );

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < breakpoint);
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, [breakpoint]);

  return isMobile;
}

const DAPP_URL = 'https://ethervista.app/bsc/token/0x52bf2b94Ab3c33867c4CA5849E529290baaf692c';

function openMexcLink(e?: MouseEvent<HTMLButtonElement>) {
  if (e) e.preventDefault();
  window.location.href =
    'https://www.mexc.com/pt-BR/dex/trade?pair_ca=0xc96a13d14c2B2E4D7e13AAAA1DA97b4E659Ebe30&chain_id=56&token_ca=0x52bf2b94Ab3c33867c4CA5849E529290baaf692c&from=search';
  setTimeout(() => {
    window.open(
      'https://www.mexc.com/pt-BR/dex/trade?pair_ca=0xc96a13d14c2B2E4D7e13AAAA1DA97b4E659Ebe30&chain_id=56&token_ca=0x52bf2b94Ab3c33867c4CA5849E529290baaf692c&from=search',
      '_blank'
    );
  }, 1500);
}

const Hero: React.FC = () => {
  const isMobile = useIsMobile();

  const calculateTimeLeft = () => {
    const targetDate = new Date('2025-08-12T00:00:00Z');
    const now = new Date();
    const difference = targetDate.getTime() - now.getTime();
    let timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };
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

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, []);

  const [walletModalOpen, setWalletModalOpenRaw] = useState(false);
  const setWalletModalOpen = (open: boolean) => {
    if (isMobile) {
      setWalletModalOpenRaw(open);
    } else {
      setWalletModalOpenRaw(false);
    }
  };

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
          We are rewarding our most loyal holders with a massive airdrop of <strong>20 million $VMURAD tokens</strong> - that is <strong>2% of total supply! Hurry up, the clock is ticking!</strong>
          <br /><br />
          <strong>Eligibility Rules:</strong><br />
          Hold at least <strong>10 million $VMURAD</strong><br />
          No selling of any token $VMURAD from launch to <strong>August 12, 2025</strong><br />
          Be a true <span className="text-yellow-300 font-bold">Diamond Hand</span>
        </>
      ),
      showCountdown: true,
    },
    {
      title: (
        <>
          OFFICIAL CONTEST - "LET'S PIXELATE EVERYTHING!"
        </>
      ),
      description: (
        <>
          The $VMURAD community is launching the most creative contest of the season: transform memes and images related to the $VMURAD universe into pixelated versions and compete for <strong>5 MILLION tokens!</strong> Join, invite friends, and show your pixelated vision of the wildest ecosystem on Etherfun.
          <br /><br />
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
    {
      title: (
        <>
          MEXC DEX+ EXCLUSIVE LAUNCH!
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-600">
            Do not Miss Out - Limited Time to Buy $VMURAD!
          </span>
        </>
      ),
      description: (
        <>
          <span className="font-bold text-green-300">The window is closing fast!</span> $VMURAD is now LIVE on <span className="text-green-400 font-bold">MEXC DEX+</span>. Early buyers are already securing their positions - <span className="text-blue-300 font-bold">do not be left behind</span> when the next wave hits!
          <br /><br />
          <span className="text-yellow-300 font-semibold">FOMO is real:</span> Every second counts. The earlier you buy, the bigger your potential gains. <span className="text-pink-400 font-bold">Supplies are limited and demand is skyrocketing!</span>
          <br /><br />
          <span className="text-white font-bold">Be part of the first wave. Buy now and ride the momentum!</span>
          <br /><br />
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

  // Handler for Buy on Ethervista button
  const handleBuyOnEthervista = () => {
    if (!isMobile) {
      // Desktop: open in new tab
      window.open(DAPP_URL, '_blank', 'noopener,noreferrer');
    } else {
      // Mobile: open wallet modal
      setWalletModalOpen(true);
    }
  };

  return (
    <section id="hero" className="pt-14 pb-8 sm:pt-20 sm:pb-14 md:pt-32 md:pb-24">
      <div className="container mx-auto px-2 sm:px-4 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-8">
          <div className="lg:w-1/2 w-full text-center lg:text-left">
            <HeroSlides slides={slides} timeLeft={timeLeft} />
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-6 sm:gap-6 w-full">
              <button
                onClick={openMexcLink}
                className="px-4 py-2 sm:px-8 sm:py-3 bg-pink-500/40 hover:bg-purple-500/40 text-white font-bold rounded-full transition-all duration-300 transform hover:scale-105 text-center text-xs xs:text-sm sm:text-base border border-white/30 hover:border-pink-400/50"
              >
                Buy on MEXC!
              </button>
              <button
                onClick={handleBuyOnEthervista}
                className="px-4 py-2 sm:px-8 sm:py-3 bg-pink-500/40 hover:bg-purple-500/40 text-white font-bold rounded-full transition-all duration-300 transform hover:scale-105 text-center text-xs xs:text-sm sm:text-base border border-white/30 hover:border-pink-400/50"
              >
                Buy on Ethervista!
              </button>
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
              <a
                href="https://x.com/vistamurad?t=v1DvOASEPC_9vOzXKN-GGw&s=35"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 sm:px-8 sm:py-3 bg-pink-500/40 hover:bg-purple-500/40 text-white font-bold rounded-full transition-all duration-300 border border-white/30 flex items-center justify-center gap-2 text-center text-xs xs:text-sm sm:text-base hover:border-pink-400/50"
              >
                Join on X
              </a>
              <a
                href="https://t.me/+lov0IxvuySphMzgx"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 sm:px-8 sm:py-3 bg-pink-500/40 hover:bg-purple-500/40 text-white font-bold rounded-full transition-all duration-300 border border-white/30 flex items-center justify-center gap-2 text-center text-xs xs:text-sm sm:text-base hover:border-pink-400/50"
              >
                Join Telegram
              </a>
              {isMobile && (
                <WalletModalMobile open={walletModalOpen} onClose={() => setWalletModalOpen(false)} />
              )}
            </div>
          </div>
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
        <HeroStats />
      </div>
    </section>
  );
};

export default Hero;
