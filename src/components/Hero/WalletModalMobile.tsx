import React from 'react';
import { ArrowRight } from 'lucide-react';

// Deep links and icons for each wallet app
const DAPP_URL = 'https://ethervista.app/bsc/token/0x52bf2b94Ab3c33867c4CA5849E529290baaf692c';
const ENCODED_URL = encodeURIComponent(DAPP_URL);

const MOBILE_WALLETS = [
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

type WalletModalMobileProps = {
  open: boolean;
  onClose: () => void;
};

const WalletModalMobile: React.FC<WalletModalMobileProps> = ({ open, onClose }) => {
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
          {MOBILE_WALLETS.map(wallet => (
            <li key={wallet.name}>
              <a
                href={wallet.deeplink}
                className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-100 transition"
                style={{ textDecoration: 'none' }}
              >
                <img src={wallet.icon} alt={wallet.name} className="w-7 h-7 rounded-full bg-white" />
                <span className="font-medium text-gray-900">{wallet.name}</span>
                <span className="ml-2 px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded">
                  Mobile App
                </span>
                <ArrowRight size={18} className="ml-auto text-gray-400" />
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
};

export default WalletModalMobile;
