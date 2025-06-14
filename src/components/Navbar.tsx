import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Copy, User, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import Logo from './Logo';
import { useNavigate, useLocation } from 'react-router-dom';

const CONTRACT_ADDRESS = '0x52bf2b94Ab3c33867c4CA5849E529290baaf692c';

const Navbar: React.FC = () => {
  const [isDropdown, setIsDropdown] = useState<boolean>(window.innerWidth < 1400);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
  const [tempUsername, setTempUsername] = useState<string>('');

  const { currentUser, isLoggedIn, login, logout } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const dropdownRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function handleClickOutside(event: MouseEvent): void {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  useEffect(() => {
    const handleResize = (): void => {
      setIsDropdown(window.innerWidth < 1400);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleCopy = async (): Promise<void> => {
    try {
      await navigator.clipboard.writeText(CONTRACT_ADDRESS);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  };

  const handleAnonymousLogin = (): void => {
    if (tempUsername.trim()) {
      login(tempUsername.trim());
      setShowLoginModal(false);
      setTempUsername('');
    }
  };

  const handleLogout = (): void => {
    logout();
    setIsOpen(false);
  };

  const generateRandomUsername = (): string => {
    const adjectives = ['Cool', 'Smart', 'Fast', 'Brave', 'Lucky', 'Wild', 'Epic', 'Mega'];
    const nouns = ['Trader', 'Holder', 'Investor', 'Crypto', 'Moon', 'Diamond', 'Rocket', 'Bull'];
    const randomAdj = adjectives[Math.floor(Math.random() * adjectives.length)];
    const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
    const randomNum = Math.floor(Math.random() * 1000);
    return `${randomAdj}${randomNoun}${randomNum}`;
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

  const handleNavClick = (href: string) => {
    if (['/terms', '/privacy'].includes(location.pathname)) {
      navigate('/');
      setTimeout(() => {
        const id = href.replace('#', '');
        if (id) {
          const el = document.getElementById(id);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const id = href.replace('#', '');
      if (id) {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const LoginModal: React.FC = () => (
    showLoginModal ? (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[100]">
        <div className="bg-purple-900 border border-purple-700 rounded-xl p-6 w-80 max-w-[90vw]">
          <h3 className="text-white text-xl font-bold mb-4 text-center">Anonymous Login</h3>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Enter your username"
              value={tempUsername}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTempUsername(e.target.value)}
              className="w-full px-3 py-2 bg-purple-800 text-white rounded-lg border border-purple-600 focus:border-pink-400 focus:outline-none"
              onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && handleAnonymousLogin()}
            />
            <button
              onClick={() => setTempUsername(generateRandomUsername())}
              className="w-full px-3 py-2 bg-purple-700 hover:bg-purple-600 text-white rounded-lg transition-colors"
            >
              Generate Random Username
            </button>
            <div className="flex space-x-2">
              <button
                onClick={handleAnonymousLogin}
                disabled={!tempUsername.trim()}
                className="flex-1 px-3 py-2 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Login
              </button>
              <button
                onClick={() => {
                  setShowLoginModal(false);
                  setTempUsername('');
                }}
                className="flex-1 px-3 py-2 bg-gray-600 hover:bg-gray-500 text-white rounded-lg transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    ) : null
  );

  return (
    <>
      <nav className="fixed w-full z-50 bg-purple-900/95 shadow-md py-2">
        <div className="container mx-auto px-2 flex justify-between items-center relative">
          {!isDropdown && (
            <div className="flex items-center space-x-3">
              {/* Logo */}
              <Logo />
              {/* Address and Copy */}
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
              {/* Nav Links */}
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-white hover:text-pink-300 font-medium transition-colors text-base"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                >
                  {link.name}
                </a>
              ))}
              {/* Login/Logout */}
              {isLoggedIn ? (
                <div className="flex items-center space-x-2 bg-purple-700/60 px-3 py-1 rounded-full">
                  <User size={16} className="text-pink-300" />
                  <span className="text-white text-sm font-medium">{currentUser}</span>
                  <button
                    onClick={handleLogout}
                    className="text-red-400 hover:text-red-300 ml-2"
                    title="Logout"
                  >
                    <LogOut size={16} />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowLoginModal(true)}
                  className="flex items-center space-x-2 px-3 py-1 bg-purple-700/60 hover:bg-purple-600 text-white rounded-full transition-colors"
                >
                  <User size={16} className="text-pink-300" />
                  <span className="text-sm">Login</span>
                </button>
              )}
              {/* Buy Now */}
              <a
                href="https://ethervista.app/bsc/token/0x52bf2b94Ab3c33867c4CA5849E529290baaf692c"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold rounded-full transition-all duration-300 transform hover:scale-105 text-base"
              >
                Buy Now
              </a>
            </div>
          )}
          {/* Mobile Layout */}
          {isDropdown && (
            <div className="flex items-center justify-between w-full">
              {/* Logo */}
              <div className="flex justify-center mb-2">
                <Logo />
              </div>
              {/* Address and Copy (always visible, centered if possible) */}
              <div className="flex items-center space-x-2 bg-purple-700/60 px-3 py-1 rounded-full select-all cursor-pointer transition hover:bg-purple-600"
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
              {/* Menu Button (right side) */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-white hover:text-pink-300 p-2"
                aria-label={isOpen ? "Close menu" : "Open menu"}
              >
                {isOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          )}
          {/* Dropdown Menu */}
          {isDropdown && isOpen && (
            <div
              ref={dropdownRef}
              className="absolute top-14 right-2 bg-purple-900 border border-purple-700 rounded-xl shadow-xl p-4 flex flex-col gap-2 z-50 w-64 animate-fade-in max-h-80 sm:max-h-[60vh] overflow-y-auto scrollbar-thin scrollbar-thumb-pink-400"
            >
              {/* Login/Logout (always visible, right side) */}
              <div className="flex items-center space-x-2">
                {isLoggedIn ? (
                  <div className="flex items-center space-x-2 bg-purple-700/60 px-3 py-1 rounded-full">
                    <User size={16} className="text-pink-300" />
                    <span className="text-white text-sm font-medium">{currentUser}</span>
                    <button
                      onClick={handleLogout}
                      className="text-red-400 hover:text-red-300 ml-2"
                      title="Logout"
                    >
                      <LogOut size={16} />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setShowLoginModal(true)}
                    className="flex items-center space-x-2 px-3 py-1 bg-purple-700/60 hover:bg-purple-600 text-white rounded-full transition-colors"
                  >
                    <User size={16} className="text-pink-300" />
                    <span className="text-sm">Login</span>
                  </button>
                )}
              </div>
              {/* Nav Links */}
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="px-3 py-2 rounded-lg text-white hover:text-pink-300 font-medium text-base transition-colors"
                  onClick={(e) => {
                    e.preventDefault();
                    setIsOpen(false);
                    handleNavClick(link.href);
                  }}
                >
                  {link.name}
                </a>
              ))}
              {/* Buy Now */}
              <a
                href="https://ethervista.app/bsc/token/0x52bf2b94Ab3c33867c4CA5849E529290baaf692c"
                target="_blank"
                rel="noopener noreferrer"
                className="block px-3 py-2 mt-2 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold rounded-full text-center text-base whitespace-nowrap"
                onClick={() => setIsOpen(false)}
              >
                Buy Now
              </a>
            </div>
          )}
        </div>
      </nav>
      <LoginModal />
    </>
  );
};

export default Navbar;
