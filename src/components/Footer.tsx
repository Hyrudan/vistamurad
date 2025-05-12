import React from 'react';
import { ArrowUp } from 'lucide-react';
import Logo from './Logo';

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer id="contact" className="bg-purple-900 pt-10 pb-6 sm:pt-16 sm:pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          {/* Logo e Social */}
          <div>
            <Logo />
            <p className="mt-4 text-pink-100 text-sm sm:text-base">
              VISTAMURAD is a community-driven decentralized cryptocurrency built for innovation and entertainment.
            </p>
            <div className="flex space-x-3 mt-6">
              {/* Social Buttons */}
              <a
                href="https://x.com/vistamurad?t=v1DvOASEPC_9vOzXKN-GGw&s=35"
                target='_blank'
                rel="noopener noreferrer"
                className="h-11 w-11 bg-purple-800 hover:bg-pink-600 rounded-full flex items-center justify-center transition-colors"
              >
                <img
                  src="https://i.ibb.co/0jtxQZBw/xho.png"
                  alt="Twitter"
                  className="w-6 h-6 object-contain"
                />
              </a>
              <a
                href="https://t.me/+lov0IxvuySphMzgx"
                target='_blank'
                rel="noopener noreferrer"
                className="h-11 w-11 bg-purple-800 hover:bg-pink-600 rounded-full flex items-center justify-center transition-colors"
              >
                <img
                  src="https://i.ibb.co/VYWbVGfq/telegramho.png"
                  alt="Telegram"
                  className="w-6 h-6 object-contain"
                />
              </a>
              <a
                href="https://discord.gg/HNWq88Dp"
                target='_blank'
                rel="noopener noreferrer"
                className="h-11 w-11 bg-purple-800 hover:bg-pink-600 rounded-full flex items-center justify-center transition-colors"
              >
                <img
                  src="https://i.ibb.co/8LsKcpJ6/logoho.png"
                  alt="Discord"
                  className="w-6 h-6 object-contain"
                />
              </a>
            </div>
          </div>

          {/* Links rápidos */}
          <div className="mt-8 md:mt-0">
            <h3 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4">Quick Links</h3>
            <ul className="space-y-1.5 sm:space-y-2">
              {[
                { href: "#tokenomics", label: "Tokenomics" },
                { href: "#how-to-buy", label: "How to Buy" },
                { href: "#community", label: "Community" },
                { href: "#faq", label: "FAQ" },
                { href: "#roadmap", label: "Roadmap" },
                { href: "#whitepaper", label: "Whitepaper" },
              ].map(link => (
                <li key={link.href}>
                  <a href={link.href} className="text-pink-100 hover:text-pink-300 transition-colors text-sm sm:text-base">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contract Address */}
          <div className="mt-8 md:mt-0">
            <h3 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4">Contract Address</h3>
            <div className="bg-purple-800/50 p-3 sm:p-4 rounded-lg border border-purple-600/30">
              <p className="text-pink-100 break-all text-sm sm:text-base">0x52bf2b94Ab3c33867c4CA5849E529290baaf692c</p>
              <button
                className="mt-2 text-pink-400 hover:text-pink-300 text-xs sm:text-sm"
                onClick={() => navigator.clipboard.writeText('0x52bf2b94Ab3c33867c4CA5849E529290baaf692c')}
              >
                Copy Address
              </button>
            </div>
            <p className="mt-4 sm:mt-6 text-pink-100 text-xs sm:text-sm">
              Always verify the contract address before making any transactions.
            </p>
          </div>
        </div>

        {/* Rodapé */}
        <div className="border-t border-purple-800 mt-10 sm:mt-12 pt-5 sm:pt-6 flex flex-col gap-4 md:flex-row md:justify-between md:items-center">
          <div className="flex flex-col items-center md:items-start gap-1 md:gap-0">
            <p className="text-pink-100 text-xs sm:text-sm">
              © {new Date().getFullYear()} VISTAMURAD. All rights reserved.
            </p>
            <p className="text-pink-300 text-xs sm:text-sm">
              Powered by Ethervista.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-center">
            <a
              href="/terms?standalone=true"
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-100 hover:text-pink-300 text-xs sm:text-sm transition-colors"
            >
              Terms
            </a>
            <a
              href="/privacy?standalone=true"
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-100 hover:text-pink-300 text-xs sm:text-sm transition-colors"
            >
              Privacy
            </a>
            <button
              onClick={scrollToTop}
              className="h-9 w-9 bg-purple-800 hover:bg-pink-600 rounded-full flex items-center justify-center transition-colors"
            >
              <ArrowUp size={16} className="text-white" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
