import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // Function to verify the current session's authentication state
    const verifySession = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/auth/session', {
          credentials: 'include', // Necessary to include cookies
        });
        const data = await response.json();
        if (data.isAuthenticated) {
          setCurrentUser(data.user); // Set the currentUser based on the backend response
        } else {
          setCurrentUser(null); // No user is logged in, or the session is not valid
        }
      } catch (error) {
        console.error("Error verifying session:", error);
        setCurrentUser(null); // Handle errors by resetting currentUser
      }
    };

    verifySession();
  }, []);

  // Function to update user state upon login
  const login = (user) => setCurrentUser(user);

  // Function to clear user state upon logout
  const logout = () => {
    setCurrentUser(null);
    // Optionally, add a call to a backend logout endpoint here
  };

  const value = { currentUser, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
