import React, { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';

const Hero: React.FC = () => {
  // Function to calculate the time left until the target date
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

  // State to store the countdown timer values
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  // Effect to update the timer every second
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    // Clean up interval on component unmount
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      id="hero"
      className="pt-16 pb-10 sm:pt-24 sm:pb-16 md:pt-32 md:pb-24 bg-gradient-to-br from-purple-900 via-purple-800 to-pink-900"
    >
      <div className="container mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-8">
          <div className="lg:w-1/2 text-center lg:text-left">
            <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-3 sm:mb-4">
              $VMURAD AIRDROP
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-500">
                20 MILLION TOKENS!
              </span>
            </h1>
            <p className="text-base xs:text-lg md:text-xl text-pink-100 mb-6 sm:mb-8">
              We're rewarding our most loyal holders with a massive airdrop of <strong>20 million $VMURAD tokens</strong> – that's <strong>2% of total supply! Hurry up, the clock is ticking!</strong>
              <br /><br />
              <strong>Eligibility Rules:</strong><br />
              1️⃣ Hold at least <strong>10 million $VMURAD</strong><br />
              2️⃣ <strong>No selling</strong> of any token $VMURAD from launch to <strong>August 12, 2025</strong><br />
              3️⃣ Be a true <span className="text-yellow-300 font-bold">Diamond Hand 💎</span>
            </p>

            <div className="text-white font-bold text-xl mb-6">
              Countdown to Snapshot:
              <div className="text-3xl mt-2">
                {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-3 sm:gap-4">
              <a
                href="https://ethervista.app/bsc/token/0x52bf2b94Ab3c33867c4CA5849E529290baaf692c"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2 sm:px-8 sm:py-3 bg-gradient-to-r from-yellow-400 to-pink-600 hover:from-yellow-500 hover:to-pink-700 text-white font-bold rounded-full transition-all duration-300 transform hover:scale-105 text-center text-sm sm:text-base"
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
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-pink-600 rounded-full opacity-20 blur-2xl"></div>
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
            { label: 'Airdrop Amount', value: '20,000,000' },
            { label: 'Diamond Hands Only', value: 'No Sales Allowed' },
            { label: 'Snapshot Date', value: 'Aug 12, 2025' },
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
