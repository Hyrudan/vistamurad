import React from 'react';

// HeroStats component: displays a grid of important statistics for the project
export function HeroStats() {
  const stats = [
    { label: 'Total Supply', value: '1,000,000,000' },
    { label: 'Airdrop Amount', value: '20,000,000' },
    { label: 'Diamond Hands Only', value: 'No Sales Allowed' },
    { label: 'Snapshot Date', value: 'Aug 12, 2025' },
  ];

  return (
    <div className="mt-8 sm:mt-16 grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-6 text-center">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-white/10 backdrop-blur-sm rounded-xl p-2 xs:p-3 sm:p-4 border border-white/10"
        >
          {/* Statistic label */}
          <p className="text-pink-300 text-[10px] xs:text-xs sm:text-sm">{stat.label}</p>
          {/* Statistic value */}
          <p className="text-white text-base xs:text-lg sm:text-xl md:text-2xl font-bold">{stat.value}</p>
        </div>
      ))}
    </div>
  );
}

// Optional: export as default for flexible usage
export default HeroStats;
