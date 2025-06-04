import React from 'react';
import { Wallet, ArrowRight, DollarSign, Share2 } from 'lucide-react';

// Step card component for each buying step
const Step: React.FC<{
  number: number;
  title: string;
  description: React.ReactNode;
  icon: React.ReactNode;
}> = ({ number, title, description, icon }) => {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 relative">
      {/* Step icon */}
      <div className="flex-shrink-0 w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center z-10">
        {icon}
      </div>
      {/* Vertical dashed line for desktop, except on last step */}
      {number < 4 && (
        <div className="absolute left-6 top-12 sm:left-8 sm:top-16 h-14 sm:h-20 border-l-2 border-dashed border-pink-400/50 hidden sm:block"></div>
      )}
      <div className="sm:ml-4">
        <h3 className="text-lg sm:text-xl font-bold text-white mb-1 sm:mb-2">
          Step {number}: {title}
        </h3>
        <p className="text-pink-100 text-sm sm:text-base">{description}</p>
      </div>
    </div>
  );
};

const HowToBuy: React.FC = () => {
  // Steps data
  const steps = [
    {
      title: 'Create a Wallet',
      description: 'Download MetaMask or any other BEP-20 compatible wallet app to your phone or as a browser extension. This should be compatible with Ethervista DEX too.',
      icon: <Wallet className="text-white" size={28} />,
    },
    {
      title: 'Add BNB to Your Wallet',
      description: 'Purchase Binance Coin from any major exchange and transfer it to your personal wallet.',
      icon: <ArrowRight className="text-white" size={28} />,
    },
    {
      title: 'Connect to DEX & Swap',
      description: (
        <>
          Connect your wallet to{' '}
          <a
            href="https://ethervista.app/bsc/token/0x52bf2b94Ab3c33867c4CA5849E529290baaf692c"
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-pink-200 hover:text-white transition"
          >
            ethervista.app
          </a>
          {' | '}
          <a
            href="https://pancakeswap.finance/swap?outputCurrency=0x52bf2b94Ab3c33867c4CA5849E529290baaf692c"
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-pink-200 hover:text-white transition"
          >
            PancakeSwap
          </a>
          , change to BSC mainnet, and swap BNB for VISTAMURAD. HODL and send it to the moon!
        </>
      ),
      icon: <DollarSign className="text-white" size={28} />,
    },
    {
      title: 'Hold & Enjoy',
      description: 'Congratulations! You are now part of the VISTAMURAD community. Hold and watch your investment grow.',
      icon: <Share2 className="text-white" size={28} />,
    },
  ];

  return (
    // Section background is transparent (no bg-* classes)
    <section id="how-to-buy" className="py-12 sm:py-20">
      <div className="container mx-auto px-3 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4">How to Buy VISTAMURAD</h2>
          <p className="text-pink-200 max-w-md sm:max-w-2xl mx-auto text-sm sm:text-base">
            Follow these simple steps to join the VISTAMURAD revolution and become part of our growing community.
          </p>
        </div>

        {/* Steps list */}
        <div className="max-w-xl sm:max-w-3xl mx-auto">
          <div className="space-y-8 sm:space-y-12 md:space-y-16">
            {steps.map((step, index) => (
              <Step
                key={index}
                number={index + 1}
                title={step.title}
                description={step.description}
                icon={step.icon}
              />
            ))}
          </div>
        </div>

        {/* Call to action button */}
        <div className="mt-10 sm:mt-16 text-center">
          <a 
            href="https://dexscreener.com/bsc/0xc96a13d14c2b2e4d7e13aaaa1da97b4e659ebe30"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold rounded-full transition-all duration-300 transform hover:scale-105 text-sm sm:text-base"
          >
            Buy VISTAMURAD Now!
          </a>
        </div>
      </div>
    </section>
  );
};

export default HowToBuy;
