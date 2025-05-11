import React from 'react';

const Logo: React.FC = () => {
  return (
    <div className="flex items-center space-x-2">
      <div className="bg-gradient-to-r from-pink-200 to-purple-600 w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center">
        <img 
          src="https://i.ibb.co/qLBs72sk/logoatt.jpg"
          alt="Logo"
          className="w-8 h-8 sm:w-10 sm:h-10 object-contain rounded-full"
          loading="lazy"
        />
      </div>
      <span className="font-extrabold text-lg sm:text-2xl bg-clip-text text-transparent bg-gradient-to-r from-white to-pink-300 whitespace-nowrap">
        VISTAMURAD
      </span>
    </div>
  );
};

export default Logo;
