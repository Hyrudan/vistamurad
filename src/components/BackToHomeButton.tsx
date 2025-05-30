import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const BackToHomeButton: React.FC = () => (
  <div className="mb-8 flex justify-start">
    <Link
      to="/"
      className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-400 to-pink-600 hover:from-yellow-500 hover:to-pink-700 text-white font-bold rounded-full transition-all duration-300 transform hover:scale-105 text-base shadow-lg"
    >
      <ArrowLeft size={18} /> Back to Home
    </Link>
  </div>
);

export default BackToHomeButton;
