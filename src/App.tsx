import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Footer from './components/Footer';
import AppRoutes from './routes/AppRoutes';


function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen flex flex-col bg-purple-950">
          
          <main className="flex-1 px-2 sm:px-4 md:px-8">
            <AppRoutes />
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
