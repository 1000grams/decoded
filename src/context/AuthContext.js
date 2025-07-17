import React, { createContext, useContext, useState, useEffect } from 'react';
import SpotifyService from '../services/SpotifyService.js';

// Create context
const AuthContext = createContext(null);

// Custom hook for consuming
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// API call to check group membership
const checkArtistGroup = async (email) => {
  try {
    const res = await fetch("https://2h2oj7u446.execute-api.eu-central-1.amazonaws.com/prod/auth/groupcheck", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    const data = await res.json();
    return data.authorized === true;
  } catch (err) {
    console.error("❌ Failed to check artist group:", err);
    return false;
  }
};

// AuthProvider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);        // Basic user info
  const [username, setUsername] = useState(null); // New state for username
  const [authorized, setAuthorized] = useState(false); // Artist group check
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // New state for authentication

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("mockToken");

    if (storedUser && token) {
      const parsed = JSON.parse(storedUser);
      setUser(parsed);
      setIsAuthenticated(true);
      const email = parsed.email || parsed.username || 'rdv@decodedmusic.com'; // Ensure fallback values for email
      checkArtistGroup(email).then((isAuth) => {
        console.log("✅ Group check:", isAuth); // Debug logging for group check
        setAuthorized(isAuth);
      });

      SpotifyService.getProfile(parsed.id).then((profile) => {
        setUser((prevUser) => ({
          ...prevUser,
          artistName: profile.name,
          artistId: profile.id,
          spotifyUrl: profile.external_urls.spotify,
        }));
      }).catch((error) => {
        console.error("Error fetching Spotify profile:", error);
      }).finally(() => {
        setLoading(false);
      });
    } else {
      setIsAuthenticated(false);
      setLoading(false); // Handle case with no user
    }
  }, []);

  const login = (userObj) => {
    localStorage.setItem("user", JSON.stringify(userObj));
    localStorage.setItem("mockToken", "mock-jwt-token");
    setUser(userObj);
    setIsAuthenticated(true);
    checkArtistGroup(userObj.email).then(setAuthorized);
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("mockToken");
    setUser(null);
    setAuthorized(false);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, username, setUsername, login, logout, authorized, loading, isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
