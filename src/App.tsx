// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import Hero from './pages/Hero';
import ImageCarousel from './components/ImageCarousel';
import Tokenomics from './pages/Tokenomics';
import HowToBuy from './pages/HowToBuy';
import Chart from './pages/Chart';
import Community from './pages/Community';
import FAQ from './pages/FAQ';
import Footer from './components/Footer';
import Whitepaper from './pages/Whitepaper';
import Roadmap from './pages/Roadmap';
import TermsAndConditionsPage from './pages/Terms';
import PrivacyPolicyPage from './pages/Privacy';
import Contest from './pages/Contest';
import './index.css';

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

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen flex flex-col bg-purple-950">
          <Navbar />
          <main className="flex-1 px-2 sm:px-4 md:px-8">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/terms" element={<TermsAndConditionsPage />} />
              <Route path="/privacy" element={<PrivacyPolicyPage />} />
              <Route path="/contest" element={<Contest />} />
              {/* Adicione outras rotas se necessário */}
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
