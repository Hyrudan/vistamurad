import React from 'react';
import { PieChart, Coins, Rocket } from 'lucide-react';

const TokenomicsCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
  percentage: string;
}> = ({ icon, title, description, percentage }) => {
  return (
    <div className="bg-purple-800/50 backdrop-blur-sm border border-purple-600/30 rounded-xl sm:rounded-2xl p-4 sm:p-6 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-xl max-w-xs w-full">
      <div className="flex items-center mb-3 sm:mb-4">
        <div className="h-10 w-10 sm:h-12 sm:w-12 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center mr-3 sm:mr-4">
          {icon}
        </div>
        <div>
          <h3 className="text-base sm:text-xl font-bold text-white">{title}</h3>
          <p className="text-pink-300 font-semibold text-sm sm:text-base">{percentage}</p>
        </div>
      </div>
      <p className="text-pink-100 text-sm sm:text-base">{description}</p>
    </div>
  );
};

const Tokenomics: React.FC = () => {
  const tokenomicsData = [
    {
      icon: <PieChart className="text-white" size={22} />,
      title: 'Community Allocation',
      percentage: '70%',
      description: '70% of all tokens are distributed to the community through fair launch and rewards.',
    },
    {
      icon: <Coins className="text-white" size={22} />,
      title: 'Liquidity Pool',
      percentage: '30%',
      description: 'Locked liquidity to ensure stable trading and long-term sustainability.',
    },
    {
      icon: <Rocket className="text-white" size={22} />,
      title: 'Team Allocation',
      percentage: '0%',
      description: 'nothing directly for the team, vested to ensure commitment.',
    },
  ];

  return (
    <section id="tokenomics" className="py-10 sm:py-20 bg-gradient-to-br from-purple-800 to-purple-900">
      <div className="container mx-auto px-2 sm:px-4 lg:px-8">
        <div className="text-center mb-8 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4">Tokenomics</h2>
          <p className="text-pink-200 max-w-md sm:max-w-2xl mx-auto text-sm sm:text-base">
            VISTAMURAD is built with a balanced and sustainable tokenomics model designed to reward holders and ensure long-term growth.
          </p>
        </div>

        {/* Grid centralizado e responsivo */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 justify-items-center">
          {tokenomicsData.map((item, index) => (
            <TokenomicsCard
              key={index}
              icon={item.icon}
              title={item.title}
              percentage={item.percentage}
              description={item.description}
            />
          ))}
        </div>

        <div className="mt-10 sm:mt-16 bg-purple-800/30 backdrop-blur-md rounded-2xl sm:rounded-3xl p-5 sm:p-8 border border-purple-600/30">
          <h3 className="text-lg sm:text-2xl font-bold text-white mb-4 sm:mb-6 text-center">Token Details</h3>
          <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-8 justify-items-center">
            {[
              { label: 'Token Name', value: 'VISTAMURAD' },
              { label: 'Token Symbol', value: 'VMURAD' },
              { label: 'Total Supply', value: '1,000,000,000 VMURAD' },
              { label: 'Blockchain', value: 'BNB Smart Chain' },
              { label: 'Tax', value: '2% buy / 2% sell' },
              { label: 'Launch Date', value: 'May 11, 2025' },
            ].map((detail, index) => (
              <div key={index} className="text-center w-full">
                <p className="text-pink-300 mb-0.5 sm:mb-1 text-xs sm:text-sm">{detail.label}</p>
                <p className="text-white font-semibold break-words text-sm sm:text-base">{detail.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Tokenomics;
