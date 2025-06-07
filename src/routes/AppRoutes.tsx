// src/routes/AppRoutes.tsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Import all your page components
import Hero from '../components/Hero/Hero';
import ImageCarousel from '../components/ImageCarousel';
import Tokenomics from '../pages/Tokenomics';
import HowToBuy from '../pages/HowToBuy';
import Chart from '../pages/Chart';
import Community from '../pages/Community';
import FAQ from '../pages/FAQ';
import Whitepaper from '../pages/Whitepaper';
import Roadmap from '../pages/Roadmap';
import TermsAndConditionsPage from '../pages/Terms';
import PrivacyPolicyPage from '../pages/Privacy';
import Contest from '../pages/Contest';
import Governance from '../pages/Governance';

// Home page layout with all sections
const HomePage: React.FC = () => (
  <>
    <Hero />
    <Whitepaper />
    <ImageCarousel />
    <Tokenomics />
    <HowToBuy />
    <Chart />
    <Roadmap />
    <Community />
    <FAQ />
  </>
);

// Centralize all your routes here
const AppRoutes: React.FC = () => (
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/terms" element={<TermsAndConditionsPage />} />
    <Route path="/privacy" element={<PrivacyPolicyPage />} />
    <Route path="/contest" element={<Contest />} />
    <Route path="/governance" element={<Governance />} />
    {/* Add other routes if needed */}
  </Routes>
);

export default AppRoutes;
