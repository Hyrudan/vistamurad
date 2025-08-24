import React from 'react';
import MemeGenerator from '../components/MemeGenerator/MemeGenerator';
import BackToHomeButton from '../components/BackToHomeButton';

const MemeGeneratorPage: React.FC = () => {
  return (
    <section className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-pink-900 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <BackToHomeButton />
        <MemeGenerator />
      </div>
    </section>
  );
};

export default MemeGeneratorPage;