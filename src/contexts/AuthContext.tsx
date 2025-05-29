// src/context/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AuthContextType {
  currentUser: string | null;
  isLoggedIn: boolean;
  login: (username: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  // Check for existing session on app start
  useEffect(() => {
    const savedUsername = localStorage.getItem('anonymousUsername');
    if (savedUsername) {
      setCurrentUser(savedUsername);
      setIsLoggedIn(true);
    }
  }, []);

  // Login function
  const login = (username: string): void => {
    setCurrentUser(username);
    setIsLoggedIn(true);
    localStorage.setItem('anonymousUsername', username);
    
    // Dispatch custom event to notify other components
    window.dispatchEvent(new CustomEvent('authStateChanged', {
      detail: { isLoggedIn: true, username }
    }));
  };

  // Logout function
  const logout = (): void => {
    setCurrentUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem('anonymousUsername');
    
    // Clear votes when logging out
    const savedVotes = localStorage.getItem('imageVotes');
    if (savedVotes && currentUser) {
      try {
        const votes = JSON.parse(savedVotes);
        const updatedVotes: Record<string, any> = {};
        
        Object.entries(votes).forEach(([imageId, voteData]: [string, any]) => {
          if (voteData.voters) {
            const filteredVoters = voteData.voters.filter((voter: string) => voter !== currentUser);
            updatedVotes[imageId] = {
              totalVotes: filteredVoters.length,
              voters: filteredVoters
            };
          }
        });
        
        localStorage.setItem('imageVotes', JSON.stringify(updatedVotes));
      } catch (error) {
        console.error('Error updating votes on logout:', error);
      }
    }
    
    // Dispatch custom event to notify other components
    window.dispatchEvent(new CustomEvent('authStateChanged', {
      detail: { isLoggedIn: false, username: null }
    }));
  };

  const value: AuthContextType = {
    currentUser,
    isLoggedIn,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
