import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Copy } from 'lucide-react';
import Logo from './Logo';
/* import ThemeSwitcher from './ThemeSwitcher'; */

const CONTRACT_ADDRESS = '0x1234567890abcdef1234567890abcdef12345678';

const Navbar: React.FC = () => {
  const [isDropdown, setIsDropdown] = useState(window.innerWidth < 1400);
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  // Fecha dropdown ao clicar fora
  const dropdownRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  useEffect(() => {
    const handleResize = () => {
      setIsDropdown(window.innerWidth < 1920);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(CONTRACT_ADDRESS);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  };

  const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'Whitepaper', href: '#whitepaper' },
    { name: 'Tokenomics', href: '#tokenomics' },
    { name: 'How to Buy', href: '#how-to-buy' },
    { name: 'Chart', href: '#chart' },
    { name: 'Roadmap', href: '#roadmap' },
    { name: 'Community', href: '#community' },
    { name: 'FAQ', href: '#faq' },
  ];

  return (
    <nav className="fixed w-full z-50 bg-purple-900/95 shadow-md py-2">
      <div className="container mx-auto px-2 flex justify-between items-center relative">
        <Logo />
        {isDropdown ? (
          <>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-pink-300 p-2"
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
            {isOpen && (
              <div
                ref={dropdownRef}
                className="absolute top-14 right-2 bg-purple-900 border border-purple-700 rounded-xl shadow-xl p-4 flex flex-col gap-2 z-50 w-64 animate-fade-in
                  max-h-80 sm:max-h-[60vh] overflow-y-auto scrollbar-thin scrollbar-thumb-pink-400"
              >
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="px-3 py-2 rounded-lg text-white hover:text-pink-300 font-medium text-base transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </a>
                ))}
                <div
                  className="flex items-center space-x-2 bg-purple-700/60 px-3 py-2 rounded-full select-all cursor-pointer mt-1 transition hover:bg-purple-600"
                  onClick={() => {
                    handleCopy();
                    setIsOpen(false);
                  }}
                  title="Copy contract address"
                >
                  <span className="text-white font-mono text-xs">
                    {CONTRACT_ADDRESS.slice(0, 6)}...{CONTRACT_ADDRESS.slice(-4)}
                  </span>
                  <Copy size={16} className="text-pink-300" />
                  {copied && (
                    <span className="ml-2 text-green-300 text-xs font-semibold animate-pulse">
                      Copied!
                    </span>
                  )}
                </div>
                <div className="mt-2">
                </div>
                <a
                  href="https://ethervista.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-3 py-2 mt-2 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold rounded-full text-center text-base whitespace-nowrap"
                  onClick={() => setIsOpen(false)}
                >
                  Buy Now
                </a>
              </div>
            )}
            <style>{`
              @keyframes fade-in {
                from { opacity: 0; transform: translateY(-10px);}
                to { opacity: 1; transform: none;}
              }
              .animate-fade-in {
                animation: fade-in 0.18s cubic-bezier(.4,0,.2,1);
              }
              /* Scrollbar customização para Tailwind */
              .scrollbar-thin { scrollbar-width: thin; }
              .scrollbar-thumb-pink-400::-webkit-scrollbar-thumb { background-color: #f472b6; }
            `}</style>
          </>
        ) : (
          <div className="flex space-x-5 items-center">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-white hover:text-pink-300 font-medium transition-colors text-base"
              >
                {link.name}
              </a>
            ))}
            <div
              className="flex items-center space-x-2 bg-purple-700/60 px-3 py-1 rounded-full select-all cursor-pointer transition hover:bg-purple-600"
              onClick={handleCopy}
              title="Copy contract address"
            >
              <span className="text-white font-mono text-xs">
                {CONTRACT_ADDRESS.slice(0, 6)}...{CONTRACT_ADDRESS.slice(-4)}
              </span>
              <Copy size={16} className="text-pink-300" />
              {copied && (
                <span className="ml-2 text-green-300 text-xs font-semibold animate-pulse">
                  Copied!
                </span>
              )}
            </div>
            <a
              href="https://ethervista.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold rounded-full transition-all duration-300 transform hover:scale-105 text-base"
            >
              Buy Now
            </a>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
