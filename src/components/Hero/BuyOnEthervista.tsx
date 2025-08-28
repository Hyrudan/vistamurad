import { useState, useEffect } from 'react';

// Hook to detect if the device is mobile based on window width
function useIsMobile(breakpoint: number = 768): boolean {
  const [isMobile, setIsMobile] = useState<boolean>(
    typeof window !== 'undefined' ? window.innerWidth < breakpoint : false
  );

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < breakpoint);
    }
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, [breakpoint]);

  return isMobile;
}

// Deep link dApp URL and encoded URL
const DAPP_URL =
  'https://ethervista.app/bsc/token/0x52bf2b94Ab3c33867c4CA5849E529290baaf692c';
const ENCODED_URL = encodeURIComponent(DAPP_URL);

const WALLETS = [
  {
    name: 'MetaMask',
    icon: '/logosvg/metamask-seeklogo.svg',
    deeplink: `https://metamask.app.link/dapp/${DAPP_URL}`,
  },
  {
    name: 'Trust Wallet',
    icon: '/logosvg/TrustWallet.avif',
    deeplink: `https://link.trustwallet.com/open_url?coin_id=60&url=${ENCODED_URL}`,
  },
  {
    name: 'Phantom',
    icon: '/logosvg/Phantom-Icon_Circle.svg',
    deeplink: `https://phantom.app/ul/browse/${ENCODED_URL}`,
  },
  {
    name: 'Binance',
    icon: '/logosvg/binance-icon-seeklogo.svg',
    deeplink: `https://www.binance.com/en/dapp/browser?url=${ENCODED_URL}`,
  },
  {
    name: 'Coinbase Wallet',
    icon: '/logosvg/cbw.svg',
    deeplink: `https://go.cb-w.com/dapp?url=${ENCODED_URL}`,
  },
  {
    name: 'OKX Wallet',
    icon: '/logosvg/okx-seeklogo.svg',
    deeplink: `okx://wallet/dapp/url?dappUrl=${ENCODED_URL}`,
  },
];

// Modal component for mobile wallet selection
function WalletModalMobile({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl p-6 w-full max-w-sm shadow-lg"
        onClick={e => e.stopPropagation()}
      >
        <h2 className="text-lg font-bold mb-4 text-gray-800">Connect with Wallet</h2>
        <ul className="space-y-3">
          {WALLETS.map(wallet => (
            <li key={wallet.name}>
              <a
                href={wallet.deeplink}
                className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-100 transition"
                style={{ textDecoration: 'none' }}
              >
                <img
                  src={wallet.icon}
                  alt={wallet.name}
                  className="w-7 h-7 rounded-full bg-white"
                />
                <span className="font-medium text-gray-900">{wallet.name}</span>
                <span className="ml-2 px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded">
                  Mobile App
                </span>
                <svg
                  className="ml-auto text-gray-400"
                  width={18}
                  height={18}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </a>
            </li>
          ))}
        </ul>
        <button
          className="mt-6 w-full py-2 bg-gray-200 hover:bg-gray-300 rounded-lg text-gray-800 font-semibold transition"
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

// Main component for the Buy on Ethervista button and all other action buttons
export default function BuyOnEthervista() {
  const isMobile = useIsMobile();
  const [walletModalOpen, setWalletModalOpen] = useState(false);

  const handleBuyOnEthervista = () => {
    if (!isMobile) {
      // Desktop: redirect directly to the dApp
      window.location.href = DAPP_URL;
    } else {
      // Mobile: open the wallet modal
      setWalletModalOpen(true);
    }
  };

  return (
    
    <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-6 sm:gap-6 w-full">
      <button
        onClick={handleBuyOnEthervista}
        className="px-4 py-2 sm:px-8 sm:py-3 bg-pink-500/40 hover:bg-purple-500/40 text-white font-bold rounded-full transition-all duration-300 transform hover:scale-105 text-center text-xs xs:text-sm sm:text-base border border-white/30 hover:border-pink-400/50"
      >
        Buy on Ethervista!
      </button>
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
      {/* Wallet modal only for mobile */}
      {isMobile && (
        <WalletModalMobile
          open={walletModalOpen}
          onClose={() => setWalletModalOpen(false)}
        />
      )}
    </div>
  );
}
