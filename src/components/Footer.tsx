import React, { useState } from 'react';
import { ArrowUp } from 'lucide-react';
import Logo from './Logo';
import { Link } from 'react-router-dom'; // For navigation

const Footer: React.FC = () => {
  // State for showing copy feedback for contract and email
  const [copiedContract, setCopiedContract] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const contractAddress = '0x52bf2b94Ab3c33867c4CA5849E529290baaf692c';
  const emailAddress = 'vistamurad@gmail.com';

  // Function to smoothly scroll to the top of the page
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // Function to copy contract address to clipboard
  const handleCopyContract = () => {
    navigator.clipboard.writeText(contractAddress);
    setCopiedContract(true);
    setTimeout(() => setCopiedContract(false), 1500);
  };

  // Function to copy email address to clipboard
  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 1500);
  };

  return (
    <footer id="contact" className="pt-10 pb-6 sm:pt-16 sm:pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          {/* Logo and Social Links */}
          <div>
            <Logo />
            <p className="mt-4 text-pink-100 text-sm sm:text-base">
              VISTAMURAD is a community-driven decentralized cryptocurrency built for innovation and entertainment.
            </p>
            <div className="flex space-x-3 mt-6">
              {/* Twitter Button */}
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
              {/* Telegram Button */}
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
              {/* Discord Button */}
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
              {/* Email Button */}
              <a
                href={`mailto:${emailAddress}`}
                className="h-11 w-11 bg-purple-800 hover:bg-pink-600 rounded-full flex items-center justify-center transition-colors"
                title="Email"
              >
                {/* Inline SVG for envelope icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16 12l-4-4-4 4m8 0v6a2 2 0 01-2 2H6a2 2 0 01-2-2v-6m16-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v4"
                  />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links Section */}
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
                { href: "/meme-generator", label: "Meme Generator", isRoute: true },
              ].map(link => (
                <li key={link.href}>
                  {link.isRoute ? (
                    <Link to={link.href} className="text-pink-100 hover:text-pink-300 transition-colors text-sm sm:text-base">
                      {link.label}
                    </Link>
                  ) : (
                    <a href={link.href} className="text-pink-100 hover:text-pink-300 transition-colors text-sm sm:text-base">
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Contract Address and Email Section */}
          <div className="mt-8 md:mt-0">
            {/* Contract Address */}
            <h3 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4">Contract Address</h3>
            <div className="bg-purple-800/50 p-3 sm:p-4 rounded-lg border border-purple-600/30">
              <p className="text-pink-100 break-all text-sm sm:text-base">{contractAddress}</p>
              <button
                className="mt-2 text-pink-400 hover:text-pink-300 text-xs sm:text-sm"
                onClick={handleCopyContract}
              >
                {copiedContract ? 'Copied!' : 'Copy Address'}
              </button>
            </div>
            {/* Email Address */}
            <h3 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4 mt-6">Contact Email</h3>
            <div className="bg-purple-800/50 p-3 sm:p-4 rounded-lg border border-purple-600/30">
              <p className="text-pink-100 break-all text-sm sm:text-base">{emailAddress}</p>
              <button
                className="mt-2 text-pink-400 hover:text-pink-300 text-xs sm:text-sm"
                onClick={handleCopyEmail}
              >
                {copiedEmail ? 'Copied!' : 'Copy Email'}
              </button>
            </div>
            <p className="mt-4 sm:mt-6 text-pink-100 text-xs sm:text-sm">
              Always verify the contract address before making any transactions.
            </p>
          </div>
        </div>

        {/* Footer Bottom Section */}
        <div className="border-t border-purple-800 mt-10 sm:mt-12 pt-5 sm:pt-6 flex flex-col gap-4 md:flex-row md:justify-between md:items-center">
          <div className="flex flex-col items-center md:items-start gap-1 md:gap-0">
            <p className="text-pink-100 text-xs sm:text-sm">
              © {new Date().getFullYear()} VISTAMURAD. All rights reserved. This token is a meme inspired by the iconic Murad, but it has no official connection to him and is not endorsed by Murad in any way.
              VMurad is a meme coin with no intrinsic value.
              Only invest what you can afford to lose.
              Claims of wealth and bold statements are not financial advice.
              Do your own research (DYOR).
              Este token é uma meme coin inspirada no icônico Murad, mas não possui qualquer vínculo oficial com ele, tampouco é endossada por Murad.
              VMurad é uma moeda meme sem valor intrínseco.
              Invista apenas o que você pode se dar ao luxo de perder.
              Discursos de riqueza e afirmações ousadas não são conselhos financeiros.
              Faça sempre sua própria pesquisa (DYOR).
            </p>
            <p className="text-pink-300 text-xs sm:text-sm">
              Powered by Ethervista.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-center">
            {/* Terms and Privacy Links */}
            <Link
              to="/terms"
              className="text-pink-100 hover:text-pink-300 text-xs sm:text-sm transition-colors"
            >
              Terms
            </Link>
            <Link
              to="/privacy"
              className="text-pink-100 hover:text-pink-300 text-xs sm:text-sm transition-colors"
            >
              Privacy
            </Link>
            {/* Scroll to Top Button */}
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
