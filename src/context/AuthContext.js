import React, { createContext, useContext, useState, useEffect } from 'react';
import cognitoAuthService from '../services/CognitoAuthService';
import { getCognitoTokenFromUrl } from '../utils/getCognitoToken';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    try {
      getCognitoTokenFromUrl(); // Parse token from URL if redirected
    } catch (err) {
      console.error('Token parse error:', err);
    }

    const checkUser = async () => {
      try {
        const result = await cognitoAuthService.getCurrentUser();
        if (result.success) {
          setUser(result.user);
          setUsername(result.username);
          setToken(result.token);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.log('No authenticated user found');
      }
      setLoading(false);
    };

    checkUser();
  }, []);

  const signOut = async () => {
    await cognitoAuthService.signOut();
    setIsAuthenticated(false);
    setUser(null);
    setUsername('');
    setToken('');
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        username,
        token,
        signOut,
        loading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
