import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
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
import './index.css';

// Componente principal que verifica se deve renderizar em modo standalone
const AppContent: React.FC = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const isStandalone = searchParams.get('standalone') === 'true';
  
  // Update page title
  React.useEffect(() => {
    if (location.pathname === '/terms' && isStandalone) {
      document.title = 'VISTAMURAD - Terms and Conditions';
    } else if (location.pathname === '/privacy' && isStandalone) {
      document.title = 'VISTAMURAD - Privacy Policy';
    } else {
      document.title = 'VISTAMURAD ®';
    }
  }, [location, isStandalone]);

  // Renderizar apenas o componente específico em modo standalone
  if (isStandalone) {
    if (location.pathname === '/terms') {
      return <TermsAndConditionsPage />;
    }
    
    if (location.pathname === '/privacy') {
      return <PrivacyPolicyPage />;
    }
  }
  
  // Renderização normal do site completo
  return (
    <div className="min-h-screen flex flex-col bg-purple-950">
      <Navbar />
      <main className="flex-1 px-2 sm:px-4 md:px-8">
        {location.pathname === '/' && (
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
        )}
        {location.pathname === '/terms' && <TermsAndConditionsPage />}
        {location.pathname === '/privacy' && <PrivacyPolicyPage />}
      </main>
      <Footer />
    </div>
  );
};

// Componente App que configura o Router
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<AppContent />} />
      </Routes>
    </Router>
  );
}

export default App;
