import React from 'react';

type HeroActionsProps = {
  openMexcLink: (e?: React.MouseEvent<HTMLButtonElement>) => void;
  setWalletModalOpen: (open: boolean) => void;
};

export function HeroActions({ openMexcLink, setWalletModalOpen }: HeroActionsProps) {
  return (
    <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-6 sm:gap-6 w-full">
      <button
        onClick={openMexcLink}
        className="px-4 py-2 sm:px-8 sm:py-3 bg-pink-500/40 hover:bg-purple-500/40 text-white font-bold rounded-full transition-all duration-300 transform hover:scale-105 text-center text-xs xs:text-sm sm:text-base border border-white/30 hover:border-pink-400/50"
      >
        Buy on MEXC!
      </button>
      <button
        onClick={() => setWalletModalOpen(true)}
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
    </div>
  );
}
